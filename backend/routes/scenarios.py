"""
CarbonLens — Scenario Routes
POST /api/scenarios   — Save a scenario
GET  /api/scenarios   — List user's scenarios
DELETE /api/scenarios/:id — Delete a scenario
"""

from flask import Blueprint, request, jsonify
from models import db
from models.scenario import Scenario
from calculations.engine import calculate_footprint
from services.auth_service import token_required

scenarios_bp = Blueprint('scenarios', __name__, url_prefix='/api/scenarios')


@scenarios_bp.route('', methods=['POST'])
@token_required
def create_scenario(current_user):
    """Save a named scenario."""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required.'}), 400

    name = (data.get('name') or '').strip()
    if not name:
        return jsonify({'error': 'Scenario name is required.'}), 400
    if len(name) > 200:
        return jsonify({'error': 'Scenario name must be 200 characters or fewer.'}), 400

    inputs = data.get('inputs', {})
    results = calculate_footprint(inputs)

    scenario = Scenario(
        user_id=current_user.id,
        name=name,
        description=(data.get('description') or '').strip(),
        daily_distance_km=inputs.get('dailyDistanceKm', 0),
        transport_mode=inputs.get('transportMode', 'car'),
        travel_days_per_month=inputs.get('travelDaysPerMonth', 22),
        monthly_electricity_kwh=inputs.get('monthlyElectricityKwh', 0),
        diet_type=inputs.get('dietType', 'regular'),
        daily_waste_kg=inputs.get('dailyWasteKg', 0),
        recycling_percentage=inputs.get('recyclingPercentage', 0),
        transport_emissions=results['transportEmissions'],
        energy_emissions=results['energyEmissions'],
        food_emissions=results['foodEmissions'],
        waste_emissions=results['wasteEmissions'],
        total_emissions=results['totalEmissions']
    )

    db.session.add(scenario)
    db.session.commit()

    return jsonify({
        'message': 'Scenario saved!',
        'scenario': scenario.to_dict()
    }), 201


@scenarios_bp.route('', methods=['GET'])
@token_required
def get_scenarios(current_user):
    """Get all scenarios for the current user."""
    scenarios = Scenario.query \
        .filter_by(user_id=current_user.id) \
        .order_by(Scenario.created_at.desc()) \
        .all()

    scenario_list = [s.to_dict() for s in scenarios]

    # Find best scenario (lowest total emissions)
    best = None
    if scenario_list:
        best = min(scenario_list, key=lambda s: s['results']['totalEmissions'])

    return jsonify({
        'scenarios': scenario_list,
        'count': len(scenario_list),
        'bestScenario': best
    }), 200


@scenarios_bp.route('/<int:scenario_id>', methods=['DELETE'])
@token_required
def delete_scenario(current_user, scenario_id):
    """Delete a scenario."""
    scenario = Scenario.query.filter_by(id=scenario_id, user_id=current_user.id).first()
    if not scenario:
        return jsonify({'error': 'Scenario not found.'}), 404

    db.session.delete(scenario)
    db.session.commit()

    return jsonify({'message': 'Scenario deleted.'}), 200
