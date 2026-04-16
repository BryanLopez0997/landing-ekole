"use client"

import * as React from "react"
import { ArrowRight, Check, Lock, Share2, Shield } from "lucide-react"
import { Pill, Reveal, SectionLabel } from "@/components/software-development-website"
import type { Nivel, QId } from "./data"
import { WEIGHTS } from "./data"
import { cn } from "./parts"

export type Matricula = "menos150" | "150a350" | "mas350"

export type FormSubmitData = {
  nombre: string
  colegio: string
  telefono: string
  matricula: Matricula
}

function formatPhone(v: string) {
  const clean = v.replace(/\D/g, "").slice(0, 10)
  if (clean.length > 6) return clean.slice(0, 2) + " " + clean.slice(2, 6) + " " + clean.slice(6)
  if (clean.length > 2) return clean.slice(0, 2) + " " + clean.slice(2)
  return clean
}

/* ──────────────────────────────────────────────
   LEAD FORM
   ────────────────────────────────────────────── */

export function LeadForm({
  nivel,
  onSubmit,
}: {
  nivel: Nivel
  onSubmit: (data: FormSubmitData) => void
}) {
  const [nombre, setNombre] = React.useState("")
  const [colegio, setColegio] = React.useState("")
  const [whatsapp, setWhatsapp] = React.useState("")
  const [matricula, setMatricula] = React.useState<Matricula | "">("")
  const [error, setError] = React.useState<string | null>(null)

  const { title, btn } = React.useMemo(() => {
    if (nivel === "BAJO")
      return {
        title: "Reciba su Guía de Protección Legal para fortalecer su posición",
        btn: "Recibir mi guía de protección",
      }
    if (nivel === "MODERADO")
      return {
        title: "Reciba las acciones prioritarias para reducir su exposición esta semana",
        btn: "Recibir las acciones prioritarias",
      }
    if (nivel === "ALTO")
      return {
        title: "Su nivel de riesgo requiere acción inmediata",
        btn: "Recibir la guía urgente",
      }
    return {
      title: "Nivel crítico detectado — reciba el plan de acción",
      btn: "Recibir la guía urgente",
    }
  }, [nivel])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const tel = whatsapp.replace(/\s/g, "")
    if (tel.length !== 10) {
      setError("Por favor ingrese un número de WhatsApp de 10 dígitos.")
      return
    }
    if (!matricula) {
      setError("Por favor seleccione su matrícula aproximada.")
      return
    }
    onSubmit({ nombre: nombre.trim(), colegio: colegio.trim(), telefono: tel, matricula })
  }

  const matriculaOptions: { value: Matricula; label: string }[] = [
    { value: "menos150", label: "< 150" },
    { value: "150a350", label: "150 – 350" },
    { value: "mas350", label: "350+" },
  ]

  const inputCls =
    "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.14] mask-fade-edges" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.12),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionLabel>Material de protección legal</SectionLabel>
            <h2 className="mt-6 text-balance text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground">
              12 puntos de acción basados en los criterios que usa la autoridad. Le ayuda a saber qué
              documentar primero — como institución y como individuo.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-safe/20 bg-safe-soft/40 p-4">
              <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-safe-soft text-safe">
                <Shield className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Guía de Protección Legal — 12 puntos prioritarios
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Cubre LFPDPPP + responsabilidad operativa. Lista para revisar con su abogado en 15 minutos.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="f-nombre" className="mb-1.5 block text-xs font-medium text-foreground">
                  Su nombre
                </label>
                <input
                  id="f-nombre"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Director(a) o nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="f-colegio" className="mb-1.5 block text-xs font-medium text-foreground">
                  Nombre del colegio
                </label>
                <input
                  id="f-colegio"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Institución educativa"
                  value={colegio}
                  onChange={(e) => setColegio(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="f-whatsapp" className="mb-1.5 block text-xs font-medium text-foreground">
                  WhatsApp <span className="text-muted-foreground">(10 dígitos)</span>
                </label>
                <input
                  id="f-whatsapp"
                  type="tel"
                  required
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="55 1234 5678"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                  className={inputCls}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Usamos WhatsApp únicamente para enviarle la guía en PDF. Sin grupos, sin listas, sin
                  llamadas.
                </p>
              </div>

              <div>
                <div className="mb-1.5 block text-xs font-medium text-foreground">Matrícula aproximada</div>
                <div className="grid grid-cols-3 gap-2">
                  {matriculaOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setMatricula(opt.value)}
                      className={cn(
                        "rounded-full border px-3 py-2.5 text-center text-sm font-medium transition-all",
                        matricula === opt.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-foreground/80 hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  La LFPDPPP calibra las sanciones según el volumen de datos expuestos.
                </p>
              </div>

              {error && (
                <div className="rounded-xl border border-risk/30 bg-risk-soft px-4 py-2.5 text-xs font-medium text-risk">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/30 transition-all hover:bg-primary/92 hover:shadow-lg md:text-base"
              >
                {btn}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Sus datos se usan únicamente para enviarle el material. Al enviar, acepta nuestro{" "}
              <a
                href="https://www.ekole.app/privacy-and-policy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Aviso de Privacidad
              </a>
              .
            </p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3" />
              Ekole cumple con la LFPDPPP — exigimos lo mismo que practicamos.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   THANK YOU STATE
   ────────────────────────────────────────────── */

export function ThankYou({
  firstName,
  phoneFormatted,
  nivel,
  riskCount,
  matriculaLabel,
  waUrl,
  shareUrl,
}: {
  firstName: string
  phoneFormatted: string
  nivel: Nivel
  riskCount: number
  matriculaLabel: string
  waUrl: string
  shareUrl: string
}) {
  const urgent = nivel === "ALTO" || nivel === "CRÍTICO"
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.14] mask-fade-edges" />
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--safe)/0.14),transparent_70%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <div className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-safe-soft text-safe">
              <Check className="size-7" strokeWidth={2.5} />
            </div>
            <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
              {firstName}, <em className="font-display font-normal italic text-primary">recibido.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-base leading-relaxed text-muted-foreground">
              {urgent ? (
                <>
                  Su nivel <strong className="font-semibold text-foreground">{nivel}</strong> requiere
                  atención esta semana. Enviamos su guía al{" "}
                  <strong className="font-semibold text-foreground">{phoneFormatted}</strong> en los próximos
                  minutos.
                </>
              ) : (
                <>
                  Enviamos su Guía de Protección Legal al{" "}
                  <strong className="font-semibold text-foreground">{phoneFormatted}</strong> en los próximos
                  minutos.
                </>
              )}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 ring-1 ring-[#25D366]/40 transition-all hover:bg-[#1DA851] hover:shadow-lg md:text-base"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 fill-white"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Abrir WhatsApp para recibir mi guía
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Esto abre un chat directo para enviarle el material de forma inmediata
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Pill tone={urgent ? "risk" : "primary"}>Nivel {nivel}</Pill>
              <Pill>
                <strong className="font-semibold">{riskCount}</strong>
                <span>áreas con deficiencias</span>
              </Pill>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              La guía le ayudará a identificar los pasos concretos para reducir esa exposición — y cuáles
              puede llevar con su abogado.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <Pill tone="risk">Mientras llega su guía</Pill>
            <h3 className="mt-3 text-lg font-medium tracking-tight text-foreground">
              2 acciones que puede hacer hoy
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Verifique si su aviso de privacidad está visible en la recepción del colegio y en los documentos de inscripción. Si no existe, su abogado puede redactar uno básico en una hora.",
                "Pida al personal de vialidad que hoy, al final de la salida, anoten en una hoja el nombre de los últimos 10 alumnos entregados y quién los recogió. Ese papel ya es más defensa legal que no tener nada.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <Pill tone="primary">En las próximas 48 horas</Pill>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Le enviaremos un análisis basado en su matrícula de{" "}
              <strong className="font-semibold text-foreground">{matriculaLabel.toLowerCase()}</strong> y las{" "}
              <strong className="font-semibold text-foreground">{riskCount} áreas</strong> de riesgo que
              identificó — con los pasos concretos que otros colegios ya ejecutaron para cerrar esas brechas.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-10 border-t border-border pt-8 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              ¿Conoce a otro director que debería evaluar su colegio?
            </p>
            <a
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground/90 transition-all hover:border-primary/40 hover:bg-card hover:text-primary"
            >
              <Share2 className="size-4" />
              Compartir esta herramienta
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   WHATSAPP MESSAGE BUILDER
   ────────────────────────────────────────────── */

export function buildWaMessage(data: FormSubmitData, nivel: Nivel, isAtRisk: (q: QId) => boolean) {
  const matriculaLabel =
    data.matricula === "menos150"
      ? "Menos de 150 alumnos"
      : data.matricula === "150a350"
        ? "150 a 350 alumnos"
        : "Más de 350 alumnos"
  const riskAreas = (Object.keys(WEIGHTS) as QId[]).filter((q) => isAtRisk(q)).join(",")
  const guideUrl =
    "https://www.ekole.app/guia-proteccion?colegio=" +
    encodeURIComponent(data.colegio) +
    "&nivel=" +
    encodeURIComponent(nivel) +
    "&areas=" +
    riskAreas
  const waNum = "5215512345678"
  const msg = encodeURIComponent(
    "Hola, acabo de completar el diagnóstico de exposición legal de Ekole.\n\n" +
      "Mi colegio es: " +
      data.colegio +
      "\n" +
      "Matrícula aproximada: " +
      matriculaLabel +
      "\n" +
      "Mi nivel de riesgo fue: " +
      nivel +
      "\n\n" +
      "Me gustaría recibir la guía de protección legal.\n\n" +
      "Mi guía personalizada: " +
      guideUrl,
  )
  const shareMsg = encodeURIComponent(
    "¿Ya evaluaste el nivel de exposición legal de tu colegio? Hazlo gratis aquí: https://www.ekole.app/diagnostico",
  )
  return {
    waUrl: "https://wa.me/" + waNum + "?text=" + msg,
    shareUrl: "https://wa.me/?text=" + shareMsg,
    matriculaLabel,
  }
}
