import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Campus Impact — Creating What\'s Next',
  description: 'A one-day hands-on creative media workshop across 5 tracks — Direction, Acting, Photography, Videography, and Modeling — followed by a live Reel Competition open to all students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
