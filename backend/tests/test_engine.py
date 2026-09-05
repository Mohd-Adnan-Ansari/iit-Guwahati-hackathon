"""
CarbonLens — Automated Unit & Integration Tests
Tests:
- Transport, Energy, Food, Waste calculation engine
- Recycling rate effect (20% vs 60%)
- Biggest contributor detection
- Personalized recommendation logic
- Scenario comparison for What-If simulator
- API endpoints (health, calculate, emission-factors)
"""

import os
import sys
import unittest

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from calculations.engine import (
    calculate_transport_emissions,
    calculate_energy_emissions,
    calculate_food_emissions,
    calculate_waste_emissions,
    calculate_footprint,
    compare_scenarios,
    determine_biggest_contributor
)
from calculations.recommendations import generate_recommendations
from app import create_app
from models import db
from models.user import User


class TestCalculationEngine(unittest.TestCase):

    def test_transport_emissions(self):
        # Car: 20 km/day, 22 days, factor 0.21 => 20 * 0.21 * 22 = 92.4
        emissions = calculate_transport_emissions(20, 'car', 22)
        self.assertEqual(emissions, 92.4)

        # Bicycle: 0 emissions
        bike_emissions = calculate_transport_emissions(20, 'bicycle', 22)
        self.assertEqual(bike_emissions, 0.0)

        # Walking: 0 emissions
        walk_emissions = calculate_transport_emissions(5, 'walking', 22)
        self.assertEqual(walk_emissions, 0.0)

    def test_energy_emissions(self):
        # 150 kWh * 0.82 = 123.0 kg
        emissions = calculate_energy_emissions(150)
        self.assertEqual(emissions, 123.0)

        # 0 kWh => 0 kg
        self.assertEqual(calculate_energy_emissions(0), 0.0)

    def test_food_emissions(self):
        # Regular: 150 kg
        self.assertEqual(calculate_food_emissions('regular'), 150.0)
        # Vegetarian: 95 kg
        self.assertEqual(calculate_food_emissions('vegetarian'), 95.0)
        # Plant-based: 60 kg
        self.assertEqual(calculate_food_emissions('mostly_plant_based'), 60.0)

    def test_waste_recycling_difference(self):
        # Rule: 20% recycling => higher emissions than 60% recycling
        # 2 kg/day * 0.5 * 30 days = 30 kg base
        # 20% recycling => 30 * (1 - 0.20 * 0.70) = 30 * 0.86 = 25.8 kg
        # 60% recycling => 30 * (1 - 0.60 * 0.70) = 30 * 0.58 = 17.4 kg
        waste_20 = calculate_waste_emissions(2.0, 20)
        waste_60 = calculate_waste_emissions(2.0, 60)

        self.assertGreater(waste_20, waste_60)
        self.assertEqual(waste_20, 25.8)
        self.assertEqual(waste_60, 17.4)

    def test_calculate_footprint_total(self):
        inputs = {
            'dailyDistanceKm': 20,
            'transportMode': 'car',
            'travelDaysPerMonth': 22,
            'monthlyElectricityKwh': 150,
            'dietType': 'regular',
            'dailyWasteKg': 2.0,
            'recyclingPercentage': 60
        }
        res = calculate_footprint(inputs)

        # Total = 92.4 + 123.0 + 150.0 + 17.4 = 382.8 kg CO2
        self.assertEqual(res['transportEmissions'], 92.4)
        self.assertEqual(res['energyEmissions'], 123.0)
        self.assertEqual(res['foodEmissions'], 150.0)
        self.assertEqual(res['wasteEmissions'], 17.4)
        self.assertEqual(res['totalEmissions'], 382.8)
        self.assertEqual(res['biggestContributor'], 'food')

    def test_biggest_contributor_detection(self):
        # Transport highest
        self.assertEqual(determine_biggest_contributor(200, 100, 50, 10), 'transport')
        # Energy highest
        self.assertEqual(determine_biggest_contributor(50, 250, 50, 10), 'energy')
        # Food highest
        self.assertEqual(determine_biggest_contributor(50, 100, 200, 10), 'food')
        # Waste highest
        self.assertEqual(determine_biggest_contributor(50, 10, 50, 150), 'waste')

    def test_personalized_recommendations(self):
        inputs = {
            'dailyDistanceKm': 50,
            'transportMode': 'car',
            'travelDaysPerMonth': 25,
            'monthlyElectricityKwh': 50,
            'dietType': 'mostly_plant_based',
            'dailyWasteKg': 0.5,
            'recyclingPercentage': 80
        }
        res = calculate_footprint(inputs)
        recs = generate_recommendations(res)

        self.assertEqual(recs['biggestContributor'], 'transport')
        # Should contain transport recommendations like public transport/cycling
        titles = [r['title'] for r in recs['recommendations']]
        self.assertTrue(any('Public Transport' in t or 'Cycling' in t for t in titles))

    def test_scenario_comparison(self):
        before = {
            'dailyDistanceKm': 20,
            'transportMode': 'car',
            'travelDaysPerMonth': 22,
            'monthlyElectricityKwh': 150,
            'dietType': 'regular',
            'dailyWasteKg': 2.0,
            'recyclingPercentage': 60
        }
        after = {
            'dailyDistanceKm': 20,
            'transportMode': 'bicycle',
            'travelDaysPerMonth': 22,
            'monthlyElectricityKwh': 100,
            'dietType': 'vegetarian',
            'dailyWasteKg': 1.0,
            'recyclingPercentage': 80
        }
        comp = compare_scenarios(before, after)
        self.assertGreater(comp['reduction'], 0)
        self.assertGreater(comp['reductionPercentage'], 0)
        self.assertEqual(comp['categoryChanges']['transport'], 92.4)


class TestApiIntegration(unittest.TestCase):

    def setUp(self):
        self.app = create_app('development')
        self.client = self.app.test_client()

    def test_health_check(self):
        res = self.client.get('/api/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data['status'], 'healthy')
        self.assertEqual(data['app'], 'CarbonLens')

    def test_emission_factors_transparency(self):
        res = self.client.get('/api/emission-factors')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('transport', data)
        self.assertIn('energy', data)
        self.assertIn('food', data)
        self.assertIn('waste', data)
        self.assertIn('disclaimer', data)

    def test_simulation_endpoint(self):
        payload = {
            'dailyDistanceKm': 20,
            'transportMode': 'bus',
            'travelDaysPerMonth': 22,
            'monthlyElectricityKwh': 120,
            'dietType': 'vegetarian',
            'dailyWasteKg': 1.5,
            'recyclingPercentage': 70
        }
        res = self.client.post('/api/calculations/simulate', json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('results', data)
        self.assertIn('recommendations', data)


if __name__ == '__main__':
    unittest.main()
