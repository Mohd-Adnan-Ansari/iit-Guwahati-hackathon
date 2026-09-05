"""
CarbonLens — Emission Factor Routes
GET /api/emission-factors — Get all emission factors (transparency)
"""

from flask import Blueprint, jsonify
from config.emission_factors import get_all_factors

emission_factors_bp = Blueprint('emission_factors', __name__, url_prefix='/api/emission-factors')


@emission_factors_bp.route('', methods=['GET'])
def get_emission_factors():
    """
    Get all emission factors used by the calculation engine.
    This is a transparency endpoint — users can see exactly what factors are used.
    """
    factors = get_all_factors()
    return jsonify(factors), 200
