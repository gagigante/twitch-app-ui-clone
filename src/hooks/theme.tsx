import React, {
  createContext,
  useContext,
  useState,  
  useCallback,
} from 'react';

import { ThemeProvider, DefaultTheme } from 'styled-components';

import { light, dark } from '../styles/colors';

interface ThemeContextData {
  toggleTheme(): void;
  selectedTheme: DefaultTheme;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ColorThemeProvider: React.FC = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(light);
 
  const toggleTheme = useCallback(() => {
    setSelectedTheme(selectedTheme.title === 'light' ? dark : light);
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, selectedTheme }}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  return context;
}

export { ColorThemeProvider, useTheme };