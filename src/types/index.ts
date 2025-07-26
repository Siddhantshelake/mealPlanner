// Gender enum
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

// Dietary Preference enum
export enum DietaryPreference {
  VEGETARIAN = 'vegetarian',
  NON_VEGETARIAN = 'non-vegetarian',
}

// Goal enum
export enum Goal {
  WEIGHT_LOSS = 'weight-loss',
  MAINTAIN = 'maintain',
  WEIGHT_GAIN = 'weight-gain',
}

// Cuisine Type enum
export enum CuisineType {
  INDIAN = 'indian',
  WESTERN = 'western',
  MEDITERRANEAN = 'mediterranean',
  ASIAN = 'asian',
  MIXED = 'mixed',
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  dietaryPreference: DietaryPreference;
  goal: Goal;
  cuisineType: CuisineType;
}

export type Meal = {
  name: string;
  description: string;
  calories: number;
  items: string[];
};

export interface MealPlan {
  id: string;
  date: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  totalCalories: number;
}

export type NavigationParamsList = {
  Onboarding: undefined;
  Main: undefined;
  Home: undefined;
  MealPlan: { mealPlanId?: string };
  History: undefined;
  Settings: undefined;
  ProfileEdit: undefined;
};
