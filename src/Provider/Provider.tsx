// FooterContext.js
import { createContext, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LayoutWithFooter from './LayoutWithFooter';
import RequiredUpdateAppsProvider from './RequiredUpdateAppsProvider';

const FooterContext = createContext();

export default function Provider({
  children,
  requiredUpdated = false,
  updateConfig = {},
}) {
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

export const useFooter = () => useContext(FooterContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
