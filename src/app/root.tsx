import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import faviconUrl from '@assets/icons/favicon.svg?url'
import type { Route } from './+types/root'

import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: faviconUrl, type: 'image/svg+xml' },
]

export function Layout(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#08090b" />
        <meta name="description" content="Находи своих через музыку. Создавай комнаты, зови друзей и слушай вместе." />
        <title>RoomMood — слушай музыку вместе</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1 className="mb-4 text-4xl font-bold">{message}</h1>
      <p className="mb-4">{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
