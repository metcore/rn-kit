import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';
import { ToastProvider } from '../../Toast/ToastContext';

// SafeAreaProvider normally learns its insets from a native onLayout event,
// which never fires under jest -- useSafeAreaInsets then throws "No safe area
// value available". Seeding initialMetrics gives it a frame up front.
const metrics: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

/**
 * Render a component inside the providers it needs at runtime.
 *
 * Components that call `useToast` (directly or through a child such as
 * InputSelect) or `useSafeAreaInsets` (ViewInsets, Footer) throw outside their
 * provider, so tests for them must wrap. Returns the same object as RNTL's
 * `render`.
 */
export const renderWithProviders = (ui: ReactElement) =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <ToastProvider>{ui}</ToastProvider>
    </SafeAreaProvider>
  );
