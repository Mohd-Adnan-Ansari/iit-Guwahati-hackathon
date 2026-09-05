/**
 * CarbonLens — Number and display formatters
 */

export function formatCO2(value) {
  if (value === null || value === undefined) return '0.0';
  return Number(value).toFixed(1);
}

export function formatPercentage(value) {
  if (value === null || value === undefined) return '0';
  return Number(value).toFixed(1);
}

export function formatNumber(value) {
  if (value === null || value === undefined) return '0';
  return Number(value).toLocaleString('en-IN');
}

export function getCategoryColor(category) {
  const colors = {
    transport: '#3b82f6',
    energy: '#f59e0b',
    food: '#10b981',
    waste: '#ef4444',
  };
  return colors[category] || '#6b7280';
}

export function getCategoryGradient(category) {
  const gradients = {
    transport: 'from-blue-500 to-blue-600',
    energy: 'from-amber-500 to-amber-600',
    food: 'from-emerald-500 to-emerald-600',
    waste: 'from-red-500 to-red-600',
  };
  return gradients[category] || 'from-gray-500 to-gray-600';
}

export function getCategoryIcon(category) {
  const icons = {
    transport: 'Car',
    energy: 'Zap',
    food: 'Utensils',
    waste: 'Trash2',
  };
  return icons[category] || 'Circle';
}

export function getCategoryLabel(category) {
  const labels = {
    transport: 'Transport',
    energy: 'Energy',
    food: 'Food',
    waste: 'Waste',
  };
  return labels[category] || category;
}

export function getTrendIcon(trend) {
  if (trend === 'decreasing') return '↓';
  if (trend === 'increasing') return '↑';
  return '→';
}

export function getTrendColor(trend) {
  if (trend === 'decreasing') return 'text-emerald-400';
  if (trend === 'increasing') return 'text-red-400';
  return 'text-gray-400';
}

export function getTrendLabel(trend) {
  if (trend === 'decreasing') return 'Decreasing';
  if (trend === 'increasing') return 'Increasing';
  return 'Stable';
}
