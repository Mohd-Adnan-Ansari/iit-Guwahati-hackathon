"""
CarbonLens — Challenge Models
"""

from datetime import datetime, timezone
from models import db


class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=False)  # transport, energy, food, waste
    campus_id = db.Column(db.Integer, db.ForeignKey('campuses.id'), nullable=True)
    start_date = db.Column(db.DateTime, nullable=True)
    end_date = db.Column(db.DateTime, nullable=True)
    target_reduction_kg = db.Column(db.Float, default=0)
    status = db.Column(db.String(20), default='active')  # active, completed, upcoming
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    participants = db.relationship('ChallengeParticipant', backref='challenge', lazy='dynamic')

    def to_dict(self):
        participant_count = self.participants.count()
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'campusId': self.campus_id,
            'startDate': self.start_date.isoformat() if self.start_date else None,
            'endDate': self.end_date.isoformat() if self.end_date else None,
            'targetReductionKg': self.target_reduction_kg,
            'status': self.status,
            'participantCount': participant_count,
            'progress': min(100, int((participant_count / max(1, self.target_reduction_kg)) * 100))
        }


class ChallengeParticipant(db.Model):
    __tablename__ = 'challenge_participants'

    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenges.id'), nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    joined_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    progress = db.Column(db.Float, default=0)  # 0-100
    co2_reduced = db.Column(db.Float, default=0)

    __table_args__ = (
        db.UniqueConstraint('challenge_id', 'user_id', name='uq_challenge_user'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'challengeId': self.challenge_id,
            'userId': self.user_id,
            'joinedAt': self.joined_at.isoformat() if self.joined_at else None,
            'progress': self.progress,
            'co2Reduced': self.co2_reduced
        }
