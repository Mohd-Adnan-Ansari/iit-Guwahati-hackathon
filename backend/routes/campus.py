"""
CarbonLens — Campus Analytics Routes
GET /api/campus/analytics — Aggregated campus data (privacy-safe)
GET /api/campus/trends    — Monthly campus trends
"""

from flask import Blueprint, request, jsonify
from services.campus_service import get_campus_analytics, get_campus_trends

campus_bp = Blueprint('campus', __name__, url_prefix='/api/campus')


@campus_bp.route('/analytics', methods=['GET'])
def analytics():
    """
    Get aggregated campus analytics.
    This endpoint is public — it only returns aggregate data.
    No individual user data is ever exposed.
    """
    campus_id = request.args.get('campus_id', type=int)
    data = get_campus_analytics(campus_id)
    return jsonify(data), 200


@campus_bp.route('/trends', methods=['GET'])
def trends():
    """Get monthly campus analytics trends."""
    campus_id = request.args.get('campus_id', type=int)
    months = request.args.get('months', 6, type=int)
    months = min(months, 24)

    data = get_campus_trends(campus_id, months)
    return jsonify({'trends': data}), 200
