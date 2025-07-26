import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { MealPlan, UserProfile } from '../types';
import { getMockMealPlan } from './mockMealPlan';

import { GEMINI_API_KEY } from '@env';

const USE_MOCK_DATA = false;

// Create Axios instance with base configuration for Gemini
const geminiClient: AxiosInstance = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add the API key as a URL parameter
geminiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add API key as query parameter
    config.params = {
      ...config.params,
      key: GEMINI_API_KEY,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle errors
geminiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const errorMessage = error.response?.data || 'An error occurred';
    console.error('Gemini API Error:', errorMessage);
    return Promise.reject(errorMessage);
  },
);

/**
 * Generate a meal plan based on user profile using Gemini API
 */
export const generateMealPlan = async (
  userProfile: UserProfile,
): Promise<MealPlan> => {
  try {
    // If in development mode, use mock data instead of making API calls
    if (USE_MOCK_DATA) {
      console.log('Using mock data instead of API to avoid quota issues');
      return getMockMealPlan(userProfile);
    }

    // Construct the prompt based on user profile
    const prompt = constructMealPlanPrompt(userProfile);

    // Use Gemini API
    const response = await geminiClient.post(
      '/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `You are a nutritionist that creates personalized meal plans. Your response should be in valid JSON format only with no extra text or explanation. ${prompt}`,
              },
            ],
          },
        ],
      },
    );

    // Extract the content from Gemini response
    const responseText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse the response and format it as a meal plan
    const mealPlanData = parseAPIResponse(responseText);

    // Add metadata
    const mealPlan: MealPlan = {
      ...mealPlanData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    return mealPlan;
  } catch (error) {
    console.error('Failed to generate meal plan:', error);
    throw new Error('Failed to generate meal plan. Please try again.');
  }
};

/**
 * Constructs prompt for Gemini API based on user profile
 */
const constructMealPlanPrompt = (profile: UserProfile): string => {
  const { age, gender, weight, dietaryPreference, goal, cuisineType } = profile;

  const dietType =
    dietaryPreference === 'vegetarian' ? 'vegetarian' : 'non-vegetarian';
  const weightGoal =
    goal === 'weight-loss'
      ? 'lose weight'
      : goal === 'weight-gain'
      ? 'gain weight'
      : 'maintain weight';

  // Format cuisine preference for the prompt
  const cuisinePreference =
    cuisineType === 'mixed' ? '' : `with ${cuisineType} cuisine influence`;

  // Calculate appropriate calorie target based on profile
  let calorieTarget = 0;

  if (gender === 'male') {
    // Basic BMR calculation for males
    calorieTarget = 10 * weight + 6.25 * 170 - 5 * age + 5;
  } else {
    // Basic BMR calculation for females
    calorieTarget = 10 * weight + 6.25 * 160 - 5 * age - 161;
  }

  // Adjust for goals
  if (goal === 'weight-loss') {
    calorieTarget -= 500; // Deficit for weight loss
  } else if (goal === 'weight-gain') {
    calorieTarget += 500; // Surplus for weight gain
  }

  return `Generate a ${dietType} 3-meal plan (breakfast, lunch, dinner) under ${calorieTarget} kcal for a ${weight}kg ${gender} looking to ${weightGoal} ${cuisinePreference}. 
  
  Format your response as a valid JSON object with this exact structure:
  {
    "breakfast": {
      "name": "Meal name",
      "description": "Brief description",
      "calories": calories_as_number,
      "items": ["item1", "item2", ...]
    },
    "lunch": {
      "name": "Meal name",
      "description": "Brief description",
      "calories": calories_as_number,
      "items": ["item1", "item2", ...]
    },
    "dinner": {
      "name": "Meal name",
      "description": "Brief description",
      "calories": calories_as_number,
      "items": ["item1", "item2", ...]
    },
    "totalCalories": sum_as_number
  }
  
  Include calories per meal, make sure all meals are practical, and keep the total calories in the specified range.`;
};

/**
 * Parse and validate the Gemini API response
 */
const parseAPIResponse = (
  responseText: string,
): Omit<MealPlan, 'id' | 'date'> => {
  try {
    // Find JSON content in response (in case there's any extra text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : responseText;

    // Parse the JSON
    const parsedData = JSON.parse(jsonString);

    // Validate response structure
    if (!parsedData.breakfast || !parsedData.lunch || !parsedData.dinner) {
      throw new Error('Invalid meal plan format');
    }

    // Calculate total calories if not provided
    if (!parsedData.totalCalories) {
      parsedData.totalCalories =
        (parsedData.breakfast.calories || 0) +
        (parsedData.lunch.calories || 0) +
        (parsedData.dinner.calories || 0);
    }

    return parsedData;
  } catch (error) {
    console.error('Failed to parse OpenAI response:', error);
    throw new Error('Failed to parse meal plan data');
  }
};
