 MealPlanner - Personalized Nutrition Assistant

MealPlanner is a cross-platform mobile app built with React Native and TypeScript that generates personalized daily meal plans based on user preferences and nutritional goals. The app integrates Google's Gemini API to provide AI-powered meal suggestions tailored to dietary needs, health objectives, and cuisine preferences.

------------------------------------------------------------
📁 Code Architecture

📂 Folder Structure

/src
  /components         # Reusable UI components
    /ComponentName
      index.tsx       # Component logic
      styles.ts       # Component styles

  /screens
    /ScreenName
      index.tsx       # Screen logic
      styles.ts       # Screen-specific styles

  /contexts           # React Context providers
  /constants          # App-wide constants
  /utils              # Utility functions
  /services           # API communication logic
  /types              # TypeScript types
  /navigation         # Navigation setup

📌 Path Aliases

import { UserProfile } from '@/types';
import { getThemeColors } from '@constants/ThemeColors';

------------------------------------------------------------
🎨 Theming System

💡 Features
- Dynamic light/dark theme switching
- System theme support
- Persistent theme preference (using AsyncStorage)
- Semantic color names
- Centralized color system

🌗 ThemeContext Example

// src/contexts/ThemeContext.tsx
export type ThemeType = 'light' | 'dark';

const ThemeContext = createContext({
  theme: 'light' as ThemeType,
  toggleTheme: () => {},
  followSystemTheme: true,
  toggleFollowSystemTheme: () => {},
});

🎨 Color Categories
1. Core Colors (static across themes): GREEN_PRIMARY
2. Light Theme: e.g. BACKGROUND_MAIN = #F7F9FC
3. Dark Theme: e.g. BACKGROUND_MAIN = #121212

🧩 Themed Component Example

const { theme } = useTheme();
const colors = getThemeColors(theme);

const styles = createStyles(colors);

export const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    text: {
      color: colors.TEXT_PRIMARY,
    },
  });

------------------------------------------------------------
🚀 Key Features

- Personalized onboarding (name, age, weight, dietary goals)
- AI-generated daily meal plans (breakfast, lunch, dinner)
- Multi-cuisine support (Indian, Western, Asian, etc.)
- Vegetarian & Non-vegetarian options
- Weight loss/gain/maintenance targeting
- Dynamic light/dark theme support
- Meal plan history
- App settings customization

------------------------------------------------------------
⚙️ Tech Stack

🛠️ Frontend
- React Native – core framework
- TypeScript – static typing
- React Navigation – screen routing
- Context API – state management
- Styled Components – theme-aware styles

📊 Data & APIs
- AsyncStorage – persistent local storage
- Google Gemini API – meal generation
- Typed Interfaces – API & state typing

------------------------------------------------------------
📱 Responsive Design

// utils/scaling.ts
export const scale = (size: number): number => 
  (Dimensions.get('window').width / 350) * size;

export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

------------------------------------------------------------
📲 Native Splash Screen (Android)

- Custom SplashTheme in styles.xml
- Vector drawable logo with brand colors
- Native Kotlin integration
- Zero white flicker launch experience
- Primary color consistency: #22C55E

------------------------------------------------------------
🔐 API Integration

export async function generateMealPlan(userProfile: UserProfile): Promise<MealPlan> {
  try {
    const response = await fetchFromGemini({
      prompt: buildMealPlanPrompt(userProfile),
      temperature: 0.7,
      maxOutputTokens: 1000,
    });
    return parseMealPlanResponse(response, userProfile);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan');
  }
}

------------------------------------------------------------
🧠 State Management

1. Local Component State – useState
2. Context API – Theme & user profiles
3. AsyncStorage – Persistent storage

User Context Example:

export const UserContext = createContext({
  userProfile: null,
  setUserProfile: () => {},
  clearUserProfile: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfileState] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const profile = await getUserProfile();
      if (profile) setUserProfileState(profile);
    }
    loadProfile();
  }, []);

  const setUserProfile = useCallback(async (profile: UserProfile) => {
    await saveUserProfile(profile);
    setUserProfileState(profile);
  }, []);

  const clearUserProfile = useCallback(async () => {
    await removeUserProfile();
    setUserProfileState(null);
  }, []);

  return <UserContext.Provider value={{ userProfile, setUserProfile, clearUserProfile }}>{children}</UserContext.Provider>;
}

------------------------------------------------------------
🧪 Environment Setup

Create a `.env` file:

GEMINI_API_KEY=your_gemini_api_key_here

------------------------------------------------------------
🛠 Getting Started

1. Install dependencies:
npm install / yarn install

2. Start Metro:
npm start / yarn start

3. Run Android:
npm run android / yarn android

4. Run iOS:
bundle install
bundle exec pod install
npm run ios / yarn ios

Use Cmd + M (Mac) or Ctrl + M (Windows) to open dev menu.

------------------------------------------------------------
📚 Learn More

- https://reactnative.dev
- https://deepmind.google/technologies/gemini/
- https://react-native-async-storage.github.io/async-storage/
- https://reactnavigation.org/
- https://styled-components.com/docs/basics#react-native

------------------------------------------------------------
🐛 Troubleshooting

- https://reactnative.dev/docs/troubleshooting
- npx react-native start --reset-cache

------------------------------------------------------------
🎉 Congratulations!

You’ve successfully set up and run the MealPlanner app!
