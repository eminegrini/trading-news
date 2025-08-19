
import { ButtonHTMLAttributes } from 'react'
export function Button({className, ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {variant?:'primary'|'outline'|'ghost'}){
  const base = 'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm transition'
  const variant = props.variant==='outline' ? 'border dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800'
    : props.variant==='ghost' ? 'hover:bg-gray-100 dark:hover:bg-neutral-800'
    : 'bg-black text-white hover:bg-neutral-800'
  return <button {...props} className={`${base} ${variant} ${className||''}`}/>
}
