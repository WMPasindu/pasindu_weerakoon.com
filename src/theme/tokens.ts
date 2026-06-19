import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

export type ColorScheme = 'light' | 'dark'

/**
 * Brand palette. These CSS variables are also mirrored in global.css so that
 * non-antd surfaces (gradients, custom canvases) stay in sync with the theme.
 */
export const brand = {
  /** Ink — the primary UI colour (buttons, links, focus). Black-on-cream. */
  inkLight: '#1a1612',
  inkDark: '#f3ece1',
  /** Orange is decorative only — the status dot and small eyebrows. */
  accent: '#e8743b',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
} as const

const sharedToken: ThemeConfig['token'] = {
  colorSuccess: brand.success,
  colorWarning: brand.warning,
  colorError: brand.error,
  borderRadius: 12,
  fontFamily:
    "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontSize: 15,
  lineHeight: 1.65,
  wireframe: false,
}

export const getThemeConfig = (scheme: ColorScheme): ThemeConfig => ({
  algorithm:
    scheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    ...sharedToken,
    // Ink primary: black on cream (light) / cream on espresso (dark).
    colorPrimary: scheme === 'dark' ? brand.inkDark : brand.inkLight,
    colorInfo: scheme === 'dark' ? brand.inkDark : brand.inkLight,
    colorLink: scheme === 'dark' ? brand.inkDark : brand.inkLight,
    colorLinkHover: scheme === 'dark' ? '#ffffff' : '#000000',
    ...(scheme === 'dark'
      ? {
          // Warm espresso neutrals
          colorBgBase: '#141009',
          colorBgLayout: '#141009',
          colorBgContainer: '#1e1812',
          colorBgElevated: '#241c14',
          colorBorder: 'rgba(255,250,240,0.10)',
          colorBorderSecondary: 'rgba(255,250,240,0.06)',
          colorTextBase: '#f3ece1',
        }
      : {
          // Warm cream neutrals
          colorBgBase: '#ffffff',
          colorBgLayout: '#f8f3ec',
          colorBgContainer: '#fffdf9',
          colorBgElevated: '#fffdf9',
          colorBorder: 'rgba(40,28,18,0.12)',
          colorTextBase: '#1a1612',
        }),
  },
  components: {
    Layout: {
      headerBg: 'transparent',
      bodyBg: 'transparent',
      footerBg: 'transparent',
    },
    Card: {
      borderRadiusLG: 18,
    },
    Button: {
      controlHeight: 40,
      fontWeight: 600,
      primaryShadow: 'none',
    },
    Menu: {
      itemBg: 'transparent',
      horizontalItemSelectedColor:
        scheme === 'dark' ? brand.inkDark : brand.inkLight,
    },
    Typography: {
      titleMarginBottom: '0.4em',
      titleMarginTop: '0',
    },
  },
})
