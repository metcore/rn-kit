import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

type ToastColor =
  | 'default'
  | 'success'
  | 'danger'
  | 'primary'
  | 'warning'
  | 'info'
  | 'purple'
  | 'orange';

interface ToastOptions {
  color?: ToastColor;
  icon?: string;
  duration?: number;
}

interface ToastContextType {
  show: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<ToastOptions>({});

  const show = (msg: string, opts?: ToastOptions) => {
    setMessage(msg);
    setOptions(opts || {});
    setVisible(true);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast
        visible={visible}
        message={message}
        onHide={() => setVisible(false)}
        onClear={() => setVisible(false)}
        color={options.color}
        icon={options.icon}
        duration={options.duration}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
