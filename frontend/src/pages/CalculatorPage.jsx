import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/calculator/ProgressBar';
import TransportStep from '../components/calculator/TransportStep';
import EnergyStep from '../components/calculator/EnergyStep';
import FoodStep from '../components/calculator/FoodStep';
import WasteStep from '../components/calculator/WasteStep';
import ReviewStep from '../components/calculator/ReviewStep';
import { DEMO_VALUES, validatePositiveNumber, validatePercentage } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Calculator } from 'lucide-react';

export default function CalculatorPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [serverError, setServerError] = useState('');

  const [formData, setFormData] = useState({
    dailyDistanceKm: '',
    transportMode: 'car',
    travelDaysPerMonth: '',
    monthlyElectricityKwh: '',
    dietType: 'quantity_based',
    // Food item quantities (all optional, default 0)
    food_rice: '',
    food_roti_chapati: '',
    food_bread: '',
    food_oats: '',
    food_potato: '',
    food_tomato: '',
    food_onion: '',
    food_other_vegetables: '',
    food_dal: '',
    food_rajma: '',
    food_chana: '',
    food_other_legumes: '',
    food_banana: '',
    food_apple: '',
    food_mango: '',
    food_other_fruits: '',
    food_chicken: '',
    food_fish: '',
    food_mutton: '',
    food_other_meat: '',
    food_egg: '',
    food_milk: '',
    food_curd_yogurt: '',
    food_paneer: '',
    food_cheese: '',
    food_butter: '',
    food_nuts: '',
    food_packaged_processed: '',
    food_other_food: '',
    foodEmissionsKgMonth: 0,
    dailyWasteKg: '',
    recyclingPercentage: 0,
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleLoadDemo = () => {
    setFormData(DEMO_VALUES);
    setIsDemo(true);
    setErrors({});
    setServerError('');
  };

  const handleReset = () => {
    setFormData({
      dailyDistanceKm: '',
      transportMode: 'car',
      travelDaysPerMonth: '',
      monthlyElectricityKwh: '',
      dietType: 'quantity_based',
      // Reset all food fields
      food_rice: '',
      food_roti_chapati: '',
      food_bread: '',
      food_oats: '',
      food_potato: '',
      food_tomato: '',
      food_onion: '',
      food_other_vegetables: '',
      food_dal: '',
      food_rajma: '',
      food_chana: '',
      food_other_legumes: '',
      food_banana: '',
      food_apple: '',
      food_mango: '',
      food_other_fruits: '',
      food_chicken: '',
      food_fish: '',
      food_mutton: '',
      food_other_meat: '',
      food_egg: '',
      food_milk: '',
      food_curd_yogurt: '',
      food_paneer: '',
      food_cheese: '',
      food_butter: '',
      food_nuts: '',
      food_packaged_processed: '',
      food_other_food: '',
      foodEmissionsKgMonth: 0,
      dailyWasteKg: '',
      recyclingPercentage: 0,
    });
    setIsDemo(false);
    setErrors({});
    setServerError('');
    setCurrentStep(1);
  };

  const validateStep = (step) => {
    const stepErrors = {};

    if (step === 1) {
      const distErr = validatePositiveNumber(formData.dailyDistanceKm, 'daily travel distance', 1000);
      if (distErr) stepErrors.dailyDistanceKm = distErr;

      const daysErr = validatePositiveNumber(formData.travelDaysPerMonth, 'commute days', 31);
      if (daysErr) stepErrors.travelDaysPerMonth = daysErr;
    } else if (step === 2) {
      const kwhErr = validatePositiveNumber(formData.monthlyElectricityKwh, 'monthly electricity', 100000);
      if (kwhErr) stepErrors.monthlyElectricityKwh = kwhErr;
    } else if (step === 3) {
      // All food fields are optional (empty = 0). Only reject negatives.
      const FOOD_ITEM_KEYS = [
        'food_rice','food_roti_chapati','food_bread','food_oats',
        'food_potato','food_tomato','food_onion','food_other_vegetables',
        'food_dal','food_rajma','food_chana','food_other_legumes',
        'food_banana','food_apple','food_mango','food_other_fruits',
        'food_chicken','food_fish','food_mutton','food_other_meat',
        'food_egg','food_milk','food_curd_yogurt','food_paneer',
        'food_cheese','food_butter','food_nuts','food_packaged_processed','food_other_food',
      ];
      for (const key of FOOD_ITEM_KEYS) {
        const v = formData[key];
        if (v !== '' && v !== null && v !== undefined) {
          const num = parseFloat(v);
          if (!isNaN(num) && num < 0) {
            stepErrors[key] = 'Value cannot be negative.';
          }
        }
      }
    } else if (step === 4) {
      const wasteErr = validatePositiveNumber(formData.dailyWasteKg, 'daily waste', 100);
      if (wasteErr) stepErrors.dailyWasteKg = wasteErr;

      const recErr = validatePercentage(formData.recyclingPercentage, 'recycling percentage');
      if (recErr) stepErrors.recyclingPercentage = recErr;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        return;
      }
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      if (isAuthenticated) {
        const res = await api.post('/calculations', {
          ...formData,
          isDemo,
        });
        navigate('/dashboard', { state: { latestResult: res.data } });
      } else {
        const res = await api.post('/calculations/simulate', formData);
        sessionStorage.setItem('guest_calculation', JSON.stringify(res.data));
        navigate('/dashboard', { state: { guestResult: res.data } });
      }
    } catch (err) {
      setServerError(err.friendlyMessage || err.response?.data?.error || 'Failed to process calculation. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      {/* Ambient background blob */}
      <div
        className="fixed top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 65%)', filter: 'blur(2px)' }}
      />

      {/* Top Header with Demo Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Step-By-Step Assessment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Campus Carbon Footprint Calculator
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadDemo}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold badge-3d text-emerald-800 btn-3d-secondary"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Load Demo Values</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 btn-3d-secondary transition-colors"
            title="Reset form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Container — glassmorphism */}
      <div
        className="p-6 rounded-2xl mb-6"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.75)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 12px 32px -8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        <ProgressBar currentStep={currentStep} setStep={setCurrentStep} />
      </div>

      {/* Main Wizard Form Container — glassmorphism */}
      <div
        className="p-6 sm:p-8 rounded-3xl relative"
        style={{
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.80)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 8px 10px rgba(0,0,0,0.03), 0 24px 60px -10px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(52,211,153,0.08)',
        }}
      >
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {serverError}
          </div>
        )}

        {/* Wizard Steps */}
        {currentStep === 1 && (
          <TransportStep values={formData} onChange={handleFieldChange} errors={errors} />
        )}
        {currentStep === 2 && (
          <EnergyStep values={formData} onChange={handleFieldChange} errors={errors} />
        )}
        {currentStep === 3 && (
          <FoodStep values={formData} onChange={handleFieldChange} errors={errors} />
        )}
        {currentStep === 4 && (
          <WasteStep values={formData} onChange={handleFieldChange} errors={errors} />
        )}
        {currentStep === 5 && (
          <ReviewStep
            values={formData}
            setStep={setCurrentStep}
            isSubmitting={isSubmitting}
            isDemo={isDemo}
          />
        )}

        {/* Controls */}
        <div className="mt-10 pt-6 border-t border-slate-100/80 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 btn-3d-secondary"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white btn-3d-primary"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-black text-white btn-3d-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-4 h-4" />
                <span>{isSubmitting ? 'Calculating Footprint...' : 'Calculate My Footprint'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
