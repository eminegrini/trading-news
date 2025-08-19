
import { Card, CardContent } from '@/components/ui/card'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

type Trade = { id:string; time:string; side:'BUY'|'SELL'; price:number; qty:number; pnl?:number; reason:string; live?:boolean; };
export default function TradeTable({ trades }: { trades: Trade[] }) {
  return (
    <Card>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <THead>
              <tr>
                <TH>Hora</TH><TH>Lado</TH><TH>Precio</TH><TH>Cantidad</TH><TH>PnL</TH><TH>Origen</TH><TH>Motivo</TH>
              </tr>
            </THead>
            <TBody>
              {trades.slice().reverse().map(t => (
                <TR key={t.id}>
                  <TD>{new Date(t.time).toLocaleString()}</TD>
                  <TD>{t.side==='BUY' ? <Badge color="green">BUY</Badge> : <Badge color="red">SELL</Badge>}</TD>
                  <TD>{t.price.toFixed(2)}</TD>
                  <TD>{t.qty}</TD>
                  <TD className={`${typeof t.pnl==='number' ? (t.pnl>=0?'text-emerald-600':'text-rose-500') : ''}`}>{typeof t.pnl==='number' ? t.pnl.toFixed(2) : '-'}</TD>
                  <TD>{t.live ? <Badge color="blue">LIVE</Badge> : <Badge>Paper</Badge>}</TD>
                  <TD className="max-w-[320px] truncate">{t.reason}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </CardContent>
    </Card>)
}
