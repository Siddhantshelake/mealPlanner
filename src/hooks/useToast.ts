import { useContext } from 'react';
import { ToastContext, ToastOptions } from '../contexts/ToastContext';

/**
 * Custom hook to use toast notifications anywhere in the app
 * Must be used within a ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Re-export utility functions that use the hook pattern
// These are meant to be used in React components only
export const useToastFunctions = () => {
  const { showToast } = useToast();
  
  const showSuccessToast = (message: string, duration = 2000) => {
    showToast({ message, type: 'success', duration });
  };
  
  const showErrorToast = (message: string, duration = 2000) => {
    showToast({ message, type: 'error', duration });
  };
  
  const showInfoToast = (message: string, duration = 2000) => {
    showToast({ message, type: 'info', duration });
  };
  
  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast
  };
};

// These are exported for components that don't want to use the hook
// Underscore prefix is used to avoid unused parameter lint warnings
export const showToast = (_options: ToastOptions) => {
  throw new Error('showToast can no longer be called directly. Use the useToast hook inside a component.');
};

export const showSuccessToast = (_message: string, _duration = 2000) => {
  throw new Error('showSuccessToast can no longer be called directly. Use the useToast hook inside a component.');
};

export const showErrorToast = (_message: string, _duration = 2000) => {
  throw new Error('showErrorToast can no longer be called directly. Use the useToast hook inside a component.');
};

export const showInfoToast = (_message: string, _duration = 2000) => {
  throw new Error('showInfoToast can no longer be called directly. Use the useToast hook inside a component.');
};
