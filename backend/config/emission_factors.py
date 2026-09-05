"""
CarbonLens — Centralized Emission Factor Configuration

⚠️  IMPORTANT: All emission factors in this file are ILLUSTRATIVE / DEMO values.
    They are NOT official government or institutional measurements.
    Before real-world deployment, these must be replaced with verified data from
    credible sources such as:
    - CEA (Central Electricity Authority) grid emission factors for India
    - FAO / IPCC datasets for food emissions
    - Standard transport emission factor databases
    - Country-specific waste emission factors

    The architecture supports per-campus, per-country configuration and
    future integration of verified data sources.
"""

# ──────────────────────────────────────────────
# TRANSPORT EMISSION FACTORS
# Unit: kg CO₂ per km
# ──────────────────────────────────────────────
TRANSPORT_FACTORS = {
    "car": {
        "factor": 0.21,
        "unit": "kg CO₂/km",
        "source": "Illustrative estimate based on average passenger car",
        "verified": False,
        "notes": "Assumes average sedan, single occupant"
    },
    "motorcycle": {
        "factor": 0.11,
        "unit": "kg CO₂/km",
        "source": "Illustrative estimate based on average motorcycle",
        "verified": False,
        "notes": "Assumes average 150cc motorcycle"
    },
    "bus": {
        "factor": 0.05,
        "unit": "kg CO₂/km",
        "source": "Illustrative estimate based on average bus per passenger",
        "verified": False,
        "notes": "Per-passenger estimate assuming average occupancy"
    },
    "train": {
        "factor": 0.03,
        "unit": "kg CO₂/km",
        "source": "Illustrative estimate based on average train per passenger",
        "verified": False,
        "notes": "Per-passenger estimate for commuter rail"
    },
    "bicycle": {
        "factor": 0.0,
        "unit": "kg CO₂/km",
        "source": "Zero direct emissions",
        "verified": True,
        "notes": "No direct CO₂ emissions"
    },
    "walking": {
        "factor": 0.0,
        "unit": "kg CO₂/km",
        "source": "Zero direct emissions",
        "verified": True,
        "notes": "No direct CO₂ emissions"
    },
    "other": {
        "factor": 0.15,
        "unit": "kg CO₂/km",
        "source": "Illustrative average estimate",
        "verified": False,
        "notes": "Generic estimate for unspecified transport"
    }
}

# ──────────────────────────────────────────────
# ENERGY / ELECTRICITY EMISSION FACTORS
# Unit: kg CO₂ per kWh
# ──────────────────────────────────────────────
ENERGY_FACTORS = {
    "electricity": {
        "factor": 0.82,
        "unit": "kg CO₂/kWh",
        "source": "Illustrative estimate inspired by Indian grid average",
        "verified": False,
        "notes": (
            "India's actual grid emission factor varies by region and year. "
            "CEA publishes verified CO₂ Baseline Database annually. "
            "Replace with verified CEA value for production use."
        ),
        "country": "IN",
        "region": "National Average"
    }
}

# ──────────────────────────────────────────────
# FOOD EMISSION FACTORS
# Unit: kg CO₂ per month (estimated dietary footprint)
# ──────────────────────────────────────────────
FOOD_FACTORS = {
    "regular": {
        "factor": 150.0,
        "unit": "kg CO₂/month",
        "source": "Illustrative estimate for mixed diet including meat",
        "verified": False,
        "notes": (
            "Assumes a typical mixed diet with regular meat consumption. "
            "Actual values depend on specific foods, quantities, and sourcing. "
            "Future versions should integrate FAO/IPCC per-food-item data."
        )
    },
    "vegetarian": {
        "factor": 95.0,
        "unit": "kg CO₂/month",
        "source": "Illustrative estimate for lacto-vegetarian diet",
        "verified": False,
        "notes": (
            "Assumes lacto-vegetarian diet common in India. "
            "Includes dairy but no meat, poultry, or fish."
        )
    },
    "mostly_plant_based": {
        "factor": 60.0,
        "unit": "kg CO₂/month",
        "source": "Illustrative estimate for mostly plant-based diet",
        "verified": False,
        "notes": (
            "Assumes predominantly plant-based diet with minimal dairy. "
            "Lowest estimated food emissions category."
        )
    }
}

# ──────────────────────────────────────────────
# FOOD ITEM-LEVEL EMISSION FACTORS  (Quantity-Based Calculator)
# ──────────────────────────────────────────────
# Units vary per item (see each entry).
# All values are ILLUSTRATIVE ESTIMATES calibrated to be broadly consistent
# with the diet-level FOOD_FACTORS benchmarks above.
# Sources: Illustrative, inspired by Poore & Nemecek (2018) lifecycle data,
# FAO food emission guidance, and IPCC AR6 food system estimates.
# MUST be replaced with verified peer-reviewed data for production use.
# ──────────────────────────────────────────────
FOOD_ITEM_FACTORS = {
    # ── Grains ──────────────────────────────────
    # Unit: kg CO₂ per gram consumed per day  →  multiply by 30 for monthly
    "rice": {
        "factor": 0.0027,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Grains",
        "source": "Illustrative; inspired by rice cultivation LCA (methane-intensive)",
        "verified": False,
    },
    "roti_chapati": {
        "factor": 0.050,
        "unit": "kg CO₂/(piece/day)",
        "display_unit": "pieces/day",
        "category": "Grains",
        "source": "Illustrative; ~30g wheat flour per roti, wheat LCA estimate",
        "verified": False,
    },
    "bread": {
        "factor": 0.0015,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Grains",
        "source": "Illustrative; processed wheat bread LCA estimate",
        "verified": False,
    },
    "oats": {
        "factor": 0.0012,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Grains",
        "source": "Illustrative; oat grain LCA estimate",
        "verified": False,
    },
    # ── Vegetables ───────────────────────────────
    "potato": {
        "factor": 0.00046,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Vegetables",
        "source": "Illustrative; root vegetable LCA estimate",
        "verified": False,
    },
    "tomato": {
        "factor": 0.00060,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Vegetables",
        "source": "Illustrative; field-grown tomato LCA estimate",
        "verified": False,
    },
    "onion": {
        "factor": 0.00050,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Vegetables",
        "source": "Illustrative; bulb vegetable LCA estimate",
        "verified": False,
    },
    "other_vegetables": {
        "factor": 0.00055,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Vegetables",
        "source": "Illustrative; average mixed vegetable LCA estimate",
        "verified": False,
    },
    # ── Pulses / Legumes ─────────────────────────
    "dal": {
        "factor": 0.0016,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Pulses",
        "source": "Illustrative; lentil/dal LCA estimate (N2O emissions from soil)",
        "verified": False,
    },
    "rajma": {
        "factor": 0.0018,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Pulses",
        "source": "Illustrative; kidney bean LCA estimate",
        "verified": False,
    },
    "chana": {
        "factor": 0.0017,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Pulses",
        "source": "Illustrative; chickpea LCA estimate",
        "verified": False,
    },
    "other_legumes": {
        "factor": 0.0016,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Pulses",
        "source": "Illustrative; average legume LCA estimate",
        "verified": False,
    },
    # ── Fruits ───────────────────────────────────
    "banana": {
        "factor": 0.080,
        "unit": "kg CO₂/(piece/day)",
        "display_unit": "pieces/day",
        "category": "Fruits",
        "source": "Illustrative; ~120g banana, tropical fruit LCA estimate",
        "verified": False,
    },
    "apple": {
        "factor": 0.090,
        "unit": "kg CO₂/(piece/day)",
        "display_unit": "pieces/day",
        "category": "Fruits",
        "source": "Illustrative; ~150g apple, temperate fruit LCA estimate",
        "verified": False,
    },
    "mango": {
        "factor": 0.120,
        "unit": "kg CO₂/(piece/day)",
        "display_unit": "pieces/day",
        "category": "Fruits",
        "source": "Illustrative; ~200g mango, tropical drupe LCA estimate",
        "verified": False,
    },
    "other_fruits": {
        "factor": 0.00070,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Fruits",
        "source": "Illustrative; average mixed fruit LCA estimate",
        "verified": False,
    },
    # ── Non-Veg ──────────────────────────────────
    "chicken": {
        "factor": 0.0069,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Non-Veg",
        "source": "Illustrative; poultry LCA estimate",
        "verified": False,
    },
    "fish": {
        "factor": 0.0050,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Non-Veg",
        "source": "Illustrative; farmed/wild-caught fish average LCA estimate",
        "verified": False,
    },
    "mutton": {
        "factor": 0.0390,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Non-Veg",
        "source": "Illustrative; ruminant meat (sheep/goat) LCA estimate",
        "verified": False,
    },
    "other_meat": {
        "factor": 0.0150,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Non-Veg",
        "source": "Illustrative; average mixed meat LCA estimate",
        "verified": False,
    },
    # ── Other / Dairy & Misc ─────────────────────
    "egg": {
        "factor": 0.196,
        "unit": "kg CO₂/(piece/day)",
        "display_unit": "pieces/day",
        "category": "Other",
        "source": "Illustrative; ~60g egg, poultry egg LCA estimate",
        "verified": False,
    },
    "milk": {
        "factor": 0.00094,
        "unit": "kg CO₂/(ml/day)",
        "display_unit": "ml/day",
        "category": "Other",
        "source": "Illustrative; bovine milk LCA estimate (~0.94 kg CO₂/L)",
        "verified": False,
    },
    "curd_yogurt": {
        "factor": 0.00080,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; fermented dairy LCA estimate",
        "verified": False,
    },
    "paneer": {
        "factor": 0.0040,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; fresh cheese/paneer LCA estimate",
        "verified": False,
    },
    "cheese": {
        "factor": 0.0138,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; aged cheese LCA estimate",
        "verified": False,
    },
    "butter": {
        "factor": 0.0120,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; dairy butter LCA estimate",
        "verified": False,
    },
    "nuts": {
        "factor": 0.0028,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; mixed nuts LCA estimate",
        "verified": False,
    },
    "packaged_processed": {
        "factor": 0.0035,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; ultra-processed food average LCA estimate",
        "verified": False,
    },
    "other_food": {
        "factor": 0.0020,
        "unit": "kg CO₂/(g/day)",
        "display_unit": "grams/day",
        "category": "Other",
        "source": "Illustrative; generic food average LCA estimate",
        "verified": False,
    },
}

# ──────────────────────────────────────────────
# WASTE EMISSION FACTORS
# Unit: kg CO₂ per kg of waste
# ──────────────────────────────────────────────
WASTE_FACTORS = {
    "general_waste": {
        "factor": 0.5,
        "unit": "kg CO₂/kg waste",
        "source": "Illustrative estimate for mixed municipal solid waste",
        "verified": False,
        "notes": (
            "Assumes average Indian municipal solid waste composition. "
            "Actual emissions depend on waste composition, disposal method, "
            "and local infrastructure."
        )
    },
    "recycling_reduction": {
        "factor": 0.7,
        "unit": "reduction multiplier (0-1)",
        "source": "Illustrative estimate for recycling emission reduction",
        "verified": False,
        "notes": (
            "Represents the maximum proportion of waste emissions that can "
            "be avoided through recycling. At 100% recycling, emissions are "
            "reduced by this factor. At 0% recycling, no reduction is applied."
        )
    }
}

# ──────────────────────────────────────────────
# DEMO / DEFAULT VALUES
# Used for Demo Mode and pre-filling calculator
# ──────────────────────────────────────────────
DEMO_VALUES = {
    "transport": {
        "daily_distance_km": 20,
        "transport_mode": "car",
        "travel_days_per_month": 22
    },
    "energy": {
        "monthly_electricity_kwh": 150
    },
    "food": {
        "diet_type": "regular"
    },
    "waste": {
        "daily_waste_kg": 2.0,
        "recycling_percentage": 60
    }
}


def get_transport_factor(mode: str) -> float:
    """Get transport emission factor for a given mode."""
    mode_lower = mode.lower().strip()
    if mode_lower in TRANSPORT_FACTORS:
        return TRANSPORT_FACTORS[mode_lower]["factor"]
    return TRANSPORT_FACTORS["other"]["factor"]


def get_energy_factor(energy_type: str = "electricity") -> float:
    """Get energy emission factor."""
    return ENERGY_FACTORS.get(energy_type, ENERGY_FACTORS["electricity"])["factor"]


def get_food_factor(diet_type: str) -> float:
    """Get food emission factor for a given diet type."""
    diet_lower = diet_type.lower().strip().replace("-", "_").replace(" ", "_")
    if diet_lower in FOOD_FACTORS:
        return FOOD_FACTORS[diet_lower]["factor"]
    return FOOD_FACTORS["regular"]["factor"]


def get_food_item_factor(item_key: str) -> float:
    """Get per-item food emission factor. Returns 0.0 if item key is unknown (safe fallback)."""
    item = FOOD_ITEM_FACTORS.get(item_key.lower().strip())
    if item is None:
        return 0.0
    return item["factor"]


def get_waste_factor() -> float:
    """Get general waste emission factor."""
    return WASTE_FACTORS["general_waste"]["factor"]


def get_recycling_reduction() -> float:
    """Get recycling reduction multiplier."""
    return WASTE_FACTORS["recycling_reduction"]["factor"]


def get_all_factors():
    """Return all emission factors as a dictionary for API responses."""
    return {
        "transport": TRANSPORT_FACTORS,
        "energy": ENERGY_FACTORS,
        "food": FOOD_FACTORS,
        "waste": WASTE_FACTORS,
        "disclaimer": (
            "All emission factors marked as 'verified: false' are illustrative "
            "estimates for demonstration purposes only. They must be replaced "
            "with verified data from credible sources before production deployment."
        )
    }
