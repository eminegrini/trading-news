
import nodemailer from 'nodemailer'
export async function sendMail({ to, subject, text, html, attachments }:{ to:string, subject:string, text?:string, html?:string, attachments?:{ filename:string, content:Buffer, contentType?:string }[] }){
  const host = process.env.SMTP_HOST as string, port = Number(process.env.SMTP_PORT||587), user = process.env.SMTP_USER as string, pass = process.env.SMTP_PASS as string, from = process.env.REPORT_EMAIL_FROM || `Bot Trading <no-reply@localhost>`
  if(!host || !user || !pass) throw new Error('SMTP no configurado')
  const transporter = nodemailer.createTransport({ host, port, secure: port===465, auth:{ user, pass } })
  await transporter.sendMail({ from, to, subject, text, html, attachments })
}
