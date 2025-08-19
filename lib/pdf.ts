
import PDFDocument from 'pdfkit'
import { DateTime } from 'luxon'
type Row = { time: string, side: string, price: number, qty: number, pnl?: number }
export function buildDailyPDF({ date, tz, rows }:{ date: string, tz: string, rows: Row[] }){
  const doc = new PDFDocument({ margin: 40, size: 'A4' }); const chunks: Buffer[] = []; doc.on('data', (c)=> chunks.push(c)); const dt = DateTime.fromISO(date, { zone: tz })
  doc.fontSize(18).text(`Reporte diario - ${dt.toFormat('yyyy-MM-dd')} (${tz})`); doc.moveDown(0.5); doc.fontSize(10).fillColor('#555').text('Órdenes ejecutadas y PnL por operación'); doc.moveDown(1)
  const headers = ['Hora', 'Lado', 'Precio', 'Cantidad', 'PnL'], widths = [150, 80, 100, 100, 100]; let x = doc.x, y = doc.y
  doc.fontSize(11).fillColor('black'); headers.forEach((h,i)=>{ doc.text(h, x, y, { width: widths[i], continued: i !== headers.length-1 }); x += widths[i] }); doc.moveDown(0.5); y = doc.y; doc.moveTo(40, y).lineTo(555, y).stroke()
  rows.forEach(r=>{ let xx = 40; const timeLocal = DateTime.fromISO(r.time, { zone: tz }).toFormat('HH:mm:ss'); const cells = [timeLocal, r.side, r.price.toFixed(2), r.qty.toString(), (typeof r.pnl==='number'?r.pnl.toFixed(2):'-')]; doc.moveDown(0.2); const ystart = doc.y; cells.forEach((c,i)=>{ doc.text(String(c), xx, ystart, { width: widths[i], continued: i !== cells.length-1 }); xx += widths[i] }) })
  doc.end(); return new Promise<Buffer>((resolve)=>{ doc.on('end', ()=> resolve(Buffer.concat(chunks))) })
}
