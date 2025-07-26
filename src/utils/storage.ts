import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProfile, MealPlan} from '../types';
import {StorageKeys} from '../constants/StorageKeys';
import {
  getValueFromAsyncStorage,
  setValueInAsyncStorage,
  getJsonFromAsyncStorage,
  setJsonInAsyncStorage,
} from './asyncStorageUtils';

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  const profileSaved = await setJsonInAsyncStorage(
    StorageKeys.USER_PROFILE,
    profile,
  );
  const onboardingSaved = await setValueInAsyncStorage(
    StorageKeys.ONBOARDING_COMPLETED,
    'true',
  );

  if (!profileSaved || !onboardingSaved) {
    throw new Error('Failed to save user profile');
  }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  return getJsonFromAsyncStorage<UserProfile>(StorageKeys.USER_PROFILE);
};

export const isOnboardingCompleted = async (): Promise<boolean> => {
  const completed = await getValueFromAsyncStorage(
    StorageKeys.ONBOARDING_COMPLETED,
  );
  return completed === 'true';
};

export const saveMealPlan = async (mealPlan: MealPlan): Promise<void> => {
  const existingPlans =
    (await getJsonFromAsyncStorage<MealPlan[]>(StorageKeys.MEAL_PLANS)) || [];
  const updatedPlans = [mealPlan, ...existingPlans];

  const saved = await setJsonInAsyncStorage(
    StorageKeys.MEAL_PLANS,
    updatedPlans,
  );
  if (!saved) {
    throw new Error('Failed to save meal plan');
  }
};

export const getMealPlans = async (): Promise<MealPlan[]> => {
  const plans = await getJsonFromAsyncStorage<MealPlan[]>(
    StorageKeys.MEAL_PLANS,
  );
  return plans || [];
};

export const getMealPlanById = async (id: string): Promise<MealPlan | null> => {
  try {
    const plans = await getMealPlans();
    return plans.find(plan => plan.id === id) || null;
  } catch (error) {
    console.error('Error getting meal plan by ID:', error);
    return null;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      StorageKeys.USER_PROFILE,
      StorageKeys.MEAL_PLANS,
      StorageKeys.ONBOARDING_COMPLETED,
      StorageKeys.THEME,
      StorageKeys.FOLLOW_SYSTEM_THEME,
    ]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
