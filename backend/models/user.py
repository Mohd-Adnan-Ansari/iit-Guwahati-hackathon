"""
CarbonLens — User Model
"""

from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from models import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    display_name = db.Column(db.String(100), nullable=True)
    campus_id = db.Column(db.Integer, db.ForeignKey('campuses.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc),
                           onupdate=lambda: datetime.now(timezone.utc))
    is_active = db.Column(db.Boolean, default=True)

    # Relationships
    calculations = db.relationship('CarbonCalculation', backref='user', lazy='dynamic',
                                   order_by='CarbonCalculation.created_at.desc()')
    scenarios = db.relationship('Scenario', backref='user', lazy='dynamic')
    badges = db.relationship('UserBadge', backref='user', lazy='dynamic')
    challenge_participations = db.relationship('ChallengeParticipant', backref='user', lazy='dynamic')
    notifications = db.relationship('Notification', backref='user', lazy='dynamic',
                                    order_by='Notification.created_at.desc()')

    def set_password(self, password):
        """Hash and store password — never stored in plaintext."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verify password against hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'displayName': self.display_name,
            'campusId': self.campus_id,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<User {self.username}>'
