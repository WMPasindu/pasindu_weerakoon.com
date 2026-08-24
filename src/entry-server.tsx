import { renderToString } from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router'
import type { RouteObject } from 'react-router-dom'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { AppLayout } from '@/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export { routeMeta } from '@/config/routeMeta'

/**
 * Synchronous route tree (no lazy()) used only for build-time prerendering, so
 * renderToString captures the real single-page content rather than a Suspense
 * fallback. The client app keeps its own code-split router untouched.
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

/** Renders the app for a given path to a static HTML string. */
export async function render(url: string): Promise<string> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`http://localhost${url}`))
  if (context instanceof Response) return ''
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <ThemeProvider>
      <StaticRouterProvider router={router} context={context} />
    </ThemeProvider>,
  )
}
