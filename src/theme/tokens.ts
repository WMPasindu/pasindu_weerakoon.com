import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

export type ColorScheme = 'light' | 'dark'

/**
 * Brand palette. These CSS variables are also mirrored in global.css so that
 * non-antd surfaces (gradients, custom canvases) stay in sync with the theme.
 */
export const brand = {
  /** Royal blue primary on a clean white base. */
  primaryLight: '#2563eb',
  primaryDark: '#3b82f6',
  accent: '#2563eb',
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
    colorPrimary: scheme === 'dark' ? brand.primaryDark : brand.primaryLight,
    colorInfo: scheme === 'dark' ? brand.primaryDark : brand.primaryLight,
    colorLink: scheme === 'dark' ? brand.primaryDark : brand.primaryLight,
    colorLinkHover: scheme === 'dark' ? '#60a5fa' : '#1d4ed8',
    ...(scheme === 'dark'
      ? {
          // Cool slate neutrals
          colorBgBase: '#0a0f1e',
          colorBgLayout: '#0a0f1e',
          colorBgContainer: '#111a2e',
          colorBgElevated: '#15203a',
          colorBorder: 'rgba(226,236,245,0.12)',
          colorBorderSecondary: 'rgba(226,236,245,0.07)',
          colorTextBase: '#e6ecf5',
        }
      : {
          // Clean white neutrals
          colorBgBase: '#ffffff',
          colorBgLayout: '#f7f9fc',
          colorBgContainer: '#ffffff',
          colorBgElevated: '#ffffff',
          colorBorder: 'rgba(15,23,42,0.10)',
          colorBorderSecondary: 'rgba(15,23,42,0.06)',
          colorTextBase: '#0f172a',
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
        scheme === 'dark' ? brand.primaryDark : brand.primaryLight,
    },
    Typography: {
      titleMarginBottom: '0.4em',
      titleMarginTop: '0',
    },
  },
})
