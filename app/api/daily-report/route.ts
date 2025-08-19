
import { supaService, supaAnon } from '@/lib/supabase'
import { loadConfig } from '@/lib/config'
import { sendMail } from '@/lib/email'
import { buildDailyPDF } from '@/lib/pdf'
import { DateTime } from 'luxon'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET(){
  try{
    const tz = process.env.REPORT_TZ || 'America/Argentina/Buenos_Aires'; const now = DateTime.now().setZone(tz); const start = now.startOf('day'), end = now.endOf('day'); const startUTC = start.toUTC().toISO(), endUTC = end.toUTC().toISO()
    const cfg = await loadConfig(); const to = cfg.reportEmail || process.env.REPORT_EMAIL_TO; if(!to) throw new Error('No hay email destino (config.reportEmail o REPORT_EMAIL_TO)')
    const client = supaAnon ?? supaService; const { data, error } = await client.from('trades').select('*').gte('time', startUTC).lte('time', endUTC).order('time', { ascending: true }); if(error) throw error
    const rows = (data||[]).map((t:any)=>({ time: t.time as string, side: t.side as string, price: Number(t.price), qty: Number(t.qty), pnl: t.pnl !== null ? Number(t.pnl) : undefined }))
    const pdf = await buildDailyPDF({ date: now.toISODate()!, tz, rows }); const subject = `Reporte diario - ${now.toFormat('yyyy-LL-dd')} (${tz})`; const html = `<p>Adjuntamos el reporte diario con las órdenes ejecutadas.</p>`
    await sendMail({ to, subject, html, attachments: [{ filename: `reporte-${now.toFormat('yyyyLLdd')}.pdf`, content: pdf, contentType: 'application/pdf' }] })
    return Response.json({ ok:true, count: rows.length, to, range:{ startUTC, endUTC } })
  } catch (e:any){ return new Response(JSON.stringify({ ok:false, error:e.message }), { status:500 }) }
}
