import React, { useEffect, useState } from 'react';
import { Text, Animated } from 'react-native';
import { useToast, useToastFunctions } from '../../hooks/useToast';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../constants/ThemeColors';
import { createStyles } from './styles';

export const ToastUI: React.FC = () => {
  const { state, hideToast } = useToast();
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Now we can safely use the theme since ToastUI is inside ThemeProvider
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createStyles(colors, theme);

  useEffect(() => {
    if (state.visible) {
      // Show toast
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Auto-hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, state.duration);

      return () => clearTimeout(timer);
    } else {
      // Hide toast
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [state.visible, state.duration, fadeAnim, hideToast]);

  if (!state.visible) {
    const animValue = JSON.parse(JSON.stringify(fadeAnim));
    if (animValue && animValue.value === 0) {
      return null;
    }
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{state.message}</Text>
    </Animated.View>
  );
};

// Styles are now imported from styles.ts using current theme

export { useToast, useToastFunctions };

// Create a convenience hook that most components will use
export const useShowToast = () => {
  return useToastFunctions();
};

// Export the useShowToast as default for easier imports
export default useShowToast;
