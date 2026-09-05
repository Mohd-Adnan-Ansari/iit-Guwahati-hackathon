"""
CarbonLens — Challenge Routes
GET  /api/challenges          — List all challenges
POST /api/challenges/:id/join — Join a challenge
"""

from flask import Blueprint, jsonify
from models import db
from models.challenge import Challenge, ChallengeParticipant
from services.auth_service import token_required

challenges_bp = Blueprint('challenges', __name__, url_prefix='/api/challenges')


@challenges_bp.route('', methods=['GET'])
def get_challenges():
    """Get all challenges."""
    challenges = Challenge.query.order_by(Challenge.created_at.desc()).all()
    return jsonify({
        'challenges': [c.to_dict() for c in challenges]
    }), 200


@challenges_bp.route('/<int:challenge_id>/join', methods=['POST'])
@token_required
def join_challenge(current_user, challenge_id):
    """Join a campus challenge."""
    challenge = db.session.get(Challenge, challenge_id)
    if not challenge:
        return jsonify({'error': 'Challenge not found.'}), 404

    if challenge.status != 'active':
        return jsonify({'error': 'This challenge is not currently active.'}), 400

    # Check if already joined
    existing = ChallengeParticipant.query.filter_by(
        challenge_id=challenge_id,
        user_id=current_user.id
    ).first()

    if existing:
        return jsonify({'error': 'You have already joined this challenge.'}), 409

    participant = ChallengeParticipant(
        challenge_id=challenge_id,
        user_id=current_user.id
    )
    db.session.add(participant)
    db.session.commit()

    return jsonify({
        'message': f'Successfully joined "{challenge.name}"!',
        'challenge': challenge.to_dict()
    }), 201
