"""
CarbonLens — Campus Models (University, Campus, CampusAggregate)
"""

from datetime import datetime, timezone
from models import db


class University(db.Model):
    __tablename__ = 'universities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    country = db.Column(db.String(100), nullable=False, default='India')
    state = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    campuses = db.relationship('Campus', backref='university', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'state': self.state
        }


class Campus(db.Model):
    __tablename__ = 'campuses'

    id = db.Column(db.Integer, primary_key=True)
    university_id = db.Column(db.Integer, db.ForeignKey('universities.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=True)
    electricity_factor_override = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    users = db.relationship('User', backref='campus', lazy='dynamic')
    aggregates = db.relationship('CampusAggregate', backref='campus', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'universityId': self.university_id,
            'name': self.name,
            'location': self.location
        }


class CampusAggregate(db.Model):
    """
    Pre-computed, privacy-safe aggregated analytics.
    Never exposes individual user data.
    """
    __tablename__ = 'campus_aggregates'

    id = db.Column(db.Integer, primary_key=True)
    campus_id = db.Column(db.Integer, db.ForeignKey('campuses.id'), nullable=False, index=True)
    period = db.Column(db.String(20), nullable=False)  # e.g., '2026-01', '2026-02'
    total_participants = db.Column(db.Integer, default=0)
    avg_total_emissions = db.Column(db.Float, default=0)
    avg_transport_emissions = db.Column(db.Float, default=0)
    avg_energy_emissions = db.Column(db.Float, default=0)
    avg_food_emissions = db.Column(db.Float, default=0)
    avg_waste_emissions = db.Column(db.Float, default=0)
    total_campus_emissions = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'campusId': self.campus_id,
            'period': self.period,
            'totalParticipants': self.total_participants,
            'avgTotalEmissions': round(self.avg_total_emissions, 2),
            'avgTransportEmissions': round(self.avg_transport_emissions, 2),
            'avgEnergyEmissions': round(self.avg_energy_emissions, 2),
            'avgFoodEmissions': round(self.avg_food_emissions, 2),
            'avgWasteEmissions': round(self.avg_waste_emissions, 2),
            'totalCampusEmissions': round(self.total_campus_emissions, 2)
        }
