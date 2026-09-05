"""
CarbonLens — Personalized Recommendation Engine

Generates action recommendations based on the user's ACTUAL data.
Different users with different biggest contributors get different recommendations.
"""


def get_transport_recommendations(emissions, percentage):
    """Recommendations when transport is a significant contributor."""
    recs = []
    if percentage > 30:
        recs.append({
            'title': 'Switch to Public Transport',
            'description': 'Using a bus instead of a car can reduce transport emissions by up to 75%.',
            'estimatedReduction': round(emissions * 0.60, 1),
            'priority': 'high',
            'category': 'transport',
            'icon': 'Bus'
        })
        recs.append({
            'title': 'Try Cycling or Walking',
            'description': 'For short distances, cycling or walking produces zero direct emissions.',
            'estimatedReduction': round(emissions * 0.80, 1),
            'priority': 'high',
            'category': 'transport',
            'icon': 'Bike'
        })
    if percentage > 15:
        recs.append({
            'title': 'Carpool with Peers',
            'description': 'Sharing rides with 2-3 people can cut your per-person transport emissions significantly.',
            'estimatedReduction': round(emissions * 0.40, 1),
            'priority': 'medium',
            'category': 'transport',
            'icon': 'Users'
        })
        recs.append({
            'title': 'Reduce Travel Days',
            'description': 'Working or studying from home 1-2 days a week can meaningfully lower your footprint.',
            'estimatedReduction': round(emissions * 0.20, 1),
            'priority': 'medium',
            'category': 'transport',
            'icon': 'Home'
        })
    return recs


def get_energy_recommendations(emissions, percentage):
    """Recommendations when energy is a significant contributor."""
    recs = []
    if percentage > 30:
        recs.append({
            'title': 'Switch Off Unused Appliances',
            'description': 'Phantom power consumption from devices on standby can add up significantly.',
            'estimatedReduction': round(emissions * 0.15, 1),
            'priority': 'high',
            'category': 'energy',
            'icon': 'Power'
        })
        recs.append({
            'title': 'Use Energy-Efficient Lighting',
            'description': 'LED bulbs use up to 80% less energy than incandescent bulbs.',
            'estimatedReduction': round(emissions * 0.10, 1),
            'priority': 'high',
            'category': 'energy',
            'icon': 'Lightbulb'
        })
    if percentage > 15:
        recs.append({
            'title': 'Optimize AC / Heating',
            'description': 'Setting AC to 24-26°C instead of lower temperatures can significantly reduce energy use.',
            'estimatedReduction': round(emissions * 0.20, 1),
            'priority': 'medium',
            'category': 'energy',
            'icon': 'Thermometer'
        })
        recs.append({
            'title': 'Use Natural Ventilation',
            'description': 'Opening windows and using fans instead of AC when weather permits.',
            'estimatedReduction': round(emissions * 0.25, 1),
            'priority': 'medium',
            'category': 'energy',
            'icon': 'Wind'
        })
    return recs


def get_food_recommendations(emissions, percentage):
    """Recommendations when food is a significant contributor."""
    recs = []
    if percentage > 30:
        recs.append({
            'title': 'Increase Plant-Based Meals',
            'description': 'Replacing 2-3 meat meals per week with plant-based alternatives can reduce food emissions.',
            'estimatedReduction': round(emissions * 0.30, 1),
            'priority': 'high',
            'category': 'food',
            'icon': 'Leaf'
        })
        recs.append({
            'title': 'Choose Local and Seasonal Foods',
            'description': 'Locally sourced, seasonal produce typically has a lower carbon footprint.',
            'estimatedReduction': round(emissions * 0.10, 1),
            'priority': 'medium',
            'category': 'food',
            'icon': 'MapPin'
        })
    if percentage > 15:
        recs.append({
            'title': 'Reduce Food Waste',
            'description': 'Plan meals and portions to minimize food that gets thrown away.',
            'estimatedReduction': round(emissions * 0.15, 1),
            'priority': 'medium',
            'category': 'food',
            'icon': 'Trash2'
        })
    return recs


def get_waste_recommendations(emissions, percentage, recycling_pct):
    """Recommendations when waste is a significant contributor."""
    recs = []
    if percentage > 20 or recycling_pct < 50:
        recs.append({
            'title': 'Increase Recycling',
            'description': f'You currently recycle {recycling_pct:.0f}% of your waste. Increasing this can directly reduce emissions.',
            'estimatedReduction': round(emissions * 0.30, 1),
            'priority': 'high',
            'category': 'waste',
            'icon': 'Recycle'
        })
    if percentage > 15:
        recs.append({
            'title': 'Compost Organic Waste',
            'description': 'Composting food scraps and garden waste prevents methane emissions from landfills.',
            'estimatedReduction': round(emissions * 0.20, 1),
            'priority': 'medium',
            'category': 'waste',
            'icon': 'Flower2'
        })
        recs.append({
            'title': 'Reduce Single-Use Items',
            'description': 'Use reusable bags, bottles, and containers to reduce overall waste generation.',
            'estimatedReduction': round(emissions * 0.15, 1),
            'priority': 'medium',
            'category': 'waste',
            'icon': 'ShoppingBag'
        })
    if recycling_pct < 30:
        recs.append({
            'title': 'Start Waste Segregation',
            'description': 'Separating dry and wet waste is the first step to effective recycling.',
            'estimatedReduction': round(emissions * 0.25, 1),
            'priority': 'high',
            'category': 'waste',
            'icon': 'ArrowDownUp'
        })
    return recs


def generate_recommendations(calculation_results):
    """
    Generate personalized recommendations based on actual calculation results.

    Args:
        calculation_results: dict from calculate_footprint()

    Returns:
        list of recommendation objects, sorted by priority
    """
    transport_e = calculation_results['transportEmissions']
    energy_e = calculation_results['energyEmissions']
    food_e = calculation_results['foodEmissions']
    waste_e = calculation_results['wasteEmissions']
    transport_pct = calculation_results['transportPercentage']
    energy_pct = calculation_results['energyPercentage']
    food_pct = calculation_results['foodPercentage']
    waste_pct = calculation_results['wastePercentage']
    recycling_pct = calculation_results.get('inputs', {}).get('recyclingPercentage', 0)
    biggest = calculation_results['biggestContributor']

    all_recs = []

    # Always get recommendations for the biggest contributor
    if biggest == 'transport' or transport_pct > 15:
        all_recs.extend(get_transport_recommendations(transport_e, transport_pct))
    if biggest == 'energy' or energy_pct > 15:
        all_recs.extend(get_energy_recommendations(energy_e, energy_pct))
    if biggest == 'food' or food_pct > 15:
        all_recs.extend(get_food_recommendations(food_e, food_pct))
    if biggest == 'waste' or waste_pct > 15:
        all_recs.extend(get_waste_recommendations(waste_e, waste_pct, recycling_pct))

    # Ensure we always have at least some recommendations
    if not all_recs:
        all_recs.extend(get_transport_recommendations(transport_e, 50))
        all_recs.extend(get_energy_recommendations(energy_e, 50))

    # Sort by priority
    priority_order = {'high': 0, 'medium': 1, 'low': 2}
    all_recs.sort(key=lambda r: priority_order.get(r.get('priority', 'low'), 2))

    # Add biggest contributor summary
    summary = {
        'biggestContributor': biggest,
        'biggestContributorEmissions': {
            'transport': transport_e,
            'energy': energy_e,
            'food': food_e,
            'waste': waste_e
        }[biggest],
        'biggestContributorPercentage': {
            'transport': transport_pct,
            'energy': energy_pct,
            'food': food_pct,
            'waste': waste_pct
        }[biggest],
        'explanation': _get_contributor_explanation(biggest),
        'recommendations': all_recs
    }

    return summary


def _get_contributor_explanation(category):
    """Get a short explanation for why a category might be the biggest contributor."""
    explanations = {
        'transport': (
            'Transportation is your biggest emission source. Daily commuting by '
            'personal vehicle over longer distances accumulates significant CO₂. '
            'Switching to lower-emission transport modes can make the largest impact.'
        ),
        'energy': (
            'Energy consumption is your biggest emission source. Electricity generation, '
            'especially from fossil fuel-heavy grids, contributes substantially to emissions. '
            'Reducing consumption and improving efficiency can help.'
        ),
        'food': (
            'Food choices are your biggest emission source. Diets with higher meat and dairy '
            'content typically have larger carbon footprints due to livestock emissions and '
            'supply chain impacts. Shifting toward more plant-based options can help.'
        ),
        'waste': (
            'Waste is your biggest emission source. Waste that goes to landfills generates '
            'methane, a potent greenhouse gas. Increasing recycling and reducing waste '
            'generation are effective strategies.'
        )
    }
    return explanations.get(category, 'Review all categories for reduction opportunities.')
