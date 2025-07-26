# MealPlanner - Personalized Nutrition Assistant

MealPlanner is a cross-platform mobile app built with React Native and TypeScript that helps users generate personalized daily meal plans based on their preferences and nutritional goals. The app leverages Google's Gemini API to create customized meal suggestions tailored to individual dietary needs, health goals, and cuisine preferences.

## Code Architecture

The app follows a well-structured, maintainable architecture with the following key features:

### Folder Structure

```
/src
  /components        # Reusable UI components
    /ComponentName   # Each component has its own folder
      index.tsx      # Component logic
      styles.ts      # Component styles
  /screens           # App screens
    /ScreenName      # Each screen has its own folder
      index.tsx      # Screen component logic
      styles.ts      # Screen specific styles
  /contexts          # React Context providers
  /constants         # App-wide constants
  /utils             # Utility functions
  /services          # External API services
  /types             # TypeScript type definitions
  /navigation        # Navigation setup
```

### Path Aliases

The app uses path aliases for cleaner imports:

```typescript
// Instead of messy relative paths like:
import { UserProfile } from '../../types';

// We use clean aliases:
import { UserProfile } from '@/types';
import { getThemeColors } from '@constants/ThemeColors';
```

### Theming

The app uses a comprehensive theming system with descriptive color names and dynamic theme switching:

#### Light and Dark Mode Implementation

The theming system is built around a `ThemeContext` that provides theme values and toggles throughout the app:

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@/constants/StorageKeys';

export type ThemeType = 'light' | 'dark';

const ThemeContext = createContext({
  theme: 'light' as ThemeType,
  toggleTheme: () => {},
  followSystemTheme: true,
  toggleFollowSystemTheme: () => {},
});
```

Features of the theming system:

- **Dynamic Theme Switching**: Users can toggle between light and dark mode
- **System Theme Following**: Automatically applies the system theme preference
- **Theme Persistence**: User theme preferences are saved using AsyncStorage
- **Centralized Color System**: All colors are defined in `ThemeColors.ts`
- **Semantic Color Names**: Colors are named by purpose, not visual appearance

#### Color System

The color palette is defined with three categories:

1. **Core Brand Colors**: Don't change with theme (e.g., `GREEN_PRIMARY`)
2. **Light Theme Colors**: Applied in light mode (e.g., `BACKGROUND_MAIN` → `#F7F9FC`)
3. **Dark Theme Colors**: Applied in dark mode (e.g., `BACKGROUND_MAIN` → `#121212`)

Components consume these colors through a custom hook pattern:

```typescript
const {theme} = useTheme();
const colors = getThemeColors(theme);

// Usage
<View style={{backgroundColor: colors.BACKGROUND_MAIN}}>
```

#### Themed Components

Components use dynamic styling that responds to theme changes:

```typescript
// styles.ts
export const createStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.BACKGROUND_MAIN,
    },
    text: {
      color: colors.TEXT_PRIMARY,
    },
  });

// In component
const styles = createStyles(colors);
```

A complete style guide is available in the [STYLE_GUIDE.md](./STYLE_GUIDE.md) document.

## Key Features

- **Personalized Onboarding**: Collect user preferences (name, age, gender, weight, dietary preference, weight goal)
- **AI-Powered Meal Plans**: Generate customized meal plans using Google Gemini AI
- **Daily Plans**: Breakfast, lunch, and dinner with calorie information
- **Multi-cuisine Support**: Options for Indian, Western, Mediterranean, Asian, and Mixed cuisines
- **Dietary Preference Handling**: Support for vegetarian and non-vegetarian meal plans
- **Health Goal Targeting**: Weight loss, weight gain, or maintenance meal strategies
- **Dynamic Theming**: Light and dark mode with system preference following
- **History**: View and revisit past meal plans
- **Settings**: Customize app behavior and clear history

## Technical Specifications

### Frontend Technologies

- **React Native**: Core framework for cross-platform mobile development
- **TypeScript**: Strongly typed language for better code quality and IDE support
- **React Navigation**: Screen navigation and routing
- **Context API**: State management for theming and user preferences
- **Styled Components**: Component-specific styling with theme awareness

### Data Management

- **AsyncStorage**: Persistent local storage for user profiles and meal plans
- **Google Gemini API Integration**: External API communication for AI-generated meal plans
- **TypeScript Interfaces**: Strong typing for data models and API responses

### UI/UX Features

- **Custom Toast System**: Non-intrusive user notifications
- **Custom Alert Dialogs**: Context-appropriate messaging
- **Accessibility Support**: Screen reader compatibility and semantic markup
- **Responsive Layout**: Adapts to various screen sizes
- **Dynamic Color System**: Semantic color naming with theme variants
- **Adaptive Scaling**: Cross-device dimension scaling for consistent UI experiences

### Responsive Design System

The app implements a sophisticated scaling utility that ensures consistent UI experiences across different device sizes and orientations:

```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number): number =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5): number =>
  size + (verticalScale(size) - size) * factor;
```

This scaling system provides:

- **Horizontal Scaling**: Adapts UI elements based on screen width
- **Vertical Scaling**: Adjusts dimensions based on screen height
- **Moderate Scaling**: Fine-tuned adjustments with custom factors
- **Orientation Support**: Automatically handles portrait and landscape modes

## Native Splash Screen Implementation

The app features a custom native Android splash screen implementation that creates a polished, branded launch experience:

- **SplashTheme**: Custom theme defined in styles.xml
- **Vector Drawable Logo**: Branded meal planner logo with the app's color palette
- **Native Kotlin Integration**: MainActivity handles the transition from splash to app
- **Zero-Flicker Experience**: Eliminates the white flash during app startup
- **Brand Color Consistency**: Uses the app's primary green (#22C55E) and accent colors

## Prerequisites

- Node.js (v14.0+) and npm/yarn
- React Native CLI environment
- Android Studio (for Android development)
- Xcode (for iOS development)
- OpenAI API key

### API Integration

The app implements a clean service layer for API communication with Google Gemini:

```typescript
// Example of API service implementation
export async function generateMealPlan(
  userProfile: UserProfile,
): Promise<MealPlan> {
  try {
    // API communication logic
    const response = await fetchFromGemini({
      prompt: buildMealPlanPrompt(userProfile),
      temperature: 0.7,
      maxOutputTokens: 1000,
    });

    // Response parsing and validation
    return parseMealPlanResponse(response, userProfile);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan');
  }
}
```

Key API integration patterns:

- **Service Layer Abstraction**: API logic isolated in service modules
- **Error Handling**: Comprehensive try/catch patterns with user-friendly error messages
- **Type Safety**: Strong typing for request and response objects
- **Prompting System**: Dynamic prompt generation tailored to Gemini's capabilities

### State Management

The app uses a hybrid state management approach:

1. **Local Component State**: React useState for component-specific UI state
2. **Context API**: For shared state like theme and user profile
3. **Async Storage**: For persisting data between sessions

Example of Context API implementation:

```typescript
// Context definition
export const UserContext = createContext<UserContextType>({
  userProfile: null,
  setUserProfile: () => {},
  clearUserProfile: () => {},
});

// Context Provider
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);

  // Load from storage on mount
  useEffect(() => {
    async function loadProfile() {
      const profile = await getUserProfile();
      if (profile) setProfileState(profile);
    }
    loadProfile();
  }, []);

  // Save to storage on change
  const setUserProfile = useCallback(async (profile: UserProfile) => {
    await saveUserProfile(profile);
    setUserProfileState(profile);
  }, []);

  const clearUserProfile = useCallback(async () => {
    await removeUserProfile();
    setUserProfileState(null);
  }, []);

  return (
    <UserContext.Provider
      value={{ userProfile, setUserProfile, clearUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}
```

## Environment Setup

Create a `.env` file in the root directory with your Google Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Nativ
 
 
 
