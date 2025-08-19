
import { ReactNode } from 'react'
export function Card({children, className}:{children:ReactNode, className?:string}){
  return <div className={`rounded-2xl border bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800 ${className||''}`}>{children}</div>
}
export function CardHeader({children,className}:{children:ReactNode,className?:string}){
  return <div className={`p-4 border-b dark:border-neutral-800 ${className||''}`}>{children}</div>
}
export function CardContent({children,className}:{children:ReactNode,className?:string}){
  return <div className={`p-4 ${className||''}`}>{children}</div>
}
export function CardTitle({children}:{children:ReactNode}){
  return <h3 className="text-sm font-medium text-gray-600 dark:text-neutral-400">{children}</h3>
}
