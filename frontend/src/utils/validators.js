/**
 * CarbonLens — Input validation utilities
 */

export function validatePositiveNumber(value, fieldName, max = null) {
  if (value === '' || value === null || value === undefined) {
    return `Please enter ${fieldName}.`;
  }
  const num = Number(value);
  if (isNaN(num)) {
    return `Please enter a valid number for ${fieldName}.`;
  }
  if (num < 0) {
    return `${fieldName} cannot be negative.`;
  }
  if (max !== null && num > max) {
    return `${fieldName} seems too high. Please enter a realistic value (max: ${max}).`;
  }
  return null;
}

export function validatePercentage(value, fieldName) {
  const error = validatePositiveNumber(value, fieldName, 100);
  if (error) return error;
  const num = Number(value);
  if (num > 100) {
    return `${fieldName} cannot exceed 100%.`;
  }
  return null;
}

export function sanitizeNumber(value, defaultValue = 0) {
  const num = Number(value);
  if (isNaN(num) || num < 0) return defaultValue;
  return num;
}

export const TRANSPORT_MODES = [
  { value: 'car', label: 'Car', icon: 'Car' },
  { value: 'motorcycle', label: 'Motorcycle', icon: 'Bike' },
  { value: 'bus', label: 'Bus', icon: 'Bus' },
  { value: 'train', label: 'Train', icon: 'Train' },
  { value: 'bicycle', label: 'Bicycle', icon: 'Bike' },
  { value: 'walking', label: 'Walking', icon: 'Footprints' },
  { value: 'other', label: 'Other', icon: 'HelpCircle' },
];

export const DIET_TYPES = [
  { value: 'regular', label: 'Regular (Mixed Diet)', description: 'Includes meat, dairy, and plant-based foods' },
  { value: 'vegetarian', label: 'Vegetarian', description: 'No meat or fish, includes dairy and eggs' },
  { value: 'mostly_plant_based', label: 'Mostly Plant-Based', description: 'Predominantly plant foods with minimal animal products' },
];

export const DEMO_VALUES = {
  dailyDistanceKm: 20,
  transportMode: 'car',
  travelDaysPerMonth: 22,
  monthlyElectricityKwh: 150,
  // Quantity-based food — typical Indian student diet
  dietType: 'quantity_based',
  food_rice: 250,
  food_roti_chapati: 3,
  food_bread: 0,
  food_oats: 40,
  food_potato: 80,
  food_tomato: 60,
  food_onion: 50,
  food_other_vegetables: 100,
  food_dal: 80,
  food_rajma: 0,
  food_chana: 30,
  food_other_legumes: 0,
  food_banana: 1,
  food_apple: 1,
  food_mango: 0,
  food_other_fruits: 50,
  food_chicken: 0,
  food_fish: 0,
  food_mutton: 0,
  food_other_meat: 0,
  food_egg: 1,
  food_milk: 300,
  food_curd_yogurt: 100,
  food_paneer: 30,
  food_cheese: 0,
  food_butter: 10,
  food_nuts: 20,
  food_packaged_processed: 30,
  food_other_food: 0,
  foodEmissionsKgMonth: 0,   // will be recomputed by FoodStep on mount
  dailyWasteKg: 2,
  recyclingPercentage: 60,
};
