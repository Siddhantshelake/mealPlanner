import React, { createContext, useState } from 'react';

export interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export type ToastState = {
  message: string;
  visible: boolean;
  duration: number;
};

export interface ToastContextValue {
  state: ToastState;
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ToastState>({
    message: '',
    visible: false,
    duration: 2000,
  });

  const showToast = (options: ToastOptions) => {
    const { message, duration = 2000 } = options;
    setState({
      message,
      duration,
      visible: true,
    });
  };

  const hideToast = () => {
    setState(prev => ({ ...prev, visible: false }));
  };

  const value = { state, showToast, hideToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};
