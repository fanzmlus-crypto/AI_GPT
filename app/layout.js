import './globals.css'

export const metadata = {
  title: 'WormGPT - Premium Unlocked',
  description: 'WormGPT Premium - Unrestricted AI Access',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-worm-bg font-mono">
        {children}
      </body>
    </html>
  )
}
