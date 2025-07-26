import React, {createContext, useState, useContext, useEffect} from 'react';
import {isOnboardingCompleted, clearAllData} from '../utils/storage';
import {MessageConstants} from '../constants/MessageConstants';

// Define the shape of our context
type OnboardingContextType = {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  loading: boolean;
};

// Create the context with a default value
const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

// Provider component that wraps the app
export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load onboarding status from storage when the app starts
  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const status = await isOnboardingCompleted();
        setIsOnboarded(status);
      } catch (error) {
        console.error(MessageConstants.ERROR.LOAD_ONBOARDING_FAILED, error);
      } finally {
        setLoading(false);
      }
    };

    loadOnboardingStatus();
  }, []);

  // Update storage when onboarding status changes
  const handleSetIsOnboarded = async (value: boolean) => {
    try {
      if (value) {
        // If setting to true, we assume a user profile exists
        // In a real app, you'd want to check this or handle it differently
      } else {
        // If setting to false, clear all data to reset
        await clearAllData();
      }
      setIsOnboarded(value);
    } catch (error) {
      console.error(MessageConstants.ERROR.LOAD_ONBOARDING_FAILED, error);
    }
  };

  const value = {
    isOnboarded,
    setIsOnboarded: handleSetIsOnboarded,
    loading,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(MessageConstants.ERROR.CONTEXT_ERROR.ONBOARDING);
  }
  return context;
};
