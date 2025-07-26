import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {getThemeColors} from '@constants/ThemeColors';

export const ThemedStatusBar = () => {
  const {theme} = useTheme();
  const colors = getThemeColors(theme);

  return (
    <StatusBar
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={colors.BACKGROUND_MAIN}
    />
  );
};
