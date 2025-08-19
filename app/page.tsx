
import Stat from '@/components/Stat'
import TradeTable from '@/components/TradeTable'
import EquityChart from '@/components/EquityChart'
import { loadConfig } from '@/lib/config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { TrendingUp, Activity, Layers } from 'lucide-react'
async function getData(){ const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + '/api/trades' : 'http://localhost:3000/api/trades', { next: { revalidate: 0 } }); return res.json() }
const ConfigForm = dynamic(()=> import('@/components/ConfigForm'), { ssr:false })
export default async function Page(){
  const data = await getData(); const { trades, state, equitySeries } = data; const cfg = await loadConfig()
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <Stat label="Símbolo" value={state.symbol} icon={<Layers/>}/>
        <Stat label="Timeframe" value={state.timeframe} icon={<Activity/>}/>
        <Stat label="Posición" value={state.position ? `${state.position.side} @ ${state.position.entryPrice}` : 'Sin posición'}/>
        <Stat label="Trades" value={trades.length}/>
        <Stat label="Estado" value={cfg.paused ? '⏸ Pausado' : '▶️ Activo'}/>
      </div>
      <Card><CardHeader><CardTitle>Equity (histórico)</CardTitle></CardHeader><CardContent><div className="flex items-center gap-4"><EquityChart series={equitySeries}/><div className="text-sm text-gray-600 dark:text-neutral-400"><div>Último snapshot: {equitySeries?.length ? new Date(equitySeries[equitySeries.length-1].time).toLocaleString() : '-'}</div><div className="mt-2">El bot registra equity en cada tick (cron) para seguimiento.</div></div></div></CardContent></Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><TradeTable trades={trades}/></div>
        <div className="space-y-3">
          <Card><CardHeader><CardTitle>Config estrategia</CardTitle></CardHeader><CardContent><ConfigForm cfg={cfg}/></CardContent></Card>
          <Card><CardHeader><CardTitle>Acciones rápidas</CardTitle></CardHeader><CardContent className="text-sm text-gray-600 dark:text-neutral-400 space-y-2"><div><a className="underline" href="/api/cron">Ejecutar tick ahora</a></div><div><a className="underline" href="/api/daily-report">Enviar reporte inmediato</a></div><div className="text-xs">* Acciones administrativas, requieren sesión iniciada.</div></CardContent></Card>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-neutral-500">* Esto es educativo. No es consejo financiero.</div>
    </div>
  )
}
