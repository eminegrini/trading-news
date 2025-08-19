
import { ema, rsi } from './indicators'
import type { Candle } from './exchange'
import type { BotState, Trade } from './storage'
export type StrategyConfig = { fast:number; slow:number; rsiPeriod:number; rsiMin:number; riskPerTradeUSD:number; takeProfitPct:number; stopLossPct:number; }
export function evaluate(candles: Candle[], state: BotState, cfg: StrategyConfig){
  const closes = candles.map(c => c[4])
  if (closes.length < Math.max(cfg.slow+2, cfg.rsiPeriod+2)) return { signal: 'HOLD' as const, reason: 'Datos insuficientes', lastClose: closes[closes.length-1] }
  const eFast = ema(closes, cfg.fast), eSlow = ema(closes, cfg.slow), r = rsi(closes, cfg.rsiPeriod)
  const lastClose = closes[closes.length-1], prevCross = eFast[eFast.length-2]-eSlow[eSlow.length-2], nowCross = eFast[eFast.length-1]-eSlow[eSlow.length-1], lastRsi = r[r.length-1]
  let signal:'BUY'|'SELL'|'HOLD'='HOLD', reason='Sin señal'
  if(!state.position){ if(prevCross<=0 && nowCross>0 && lastRsi>=cfg.rsiMin){ signal='BUY'; reason=`Cruce EMA ${cfg.fast}/${cfg.slow} al alza y RSI ${lastRsi.toFixed(1)}>=${cfg.rsiMin}` } }
  else { const entry=state.position.entryPrice, pnlPct=(lastClose-entry)/entry
    if(pnlPct>=cfg.takeProfitPct){ signal='SELL'; reason=`TP ${(cfg.takeProfitPct*100).toFixed(1)}%` }
    else if(pnlPct<=-cfg.stopLossPct){ signal='SELL'; reason=`SL ${(cfg.stopLossPct*100).toFixed(1)}%` }
    else if(prevCross>=0 && nowCross<0){ signal='SELL'; reason='Cruce EMA a la baja' }
  }
  return { signal, reason, lastClose }
}
export function calcQtyUSD(equityUSD:number, price:number, riskPerTradeUSD:number){
  const assumedRiskPct=0.01, usd=Math.min(riskPerTradeUSD, equityUSD*0.1); return Math.max(0, Number((usd/(price*assumedRiskPct)).toFixed(5)))
}
export function applyPaperTrade(state: BotState, signal:'BUY'|'SELL'|'HOLD', price:number, reason:string){
  let trade: Trade | null = null
  if(signal==='BUY' && !state.position){ const qty = calcQtyUSD(state.equity, price, 10); state.position = { side:'LONG', entryPrice:price, qty }; trade = { id: crypto.randomUUID(), time: new Date().toISOString(), side:'BUY', price, qty, reason } }
  else if(signal==='SELL' && state.position){ const { qty, entryPrice } = state.position; const pnl = (price-entryPrice)*qty; state.equity += pnl; trade = { id: crypto.randomUUID(), time:new Date().toISOString(), side:'SELL', price, qty, pnl, reason }; state.position = null }
  state.lastClose = price; return { state, trade }
}
