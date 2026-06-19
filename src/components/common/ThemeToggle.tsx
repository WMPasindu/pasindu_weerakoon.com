import { Button, Tooltip } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/theme/theme-context'

/** Animated light/dark toggle that rotates the icon on switch. */
export function ThemeToggle() {
  const { scheme, toggleScheme } = useTheme()
  const isDark = scheme === 'dark'

  return (
    <Tooltip title={isDark ? 'Switch to light' : 'Switch to dark'}>
      <Button
        shape="circle"
        type="text"
        onClick={toggleScheme}
        aria-label="Toggle color theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={scheme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'inline-flex' }}
          >
            {isDark ? <SunOutlined /> : <MoonOutlined />}
          </motion.span>
        </AnimatePresence>
      </Button>
    </Tooltip>
  )
}
