// src/hooks/useOptionalFocusEffect.ts
import { useContext, useEffect, useCallback } from 'react';
import { NavigationContext, useFocusEffect } from '@react-navigation/native';

export function useOptionalFocusEffect(callback: () => void | (() => void)) {
  const navigation = useContext(NavigationContext);

  const effect = useCallback(callback, [callback]);

  if (navigation) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFocusEffect(effect);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => effect(), [effect]);
  }
}
