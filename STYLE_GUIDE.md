# MealPlanner Style Guide

This document provides guidelines for maintaining consistent code style and architecture in the MealPlanner React Native application. Following these guidelines ensures a clean, maintainable, and scalable codebase.

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Import Paths](#import-paths)
3. [Theming and Styling](#theming-and-styling)
4. [Component Organization](#component-organization)
5. [UI Feedback & Alerts](#ui-feedback--alerts)
6. [Message Constants](#message-constants)

## Folder Structure

The application follows a feature-based folder structure:

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

## Import Paths

Use absolute paths with aliases instead of relative paths for better readability and maintainability:

### Path Aliases

| Alias         | Path             |
| ------------- | ---------------- |
| `@components` | `src/components` |
| `@screens`    | `src/screens`    |
| `@constants`  | `src/constants`  |
| `@contexts`   | `src/contexts`   |
| `@utils`      | `src/utils`      |
| `@types`      | `src/types`      |
| `@services`   | `src/services`   |
| `@navigation` | `src/navigation` |
| `@/`          | `src/`           |

### ✅ Good Examples

```typescript
// Use path aliases
import { UserProfile } from '@/types';
import { getThemeColors } from '@constants/ThemeColors';
import CustomIcon from '@components/CustomIcon';
import { useTheme } from '@contexts/ThemeContext';
```

### ❌ Bad Examples

```typescript
// Don't use relative paths
import { UserProfile } from '../../types';
import { getThemeColors } from '../../constants/ThemeColors';
import CustomIcon from '../components/CustomIcon';
```

## Theming and Styling

### Color Constants

Use the descriptive color constants from ThemeColors.ts:

```typescript
// ✅ Good
colors.GREEN_PRIMARY;
colors.BACKGROUND_MAIN;
colors.ERROR_RED;

// ❌ Bad - deprecated color names
colors.PRIMARY;
colors.BACKGROUND;
colors.ERROR;
```

### Styling Pattern

1. Each component/screen should have a separate style file
2. Use the createStyles function that accepts theme colors:

```typescript
// styles.ts
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '@utils/scaling';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.BACKGROUND_MAIN,
      // other styles
    },
  });

// Component file
import { createStyles } from './styles';
// ...
const colors = getThemeColors(theme);
const styles = createStyles(colors);
```

### Scaling

Use scaling utilities for responsive design:

- `scale`: Horizontal scaling
- `verticalScale`: Vertical scaling
- `moderateScale`: Moderate scaling for fonts

## Component Organization

### Component Structure

```typescript
// Structure of a component
import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {getThemeColors} from '@constants/ThemeColors';
import {createStyles} from './styles';

interface ComponentProps {
  // Props definition
}

const Component = (props: ComponentProps) => {
  // Component logic and hooks
  const {theme} = useTheme();
  const colors = getThemeColors(theme);
  const styles = createStyles(colors);

  return (
    // JSX
  );
};

export default Component;
```

### Naming Conventions

- Component files: `index.tsx` inside component folder
- Style files: `styles.ts`
- Components: PascalCase (e.g., `MealCard`)
- Props interfaces: ComponentNameProps (e.g., `MealCardProps`)
- Event handlers: handleEventName (e.g., `handleSubmit`)

## UI Feedback & Alerts

Do not use React Native's built-in `Alert.alert()` for displaying alerts or messages to users. Instead, use the custom `CustomAlert` component directly:

```typescript
// ✅ Good - Using CustomAlert component
import React, { useState } from 'react';
import CustomAlert from '@components/CustomAlert';

const MyComponent = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = message => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleButtonPress = () => {
    // Show error message when needed
    showAlert(MessageConstants.ERROR.GENERATE_MEAL_PLAN_FAILED);
  };

  return (
    <View>
      {/* Your component JSX */}
      <TouchableOpacity onPress={handleButtonPress}>
        <Text>Generate Meal Plan</Text>
      </TouchableOpacity>

      {/* Custom Alert component */}
      <CustomAlert
        visible={alertVisible}
        title={MessageConstants.ALERT_TITLE.ERROR}
        message={alertMessage}
        primaryButtonText="OK"
        onPrimaryPress={() => setAlertVisible(false)}
        onDismiss={() => setAlertVisible(false)}
      />
    </View>
  );
};
```

```typescript
// ❌ Bad - Using React Native's Alert directly
import { Alert } from 'react-native';

Alert.alert(
  MessageConstants.ALERT_TITLE.ERROR,
  MessageConstants.ERROR.GENERATE_MEAL_PLAN_FAILED,
);
```

## Message Constants

All user-facing text should come from MessageConstants instead of hardcoded strings:

```typescript
// ✅ Good
<Text>{MessageConstants.LABEL.SETTINGS}</Text>

// ❌ Bad
<Text>Settings</Text>
```

When adding new user-facing text, add it to the MessageConstants.ts file in the appropriate category:

- `LABEL`: For UI labels and short text
- `BUTTON`: For button text
- `ALERT_TITLE`: For alert titles
- `ALERT_MESSAGE`: For alert messages
- `ERROR`: For error messages
- `UI_TEXT`: For longer UI text

This enables easier localization in the future.

## Documentation

Add comments for:

- Complex logic
- Non-obvious code behavior
- Type definitions
- Function signatures with parameters and return values

---

_This style guide is a living document. Feel free to suggest improvements and additions._
