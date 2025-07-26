import {MealPlan, UserProfile} from '../types';

/**
 * Returns a mock meal plan based on user profile for development purposes
 * This avoids making API calls when you're working on UI/UX features
 */
export const getMockMealPlan = (userProfile: UserProfile): MealPlan => {
  const {dietaryPreference, goal} = userProfile;

  // Calorie adjustments based on goals
  let calorieAdjustment = 0;
  if (goal === 'weight-loss') {
    calorieAdjustment = -200;
  } else if (goal === 'weight-gain') {
    calorieAdjustment = 200;
  }

  // Basic meal templates based on dietary preferences
  const isVegetarian = dietaryPreference === 'vegetarian';

  const breakfast = isVegetarian
    ? {
        name: 'Vegetarian Breakfast Bowl',
        description:
          'Nutritious breakfast bowl with yogurt, fruits, and granola',
        calories: 350 + calorieAdjustment / 3,
        items: [
          'Greek yogurt',
          'Mixed berries',
          'Granola',
          'Honey',
          'Chia seeds',
        ],
      }
    : {
        name: 'Protein Breakfast Plate',
        description:
          'High protein breakfast with eggs, avocado, and whole grain toast',
        calories: 400 + calorieAdjustment / 3,
        items: [
          'Scrambled eggs',
          'Avocado slices',
          'Whole grain toast',
          'Turkey bacon',
        ],
      };

  const lunch = isVegetarian
    ? {
        name: 'Mediterranean Salad Bowl',
        description:
          'Fresh Mediterranean salad with falafel and tahini dressing',
        calories: 450 + calorieAdjustment / 3,
        items: [
          'Mixed greens',
          'Falafel',
          'Cherry tomatoes',
          'Cucumber',
          'Feta cheese',
          'Tahini dressing',
        ],
      }
    : {
        name: 'Grilled Chicken Salad',
        description: 'Lean protein salad with grilled chicken and vegetables',
        calories: 500 + calorieAdjustment / 3,
        items: [
          'Grilled chicken breast',
          'Mixed greens',
          'Bell peppers',
          'Cucumber',
          'Olive oil dressing',
        ],
      };

  const dinner = isVegetarian
    ? {
        name: 'Vegetable Stir-Fry with Tofu',
        description:
          'Asian-inspired vegetable stir-fry with tofu and brown rice',
        calories: 500 + calorieAdjustment / 3,
        items: [
          'Tofu',
          'Mixed vegetables',
          'Brown rice',
          'Soy sauce',
          'Ginger',
        ],
      }
    : {
        name: 'Baked Salmon with Vegetables',
        description: 'Omega-rich salmon with roasted vegetables',
        calories: 550 + calorieAdjustment / 3,
        items: [
          'Baked salmon',
          'Asparagus',
          'Sweet potato',
          'Olive oil',
          'Lemon',
        ],
      };

  // Calculate total calories
  const totalCalories = breakfast.calories + lunch.calories + dinner.calories;

  return {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    breakfast,
    lunch,
    dinner,
    totalCalories,
  };
};
