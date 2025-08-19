
export function Badge({children, color='gray'}:{children:any,color?:'gray'|'green'|'red'|'blue'}){
  const map:any = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    red: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  }
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${map[color]}`}>{children}</span>
}
