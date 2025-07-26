import { ThemeType } from '../contexts/ThemeContext';

export const Colors = {
  // Core brand colors that don't change with theme
  GREEN_PRIMARY: '#22C55E',
  GREEN_DARK: '#166534',
  GREEN_LIGHT: '#DCFCE7',
  BLUE_ACCENT: '#0EA5E9',
  PURPLE_ACCENT: '#8B5CF6',

  // Light theme colors
  light: {
    BACKGROUND_MAIN: '#F7F9FC',
    BACKGROUND_SURFACE: '#FFFFFF',
    BACKGROUND_CARD: '#FFFFFF',
    TEXT_PRIMARY: '#1E293B',
    TEXT_SECONDARY: '#64748B',
    TEXT_TERTIARY: '#94A3B8',
    TEXT_ON_DARK: '#FFFFFF',
    BORDER_DEFAULT: '#E2E8F0',
    DIVIDER_DEFAULT: '#F1F5F9',
    INPUT_BACKGROUND: '#F5F5F5',
    ERROR_RED: '#EF4444',
    ERROR_RED_LIGHT: '#FEF2F2',
    WARNING_AMBER: '#F59E0B',
    SUCCESS_GREEN: '#22C55E',
    INFO_BLUE: '#0EA5E9',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.1)',
  },

  // Dark theme colors
  dark: {
    BACKGROUND_MAIN: '#121212',
    BACKGROUND_SURFACE: '#1E1E1E',
    BACKGROUND_CARD: '#2C2C2C',
    TEXT_PRIMARY: '#FFFFFF',
    TEXT_SECONDARY: '#AAAAAA',
    TEXT_TERTIARY: '#777777',
    TEXT_ON_DARK: '#FFFFFF',
    BORDER_DEFAULT: '#333333',
    DIVIDER_DEFAULT: '#2A2A2A',
    INPUT_BACKGROUND: '#2C2C2C',
    ERROR_RED: '#E57373',
    ERROR_RED_LIGHT: '#4A2424',
    WARNING_AMBER: '#FFD54F',
    SUCCESS_GREEN: '#81C784',
    INFO_BLUE: '#64B5F6',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.3)',
  },
};

export function getThemeColors(theme: ThemeType) {
  return {
    ...Colors,
    ...Colors[theme],
  };
}
