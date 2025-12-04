import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Midnight at the Voss Manor - A Ghost Story in Five Acts',
  description: 'Five AI ghosts trapped in a mansion, their memories scattered. Help them remember, solve puzzles, and uncover the tragic truth.',
  icons: {
    icon: '/images/icon_kiro.png',
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
