import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { ToastProvider } from '../../Toast/ToastContext';

/**
 * Render a component inside the providers it needs at runtime.
 *
 * Components that call `useToast` (directly or through a child such as
 * InputSelect) throw outside a ToastProvider, so tests for them must wrap.
 * Returns the same object as RNTL's `render`.
 */
export const renderWithProviders = (ui: ReactElement) =>
  render(<ToastProvider>{ui}</ToastProvider>);
