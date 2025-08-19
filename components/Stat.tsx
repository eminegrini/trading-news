
import { ReactNode } from 'react'
import { Card, CardContent } from './ui/card'
export default function Stat({label, value, icon}:{label:string, value:string|number, icon?:ReactNode}){
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 dark:text-neutral-400">{label}</div>
            <div className="mt-1 text-xl font-semibold">{value}</div>
          </div>
          {icon ? <div className="opacity-70">{icon}</div> : null}
        </div>
      </CardContent>
    </Card>
  )
}
