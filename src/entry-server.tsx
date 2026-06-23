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
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { ContactPage } from '@/pages/ContactPage'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { articles } from '@/data/articles'

export { routeMeta } from '@/config/routeMeta'

/** Lightweight per-article metadata for the prerender (no markdown body). */
export const articleMeta = articles.map((a) => ({
  slug: a.slug,
  title: a.title,
  description: a.description,
  date: a.date,
  tags: a.tags,
}))

/**
 * Synchronous route tree (no lazy()) used only for build-time prerendering, so
 * renderToString captures real page content rather than the Suspense fallback.
 * The client app keeps its own code-split router untouched.
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/:slug', element: <ArticleDetailPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> },
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
