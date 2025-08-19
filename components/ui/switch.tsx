
'use client'
import { useState } from 'react'
export function Switch({checked, onChange}:{checked:boolean, onChange:(v:boolean)=>void}){
  const [c, setC] = useState(checked)
  const toggle = ()=>{ setC(!c); onChange(!c) }
  return (
    <button type="button" onClick={toggle} className={`relative h-7 w-12 rounded-full ${c?'bg-emerald-500':'bg-gray-300'} transition`}>
      <span className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition ${c?'translate-x-5':''}`}/>
    </button>
  )
}
