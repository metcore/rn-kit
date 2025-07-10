import { createContext, useContext, useState, type ReactNode } from 'react';
import LayoutWithFooter from './LayoutWithFooter';

interface FooterContextType {
  footer: ReactNode | null;
  setFooter: (footer: ReactNode | null) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [footer, setFooter] = useState<ReactNode | null>(null);

  return (
    <FooterContext.Provider value={{ footer, setFooter }}>
      <LayoutWithFooter>{children}</LayoutWithFooter>
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};
