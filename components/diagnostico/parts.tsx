"use client"

import * as React from "react"
import { AlertTriangle, ChevronDown, Info, ShieldAlert } from "lucide-react"
import { Pill, SectionLabel } from "@/components/software-development-website"
import type { Answer, Question } from "./data"

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

/* ---------- Tooltip on focus/hover ---------- */

export function InfoHint({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={label ?? "Más información"}
        className="inline-flex size-4 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Info className="size-2.5" strokeWidth={2.5} />
      </button>
      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-64 -translate-x-1/2 rounded-xl border border-border bg-popover px-3.5 py-2.5 text-left text-xs leading-relaxed text-popover-foreground shadow-lg group-hover:block group-focus-within:block">
        {children}
      </span>
    </span>
  )
}

/* ---------- Reference badge with tooltip ---------- */

export function RefBadge({
  children,
  tooltip,
  tone = "default",
}: {
  children: React.ReactNode
  tooltip: string
  tone?: "default" | "safe" | "risk" | "primary"
}) {
  return (
    <span className="group relative inline-flex">
      <Pill tone={tone}>
        <span className="font-mono text-[10px] tracking-wider">{children}</span>
      </Pill>
      <span className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-xl border border-border bg-popover px-3.5 py-2.5 text-xs leading-relaxed text-popover-foreground shadow-lg group-hover:block group-focus-within:block">
        {tooltip}
      </span>
    </span>
  )
}

/* ──────────────────────────────────────────────
   HERO HEADER (aurora + serif, estilo landing)
   ────────────────────────────────────────────── */

export function DocHeader() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.18] mask-fade-edges" />
        <div className="absolute left-1/2 top-[-15%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.14),transparent_70%)] blur-2xl" />
        <div className="absolute left-[6%] top-[25%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--risk)/0.12),transparent_70%)] blur-3xl" />
        <div className="absolute right-[8%] top-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--safe)/0.10),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionLabel>Diagnóstico Institucional</SectionLabel>

        <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
          ¿Cuál es el nivel de exposición legal de{" "}
          <em className="font-display font-normal italic text-primary">su institución</em>
          ?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-balance text-base text-foreground/70 md:text-lg">
          — y el suyo como director.
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          Evaluación de 8 áreas de cumplimiento. Resultados basados en legislación federal vigente. La
          responsabilidad no recae solo en el colegio.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <RefBadge tone="primary" tooltip="Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Regula cómo los colegios deben manejar información de alumnos y padres.">
            LFPDPPP
          </RefBadge>
          <RefBadge tone="primary" tooltip="Derechos de Acceso, Rectificación, Cancelación y Oposición. Permiten a los padres exigir al colegio la entrega, corrección o eliminación de datos de sus hijos.">
            Derechos ARCO
          </RefBadge>
          <RefBadge tone="primary" tooltip="Norma Oficial Mexicana que establece los límites máximos de emisión de ruido en fuentes fijas. Límite: 55 dB en zonas residenciales.">
            NOM-081-SEMARNAT-1994
          </RefBadge>
          <RefBadge tone="primary" tooltip="Diario Oficial de la Federación. Publicación oficial donde se publican leyes, normas y disposiciones vigentes.">
            DOF vigente 2025
          </RefBadge>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-safe/30 bg-safe-soft px-3.5 py-1.5 text-xs text-safe">
          <span className="relative flex size-1.5 items-center justify-center">
            <span className="absolute inline-flex size-1.5 animate-pulse-dot rounded-full bg-safe/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-safe" />
          </span>
          <span className="font-medium">Confidencial · Se calcula en su dispositivo · 90 segundos</span>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ALERTA LEGAL — cita CCF 1920
   ────────────────────────────────────────────── */

export function AlertBanner() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-risk-soft text-risk">
            <AlertTriangle className="size-4" />
          </div>
          <div>
            <Pill tone="risk">
              <span className="font-mono">CCF Art. 1920</span>
            </Pill>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground/90 md:text-[15px]">
              <strong className="font-semibold text-foreground">
                Cuando un menor está bajo la vigilancia de un director de colegio, la responsabilidad civil
                se transfiere del padre al director.
              </strong>{" "}
              <span className="text-muted-foreground">
                Usted asume esa responsabilidad personalmente — no solo la institución.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   CALLOUT PERSONAL
   ────────────────────────────────────────────── */

export function LiabilityCallout() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,hsl(var(--risk)/0.12),transparent_70%)] blur-3xl" />
      </div>

      <div className="flex items-center gap-2">
        <Pill tone="risk">
          <ShieldAlert className="size-3" />
          <span>Lo que muchos directores no saben</span>
        </Pill>
        <span className="ml-auto font-mono text-[11px] tracking-wider text-muted-foreground">
          CCF 1920 · CPF 335
        </span>
      </div>

      <h2 className="mt-4 max-w-2xl text-balance text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
        La responsabilidad civil es <span className="text-primary">suya</span> — no del colegio.
      </h2>

      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/85">
        <p>
          Cuando un menor está bajo la vigilancia del colegio, la ley transfiere la responsabilidad civil{" "}
          <strong className="font-semibold text-foreground">al director personalmente</strong>. No al colegio
          como entidad — a usted como individuo.
        </p>
        <blockquote className="border-l-2 border-primary/40 pl-5 font-display text-base italic leading-relaxed text-muted-foreground md:text-lg">
          "Cesa la responsabilidad de los padres cuando los menores ejecuten los actos encontrándose bajo la
          vigilancia y autoridad de otras personas, como directores de colegios… pues entonces{" "}
          <strong className="not-italic font-semibold text-foreground">
            esas personas asumirán la responsabilidad
          </strong>
          ."
          <footer className="mt-2 font-sans text-xs not-italic tracking-wider text-muted-foreground">
            — CÓDIGO CIVIL FEDERAL, ART. 1920
          </footer>
        </blockquote>
        <p>
          Ante un incidente en la salida escolar, un padre puede demandar tanto al colegio como a{" "}
          <strong className="font-semibold text-foreground">usted en lo personal</strong>.
        </p>
        <p className="rounded-xl bg-muted/50 p-4 text-sm">
          En 2025, un tribunal en Baja California condenó a un maestro a prisión personal por no llevar a
          urgencias a un alumno que se golpeó en clase.{" "}
          <strong className="font-semibold text-foreground">El maestro respondió con su libertad.</strong>
        </p>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   PROGRESS BAR
   ────────────────────────────────────────────── */

export function ProgressBar({ answered, total }: { answered: number; total: number }) {
  const pct = Math.round((answered / total) * 100)
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Progreso
        </span>
        <span className="font-mono text-[11px] tracking-wider text-foreground">
          {answered}<span className="text-muted-foreground">/{total}</span>
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   SECTION HEADER (cada área del diagnóstico)
   ────────────────────────────────────────────── */

export function SectionHeader({
  num,
  title,
  subtitle,
}: {
  num: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground">{num}</span>
      <div>
        <h3 className="text-lg font-medium leading-tight tracking-tight text-foreground md:text-xl">
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   QUESTION BLOCK (rediseñado)
   ────────────────────────────────────────────── */

export function QuestionBlock({
  question,
  answer,
  atRisk,
  onAnswer,
}: {
  question: Question
  answer: Answer | undefined
  atRisk: boolean
  onAnswer: (a: Answer) => void
}) {
  const [hintOpen, setHintOpen] = React.useState(!question.hintCollapsible)
  const answered = answer !== undefined

  return (
    <div
      className={cn(
        "group/qb relative rounded-2xl border bg-card p-5 transition-all md:p-6",
        atRisk
          ? "border-risk/40 shadow-[0_0_0_3px_hsl(var(--risk)/0.06)]"
          : answered
            ? "border-safe/30 shadow-[0_0_0_3px_hsl(var(--safe)/0.05)]"
            : "border-border hover:border-border/50 hover:shadow-sm",
      )}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
              {question.num}
            </span>
            <RefBadge tooltip={question.refTooltip}>{question.ref}</RefBadge>
          </div>

          <p className="text-balance text-[15px] font-medium leading-snug text-foreground md:text-base">
            {question.text}
          </p>

          {question.hintCollapsible ? (
            <>
              <button
                type="button"
                onClick={() => setHintOpen((v) => !v)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                ¿Por qué importa?
                <ChevronDown
                  className={cn("size-3 transition-transform", hintOpen && "rotate-180")}
                />
              </button>
              {hintOpen && (
                <p className="mt-2 border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground">
                  {question.hint}
                </p>
              )}
            </>
          ) : (
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{question.hint}</p>
          )}

          {atRisk && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-risk/30 bg-risk-soft/50 px-3 py-2">
              <AlertTriangle className="mt-0.5 size-3.5 flex-shrink-0 text-risk" />
              <span className="text-xs leading-relaxed text-risk">{question.feedback}</span>
            </div>
          )}
        </div>

        {/* Answer pills */}
        <div className="flex flex-shrink-0 items-center gap-2 md:flex-col md:items-stretch md:pt-8">
          {(["si", "no"] as const).map((v) => {
            const active = answer === v
            const activeRisk = active && atRisk
            const activeSafe = active && !atRisk
            return (
              <button
                key={v}
                type="button"
                onClick={() => onAnswer(v)}
                className={cn(
                  "relative rounded-full px-6 py-2 font-sans text-sm font-semibold uppercase tracking-wider transition-all md:min-w-[84px]",
                  !active &&
                    "border border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-foreground",
                  activeSafe &&
                    "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30",
                  activeRisk &&
                    "bg-risk text-risk-foreground shadow-sm ring-1 ring-risk/30",
                )}
              >
                {v.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
