// FooterContext.js
import { createContext, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LayoutWithFooter from './LayoutWithFooter';

const FooterContext = createContext();

export default function Provider({ children }) {
  const [footer, setFooter] = useState(null);

  return (
    <View style={styles.container}>
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
