
'use client'
import { getBrowserSupabase } from '@/lib/supabase.browser'
import { useEffect, useState } from 'react'
export default function AuthBar(){
  const [email, setEmail] = useState<string>('')
  useEffect(()=>{ getBrowserSupabase().auth.getUser().then(({data})=>{ if(data.user?.email) setEmail(data.user.email) }) }, [])
  async function logout(){ await getBrowserSupabase().auth.signOut(); window.location.href = '/login' }
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-600 dark:text-neutral-400">{email||''}</span>
      <button onClick={logout} className="rounded-xl border px-3 py-1 dark:border-neutral-700">Salir</button>
    </div>
  )
}
