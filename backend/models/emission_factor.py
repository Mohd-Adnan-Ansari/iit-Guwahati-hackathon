"""
CarbonLens — Emission Factor Database Model
"""

from datetime import datetime, timezone
from models import db


class EmissionFactor(db.Model):
    """
    Database-backed emission factor storage.
    Supplements the config/emission_factors.py defaults and allows
    campus-specific or region-specific overrides.
    """
    __tablename__ = 'emission_factors'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False, index=True)  # transport, energy, food, waste
    activity = db.Column(db.String(100), nullable=False)  # car, electricity, regular, general_waste
    factor = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(300), nullable=True)
    country = db.Column(db.String(100), default='India')
    campus_id = db.Column(db.Integer, db.ForeignKey('campuses.id'), nullable=True)
    verified = db.Column(db.Boolean, default=False)
    effective_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'activity': self.activity,
            'factor': self.factor,
            'unit': self.unit,
            'source': self.source,
            'country': self.country,
            'campusId': self.campus_id,
            'verified': self.verified,
            'effectiveDate': self.effective_date.isoformat() if self.effective_date else None
        }
