
import { InputHTMLAttributes } from 'react'
export function Input(props: InputHTMLAttributes<HTMLInputElement>){
  return <input {...props} className={`w-full rounded-xl border px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-800 ${props.className||''}`} />
}
