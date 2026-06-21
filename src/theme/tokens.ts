import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

export type ColorScheme = 'light' | 'dark'

/**
 * Brand palette. These CSS variables are also mirrored in global.css so that
 * non-antd surfaces (gradients, custom canvases) stay in sync with the theme.
 */
export const brand = {
  /** Deep teal primary with a golden accent, on a warm cream base. */
  primaryLight: '#15695e',
  primaryDark: '#4fb39c',
  accent: '#f2a73b',
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
    colorLinkHover: scheme === 'dark' ? '#74c9b4' : '#0f4e45',
    ...(scheme === 'dark'
      ? {
          // Deep teal neutrals
          colorBgBase: '#0e1f1c',
          colorBgLayout: '#0e1f1c',
          colorBgContainer: '#16302c',
          colorBgElevated: '#1b3a35',
          colorBorder: 'rgba(231,236,228,0.12)',
          colorBorderSecondary: 'rgba(231,236,228,0.07)',
          colorTextBase: '#eaf0e8',
        }
      : {
          // Warm cream neutrals
          colorBgBase: '#f6f2e9',
          colorBgLayout: '#f6f2e9',
          colorBgContainer: '#ffffff',
          colorBgElevated: '#ffffff',
          colorBorder: 'rgba(27,58,54,0.12)',
          colorBorderSecondary: 'rgba(27,58,54,0.07)',
          colorTextBase: '#1b3a36',
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
