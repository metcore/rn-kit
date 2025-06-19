import { createContext, useContext, useState, ReactNode } from 'react';

interface FooterContextType {
  footer: ReactNode | null;
  setFooter: (footer: ReactNode | null) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [footer, setFooter] = useState<ReactNode | null>(null);

  return (
    <FooterContext.Provider value={{ footer, setFooter }}>
      {children}
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
