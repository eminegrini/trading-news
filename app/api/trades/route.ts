
import { loadTrades, loadState, loadEquityHistory } from '@/lib/storage'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET(){ const [trades, state, equitySeries] = await Promise.all([loadTrades(), loadState(), loadEquityHistory(1000)]); const equity = equitySeries.map(e=>e.equity); return Response.json({ trades, state, equitySeries, equity }) }
