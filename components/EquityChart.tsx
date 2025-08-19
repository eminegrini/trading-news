
'use client'
import { useMemo } from 'react'
export default function EquityChart({series}:{series:{time:string,equity:number}[]}){
  const path = useMemo(()=>{
    if(!series.length) return ''
    const w = 700, h = 200, pad = 30
    const values = series.map(s=>s.equity)
    const min = Math.min(...values), max = Math.max(...values)
    const scaleX = (i:number)=> pad + (i*(w-2*pad))/(series.length-1||1)
    const scaleY = (v:number)=> (max===min) ? h/2 : (h - pad - ((v-min)*(h-2*pad))/(max-min))
    return values.map((v,i)=> `${i===0?'M':'L'} ${scaleX(i)} ${scaleY(v)}`).join(' ')
  },[series])
  return (<svg width={700} height={200} className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800"><path d={path} fill="none" stroke="currentColor" strokeWidth={2}/></svg>)
}
