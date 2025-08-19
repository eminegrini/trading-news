
import { placeMarketOrder, fetchBalances, fetchLastPrice, getMinAmount } from './exchange'
import type { BotState, Trade } from './storage'
export function qtyFromUSD(usd:number, price:number){ return Number((usd/price).toFixed(6)) }
export async function buyLive(state: BotState, usdToSpend:number){
  const price = await fetchLastPrice(state.symbol); let qty = qtyFromUSD(usdToSpend, price); const { minAmt, minCost } = await getMinAmount(state.symbol)
  if(minAmt && qty < minAmt) qty = minAmt; if(minCost && qty*price < minCost) qty = Math.max(qty, minCost/price)
  const report = await placeMarketOrder(state.symbol, 'buy', qty); state.position = { side:'LONG', entryPrice: report.average || price, qty: report.filled || qty }
  const trade: Trade = { id: crypto.randomUUID(), time:new Date().toISOString(), side:'BUY', price: state.position.entryPrice, qty: state.position.qty, reason:'LIVE market buy', live:true, orderId: report.id }
  return { state, trade }
}
export async function sellLive(state: BotState){
  if(!state.position) return { state, trade: null as Trade|null }
  const qty = state.position.qty; const price = await fetchLastPrice(state.symbol); const report = await placeMarketOrder(state.symbol, 'sell', qty); const avg = report.average || price
  const pnl = (avg - state.position.entryPrice) * qty; state.position = null; const bal = await fetchBalances(state.symbol); const equity = bal.quoteTotal + bal.baseTotal * avg; state.equity = equity
  const trade: Trade = { id: crypto.randomUUID(), time:new Date().toISOString(), side:'SELL', price: avg, qty, pnl, reason:'LIVE market sell', live:true, orderId: report.id }; return { state, trade }
}
export async function refreshEquity(state: BotState){ const price = await fetchLastPrice(state.symbol); const bal = await fetchBalances(state.symbol); state.equity = bal.quoteTotal + bal.baseTotal * price; state.lastClose = price; return state }
