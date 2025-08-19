
import { fetchCandles } from '@/lib/exchange'
import { evaluate, applyPaperTrade } from '@/lib/strategy'
import { loadState, saveState, appendTrade, appendEquity } from '@/lib/storage'
import { buyLive, sellLive, refreshEquity } from '@/lib/live'
import { loadConfig } from '@/lib/config'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
const LIVE = (process.env.LIVE || 'false').toLowerCase() === 'true'
export async function GET(){ return run() } export async function POST(){ return run() }
async function run(){
  const state = await loadState(); const cfg = await loadConfig()
  const candles = await fetchCandles(state.symbol, 300)
  const { signal, reason, lastClose } = evaluate(candles, state, { fast:cfg.fast, slow:cfg.slow, rsiPeriod:cfg.rsiPeriod, rsiMin:cfg.rsiMin, riskPerTradeUSD:cfg.riskPerTradeUSD, takeProfitPct:cfg.takeProfitPct, stopLossPct:cfg.stopLossPct })
  const before = structuredClone(state); let trade = null
  if(cfg.paused){ state.lastClose = lastClose; await refreshEquity(state) }
  else if(LIVE){ await refreshEquity(state); if(signal==='BUY' && !state.position){ const usdToSpend = Math.min(cfg.riskPerTradeUSD, state.equity*0.1); const result = await buyLive(state, usdToSpend); trade = result.trade } else if(signal==='SELL' && state.position){ const result = await sellLive(state); trade = result.trade } }
  else { const result = applyPaperTrade(state, signal, lastClose, reason); trade = result.trade }
  await saveState(state); await appendEquity(state.equity, state.lastClose); if(trade){ await appendTrade(trade) }
  return Response.json({ before, after: state, trade: trade || null, signal, reason, price: lastClose, live: LIVE, cfg })
}
