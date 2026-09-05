"""
CarbonLens — Calculation Routes
POST /api/calculations        — Create new calculation
GET  /api/calculations/history — Get calculation history
POST /api/calculations/simulate — Simulate (What-If) without saving
"""

import os
import sys

# Ensure backend directory is in sys.path for IDE linting and module resolution
_backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from flask import Blueprint, request, jsonify
from models import db
from models.calculation import CarbonCalculation
from calculations.engine import calculate_footprint, compare_scenarios
from calculations.recommendations import generate_recommendations
from services.auth_service import token_required
from services.badge_service import check_and_award_badges

calculations_bp = Blueprint('calculations', __name__, url_prefix='/api/calculations')


def _validate_inputs(data):
    """Validate calculation inputs and return sanitized values or errors."""
    errors = []

    daily_distance = data.get('dailyDistanceKm', 0)
    transport_mode = data.get('transportMode', 'car')
    travel_days = data.get('travelDaysPerMonth', 22)
    electricity = data.get('monthlyElectricityKwh', 0)
    diet_type = data.get('dietType', 'regular')
    daily_waste = data.get('dailyWasteKg', 0)
    recycling = data.get('recyclingPercentage', 0)
    # Optional pre-computed food CO₂ from quantity-based frontend calculator
    food_emissions_kg_month = data.get('foodEmissionsKgMonth', None)

    try:
        daily_distance = float(daily_distance)
        if daily_distance < 0:
            errors.append('Daily travel distance cannot be negative.')
        if daily_distance > 1000:
            errors.append('Daily travel distance seems too high. Please enter a realistic value.')
    except (ValueError, TypeError):
        errors.append('Please enter a valid travel distance.')

    valid_modes = ['car', 'motorcycle', 'bus', 'train', 'bicycle', 'walking', 'other']
    if transport_mode not in valid_modes:
        errors.append(f'Invalid transport mode. Choose from: {", ".join(valid_modes)}.')

    try:
        travel_days = int(travel_days)
        if travel_days < 0:
            errors.append('Travel days cannot be negative.')
        if travel_days > 31:
            errors.append('Travel days cannot exceed 31 per month.')
    except (ValueError, TypeError):
        errors.append('Please enter a valid number of travel days.')

    try:
        electricity = float(electricity)
        if electricity < 0:
            errors.append('Electricity consumption cannot be negative.')
        if electricity > 100000:
            errors.append('Electricity consumption seems too high. Please enter a realistic value.')
    except (ValueError, TypeError):
        errors.append('Please enter a valid electricity consumption.')

    # dietType is still validated for backward compat (What-If, history)
    # but is not required when food_emissions_kg_month is provided.
    valid_diets = ['regular', 'vegetarian', 'mostly_plant_based', 'quantity_based']
    if diet_type not in valid_diets:
        # Be lenient — just fall back to 'regular' rather than blocking
        diet_type = 'regular'

    # Validate optional pre-computed food emissions
    if food_emissions_kg_month is not None:
        try:
            food_emissions_kg_month = float(food_emissions_kg_month)
            if food_emissions_kg_month < 0:
                errors.append('Food emissions cannot be negative.')
            if food_emissions_kg_month > 5000:
                errors.append('Food emissions seem too high. Please review your food quantities.')
        except (ValueError, TypeError):
            errors.append('Please enter a valid food emissions value.')

    try:
        daily_waste = float(daily_waste)
        if daily_waste < 0:
            errors.append('Daily waste cannot be negative.')
        if daily_waste > 100:
            errors.append('Daily waste seems too high. Please enter a realistic value.')
    except (ValueError, TypeError):
        errors.append('Please enter a valid daily waste amount.')

    try:
        recycling = float(recycling)
        if recycling < 0:
            errors.append('Recycling percentage cannot be negative.')
        if recycling > 100:
            errors.append('Recycling percentage cannot exceed 100%.')
    except (ValueError, TypeError):
        errors.append('Please enter a valid recycling percentage.')

    if errors:
        return None, errors

    return {
        'dailyDistanceKm': daily_distance,
        'transportMode': transport_mode,
        'travelDaysPerMonth': travel_days,
        'monthlyElectricityKwh': electricity,
        'dietType': diet_type,
        'dailyWasteKg': daily_waste,
        'recyclingPercentage': recycling,
        'foodEmissionsKgMonth': food_emissions_kg_month,
    }, None


@calculations_bp.route('', methods=['POST'])
@token_required
def create_calculation(current_user):
    """Create a new carbon footprint calculation and save it."""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required.'}), 400

    validated, errors = _validate_inputs(data)
    if errors:
        return jsonify({'error': errors[0], 'errors': errors}), 400

    # Calculate using the engine
    results = calculate_footprint(validated)
    is_demo = data.get('isDemo', False)

    # Save to database
    calc = CarbonCalculation(
        user_id=current_user.id,
        is_demo=is_demo,
        daily_distance_km=validated['dailyDistanceKm'],
        transport_mode=validated['transportMode'],
        travel_days_per_month=validated['travelDaysPerMonth'],
        monthly_electricity_kwh=validated['monthlyElectricityKwh'],
        diet_type=validated['dietType'],
        daily_waste_kg=validated['dailyWasteKg'],
        recycling_percentage=validated['recyclingPercentage'],
        transport_emissions=results['transportEmissions'],
        energy_emissions=results['energyEmissions'],
        food_emissions=results['foodEmissions'],
        waste_emissions=results['wasteEmissions'],
        total_emissions=results['totalEmissions'],
        transport_percentage=results['transportPercentage'],
        energy_percentage=results['energyPercentage'],
        food_percentage=results['foodPercentage'],
        waste_percentage=results['wastePercentage'],
        biggest_contributor=results['biggestContributor']
    )

    db.session.add(calc)
    db.session.commit()

    # Check and award badges
    new_badges = check_and_award_badges(current_user.id)

    # Generate recommendations
    recs = generate_recommendations(results)

    return jsonify({
        'calculation': calc.to_dict(),
        'recommendations': recs,
        'newBadges': new_badges
    }), 201


@calculations_bp.route('/simulate', methods=['POST'])
def simulate():
    """
    Simulate a calculation without saving (for What-If and unauthenticated use).
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required.'}), 400

    validated, errors = _validate_inputs(data)
    if errors:
        return jsonify({'error': errors[0], 'errors': errors}), 400

    results = calculate_footprint(validated)
    recs = generate_recommendations(results)

    return jsonify({
        'results': results,
        'recommendations': recs
    }), 200


@calculations_bp.route('/compare', methods=['POST'])
def compare():
    """Compare two scenarios (before/after for What-If Simulator)."""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required.'}), 400

    before_data = data.get('before', {})
    after_data = data.get('after', {})

    before_validated, before_errors = _validate_inputs(before_data)
    if before_errors:
        return jsonify({'error': f'Before scenario: {before_errors[0]}', 'errors': before_errors}), 400

    after_validated, after_errors = _validate_inputs(after_data)
    if after_errors:
        return jsonify({'error': f'After scenario: {after_errors[0]}', 'errors': after_errors}), 400

    comparison = compare_scenarios(before_validated, after_validated)

    return jsonify({'comparison': comparison}), 200


@calculations_bp.route('/history', methods=['GET'])
@token_required
def get_history(current_user):
    """Get calculation history for the current user."""
    limit = request.args.get('limit', 20, type=int)
    limit = min(limit, 100)  # Cap at 100

    calculations = CarbonCalculation.query \
        .filter_by(user_id=current_user.id) \
        .order_by(CarbonCalculation.created_at.desc()) \
        .limit(limit) \
        .all()

    history = [calc.to_dict() for calc in calculations]

    # Compute trend
    trend = 'stable'
    if len(history) >= 2:
        latest = history[0]['results']['totalEmissions']
        previous = history[1]['results']['totalEmissions']
        if latest < previous * 0.95:
            trend = 'decreasing'
        elif latest > previous * 1.05:
            trend = 'increasing'

    return jsonify({
        'history': history,
        'count': len(history),
        'trend': trend
    }), 200
