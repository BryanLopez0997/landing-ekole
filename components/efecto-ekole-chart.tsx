"use client"

import * as React from "react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

/* ---------- Data ----------
   Genera la curva de campana: cantidad estimada de padres esperando (eje Y)
   vs minutos relativos a la hora de salida (eje X).
   - "Sin Ekole" (σ=10): la fila tarda ~30 min en disiparse tras la hora de salida.
   - "Con Ekole" (σ_pre=10, σ_post=2): misma llegada de padres, pero se despacha
     rápido — la fila vuelve a 0 aprox. al minuto +5.
   --------------------------------------------------------------- */

function bell(x: number, sigma: number): number {
  return 50 * Math.exp(-(x * x) / (2 * sigma * sigma))
}

function buildData() {
  const rows: { x: number; sinEkole: number; conEkole: number }[] = []
  for (let x = -30; x <= 30; x += 1) {
    const sinEkole = bell(x, 10)
    const conEkole = x <= 0 ? bell(x, 10) : bell(x, 2)
    rows.push({
      x,
      sinEkole: Number(sinEkole.toFixed(2)),
      conEkole: Number(conEkole.toFixed(2)),
    })
  }
  return rows
}

const data = buildData()

/* ---------- Chart colors (design-system tokens) ---------- */
// Resolvemos los tokens HSL a hex aprox para recharts (no acepta hsl(var(...)) directo en algunos contextos)
const COLORS = {
  risk: "#EF4444", // destructive — "Sin Ekole"
  safe: "#10B981", // success — "Con Ekole"
  grid: "#E5E7EB",
  axis: "#9CA3AF",
  axisLabel: "#6B7280",
  navy: "#173E75",
}

/* ---------- Custom tooltip ---------- */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const min = Number(label)
  const sign = min > 0 ? "+" : ""
  const context =
    min === 0
      ? "Hora exacta de salida"
      : min < 0
        ? `${Math.abs(min)} min antes de la salida`
        : `${min} min después de la salida`
  return (
    <div className="rounded-xl border border-border bg-card/95 p-3 text-xs shadow-lg backdrop-blur-sm">
      <div className="mb-1.5 flex items-center justify-between gap-6">
        <span className="font-mono font-semibold text-foreground">
          {sign}
          {min} min
        </span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">eje de tiempo</span>
      </div>
      <div className="mb-2 text-[11px] leading-tight text-muted-foreground">{context}</div>
      <div className="space-y-1">
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full"
                style={{ background: entry.color }}
              />
              <span className="text-foreground/80">
                {entry.dataKey === "conEkole" ? "Con Ekole" : "Sin Ekole"}
              </span>
            </span>
            <span className="font-mono font-semibold text-foreground">
              {Math.round(entry.value)} padres
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Custom legend ---------- */
function ChartLegend() {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
      <div className="flex items-center gap-2">
        <span className="block h-2.5 w-6 rounded-full" style={{ background: COLORS.risk }} />
        <span className="font-medium text-foreground">Sin Ekole</span>
        <span className="text-muted-foreground">· filas de 30 min después de la salida</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="block h-2.5 w-6 rounded-full" style={{ background: COLORS.safe }} />
        <span className="font-medium text-foreground">Con Ekole</span>
        <span className="text-muted-foreground">· filas de 5 min después de la salida</span>
      </div>
    </div>
  )
}

/* ---------- Main component ---------- */

export function EfectoEkoleChart() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Efecto Ekole
          </p>
          <h3 className="mt-1.5 text-xl font-extrabold leading-tight tracking-tight text-primary md:text-2xl">
            Reducción de 30 a 5 minutos de espera
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Basado en un colegio tipo de 300 alumnos en hora pico de salida.
          </p>
        </div>

        {/* KPI pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-safe px-4 py-2 text-sm font-bold text-white shadow-sm">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          70% menos de espera
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-[320px] w-full md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 24 }}>
            <defs>
              <linearGradient id="gradSin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.risk} stopOpacity={0.18} />
                <stop offset="100%" stopColor={COLORS.risk} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradCon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.safe} stopOpacity={0.22} />
                <stop offset="100%" stopColor={COLORS.safe} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.grid}
              vertical={false}
            />

            <XAxis
              dataKey="x"
              type="number"
              domain={[-30, 30]}
              ticks={[-30, -20, -10, 0, 10, 20, 30]}
              tick={{ fill: COLORS.axisLabel, fontSize: 11, fontFamily: "var(--font-mono)" }}
              tickLine={{ stroke: COLORS.axis }}
              axisLine={{ stroke: COLORS.axis }}
              label={{
                value: "Minutos relativos a la hora de salida",
                position: "insideBottom",
                offset: -12,
                style: { fill: COLORS.axisLabel, fontSize: 11, fontWeight: 500 },
              }}
            />

            <YAxis
              domain={[0, 55]}
              ticks={[0, 10, 20, 30, 40, 50]}
              tick={{ fill: COLORS.axisLabel, fontSize: 11, fontFamily: "var(--font-mono)" }}
              tickLine={{ stroke: COLORS.axis }}
              axisLine={{ stroke: COLORS.axis }}
              label={{
                value: "Padres esperando",
                angle: -90,
                position: "insideLeft",
                offset: 16,
                style: { fill: COLORS.axisLabel, fontSize: 11, fontWeight: 500, textAnchor: "middle" },
              }}
            />

            {/* Línea vertical en hora 0 */}
            <ReferenceLine
              x={0}
              stroke={COLORS.navy}
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              label={{
                value: "Hora de salida",
                position: "top",
                fill: COLORS.navy,
                fontSize: 10,
                fontWeight: 600,
              }}
            />

            <Tooltip content={<ChartTooltip />} cursor={{ stroke: COLORS.navy, strokeOpacity: 0.2 }} />

            {/* Áreas (fill suave) + líneas gruesas encima para legibilidad */}
            <Area
              type="monotone"
              dataKey="sinEkole"
              stroke={COLORS.risk}
              strokeWidth={2.5}
              fill="url(#gradSin)"
              name="Sin Ekole"
              dot={false}
              activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: COLORS.risk }}
            />
            <Area
              type="monotone"
              dataKey="conEkole"
              stroke={COLORS.safe}
              strokeWidth={2.5}
              fill="url(#gradCon)"
              name="Con Ekole"
              dot={false}
              activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: COLORS.safe }}
            />

            <Legend content={<ChartLegend />} verticalAlign="bottom" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footnote */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-border pt-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Estimación basada en observación de colegios tipo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-full bg-primary/40" />
          300 alumnos · hora pico
        </span>
      </div>
    </div>
  )
}
