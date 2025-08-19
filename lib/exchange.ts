
import ccxt from 'ccxt'
export type Candle = [number, number, number, number, number, number]
const EXCHANGE = process.env.EXCHANGE || 'binance'
const TIMEFRAME = process.env.TIMEFRAME || '1m'
const SANDBOX = (process.env.SANDBOX || 'false').toLowerCase() === 'true'
export function parseSymbol(sym: string){ const [base, quote] = sym.split('/'); return { base, quote } }
export function getExchange(){
  const Cls: any = (ccxt as any)[EXCHANGE]; if(!Cls) throw new Error(`Exchange no soportado: ${EXCHANGE}`)
  const ex: any = new Cls({ enableRateLimit:true, apiKey:process.env.API_KEY||undefined, secret:process.env.API_SECRET||undefined, options:{ defaultType:'spot' } })
  if(SANDBOX && ex.setSandboxMode) ex.setSandboxMode(true); return ex
}
export async function fetchCandles(symbol: string, limit = 200): Promise<Candle[]> { const ex=getExchange(); await ex.loadMarkets(); return await ex.fetchOHLCV(symbol, TIMEFRAME, undefined, limit) as Candle[] }
export async function fetchLastPrice(symbol:string): Promise<number>{ const ex=getExchange(); await ex.loadMarkets(); const t = await ex.fetchTicker(symbol); return Number(t.last||t.close) }
export type OrderReport = { id:string; average:number; filled:number; cost:number; status:string }
export async function placeMarketOrder(symbol:string, side:'buy'|'sell', amount:number): Promise<OrderReport>{
  const LIVE = (process.env.LIVE || 'false').toLowerCase() === 'true'; if(!LIVE) throw new Error('LIVE=false: no se permiten órdenes en vivo.')
  const ex=getExchange(); await ex.loadMarkets(); const order = await ex.createOrder(symbol,'market',side,amount); const avg = Number(order.average || (order.cost && order.filled ? order.cost/order.filled : NaN))
  return { id:String(order.id), average:avg, filled:Number(order.filled||0), cost:Number(order.cost||(avg?avg*order.filled:0)), status:String(order.status||'unknown') }
}
export async function fetchBalances(symbol:string){ const ex=getExchange(); await ex.loadMarkets(); const {base,quote}=parseSymbol(symbol); const bal=await ex.fetchBalance(); return { base, quote, baseTotal:Number(bal.total?.[base]??0), quoteTotal:Number(bal.total?.[quote]??0), baseFree:Number(bal.free?.[base]??0), quoteFree:Number(bal.free?.[quote]??0) } }
export async function getMinAmount(symbol:string){ const ex=getExchange(); await ex.loadMarkets(); const m = ex.market(symbol); const minAmt=m?.limits?.amount?.min, minCost=m?.limits?.cost?.min; return { minAmt:(typeof minAmt==='number'?minAmt:0), minCost:(typeof minCost==='number'?minCost:0) } }
