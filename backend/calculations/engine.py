"""
CarbonLens — Carbon Footprint Calculation Engine

This is the CORE calculation service. All emissions computations happen here.
No other part of the application should compute emissions directly.

Formula:
    Total CO₂ = Transport CO₂ + Energy CO₂ + Food CO₂ + Waste CO₂

All emission factors are retrieved from config/emission_factors.py (centralized).
"""

from config.emission_factors import (
    get_transport_factor,
    get_energy_factor,
    get_food_factor,
    get_waste_factor,
    get_recycling_reduction,
)


def calculate_transport_emissions(daily_distance_km, transport_mode, travel_days_per_month):
    """
    Calculate monthly transport CO₂ emissions.

    Formula: daily_distance × factor × travel_days_per_month
    """
    daily_distance_km = max(0, float(daily_distance_km or 0))
    travel_days_per_month = max(0, min(31, int(travel_days_per_month or 0)))
    factor = get_transport_factor(transport_mode)

    return round(daily_distance_km * factor * travel_days_per_month, 2)


def calculate_energy_emissions(monthly_electricity_kwh):
    """
    Calculate monthly energy CO₂ emissions.

    Formula: monthly_kwh × grid_emission_factor
    """
    monthly_electricity_kwh = max(0, float(monthly_electricity_kwh or 0))
    factor = get_energy_factor("electricity")

    return round(monthly_electricity_kwh * factor, 2)


def calculate_food_emissions(diet_type=None, food_emissions_kg_month=None):
    """
    Calculate monthly food CO₂ emissions.

    If food_emissions_kg_month is provided (pre-computed from quantity-based
    calculator), it is used directly. Otherwise falls back to per-diet-type
    monthly estimates from config. This keeps the function backward-compatible.
    """
    if food_emissions_kg_month is not None:
        return round(max(0.0, float(food_emissions_kg_month)), 2)
    if diet_type:
        return round(get_food_factor(diet_type), 2)
    return round(get_food_factor('regular'), 2)


def calculate_waste_emissions(daily_waste_kg, recycling_percentage):
    """
    Calculate monthly waste CO₂ emissions.

    Formula:
        base = daily_waste_kg × waste_factor × 30 (days)
        recycling_effect = recycling_percentage / 100 × recycling_reduction_factor
        monthly_waste = base × (1 - recycling_effect)

    Higher recycling → lower emissions.
    """
    daily_waste_kg = max(0, float(daily_waste_kg or 0))
    recycling_percentage = max(0, min(100, float(recycling_percentage or 0)))

    waste_factor = get_waste_factor()
    recycling_reduction = get_recycling_reduction()

    base_monthly = daily_waste_kg * waste_factor * 30
    recycling_effect = (recycling_percentage / 100) * recycling_reduction
    monthly_waste = base_monthly * (1 - recycling_effect)

    return round(monthly_waste, 2)


def calculate_percentages(transport, energy, food, waste, total):
    """Calculate category percentages of total emissions."""
    if total <= 0:
        return 0, 0, 0, 0

    transport_pct = round((transport / total) * 100, 1)
    energy_pct = round((energy / total) * 100, 1)
    food_pct = round((food / total) * 100, 1)
    waste_pct = round((waste / total) * 100, 1)

    return transport_pct, energy_pct, food_pct, waste_pct


def determine_biggest_contributor(transport, energy, food, waste):
    """Determine which category produces the most emissions."""
    categories = {
        'transport': transport,
        'energy': energy,
        'food': food,
        'waste': waste
    }
    return max(categories, key=categories.get)


def calculate_footprint(inputs):
    """
    Main calculation function. Takes user inputs and returns complete results.

    Args:
        inputs: dict with keys:
            - dailyDistanceKm
            - transportMode
            - travelDaysPerMonth
            - monthlyElectricityKwh
            - dietType
            - dailyWasteKg
            - recyclingPercentage

    Returns:
        dict with all emissions, percentages, and biggest contributor
    """
    # Extract and sanitize inputs
    daily_distance = inputs.get('dailyDistanceKm', 0)
    transport_mode = inputs.get('transportMode', 'car')
    travel_days = inputs.get('travelDaysPerMonth', 22)
    electricity = inputs.get('monthlyElectricityKwh', 0)
    diet_type = inputs.get('dietType', 'regular')
    daily_waste = inputs.get('dailyWasteKg', 0)
    recycling = inputs.get('recyclingPercentage', 0)
    # Optional: pre-computed food CO₂ from quantity-based calculator
    food_emissions_precomputed = inputs.get('foodEmissionsKgMonth', None)

    # Cap extreme values
    daily_distance = min(float(daily_distance), 1000)
    electricity = min(float(electricity), 100000)
    daily_waste = min(float(daily_waste), 100)

    # Calculate each category
    transport_emissions = calculate_transport_emissions(daily_distance, transport_mode, travel_days)
    energy_emissions = calculate_energy_emissions(electricity)
    food_emissions = calculate_food_emissions(
        diet_type=diet_type,
        food_emissions_kg_month=food_emissions_precomputed,
    )
    waste_emissions = calculate_waste_emissions(daily_waste, recycling)

    # Total
    total_emissions = round(transport_emissions + energy_emissions + food_emissions + waste_emissions, 2)

    # Percentages
    transport_pct, energy_pct, food_pct, waste_pct = calculate_percentages(
        transport_emissions, energy_emissions, food_emissions, waste_emissions, total_emissions
    )

    # Biggest contributor
    biggest = determine_biggest_contributor(
        transport_emissions, energy_emissions, food_emissions, waste_emissions
    )

    return {
        'totalEmissions': total_emissions,
        'transportEmissions': transport_emissions,
        'energyEmissions': energy_emissions,
        'foodEmissions': food_emissions,
        'wasteEmissions': waste_emissions,
        'transportPercentage': transport_pct,
        'energyPercentage': energy_pct,
        'foodPercentage': food_pct,
        'wastePercentage': waste_pct,
        'biggestContributor': biggest,
        'inputs': {
            'dailyDistanceKm': float(daily_distance),
            'transportMode': transport_mode,
            'travelDaysPerMonth': int(travel_days),
            'monthlyElectricityKwh': float(electricity),
            'dietType': diet_type,
            'dailyWasteKg': float(daily_waste),
            'recyclingPercentage': float(recycling)
        }
    }


def compare_scenarios(before_inputs, after_inputs):
    """
    Compare two scenarios and return the difference.
    Used by the What-If Simulator.
    """
    before = calculate_footprint(before_inputs)
    after = calculate_footprint(after_inputs)

    reduction = round(before['totalEmissions'] - after['totalEmissions'], 2)
    reduction_pct = 0
    if before['totalEmissions'] > 0:
        reduction_pct = round((reduction / before['totalEmissions']) * 100, 1)

    return {
        'before': before,
        'after': after,
        'reduction': reduction,
        'reductionPercentage': reduction_pct,
        'categoryChanges': {
            'transport': round(before['transportEmissions'] - after['transportEmissions'], 2),
            'energy': round(before['energyEmissions'] - after['energyEmissions'], 2),
            'food': round(before['foodEmissions'] - after['foodEmissions'], 2),
            'waste': round(before['wasteEmissions'] - after['wasteEmissions'], 2),
        }
    }
