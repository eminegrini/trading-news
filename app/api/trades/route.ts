import { loadTrades, loadState, loadEquityHistory } from "@/lib/storage";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  try {
    const [trades, state, equitySeries] = await Promise.all([
      loadTrades(),
      loadState(),
      loadEquityHistory(1000),
    ]);
    const equity = equitySeries.map((e) => e.equity);
    return Response.json({ trades, state, equitySeries, equity });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Error desconocido", stack: err?.stack },
      { status: 500 }
    );
  }
}
