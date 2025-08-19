
'use server'
import { saveConfig, type StrategyConfig, loadConfig } from '@/lib/config'
export async function saveConfigAction(formData: FormData){
  const cfgPrev = await loadConfig()
  const cfg: StrategyConfig = {
    fast: Number(formData.get('fast')),
    slow: Number(formData.get('slow')),
    rsiPeriod: Number(formData.get('rsiPeriod')),
    rsiMin: Number(formData.get('rsiMin')),
    riskPerTradeUSD: Number(formData.get('riskPerTradeUSD')),
    takeProfitPct: Number(formData.get('takeProfitPct')),
    stopLossPct: Number(formData.get('stopLossPct')),
    paused: formData.get('paused') ? true : false,
    reportEmail: (formData.get('reportEmail') as string || '').trim() || null,
  }
  if(!formData.has('paused')) cfg.paused = cfgPrev.paused
  await saveConfig(cfg)
}
