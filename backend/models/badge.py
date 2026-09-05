"""
CarbonLens — Badge Models
"""

from datetime import datetime, timezone
from models import db


class Badge(db.Model):
    __tablename__ = 'badges'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(300), nullable=True)
    icon = db.Column(db.String(50), nullable=True)  # Lucide icon name
    category = db.Column(db.String(50), nullable=True)  # transport, energy, food, waste, general
    criteria = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user_badges = db.relationship('UserBadge', backref='badge', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'category': self.category,
            'criteria': self.criteria
        }


class UserBadge(db.Model):
    __tablename__ = 'user_badges'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    badge_id = db.Column(db.Integer, db.ForeignKey('badges.id'), nullable=False, index=True)
    earned_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        db.UniqueConstraint('user_id', 'badge_id', name='uq_user_badge'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'badgeId': self.badge_id,
            'earnedAt': self.earned_at.isoformat() if self.earned_at else None,
            'badge': self.badge.to_dict() if self.badge else None
        }
