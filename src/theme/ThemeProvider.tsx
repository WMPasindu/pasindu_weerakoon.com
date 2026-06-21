import { useCallback, useEffect, useMemo, useState } from 'react'
import { ConfigProvider, App as AntApp } from 'antd'
import type { ReactNode } from 'react'
import { ThemeContext } from './theme-context'
import { getThemeConfig } from './tokens'
import type { ColorScheme } from './tokens'

const STORAGE_KEY = 'portfolio-color-scheme'

function getInitialScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  // Light is the default experience; users can still toggle to dark.
  return 'light'
}

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Owns the active color scheme, persists the choice, reflects it on the
 * document root (for CSS variables) and feeds the Ant Design ConfigProvider.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [scheme, setSchemeState] = useState<ColorScheme>(getInitialScheme)

  useEffect(() => {
    document.documentElement.dataset.theme = scheme
    document.documentElement.style.colorScheme = scheme
    window.localStorage.setItem(STORAGE_KEY, scheme)
  }, [scheme])

  const setScheme = useCallback((next: ColorScheme) => setSchemeState(next), [])
  const toggleScheme = useCallback(
    () => setSchemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  )

  const value = useMemo(
    () => ({ scheme, setScheme, toggleScheme }),
    [scheme, setScheme, toggleScheme],
  )

  const themeConfig = useMemo(() => getThemeConfig(scheme), [scheme])

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={themeConfig}>
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
