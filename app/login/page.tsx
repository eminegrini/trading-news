
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserSupabase } from '@/lib/supabase.browser'
export default function LoginPage(){
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [loading, setLoading] = useState(false), [error, setError] = useState<string|null>(null)
  const router = useRouter()
  async function onLogin(e: any){ e.preventDefault(); setLoading(true); setError(null)
    try{ const supa = getBrowserSupabase(); const { error } = await supa.auth.signInWithPassword({ email, password }); if(error) throw error; router.push('/') }catch(err:any){ setError(err.message||'Error') }finally{ setLoading(false) } }
  async function onSignup(e: any){ e.preventDefault(); setLoading(true); setError(null)
    try{ const supa = getBrowserSupabase(); const { error } = await supa.auth.signUp({ email, password }); if(error) throw error; router.push('/') }catch(err:any){ setError(err.message||'Error') }finally{ setLoading(false) } }
  return (<main className="mx-auto max-w-sm p-6 space-y-4">
    <h1 className="text-2xl font-bold">Ingresá al panel</h1>
    <form className="space-y-3" onSubmit={onLogin}>
      <input className="w-full rounded-lg border p-2" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <input className="w-full rounded-lg border p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      {error && <div className="text-sm text-rose-600">{error}</div>}
      <button disabled={loading} className="w-full rounded-lg bg-black px-3 py-2 text-white">{loading?'Cargando...':'Entrar'}</button>
    </form>
    <div className="text-sm text-gray-600">¿No tenés cuenta? <button onClick={onSignup} className="text-blue-600 underline">Crear cuenta</button></div>
  </main>)
}
