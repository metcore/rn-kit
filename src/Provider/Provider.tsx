// FooterContext.js
import { createContext, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LayoutWithFooter from './LayoutWithFooter';
import RequiredUpdateAppsProvider from './RequiredUpdateAppsProvider';
import { type ReactNode } from 'react';
import type { RequiredUpdateAppsProviderProps } from './type';
import Color from '../Color/Color';

interface FooterContextType {
  footer: any | null;
  setFooter: (value: any) => void;
}

interface ProviderProps {
  children: ReactNode;
  requiredUpdated?: boolean;
  updateConfig?: RequiredUpdateAppsProviderProps;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export default function Provider({
  children,
  requiredUpdated = false,
  updateConfig,
}: ProviderProps) {
  const [footer, setFooter] = useState(null);

  return (
    <View style={styles.container}>
      {requiredUpdated ? (
        <RequiredUpdateAppsProvider {...updateConfig} />
      ) : null}
      <FooterContext.Provider value={{ footer, setFooter }}>
        <LayoutWithFooter>{children}</LayoutWithFooter>
      </FooterContext.Provider>
    </View>
  );
}

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error('useFooter must be used within a Footer Provider');
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.base.white100,
    flex: 1,
  },
});
