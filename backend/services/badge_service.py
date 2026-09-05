"""
CarbonLens — Badge Award Service
Checks and awards badges based on user activity.
"""

from models import db
from models.badge import Badge, UserBadge
from models.calculation import CarbonCalculation


def check_and_award_badges(user_id):
    """
    Check user activity and award any earned badges.
    Called after each calculation.
    """
    awarded = []

    calculations = CarbonCalculation.query.filter_by(user_id=user_id).all()
    calc_count = len(calculations)

    # Badge: First Calculation
    if calc_count >= 1:
        awarded += _try_award(user_id, 'First Calculation')

    # Badge: Consistent Tracker (5+ calculations)
    if calc_count >= 5:
        awarded += _try_award(user_id, 'Consistent Tracker')

    # Badge: Data Champion (10+ calculations)
    if calc_count >= 10:
        awarded += _try_award(user_id, 'Data Champion')

    if calc_count >= 2:
        sorted_calcs = sorted(calculations, key=lambda c: c.created_at)
        latest = sorted_calcs[-1]
        previous = sorted_calcs[-2]

        if previous.total_emissions > 0:
            reduction_pct = ((previous.total_emissions - latest.total_emissions) / previous.total_emissions) * 100

            # Badge: 10% Reduction
            if reduction_pct >= 10:
                awarded += _try_award(user_id, '10% Reduction')

            # Badge: 25% Reduction
            if reduction_pct >= 25:
                awarded += _try_award(user_id, '25% Reduction')

        # Badge: Eco Transport
        if latest.transport_mode in ('bicycle', 'walking'):
            awarded += _try_award(user_id, 'Eco Transport')

        # Badge: Recycling Champion
        if latest.recycling_percentage >= 70:
            awarded += _try_award(user_id, 'Recycling Champion')

        # Badge: Plant Power
        if latest.diet_type in ('vegetarian', 'mostly_plant_based'):
            awarded += _try_award(user_id, 'Plant Power')

    elif calc_count == 1:
        latest = calculations[0]
        if latest.transport_mode in ('bicycle', 'walking'):
            awarded += _try_award(user_id, 'Eco Transport')
        if latest.recycling_percentage >= 70:
            awarded += _try_award(user_id, 'Recycling Champion')
        if latest.diet_type in ('vegetarian', 'mostly_plant_based'):
            awarded += _try_award(user_id, 'Plant Power')

    return awarded


def _try_award(user_id, badge_name):
    """Try to award a badge if the user doesn't already have it."""
    badge = Badge.query.filter_by(name=badge_name).first()
    if not badge:
        return []

    existing = UserBadge.query.filter_by(user_id=user_id, badge_id=badge.id).first()
    if existing:
        return []

    user_badge = UserBadge(user_id=user_id, badge_id=badge.id)
    db.session.add(user_badge)
    db.session.commit()

    return [badge.to_dict()]


def get_user_badges(user_id):
    """Get all badges for a user, including unearned ones."""
    all_badges = Badge.query.all()
    earned_ids = set(
        ub.badge_id for ub in UserBadge.query.filter_by(user_id=user_id).all()
    )

    result = []
    for badge in all_badges:
        badge_dict = badge.to_dict()
        badge_dict['earned'] = badge.id in earned_ids
        result.append(badge_dict)

    return result


def seed_default_badges():
    """Create default badges if they don't exist."""
    defaults = [
        {
            'name': 'First Calculation',
            'description': 'Completed your first carbon footprint calculation!',
            'icon': 'Calculator',
            'category': 'general',
            'criteria': 'Complete 1 calculation'
        },
        {
            'name': 'Consistent Tracker',
            'description': 'Tracked your footprint 5 times. Consistency is key!',
            'icon': 'TrendingUp',
            'category': 'general',
            'criteria': 'Complete 5 calculations'
        },
        {
            'name': 'Data Champion',
            'description': 'Completed 10 calculations. You\'re a data champion!',
            'icon': 'Award',
            'category': 'general',
            'criteria': 'Complete 10 calculations'
        },
        {
            'name': '10% Reduction',
            'description': 'Reduced your footprint by 10% compared to your previous calculation!',
            'icon': 'ArrowDown',
            'category': 'general',
            'criteria': '10% reduction vs previous'
        },
        {
            'name': '25% Reduction',
            'description': 'Amazing! 25% reduction achieved!',
            'icon': 'Star',
            'category': 'general',
            'criteria': '25% reduction vs previous'
        },
        {
            'name': 'Eco Transport',
            'description': 'Chose bicycle or walking as your transport mode!',
            'icon': 'Bike',
            'category': 'transport',
            'criteria': 'Use bicycle or walking'
        },
        {
            'name': 'Recycling Champion',
            'description': 'Recycling 70% or more of your waste!',
            'icon': 'Recycle',
            'category': 'waste',
            'criteria': '70%+ recycling rate'
        },
        {
            'name': 'Plant Power',
            'description': 'Following a vegetarian or plant-based diet!',
            'icon': 'Leaf',
            'category': 'food',
            'criteria': 'Vegetarian or plant-based diet'
        }
    ]

    for badge_data in defaults:
        existing = Badge.query.filter_by(name=badge_data['name']).first()
        if not existing:
            badge = Badge(**badge_data)
            db.session.add(badge)

    db.session.commit()
