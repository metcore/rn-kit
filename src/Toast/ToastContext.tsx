import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import Toast from './Toast';
import type { ColorVariantType } from '../Color/type';
import type { IconNameProps } from '../Icon';

interface ToastOptions {
  color?: ColorVariantType;
  icon?: IconNameProps;
  duration?: number;
  children?: React.ReactNode;
  closable?: boolean;
}

interface ToastContextType {
  show: (message: string, options?: ToastOptions) => void;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const animateStack = () =>
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastItem {
  id: number;
  message: string;
  options: ToastOptions;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const show = useCallback((message: string, options?: ToastOptions) => {
    nextId.current += 1;
    const id = nextId.current;

    animateStack();
    setToasts((current) => [
      ...current,
      { id, message, options: options || {} },
    ]);
  }, []);

  const remove = useCallback((id: number) => {
    animateStack();
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toasts.length > 0 && (
        <View pointerEvents="box-none" style={styles.stack}>
          {toasts.map(({ id, message, options }) => (
            <Toast
              key={id}
              visible
              message={message}
              onHide={() => remove(id)}
              onClear={() => remove(id)}
              color={options.color}
              icon={options.icon}
              duration={options.duration}
              closable={options.closable}
              style={styles.stacked}
            >
              {options.children}
            </Toast>
          ))}
        </View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    bottom: 80,
    left: 28,
    right: 28,
    gap: 8,
    zIndex: 999,
  },
  stacked: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
