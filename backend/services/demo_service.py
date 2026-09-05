"""
CarbonLens — Demo Data Seeding Service
Seeds initial data for hackathon demonstration.
All demo data is clearly labelled as illustrative.
"""

from datetime import datetime, timezone, timedelta
from models import db
from models.challenge import Challenge
from models.notification import Notification
from services.badge_service import seed_default_badges
from services.campus_service import seed_demo_campus


def seed_all_demo_data():
    """Seed all demo data for the application."""
    seed_default_badges()
    seed_demo_campus()
    seed_demo_challenges()
    print("[INFO] Demo data seeded successfully.")


def seed_demo_challenges():
    """Seed demo challenges."""
    challenges = [
        {
            'name': 'Cycle Week Challenge',
            'description': 'Switch to cycling for your daily commute for one week. Track your reduced emissions and earn recognition!',
            'category': 'transport',
            'target_reduction_kg': 500,
            'status': 'active',
            'start_date': datetime.now(timezone.utc) - timedelta(days=3),
            'end_date': datetime.now(timezone.utc) + timedelta(days=4),
        },
        {
            'name': 'Public Transport Week',
            'description': 'Use public transport instead of personal vehicles for a week. Every bus/train ride counts!',
            'category': 'transport',
            'target_reduction_kg': 750,
            'status': 'active',
            'start_date': datetime.now(timezone.utc) - timedelta(days=1),
            'end_date': datetime.now(timezone.utc) + timedelta(days=6),
        },
        {
            'name': 'Energy Saving Challenge',
            'description': 'Reduce your electricity consumption by 15% this month. Switch off unused appliances and optimize AC usage.',
            'category': 'energy',
            'target_reduction_kg': 1000,
            'status': 'active',
            'start_date': datetime.now(timezone.utc) - timedelta(days=10),
            'end_date': datetime.now(timezone.utc) + timedelta(days=20),
        },
        {
            'name': 'Zero Waste Challenge',
            'description': 'Minimize waste generation and maximize recycling for two weeks. Target 80%+ recycling rate!',
            'category': 'waste',
            'target_reduction_kg': 300,
            'status': 'upcoming',
            'start_date': datetime.now(timezone.utc) + timedelta(days=7),
            'end_date': datetime.now(timezone.utc) + timedelta(days=21),
        },
        {
            'name': 'Plant-Based Week',
            'description': 'Try plant-based meals for a week. Discover delicious low-emission food options available on campus.',
            'category': 'food',
            'target_reduction_kg': 400,
            'status': 'completed',
            'start_date': datetime.now(timezone.utc) - timedelta(days=14),
            'end_date': datetime.now(timezone.utc) - timedelta(days=7),
        }
    ]

    for challenge_data in challenges:
        existing = Challenge.query.filter_by(name=challenge_data['name']).first()
        if not existing:
            challenge = Challenge(**challenge_data)
            db.session.add(challenge)

    db.session.commit()


def create_welcome_notifications(user_id):
    """Create welcome notifications for a new user."""
    notifications = [
        {
            'user_id': user_id,
            'title': 'Welcome to CarbonLens! 🌱',
            'message': 'Start by calculating your carbon footprint. It only takes a few minutes!',
            'notification_type': 'info'
        },
        {
            'user_id': user_id,
            'title': 'Try Demo Mode 🎯',
            'message': 'Use Demo Mode to see how CarbonLens works with sample data before entering your own.',
            'notification_type': 'info'
        },
        {
            'user_id': user_id,
            'title': 'Campus Challenges Available! 🏆',
            'message': 'Join campus sustainability challenges and compete with fellow students.',
            'notification_type': 'challenge'
        }
    ]

    for notif_data in notifications:
        notif = Notification(**notif_data)
        db.session.add(notif)

    db.session.commit()
