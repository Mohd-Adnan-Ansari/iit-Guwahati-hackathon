import React from 'react';
import { Car, Zap, Utensils, Trash2, CheckCircle } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Transport', icon: Car },
  { id: 2, name: 'Energy', icon: Zap },
  { id: 3, name: 'Food', icon: Utensils },
  { id: 4, name: 'Waste', icon: Trash2 },
  { id: 5, name: 'Calculate', icon: CheckCircle },
];

export default function ProgressBar({ currentStep, setStep }) {
  return (
    <div className="w-full">
      {/* Mobile step indicator */}
      <div className="sm:hidden flex items-center justify-between px-1 mb-3">
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
          Step {currentStep} of {STEPS.length}
        </span>
        <span className="text-xs font-bold text-emerald-700">
          {STEPS[currentStep - 1]?.name}
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step Nodes */}
        <div className="relative z-10 flex justify-between">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id <= currentStep) {
                    setStep(step.id);
                  }
                }}
                disabled={step.id > currentStep}
                className="flex flex-col items-center group focus:outline-none disabled:cursor-not-allowed"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md shadow-emerald-600/20 scale-105'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-white border border-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-xs hidden sm:block font-medium transition-colors ${
                    isCurrent
                      ? 'text-emerald-800 font-bold'
                      : isCompleted
                      ? 'text-slate-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
