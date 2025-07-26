import { createContext, useContext, useState, type ReactNode } from 'react';
import Toast from './Toast';
import type { ColorVariantType } from '../Color/type';
import type { IconNameProps } from '../Icon';

interface ToastOptions {
  color?: ColorVariantType;
  icon?: IconNameProps;
  duration?: number;
  action?: () => void;
}

interface ToastContextType {
  show: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [options, setOptions] = useState<ToastOptions>({
    icon: 'ExclamationMark',
  });

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
        action={options.action || undefined}
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
