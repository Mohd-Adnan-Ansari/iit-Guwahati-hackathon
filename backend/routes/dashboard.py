"""
CarbonLens — Dashboard & Recommendation Routes
GET /api/dashboard         — User dashboard data
GET /api/recommendations   — Personalized recommendations
"""

from flask import Blueprint, jsonify
from models.calculation import CarbonCalculation
from calculations.recommendations import generate_recommendations
from services.auth_service import token_required
from services.badge_service import get_user_badges

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api')


@dashboard_bp.route('/dashboard', methods=['GET'])
@token_required
def get_dashboard(current_user):
    """Get comprehensive dashboard data for the current user."""
    # Get latest calculation
    latest = CarbonCalculation.query \
        .filter_by(user_id=current_user.id) \
        .order_by(CarbonCalculation.created_at.desc()) \
        .first()

    if not latest:
        return jsonify({
            'hasData': False,
            'message': 'No calculations yet. Complete your first carbon footprint calculation!'
        }), 200

    # Get previous calculation for comparison
    previous = CarbonCalculation.query \
        .filter_by(user_id=current_user.id) \
        .order_by(CarbonCalculation.created_at.desc()) \
        .offset(1) \
        .first()

    # Calculate change
    reduction_pct = 0
    reduction_amount = 0
    if previous and previous.total_emissions > 0:
        reduction_amount = round(previous.total_emissions - latest.total_emissions, 2)
        reduction_pct = round((reduction_amount / previous.total_emissions) * 100, 1)

    # Get history for trend
    history = CarbonCalculation.query \
        .filter_by(user_id=current_user.id) \
        .order_by(CarbonCalculation.created_at.desc()) \
        .limit(12) \
        .all()

    trend = 'stable'
    if len(history) >= 2:
        if history[0].total_emissions < history[1].total_emissions * 0.95:
            trend = 'decreasing'
        elif history[0].total_emissions > history[1].total_emissions * 1.05:
            trend = 'increasing'

    # Get badges
    badges = get_user_badges(current_user.id)

    # Generate recommendations from latest
    recs = generate_recommendations(latest.to_dict()['results'] | {'inputs': latest.to_dict()['inputs']})

    return jsonify({
        'hasData': True,
        'current': latest.to_dict(),
        'previous': previous.to_dict() if previous else None,
        'reductionPercentage': reduction_pct,
        'reductionAmount': reduction_amount,
        'trend': trend,
        'history': [h.to_dict() for h in reversed(history)],
        'badges': badges,
        'recommendations': recs,
        'calculationCount': CarbonCalculation.query.filter_by(user_id=current_user.id).count()
    }), 200


@dashboard_bp.route('/recommendations', methods=['GET'])
@token_required
def get_recommendations(current_user):
    """Get personalized recommendations based on latest calculation."""
    latest = CarbonCalculation.query \
        .filter_by(user_id=current_user.id) \
        .order_by(CarbonCalculation.created_at.desc()) \
        .first()

    if not latest:
        return jsonify({
            'hasData': False,
            'message': 'Complete a calculation first to get personalized recommendations.'
        }), 200

    calc_dict = latest.to_dict()
    results_with_inputs = calc_dict['results'] | {'inputs': calc_dict['inputs']}
    recs = generate_recommendations(results_with_inputs)

    return jsonify({
        'hasData': True,
        'recommendations': recs
    }), 200
