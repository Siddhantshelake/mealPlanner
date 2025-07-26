import React, {createContext, useState, useContext, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {StorageKeys} from '../constants/StorageKeys';
import {MessageConstants} from '../constants/MessageConstants';
import {
  getValueFromAsyncStorage,
  setValueInAsyncStorage,
} from '../utils/asyncStorageUtils';

export type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  followSystemTheme: boolean;
  setFollowSystemTheme: (value: boolean) => void;
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [followSystemTheme, setFollowSystemThemeState] =
    useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const systemColorScheme = useColorScheme() || 'light';

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [savedTheme, savedFollowSystem] = await Promise.all([
          getValueFromAsyncStorage(StorageKeys.THEME),
          getValueFromAsyncStorage(StorageKeys.FOLLOW_SYSTEM_THEME),
        ]);

        if (savedFollowSystem !== null) {
          setFollowSystemThemeState(savedFollowSystem === 'true');
        }

        if (savedTheme === 'dark' || savedTheme === 'light') {
          setThemeState(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error(MessageConstants.ERROR.LOAD_THEME_FAILED, error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  useEffect(() => {
    if (followSystemTheme) {
      setThemeState(systemColorScheme as ThemeType);
    }
  }, [systemColorScheme, followSystemTheme]);

  const setTheme = async (newTheme: ThemeType) => {
    const success = await setValueInAsyncStorage(StorageKeys.THEME, newTheme);
    if (success) {
      setThemeState(newTheme);
    } else {
      console.error(MessageConstants.ERROR.SAVE_THEME_FAILED);
    }
  };

  const setFollowSystemTheme = async (value: boolean) => {
    const success = await setValueInAsyncStorage(
      StorageKeys.FOLLOW_SYSTEM_THEME,
      value.toString(),
    );

    if (success) {
      setFollowSystemThemeState(value);

      if (value) {
        setThemeState(systemColorScheme as ThemeType);
      }
    } else {
      console.error(MessageConstants.ERROR.SAVE_FOLLOW_SYSTEM_FAILED);
    }
  };

  const toggleTheme = async () => {
    try {
      if (followSystemTheme) {
        await setFollowSystemTheme(false);
      }

      const newTheme = theme === 'light' ? 'dark' : 'light';
      await setTheme(newTheme);
    } catch (error) {
      console.error(MessageConstants.ERROR.SAVE_THEME_FAILED, error);
    }
  };

  const value = {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setTheme,
    followSystemTheme,
    setFollowSystemTheme,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(MessageConstants.ERROR.CONTEXT_ERROR.THEME);
  }
  return context;
};
