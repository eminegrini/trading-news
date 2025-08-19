
'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
export default function ThemeToggle(){
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'
  return (
    <button onClick={()=> setTheme(dark ? 'light' : 'dark')} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm dark:border-neutral-700">
      {dark ? <Sun size={16}/> : <Moon size={16}/>}
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}
