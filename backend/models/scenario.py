"""
CarbonLens — Scenario Model
"""

from datetime import datetime, timezone
from models import db


class Scenario(db.Model):
    __tablename__ = 'scenarios'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # Inputs
    daily_distance_km = db.Column(db.Float, nullable=False, default=0)
    transport_mode = db.Column(db.String(50), nullable=False, default='car')
    travel_days_per_month = db.Column(db.Integer, nullable=False, default=22)
    monthly_electricity_kwh = db.Column(db.Float, nullable=False, default=0)
    diet_type = db.Column(db.String(50), nullable=False, default='regular')
    daily_waste_kg = db.Column(db.Float, nullable=False, default=0)
    recycling_percentage = db.Column(db.Float, nullable=False, default=0)

    # Calculated results
    transport_emissions = db.Column(db.Float, default=0)
    energy_emissions = db.Column(db.Float, default=0)
    food_emissions = db.Column(db.Float, default=0)
    waste_emissions = db.Column(db.Float, default=0)
    total_emissions = db.Column(db.Float, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'description': self.description,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'inputs': {
                'dailyDistanceKm': self.daily_distance_km,
                'transportMode': self.transport_mode,
                'travelDaysPerMonth': self.travel_days_per_month,
                'monthlyElectricityKwh': self.monthly_electricity_kwh,
                'dietType': self.diet_type,
                'dailyWasteKg': self.daily_waste_kg,
                'recyclingPercentage': self.recycling_percentage
            },
            'results': {
                'totalEmissions': round(self.total_emissions, 2),
                'transportEmissions': round(self.transport_emissions, 2),
                'energyEmissions': round(self.energy_emissions, 2),
                'foodEmissions': round(self.food_emissions, 2),
                'wasteEmissions': round(self.waste_emissions, 2)
            }
        }
