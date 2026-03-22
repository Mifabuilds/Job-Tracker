import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jobbr — Job Application Tracker',
  description: 'Track every job application in one place',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
