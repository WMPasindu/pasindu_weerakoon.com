import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { FloatButton, Spin } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'
import { ScrollProgressBar } from './ScrollProgressBar'

/**
 * Application shell: fixed navbar, animated page outlet, footer, plus the
 * cross-cutting reading-progress bar and scroll helpers.
 */
export function AppLayout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar />
      <main id="main" className="app-main">
        <Suspense
          fallback={
            <div className="route-fallback">
              <Spin size="large" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatButton.BackTop
        visibilityHeight={600}
        icon={<ArrowUpOutlined />}
        aria-label="Back to top"
      />
    </div>
  )
}
