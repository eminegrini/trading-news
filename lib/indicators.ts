
export function ema(values: number[], period: number){
  if(values.length < period) return []
  const k = 2 / (period + 1)
  const out: number[] = []
  let sma = values.slice(0, period).reduce((a,b)=>a+b,0)/period
  out.push(sma)
  for(let i=period;i<values.length;i++){ sma = values[i]*k + out[out.length-1]*(1-k); out.push(sma) }
  return out
}
export function rsi(values: number[], period = 14){
  if(values.length < period+1) return []
  let gains=0, losses=0
  for(let i=1;i<=period;i++){ const d = values[i]-values[i-1]; if(d>=0) gains+=d; else losses-=d }
  let avgG = gains/period, avgL = losses/period
  const rsis:number[] = [100 - (100/(1 + (avgG/(avgL||1e-9))))]
  for(let i=period+1;i<values.length;i++){
    const d = values[i]-values[i-1]; const g = Math.max(d,0), l = Math.max(-d,0)
    avgG = (avgG*(period-1)+g)/period; avgL = (avgL*(period-1)+l)/period
    const rs = avgG/(avgL||1e-9); rsis.push(100 - (100/(1+rs)))
  }
  return rsis
}
