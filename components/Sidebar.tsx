
import Link from 'next/link'
export default function Sidebar(){
  return (
    <aside className="hidden md:block sticky top-0 h-screen w-64 border-r bg-white/60 backdrop-blur dark:bg-neutral-950/40 dark:border-neutral-800">
      <div className="p-4">
        <div className="text-xl font-bold">🤖 Bot Trader</div>
        <div className="mt-6 space-y-2 text-sm">
          <Link href="/" className="block rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800">Dashboard</Link>
          <a href="/api/cron" className="block rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800">Tick ahora</a>
          <a href="/api/daily-report" className="block rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800">Enviar reporte</a>
        </div>
      </div>
    </aside>
  )
}
