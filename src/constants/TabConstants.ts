export const TAB_ICONS = {
  HOME: 'home',
  HISTORY: 'history',
  SETTINGS: 'cog',
};

export const TAB_LABELS = {
  HOME: 'Home',
  HISTORY: 'History',
  SETTINGS: 'Settings',
};

export const SCREEN_NAMES = {
  HOME: 'Home',
  HISTORY: 'History',
  SETTINGS: 'Settings',
  MEAL_PLAN: 'MealPlan',
  ONBOARDING: 'Onboarding',
  MAIN: 'Main',
};

export type ScreenName = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
