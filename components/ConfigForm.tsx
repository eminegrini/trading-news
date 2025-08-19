"use client";
// Eliminado useFormStatus, se usará useState para el estado de envío
import { saveConfigAction } from "@/app/actions";
import { useState } from "react";
type Config = {
  fast: number;
  slow: number;
  rsiPeriod: number;
  rsiMin: number;
  riskPerTradeUSD: number;
  takeProfitPct: number;
  stopLossPct: number;
  paused: boolean;
  reportEmail?: string | null;
};

export default function ConfigForm({ cfg }: { cfg: Config }) {
  const [paused, setPaused] = useState(cfg.paused);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    // Permitir que el action de Next.js maneje el submit
    // pero también podrías hacer un fetch manual aquí si lo deseas
    // setTimeout es solo para simular el guardado
    setTimeout(() => setPending(false), 2000);
  };

  return (
    <form
      action={saveConfigAction}
      className="grid grid-cols-2 gap-3"
      onSubmit={handleSubmit}
    >
      <Toggle paused={paused} onChange={setPaused} />
      <input type="hidden" name="paused" value={paused ? "on" : ""} />
      <Field name="fast" label="EMA rápida" defaultValue={cfg.fast} />
      <Field name="slow" label="EMA lenta" defaultValue={cfg.slow} />
      <Field
        name="rsiPeriod"
        label="RSI periodo"
        defaultValue={cfg.rsiPeriod}
      />
      <Field name="rsiMin" label="RSI mínimo" defaultValue={cfg.rsiMin} />
      <Field
        name="takeProfitPct"
        label="TP %"
        step="0.001"
        defaultValue={cfg.takeProfitPct}
      />
      <Field
        name="stopLossPct"
        label="SL %"
        step="0.001"
        defaultValue={cfg.stopLossPct}
      />
      <Field
        name="riskPerTradeUSD"
        label="Riesgo USD"
        step="1"
        defaultValue={cfg.riskPerTradeUSD}
      />
      <label className="col-span-2 text-sm">
        <div className="text-gray-600 dark:text-neutral-400">
          Email para reporte diario (PDF)
        </div>
        <input
          name="reportEmail"
          type="email"
          placeholder="tu@mail.com"
          defaultValue={cfg.reportEmail ?? ""}
          className="mt-1 w-full rounded-xl border p-2 dark:bg-neutral-900 dark:border-neutral-800"
        />
        <div className="text-xs text-gray-500 mt-1">
          Se envía todos los días 22:00 (America/Argentina/Buenos_Aires)
        </div>
      </label>
      <div className="col-span-2 flex justify-end">
        <button
          className="rounded-lg bg-black px-4 py-2 text-white"
          disabled={pending}
        >
          {pending ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
function Field({
  name,
  label,
  defaultValue,
  step,
}: {
  name: string;
  label: string;
  defaultValue: number;
  step?: string;
}) {
  return (
    <label className="text-sm">
      <div className="text-gray-600 dark:text-neutral-400">{label}</div>
      <input
        name={name}
        type="number"
        step={step || "1"}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border p-2 dark:bg-neutral-900 dark:border-neutral-800"
      />
    </label>
  );
}
function Toggle({
  paused,
  onChange,
}: {
  paused: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="col-span-2 flex items-center justify-between rounded-xl border p-3 dark:border-neutral-800">
      <div>
        <div className="text-sm font-medium">Estado del bot</div>
        <div className="text-xs text-gray-600 dark:text-neutral-400">
          {paused
            ? "Pausado: no abrirá/cerrará posiciones"
            : "Activo: operará según señales"}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!paused)}
        className={`relative h-8 w-14 rounded-full transition ${
          paused ? "bg-gray-300" : "bg-emerald-500"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition ${
            paused ? "translate-x-0" : "translate-x-6"
          }`}
        />
      </button>
    </div>
  );
}
