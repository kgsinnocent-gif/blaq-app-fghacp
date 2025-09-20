
import { useState, useEffect, createContext, useContext } from 'react';
import { colors } from '../styles/commonStyles';
import { Theme } from '../types';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  const [isDark, setIsDark] = useState(true);

  const theme: Theme = {
    isDark,
    colors: isDark ? colors : colors.light,
  };

  const toggleTheme = () => {
    console.log('Toggling theme from', isDark ? 'dark' : 'light', 'to', isDark ? 'light' : 'dark');
    setIsDark(!isDark);
  };

  return { theme, toggleTheme };
};

export { ThemeContext };
