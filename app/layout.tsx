
import './globals.css'
import type { Metadata } from 'next'
import AuthBar from '@/components/AuthBar'
import Sidebar from '@/components/Sidebar'
import ThemeToggle from '@/components/ThemeToggle'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = { title: 'Trading Bot Dashboard', description: 'EMA+RSI · Spot LIVE/Paper · Supabase' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="flex">
            <Sidebar/>
            <div className="flex-1">
              <header className="border-b dark:border-neutral-800">
                <div className="container-pro flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">Estrategia EMA+RSI · LIVE/Paper · Supabase</p>
                  </div>
                  <div className="flex items-center gap-2"><ThemeToggle/><AuthBar/></div>
                </div>
              </header>
              <main className="container-pro">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
