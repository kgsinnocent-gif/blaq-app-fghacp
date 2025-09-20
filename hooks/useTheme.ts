
import { useState, useEffect, createContext, useContext } from 'react';
import { Theme } from '../types';

const lightColors = {
  primary: '#7C3AED',
  secondary: '#8B5CF6',
  accent: '#A78BFA',
  background: '#FFFFFF',
  backgroundAlt: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  border: '#E5E7EB',
  inputBackground: '#F9FAFB',
};

const darkColors = {
  primary: '#7C3AED',
  secondary: '#8B5CF6',
  accent: '#A78BFA',
  background: '#0F0F23',
  backgroundAlt: '#1A1A2E',
  surface: '#16213E',
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  border: '#374151',
  inputBackground: '#1F2937',
};

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
  const [isDark, setIsDark] = useState(false); // Start with light theme as requested

  const theme: Theme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
  };

  const toggleTheme = () => {
    console.log('Toggling theme from', isDark ? 'dark' : 'light', 'to', isDark ? 'light' : 'dark');
    setIsDark(!isDark);
  };

  return { theme, toggleTheme };
};

export { ThemeContext };
