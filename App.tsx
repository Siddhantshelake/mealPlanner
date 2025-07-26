import AppNavigator from './src/navigation';
import { OnboardingProvider } from './src/contexts/OnboardingContext';
import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { ToastUI } from './src/components/Toast';

const App = () => {
  return (
    <>
      <ToastProvider>
        <ThemeProvider>
          <OnboardingProvider>
            <AppNavigator />
          </OnboardingProvider>
          <ToastUI />
        </ThemeProvider>
      </ToastProvider>
    </>
  );
};

export default App;
