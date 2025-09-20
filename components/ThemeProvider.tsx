
import React, { createContext, useState } from 'react';
import { Theme } from '../types';
import { colors } from '../styles/commonStyles';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.light.background,
    backgroundAlt: colors.light.backgroundAlt,
    surface: colors.light.surface,
    text: colors.light.text,
    textSecondary: colors.light.textSecondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    border: colors.light.border,
    inputBackground: colors.light.inputBackground,
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.dark.background,
    backgroundAlt: colors.dark.backgroundAlt,
    surface: colors.dark.surface,
    text: colors.dark.text,
    textSecondary: colors.dark.textSecondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    border: colors.dark.border,
    inputBackground: colors.dark.inputBackground,
  },
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    console.log('Toggling theme from', isDark ? 'dark' : 'light', 'to', isDark ? 'light' : 'dark');
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
