import { createContext, useContext } from 'react'
import type { ColorScheme } from './tokens'

export interface ThemeContextValue {
  scheme: ColorScheme
  toggleScheme: () => void
  setScheme: (scheme: ColorScheme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Access the active color scheme and its setters. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return ctx
}
