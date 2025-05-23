
export type BaselineAnswers = {
  commute: { mode: string; distance: number }; // km/day
  electricity: number; // kWh/month
  water: number; // liters/day
  meat: string; // 'never', 'rarely', 'sometimes', 'often'
  flights: number; // per year
};

export type DailyEntry = {
  date: string;
  transport: { mode: string; distance: number };
  electricity: number;
  water: number;
  meal: string; // veg/non-veg
  extras: string[];
};

export const MEAT_FACTORS: Record<string, number> = {
  never: 0.1,
  rarely: 0.4,
  sometimes: 0.7,
  often: 1.2,
};

export const MEAL_FACTORS: Record<string, number> = {
  veg: 0.5,
  "non-veg": 2.5,
};

// Simple emission factors (tons CO2e/unit)
export function calculateBaselineEmissions(answers: BaselineAnswers) {
  const commuteEmission = answers.commute.mode === "car" ? answers.commute.distance * 0.2 * 260 : answers.commute.distance * 0.04 * 260; // per year
  const electricityEmission = answers.electricity * 0.42 * 12; // kg/kWh per month * 12
  const waterEmission = answers.water * 0.0003 * 365;
  const meatEmission = MEAT_FACTORS[answers.meat] * 365;
  const flightEmission = answers.flights * 200; // avg short flight 200kg CO2

  return (commuteEmission + electricityEmission + waterEmission + meatEmission + flightEmission) / 365; // kg/day
}

export function calculateDailyEmissions(entry: DailyEntry) {
  const commuteEmission = entry.transport.mode === "car" ? entry.transport.distance * 0.2 : entry.transport.distance * 0.04;
  const electricityEmission = entry.electricity * 0.42;
  const waterEmission = entry.water * 0.0003;
  const mealEmission = MEAL_FACTORS[entry.meal] || 0.5;
  let extrasEmission = 0;
  if (entry.extras.includes("AC")) extrasEmission += 2.5;
  if (entry.extras.includes("laundry")) extrasEmission += 1;
  if (entry.extras.includes("dishwasher")) extrasEmission += 0.5;

  return {
    commute: commuteEmission,
    electricity: electricityEmission,
    water: waterEmission,
    meal: mealEmission,
    extras: extrasEmission,
    total: commuteEmission + electricityEmission + waterEmission + mealEmission + extrasEmission,
  };
}

// Gauge score out of 100: 100 - (today/baseline*100) if lower, else decay sharper if over
export function carbonScore(today: number, baseline: number) {
  if (!baseline) return 50;
  if (today <= baseline) return Math.max(85 - ((baseline - today) * 50) / baseline, 60 + (today / baseline) * 25);
  const over = today - baseline;
  return Math.max(100 - (over / baseline) * 90, 20);
}

// Suggest actions
export function getSuggestion(today: number, baseline: number) {
  if (today < baseline * 0.7) return "Excellent! Your footprint is much lower than usual.";
  if (today < baseline * 0.95) return "Good job! Keep building these habits.";
  if (today <= baseline * 1.10) return "You're about average. Try to do one more green thing tomorrow!";
  if (today <= baseline * 1.3) return "Slightly higher than baseline. Try biking or a vegetarian meal.";
  return "High impact today. Aim to reduce AC or rethink travel tomorrow!";
}
