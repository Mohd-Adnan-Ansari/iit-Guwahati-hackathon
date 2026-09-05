"""
CarbonLens — Database Models
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .calculation import CarbonCalculation
from .campus import University, Campus, CampusAggregate
from .challenge import Challenge, ChallengeParticipant
from .badge import Badge, UserBadge
from .scenario import Scenario
from .notification import Notification
from .emission_factor import EmissionFactor

__all__ = [
    'db',
    'User',
    'CarbonCalculation',
    'University',
    'Campus',
    'CampusAggregate',
    'Challenge',
    'ChallengeParticipant',
    'Badge',
    'UserBadge',
    'Scenario',
    'Notification',
    'EmissionFactor',
]
