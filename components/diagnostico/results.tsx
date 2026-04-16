"use client"

import * as React from "react"
import { AlertTriangle, Check, Lock, ShieldAlert } from "lucide-react"
import { Pill, Reveal, SectionLabel } from "@/components/software-development-website"
import {
  ALL_SCENARIOS,
  WEIGHTS,
  getNivel,
  type QId,
  type ScenarioTone,
} from "./data"
import { cn } from "./parts"

/* ──────────────────────────────────────────────
   SECCIÓN 1 · VEREDICTO (estilo hero)
   ────────────────────────────────────────────── */

export function RiskVerdict({
  score,
  isAtRisk,
  dateStr,
}: {
  score: number
  isAtRisk: (q: QId) => boolean
  dateStr: string
}) {
  const { nivel, pct, tagline, color, bgFill } = getNivel(score)
  const [fillWidth, setFillWidth] = React.useState(0)

  React.useEffect(() => {
    const t = setTimeout(() => setFillWidth(Math.max(pct, 4)), 250)
    return () => clearTimeout(t)
  }, [pct])

  const riskCount = (Object.keys(WEIGHTS) as QId[]).filter((q) => isAtRisk(q)).length
  const toneIsRisk = nivel === "ALTO" || nivel === "CRÍTICO"

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.15] mask-fade-edges" />
        <div
          className={cn(
            "absolute left-1/2 top-[-15%] h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-2xl",
            toneIsRisk
              ? "bg-[radial-gradient(closest-side,hsl(var(--risk)/0.18),transparent_70%)]"
              : "bg-[radial-gradient(closest-side,hsl(var(--safe)/0.14),transparent_70%)]",
          )}
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionLabel>Resultado del diagnóstico</SectionLabel>

        <Reveal delay={0.1}>
          <p className="mt-6 text-sm text-muted-foreground">Nivel de exposición legal</p>
          <h2 className={cn("mt-3 font-display text-6xl font-normal leading-none md:text-7xl", color)}>
            <em className="italic">{nivel}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-foreground/80 md:text-lg">
            {tagline}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mx-auto mt-10 max-w-md">
          <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>BAJO</span>
            <span>MODERADO</span>
            <span>ALTO</span>
            <span>CRÍTICO</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className={cn("h-full rounded-full transition-all duration-1000 ease-out", bgFill)}
              style={{ width: `${fillWidth}%` }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
            <Pill tone={riskCount > 0 ? "risk" : "safe"}>
              <strong className="font-semibold">{riskCount} de 8</strong>
              <span>áreas con deficiencias</span>
            </Pill>
            <Pill>
              <Lock className="size-3" />
              <span>Calculado en su dispositivo</span>
            </Pill>
            <Pill>
              <span className="font-mono tracking-wider">{dateStr}</span>
            </Pill>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECCIÓN 2 · IMPLICACIÓN PERSONAL
   ────────────────────────────────────────────── */

export function PersonalLiability({
  score,
  isAtRisk,
}: {
  score: number
  isAtRisk: (q: QId) => boolean
}) {
  if (score <= 2) return null
  const hasOp = isAtRisk("q3") || isAtRisk("q5") || isAtRisk("q6")
  const hasData = isAtRisk("q1") || isAtRisk("q2") || isAtRisk("q4")
  const hasNoise = isAtRisk("q7") || isAtRisk("q8")

  const lead =
    score > 10
      ? "Si se presenta un incidente hoy, la demanda puede dirigirse a usted en lo personal."
      : "Las deficiencias identificadas generan exposición personal para usted como director."

  const body =
    score > 10
      ? "El Código Civil Federal es explícito: el director asume la responsabilidad civil de los menores bajo su vigilancia. Con múltiples áreas deficientes, no hay documentación que lo proteja."
      : "El Art. 1920 del Código Civil Federal establece que mientras un menor esté bajo vigilancia del colegio, la responsabilidad civil recae en el director personalmente — no solo en la institución."

  const rows: string[] = []
  if (hasOp)
    rows.push(
      "Sin registro documentado de entregas, no puede demostrar que actuó con diligencia. La carga de la prueba se invierte: <strong>usted debe probar que hizo bien las cosas</strong>, no el padre que lo demanda.",
    )
  if (hasData)
    rows.push(
      "El tratamiento de datos sin aviso de privacidad vigente es una infracción personal del responsable del tratamiento. La ley no limita la sanción a la persona moral.",
    )
  if (hasOp || hasData)
    rows.push(
      "Un maestro de guardia que cometa una omisión puede enfrentar proceso penal personal (CPF Art. 335). El colegio responde civil y administrativamente, pero <strong>no puede asumir la responsabilidad penal del individuo</strong>.",
    )
  if (hasNoise) {
    rows.push(
      "Las multas NOM-081 se generan contra el titular de la fuente fija y se acumulan por cada denuncia.",
    )
    rows.push(
      "Un proceso de megáfono no genera ningún registro de entrega. Si hay una demanda civil por entrega indebida, <strong>sin registro esa demostración es imposible</strong>.",
    )
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <Pill tone="risk">
              <ShieldAlert className="size-3" />
              <span>Implicación personal del director</span>
            </Pill>
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">CCF 1920</span>
          </div>

          <h2 className="mt-5 text-balance text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
            <span className="text-risk">{lead}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-[17px]">{body}</p>
        </Reveal>

        {rows.length > 0 && (
          <div className="mt-8 grid gap-3">
            {rows.map((row, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 md:p-5">
                  <div className="mt-1 flex size-6 flex-shrink-0 items-center justify-center rounded-full border border-risk/30 bg-risk-soft text-risk">
                    <AlertTriangle className="size-3" />
                  </div>
                  <div
                    className="text-sm leading-relaxed text-foreground/85 [&_strong]:font-semibold [&_strong]:text-foreground"
                    dangerouslySetInnerHTML={{ __html: row }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECCIÓN 3 · DESGLOSE POR ÁREA
   ────────────────────────────────────────────── */

export function BreakdownGrid({ isAtRisk }: { isAtRisk: (q: QId) => boolean }) {
  const areas: { qs: QId[]; label: string; sub: string }[] = [
    { qs: ["q1", "q2"], label: "Documentación", sub: "Avisos y consentimientos" },
    { qs: ["q3", "q4"], label: "Operación de salida", sub: "Registro y canales" },
    { qs: ["q5", "q6"], label: "Control de información", sub: "Acceso y protocolos" },
    { qs: ["q7", "q8"], label: "Ruido y ambiental", sub: "NOM-081" },
  ]

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>Detalle por área</SectionLabel>
          <h2 className="mt-5 text-center text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
            Dónde está su exposición
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {areas.map((a, i) => {
            const risk = a.qs.some((q) => isAtRisk(q))
            return (
              <Reveal key={a.label} delay={0.1 + i * 0.06}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-4 rounded-2xl border p-5 transition-all md:p-6",
                    risk
                      ? "border-risk/30 bg-card hover:border-risk/50"
                      : "border-safe/30 bg-card hover:border-safe/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Pill tone={risk ? "risk" : "safe"}>
                      {risk ? (
                        <>
                          <AlertTriangle className="size-3" />
                          <span>Requiere atención</span>
                        </>
                      ) : (
                        <>
                          <Check className="size-3" />
                          <span>Conforme</span>
                        </>
                      )}
                    </Pill>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium leading-tight tracking-tight text-foreground">
                      {a.label}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">{a.sub}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECCIÓN 4 · ESCENARIOS
   ────────────────────────────────────────────── */

export function Scenarios({ score, isAtRisk }: { score: number; isAtRisk: (q: QId) => boolean }) {
  const shown = ALL_SCENARIOS.filter((sc) => sc.trigger({ score, isAtRisk })).slice(0, 4)

  const tones: Record<ScenarioTone, "risk" | "primary" | "safe"> = {
    risk: "risk",
    amber: "risk",
    navy: "primary",
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>Escenarios con base en sus respuestas</SectionLabel>
          <h2 className="mt-5 text-center text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
            Lo que puede pasar mañana
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {shown.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl border border-safe/30 bg-card p-8 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-safe-soft text-safe">
                  <Check className="size-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-foreground">
                  Postura de cumplimiento razonable
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Sus respuestas indican que la institución cuenta con los elementos básicos. Continúe
                  fortaleciendo las áreas con oportunidad.
                </p>
              </div>
            </Reveal>
          ) : (
            shown.map((sc, i) => (
              <Reveal key={sc.id} delay={0.1 + i * 0.08}>
                <article className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={tones[sc.tone]}>
                      <span>{sc.icon}</span>
                      <span>Escenario</span>
                    </Pill>
                  </div>
                  <h3 className="mt-4 text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
                    {sc.title}
                  </h3>
                  <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/85 [&_strong]:font-semibold [&_strong]:text-foreground">
                    {sc.body.map((p, j) => (
                      <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
                  <div
                    className={cn(
                      "mt-6 rounded-2xl border-l-2 bg-muted/40 p-4 text-sm leading-relaxed text-foreground/80 md:text-base",
                      sc.tone === "navy" ? "border-primary/60" : "border-risk/60",
                    )}
                  >
                    {sc.consequence}
                  </div>
                </article>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECCIÓN 5 · REFERENCIA DE SANCIONES
   ────────────────────────────────────────────── */

export function FineReference({ isAtRisk }: { isAtRisk: (q: QId) => boolean }) {
  const rows: { label: string; amount: string }[] = []
  if (isAtRisk("q1") || isAtRisk("q2")) {
    rows.push({
      label: "Infracción LFPDPPP — ausencia o deficiencia de aviso de privacidad (Art. 15–16)",
      amount: "$18,000 – $480,000 MXN",
    })
    rows.push({
      label: "Infracción LFPDPPP — datos sensibles de menores sin consentimiento (Art. 9)",
      amount: "$72,000 – $2.4 M MXN",
    })
  }
  if (isAtRisk("q4")) {
    rows.push({
      label: "Tratamiento excesivo / no autorizado de datos personales (LFPDPPP Art. 7)",
      amount: "$36,000 – $1.2 M MXN",
    })
  }
  if (isAtRisk("q7")) {
    rows.push({ label: "NOM-081-SEMARNAT — multa por denuncia de ruido (CDMX)", amount: "$1,194 – $4,342" })
    rows.push({ label: "NOM-081-SEMARNAT — multa máxima por denuncia (Nuevo León)", amount: "Hasta $21,504" })
    rows.push({
      label: "Responsabilidad civil — entrega indebida sin registro (CCF Art. 1910 + 1920)",
      amount: "A determinar por juez",
    })
    rows.push({
      label: "Inversión de carga de la prueba (CCF 1920) — sin registro, no hay defensa",
      amount: "Exposición personal",
    })
  }
  if (isAtRisk("q8")) {
    rows.push({
      label: "Antecedente de queja — reincidencia activa sanción directa sin nueva medición",
      amount: "Desde la primera resolución",
    })
  }
  if (rows.length === 0) {
    rows.push({
      label: "LFPDPPP — rango general de sanciones para responsables privados",
      amount: "$18,000 – $2.4 M MXN",
    })
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>Referencia de sanciones · legislación vigente</SectionLabel>
          <h2 className="mt-5 text-center text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
            El costo potencial
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            {rows.map((r, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start justify-between gap-4 p-5 md:p-6",
                  i !== 0 && "border-t border-border",
                )}
              >
                <span className="flex-1 text-sm leading-relaxed text-foreground/85">{r.label}</span>
                <span className="whitespace-nowrap font-mono text-sm font-medium text-risk">
                  {r.amount}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs italic text-muted-foreground">
            Fuentes: LFPDPPP (DOF), NOM-081-SEMARNAT-1994, UMA 2025. Las sanciones son independientes y
            pueden acumularse. No sustituye asesoría legal profesional.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECCIÓN 6 · VISIÓN (colegios con cumplimiento cerrado)
   ────────────────────────────────────────────── */

export function VisionCard() {
  const items = [
    {
      strong: "Registro digital de cada entrega",
      rest: " con nombre de quien recogió, hora y autorización verificada. Sin depender de la memoria ni de chats de WhatsApp.",
    },
    {
      strong: "Cero datos de alumnos en teléfonos personales",
      rest: " — el personal opera con una herramienta del colegio. La información no sale del entorno institucional.",
    },
    {
      strong: "Proceso silencioso y documentado",
      rest: " sin altavoz, sin llamadas a gritos. Cada entrega queda registrada con timestamp.",
    },
    {
      strong: "Aviso de privacidad actualizado y consentimientos firmados",
      rest: " — si llega un ejercicio ARCO, el expediente se entrega en horas, no en semanas.",
    },
  ]
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>Colegios con cumplimiento cerrado</SectionLabel>
          <h2 className="mt-5 text-balance text-center text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
            Así opera un colegio que <span className="text-safe">ya cerró</span> estas brechas
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-safe/20 bg-card p-5 md:p-6">
                <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-safe-soft text-safe">
                  <Check className="size-4" strokeWidth={2.5} />
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/85">
                  <strong className="font-semibold text-foreground">{it.strong}</strong>
                  {it.rest}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35}>
          <p className="mx-auto mt-8 max-w-xl text-balance text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            Estos colegios no cambiaron sus protocolos a fuerza de abogados. Cambiaron la herramienta que
            usa su personal en la vialidad.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECCIÓN 7 · REPUTACIÓN (cierre emocional)
   ────────────────────────────────────────────── */

export function ReputationCard() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.1] mask-fade-edges" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--risk)/0.12),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>El riesgo que no aparece en ningún expediente</SectionLabel>
          <h2 className="mt-6 text-balance text-center font-display text-4xl font-normal leading-[1.15] text-foreground md:text-5xl">
            La multa se paga una vez.
            <br />
            <em className="italic text-risk">La reputación no se recupera.</em>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-5 text-balance text-[17px] leading-relaxed text-foreground/85 [&_strong]:font-semibold [&_strong]:text-foreground">
          <Reveal delay={0.1}>
            <p>
              Un incidente en la salida escolar no termina cuando la autoridad cierra el expediente. Termina
              — o no termina — en los <strong>grupos de WhatsApp de sus padres.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Un padre le cuenta a otro. Una madre reenvía el mensaje. En 48 horas, familias que estaban
              evaluando opciones para el próximo ciclo lo descartan <strong>sin siquiera llamar.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              <strong>
                El colegio que no puede probar que hizo bien las cosas queda, ante los ojos de las familias,
                como el colegio que las hizo mal.
              </strong>
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p>
              Un colegio de 200 alumnos que pierde 20 familias en un ciclo no solo pierde esa colegiatura —
              pierde las referencias. <strong>Aparece en la matrícula del siguiente agosto.</strong>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <blockquote className="mx-auto mt-12 max-w-xl text-balance border-t border-border pt-8 text-center font-display text-2xl italic leading-relaxed text-muted-foreground md:text-3xl">
            Una familia que se va lleva su colegiatura.
            <br />
            Lleva sus referencias.
            <br />
            <strong className="not-italic font-normal text-risk">
              Y lleva la historia que va a contar.
            </strong>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
