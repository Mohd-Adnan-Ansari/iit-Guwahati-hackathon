"""
CarbonLens — Campus Analytics Service
Privacy-safe aggregation — never exposes individual user data.
"""

from datetime import datetime, timezone
from sqlalchemy import func
from models import db
from models.calculation import CarbonCalculation
from models.campus import Campus, CampusAggregate, University
from models.user import User


def get_campus_analytics(campus_id=None):
    """
    Get aggregated campus analytics.
    All data is aggregated — no individual user data is exposed.
    """
    query = db.session.query(
        func.count(func.distinct(CarbonCalculation.user_id)).label('total_participants'),
        func.avg(CarbonCalculation.total_emissions).label('avg_total'),
        func.avg(CarbonCalculation.transport_emissions).label('avg_transport'),
        func.avg(CarbonCalculation.energy_emissions).label('avg_energy'),
        func.avg(CarbonCalculation.food_emissions).label('avg_food'),
        func.avg(CarbonCalculation.waste_emissions).label('avg_waste'),
        func.sum(CarbonCalculation.total_emissions).label('total_campus')
    )

    if campus_id:
        query = query.join(User, CarbonCalculation.user_id == User.id) \
            .filter(User.campus_id == campus_id)

    result = query.first()

    participants = result.total_participants or 0

    if participants == 0:
        # Return illustrative demo data when no real data exists
        return _get_demo_campus_data()

    return {
        'totalParticipants': participants,
        'avgTotalEmissions': round(result.avg_total or 0, 2),
        'avgTransportEmissions': round(result.avg_transport or 0, 2),
        'avgEnergyEmissions': round(result.avg_energy or 0, 2),
        'avgFoodEmissions': round(result.avg_food or 0, 2),
        'avgWasteEmissions': round(result.avg_waste or 0, 2),
        'totalCampusEmissions': round(result.total_campus or 0, 2),
        'isIllustrative': participants < 10,  # Mark as illustrative if small sample
        'disclaimer': (
            'Aggregated data from all participants. '
            'No individual user data is exposed.'
        )
    }


def get_campus_trends(campus_id=None, months=6):
    """Get monthly trend data for campus analytics."""
    aggregates = CampusAggregate.query
    if campus_id:
        aggregates = aggregates.filter_by(campus_id=campus_id)

    aggregates = aggregates.order_by(CampusAggregate.period.desc()).limit(months).all()

    if not aggregates:
        return _get_demo_trends()

    return [a.to_dict() for a in reversed(aggregates)]


def _get_demo_campus_data():
    """
    Illustrative campus data for demonstration purposes.
    ⚠️ CLEARLY LABELLED AS DEMO DATA — NOT REAL MEASUREMENTS.
    """
    return {
        'totalParticipants': 1250,
        'avgTotalEmissions': 285.50,
        'avgTransportEmissions': 92.40,
        'avgEnergyEmissions': 123.00,
        'avgFoodEmissions': 95.00,
        'avgWasteEmissions': 21.00,
        'totalCampusEmissions': 356875.00,
        'isIllustrative': True,
        'disclaimer': (
            '⚠️ ILLUSTRATIVE CAMPUS DATA ONLY. '
            'These numbers are simulated for demonstration purposes. '
            'They do not represent actual measurements from any institution.'
        )
    }


def _get_demo_trends():
    """Illustrative monthly trends for demonstration."""
    return [
        {'period': '2026-04', 'totalParticipants': 980, 'avgTotalEmissions': 310.0, 'isIllustrative': True},
        {'period': '2026-05', 'totalParticipants': 1050, 'avgTotalEmissions': 302.0, 'isIllustrative': True},
        {'period': '2026-06', 'totalParticipants': 1120, 'avgTotalEmissions': 295.0, 'isIllustrative': True},
        {'period': '2026-07', 'totalParticipants': 1180, 'avgTotalEmissions': 290.0, 'isIllustrative': True},
        {'period': '2026-08', 'totalParticipants': 1220, 'avgTotalEmissions': 287.0, 'isIllustrative': True},
        {'period': '2026-09', 'totalParticipants': 1250, 'avgTotalEmissions': 285.5, 'isIllustrative': True},
    ]


def seed_demo_campus():
    """Seed demo university and campus data."""
    uni = University.query.filter_by(name='IIT Guwahati').first()
    if not uni:
        uni = University(name='IIT Guwahati', country='India', state='Assam')
        db.session.add(uni)
        db.session.flush()

    campus = Campus.query.filter_by(name='Main Campus', university_id=uni.id).first()
    if not campus:
        campus = Campus(
            university_id=uni.id,
            name='Main Campus',
            location='Guwahati, Assam'
        )
        db.session.add(campus)

    db.session.commit()
    return campus
