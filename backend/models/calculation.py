"""
CarbonLens — Calculation Models
"""

from datetime import datetime, timezone
from models import db


class CarbonCalculation(db.Model):
    __tablename__ = 'carbon_calculations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    is_demo = db.Column(db.Boolean, default=False)

    # Inputs
    daily_distance_km = db.Column(db.Float, nullable=False, default=0)
    transport_mode = db.Column(db.String(50), nullable=False, default='car')
    travel_days_per_month = db.Column(db.Integer, nullable=False, default=22)
    monthly_electricity_kwh = db.Column(db.Float, nullable=False, default=0)
    diet_type = db.Column(db.String(50), nullable=False, default='regular')
    daily_waste_kg = db.Column(db.Float, nullable=False, default=0)
    recycling_percentage = db.Column(db.Float, nullable=False, default=0)

    # Calculated results
    transport_emissions = db.Column(db.Float, nullable=False, default=0)
    energy_emissions = db.Column(db.Float, nullable=False, default=0)
    food_emissions = db.Column(db.Float, nullable=False, default=0)
    waste_emissions = db.Column(db.Float, nullable=False, default=0)
    total_emissions = db.Column(db.Float, nullable=False, default=0)

    # Percentages
    transport_percentage = db.Column(db.Float, nullable=False, default=0)
    energy_percentage = db.Column(db.Float, nullable=False, default=0)
    food_percentage = db.Column(db.Float, nullable=False, default=0)
    waste_percentage = db.Column(db.Float, nullable=False, default=0)

    # Biggest contributor
    biggest_contributor = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'isDemo': self.is_demo,
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
                'wasteEmissions': round(self.waste_emissions, 2),
                'transportPercentage': round(self.transport_percentage, 1),
                'energyPercentage': round(self.energy_percentage, 1),
                'foodPercentage': round(self.food_percentage, 1),
                'wastePercentage': round(self.waste_percentage, 1),
                'biggestContributor': self.biggest_contributor
            }
        }

    def __repr__(self):
        return f'<CarbonCalculation {self.id} — {self.total_emissions} kg CO₂>'
