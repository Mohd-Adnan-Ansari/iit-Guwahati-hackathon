"""
CarbonLens — Badge Routes
GET /api/badges — Get all badges with user's earned status
"""

from flask import Blueprint, jsonify
from services.auth_service import token_required
from services.badge_service import get_user_badges

badges_bp = Blueprint('badges', __name__, url_prefix='/api/badges')


@badges_bp.route('', methods=['GET'])
@token_required
def get_badges(current_user):
    """Get all badges with the user's earned status."""
    badges = get_user_badges(current_user.id)
    earned_count = sum(1 for b in badges if b['earned'])

    return jsonify({
        'badges': badges,
        'totalBadges': len(badges),
        'earnedCount': earned_count
    }), 200
