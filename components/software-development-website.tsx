"use client"

import * as React from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Frown,
  Gauge,
  Lock,
  Menu,
  ScrollText,
  Scale,
  ShieldCheck,
  Smile,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react"

/* ---------- utilities ---------- */

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

/* ---------- motion variants ---------- */

const containerFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemRise: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, bounce: 0.28, duration: 1.1 },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring" as const, bounce: 0.25, duration: 0.9, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- brand ---------- */

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center", className)}>
    <Image
      src="/logo.png"
      alt="Ekole Logo"
      width={120}
      height={40}
      className="h-9 w-auto object-contain"
      priority
    />
  </div>
)

/* ---------- navbar ---------- */

const menuItems = [
  { name: "Problema", href: "/#problema" },
  { name: "Diagnóstico", href: "/diagnostico" },
  { name: "Solución", href: "/#solucion" },
  { name: "Preguntas", href: "/#preguntas" },
]

export function HeroHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="px-3 pt-3">
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-transparent px-4 py-2.5 transition-all duration-300 lg:px-6",
            scrolled && "border-border/70 bg-background/80 shadow-[0_1px_0_0_hsl(var(--border))] backdrop-blur-xl",
          )}
        >
          <a href="/" aria-label="Ekole inicio" className="flex items-center">
            <Logo />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm text-muted-foreground lg:flex">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/#cta"
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-md active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 lg:inline-flex"
            >
              Ver cómo funciona
              <ArrowRight className="size-3.5" />
            </a>
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground backdrop-blur lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur lg:hidden">
            <ul className="flex flex-col gap-2 text-base">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-foreground/90 hover:bg-muted"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#cta"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-lg bg-primary px-3 py-2 text-center font-medium text-primary-foreground"
                >
                  Ver cómo funciona
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

/* ---------- small ui primitives ---------- */

export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "safe" | "risk" | "primary"
}) {
  const toneMap: Record<string, string> = {
    default: "border-border/80 bg-background text-foreground/80",
    safe: "border-safe/20 bg-safe-soft text-safe",
    risk: "border-risk/30 bg-risk-soft text-risk",
    primary: "border-primary/20 bg-primary/5 text-primary",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneMap[tone],
      )}
    >
      {children}
    </span>
  )
}

export function PrimaryCTA({
  children,
  href = "#cta",
  className,
}: {
  children: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        // DS: hover → bg más oscuro (primary-dark) + shadow-lg; active → translate-y-px + shadow off; focus-visible → ring sky 3px
        "group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/30 transition-all duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/35 active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 md:text-base",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

export function GhostCTA({
  children,
  href = "#diagnostico",
  className,
}: {
  children: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        // DS ghost: hover → bg primary/8 + border primary/50 + text primary; active → bg primary/14; focus-visible sky
        "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground/90 transition-all duration-150 hover:-translate-y-[1px] hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary hover:shadow-sm active:translate-y-px active:bg-primary/[0.12] active:shadow-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 md:text-base",
        className,
      )}
    >
      {children}
    </a>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-px w-8 bg-border" />
      {children}
      <span className="h-px w-8 bg-border" />
    </div>
  )
}

/* ----------------------------------------------------------------
   LegalCredential — design system component
   Shield + text, usado SOLO para referencias a leyes/normas oficiales.
   No es un badge/pill; comunica autoridad institucional.
   ---------------------------------------------------------------- */

export function LegalCredentials({
  items,
  tone = "light",
  className,
}: {
  items: string[]
  tone?: "light" | "navy"
  className?: string
}) {
  const textCls = tone === "navy" ? "text-white/95" : "text-primary"
  const iconCls = tone === "navy" ? "text-sky" : "text-primary"
  const sepCls =
    tone === "navy" ? "bg-white/20" : "bg-primary/20"
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {items.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && <span className={cn("h-3.5 w-px", sepCls)} aria-hidden />}
          <span className={cn("inline-flex items-center gap-1.5 text-sm font-semibold leading-none", textCls)}>
            <ShieldCheck className={cn("size-4", iconCls)} strokeWidth={2.25} />
            <span>{label}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

/* ==============================================================
   HERO
   ============================================================== */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* aurora / gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.18] mask-fade-edges" />
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.18),transparent_70%)] blur-2xl" />
        <div className="absolute left-[8%] top-[30%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--safe)/0.14),transparent_70%)] blur-3xl" />
        <div className="absolute right-[6%] top-[12%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--risk)/0.10),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerFade}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemRise}>
            <Pill tone="primary">
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute inline-flex size-2 animate-pulse-dot rounded-full bg-safe/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-safe" />
              </span>
              Software de salida escolar · Cupos ciclo 2026-2027
            </Pill>
          </motion.div>

          <motion.h1
            variants={itemRise}
            className="mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-[4.5rem] lg:leading-[1.05]"
          >
            Salida escolar más rápida.{" "}
            <span className="font-display italic font-normal text-primary">
              Y con registro de cada entrega.
            </span>
          </motion.h1>

          <motion.p
            variants={itemRise}
            className="mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg"
          >
            Olvídese de las filas, el altavoz y los grupos de WhatsApp. Ekole despacha más rápido y registra
            cada salida automáticamente — sin que un solo padre descargue nada.
          </motion.p>

          <motion.div
            variants={itemRise}
            className="mt-10 flex flex-col items-center gap-3 md:flex-row"
          >
            <PrimaryCTA href="#cta">Ver cómo funciona con mi colegio</PrimaryCTA>
            <GhostCTA href="/diagnostico">
              ¿Qué tan expuesta está mi salida hoy? — Test de 3 min
            </GhostCTA>
          </motion.div>

          <motion.p variants={itemRise} className="mt-5 text-xs text-muted-foreground">
            20 min · Sin compromiso · Cupos limitados para ciclo 2026-2027
          </motion.p>
        </motion.div>

        {/* metric strip */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {[
              { icon: Clock, kpi: "<24 h", label: "Activación completa" },
              { icon: Smile, kpi: "0 apps", label: "Para padres" },
              { icon: ShieldCheck, kpi: "78 %", label: "Menos tiempo de salida" },
              { icon: Scale, kpi: "LFPDPPP", label: "Cumplimiento total" },
            ].map(({ icon: Icon, kpi, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 bg-background px-6 py-6 text-center"
              >
                <Icon className="size-4 text-primary/70" />
                <div className="font-mono text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {kpi}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   PROBLEMA + COSTO SILENCIOSO
   ============================================================== */

function Problema() {
  const costos = [
    {
      icon: FileText,
      title: "Si mañana pasa algo, usted no puede probar nada",
      body: "Si ocurre un incidente, ¿su colegio puede demostrar quién recogió al alumno, a qué hora y con qué autorización? Sin ese registro, la carga de la prueba recae en usted — personalmente.",
    },
    {
      icon: Frown,
      title: "Los padres no se quejan. Se van.",
      body: "La frustración de esperar en filas, no saber si ya llamaron al niño y depender del altavoz no genera quejas formales. Genera cambios de colegio. La puerta es la primera y última impresión del día — y se repite 180 veces al año.",
    },
    {
      icon: Clock,
      title: "Su personal opera el proceso más sensible con las herramientas más frágiles",
      body: "Listas en WhatsApp, nombres gritados, caras memorizadas. Su equipo administra la seguridad de cada alumno con herramientas que no aceptaría para ninguna otra área del colegio. Y cuando un padre pregunta \"¿a qué hora salió mi hijo?\", la única respuesta es: \"déjeme revisar\".",
    },
  ]

  return (
    <section id="problema" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>El problema real</SectionLabel>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            El problema no es que la salida sea lenta.{" "}
            <span className="font-display italic font-normal text-primary">
              Es que cada día opera sin registro de quién recoge a quién.
            </span>
          </h2>
          <p className="mt-6 text-balance text-muted-foreground md:text-lg">
            La mayoría de los colegios han normalizado una salida que funciona con altavoz, WhatsApp y memoria.
            Y funciona... hasta que un padre reclama, un tutor no autorizado se presenta o alguien pregunta
            <em className="font-display italic"> "¿quién recogió a este niño y a qué hora?"</em>
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">
            Lo que no existe documentado, no existe legalmente.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {costos.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-risk/30 hover:shadow-md">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-risk/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex size-10 items-center justify-center rounded-lg bg-risk-soft text-risk">
                  <c.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base italic text-muted-foreground md:text-lg">
            Y lo más costoso no es el tiempo: es que el día que todo salga mal,
            <span className="font-display italic text-foreground">
              {" "}no tendrá cómo defenderse.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   ESCENARIOS
   ============================================================== */

function Escenarios() {
  const scenarios = [
    {
      emoji: "🚸",
      tag: "El compañero",
      body: "Un alumno se va con la familia de un compañero. La mamá mandó un WhatsApp a la maestra — pero un mensaje privado no es una autorización verificable: no pasa por un canal oficial del colegio, no confirma identidad, y puede borrarse en cualquier momento. Al llegar a casa y no ver a su hijo, el padre llama al colegio.",
      quote: '"¿Quién autorizó que mi hijo se fuera con otra familia?"',
      fallout:
        "El colegio no tiene registro. Usted entregó a un menor sin autorización documentada. Si el padre escala ante la SEP o presenta una denuncia civil, el Art. 1921 del CCF es claro: la responsabilidad recae en quien tenía la custodia.",
      metric: "60,000",
      metricLabel: "registros que deberían existir este ciclo. Tiene cero.",
    },
    {
      emoji: "🚑",
      tag: "El accidente a la salida",
      body: "Un alumno se lastima al salir del colegio. El padre llega muy molesto. No está buscando entender — está exigiendo respuestas. Y tiene derecho a exigirlas.",
      quote: '"¿A qué hora lo dejaron salir? ¿Quién lo entregó? ¿Con quién se fue?"',
      fallout:
        "El colegio no puede responder ninguna. No hay hora registrada, no hay nombre de quién lo recibió, no hay constancia. El Art. 1921 del CCF no pide intención — pide prueba de diligencia. Si no la tiene, responde usted.",
      metric: "180,000",
      metricLabel: "salidas sin registro en 3 ciclos. Una basta para exponerlo todo.",
    },
    {
      emoji: "📄",
      tag: "La solicitud formal",
      body: "Un padre en proceso de divorcio solicita por escrito todos los registros de recogida de su hijo del último año: quién lo recogió, a qué hora, con qué autorización. Bajo la LFPDPPP, es su derecho — y el colegio tiene 20 días hábiles para responder.",
      quote: '"No es un ataque. Es un derecho. Y usted no puede cumplirlo."',
      fallout:
        "No cumplir es una infracción sancionable por el INAI. Pero el daño mayor es otro: el juez de familia sabe ahora que el colegio no tiene control sobre quién recoge a sus alumnos.",
      metric: "20 días",
      metricLabel: "hábiles para responder. Cero registros que entregar.",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>El día que todo salga mal</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Tres situaciones cotidianas.{" "}
            <span className="font-display italic font-normal text-primary">
              Ninguna requiere mala fe.
            </span>
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Todas terminan igual: el colegio no puede responder, y usted carga con la consecuencia.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {scenarios.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <Pill tone="risk">{s.tag}</Pill>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <blockquote className="mt-5 border-l-2 border-risk/60 bg-risk-soft/40 py-3 pl-4 pr-3 font-display text-base italic text-foreground">
                  {s.quote}
                </blockquote>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.fallout}</p>
                <div className="mt-auto pt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-semibold tracking-tight text-primary">
                      {s.metric}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{s.metricLabel}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-base text-muted-foreground md:text-lg">
              ¿Cuánto más tiempo puede seguir operando sin esto?
            </p>
            <PrimaryCTA href="/diagnostico">Evaluar mi exposición ahora — 3 min, gratis</PrimaryCTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FALSO DILEMA (tabla SIN vs MANUAL)
   ============================================================== */

function FalsoDilema() {
  const rows = [
    {
      label: "Tiempo de salida",
      sin: "40-60 min",
      manual: "200-400 min",
      icon: Clock,
    },
    {
      label: "Registros",
      sin: "0 registros",
      manual: "En papel",
      icon: FileText,
    },
    {
      label: "Experiencia del padre",
      sin: "Toleran",
      manual: "Desesperados",
      icon: Users,
    },
    {
      label: "Protección legal",
      sin: "Expuesto",
      manual: "Cubierto — pero pierde familias",
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>El falso dilema</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Usted ya lo sabe: documentar manualmente la haría{" "}
            <span className="font-display italic font-normal text-risk">5 veces más lenta.</span>
          </h2>
          <p className="mt-6 text-balance text-muted-foreground md:text-lg">
            Si intentara registrar cada salida manualmente — anotar quién recogió, verificar autorización,
            pedir firma, documentar la hora — cada alumno tomaría 1 a 2 minutos más. Con 200 alumnos, eso son
            3 a 6 horas adicionales de operación.
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">
            No es viable. Por eso eligió seguir sin nada.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="px-5 py-4">Dimensión</div>
              <div className="border-l border-border px-5 py-4 text-risk">Sin documentación</div>
              <div className="border-l border-border px-5 py-4 text-risk">Manual (hipotético)</div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={cn(
                  "grid grid-cols-3 text-sm",
                  i !== rows.length - 1 && "border-b border-border",
                )}
              >
                <div className="flex items-center gap-2 px-5 py-4 font-medium text-foreground">
                  <r.icon className="size-4 text-muted-foreground" />
                  {r.label}
                </div>
                <div className="border-l border-border px-5 py-4 text-muted-foreground">{r.sin}</div>
                <div className="border-l border-border px-5 py-4 text-muted-foreground">{r.manual}</div>
              </div>
            ))}
            <div className="grid grid-cols-3 bg-risk-soft/40 text-sm font-medium">
              <div className="px-5 py-4 text-foreground">Resultado</div>
              <div className="border-l border-border px-5 py-4 text-risk">
                Elige velocidad. Pierde protección.
              </div>
              <div className="border-l border-border px-5 py-4 text-risk">
                Elige protección. Pierde familias.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-12 max-w-2xl text-center font-display text-2xl italic text-foreground md:text-3xl">
            ¿Y si no tuviera que elegir?
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   DIAGNÓSTICO
   ============================================================== */

function Diagnostico() {
  const bullets = [
    "¿Qué pasa si un tutor no autorizado se presenta en la puerta?",
    "¿Puede demostrar quién retiró a cada alumno hoy?",
    "¿Tiene registro de hora y autorización por cada salida?",
    "Su nivel de exposición real bajo el CCF Art. 1921",
  ]

  return (
    <section id="diagnostico" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.10),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>Diagnóstico gratuito · 3 minutos</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Antes de decidir nada,{" "}
            <span className="font-display italic font-normal text-primary">
              descubra exactamente dónde está expuesto.
            </span>
          </h2>
          <p className="mt-6 text-balance text-muted-foreground md:text-lg">
            Le dice qué tan expuesto está usted personalmente bajo el marco legal mexicano. Al terminar, usted
            decide si quiere ver una demo — o usar los resultados por su cuenta.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/[0.04] via-card to-card p-8 shadow-lg md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <div className="flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Scale className="size-7" />
              </div>
              <div className="flex-1">
                <p className="font-display text-2xl italic leading-tight text-foreground md:text-3xl">
                  "Si mañana un padre reclama — ¿qué tiene usted para responder?"
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  En México, el <strong className="text-foreground">Art. 1921 del CCF</strong> establece que
                  quien tiene bajo su custodia a un menor responde civilmente por cualquier daño que el menor
                  sufra bajo su custodia. Sin registros de salida, usted no puede demostrar supervisión. Y sin
                  esa demostración, responde con su patrimonio personal.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {bullets.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4 text-sm text-foreground/90"
                >
                  <Check className="mt-0.5 size-4 flex-shrink-0 text-safe" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-sm text-muted-foreground">
                Al terminar recibe su <strong className="text-foreground">Guía de Protección Legal</strong>{" "}
                con los pasos concretos para blindar su posición.
              </p>
              <PrimaryCTA href="/diagnostico">Evaluar mi exposición ahora</PrimaryCTA>
            </div>

            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <Lock className="mt-0.5 size-3.5 flex-shrink-0" />
              <span>
                Sus respuestas son confidenciales. Solo usted ve el resultado. No almacenamos datos de su
                colegio sin su permiso explícito.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> Resultado inmediato
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge className="size-3.5" /> Datos solo para usted
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="size-3.5" /> No compartimos con terceros
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   SOLUCIÓN (explicación + tabla 3 col + beneficios)
   ============================================================== */

function Solucion() {
  const compareRows = [
    { label: "Tiempo", sinNada: "40-60 min", manual: "200+ min", ekole: "12-15 min" },
    { label: "Registros", sinNada: "0", manual: "En papel", ekole: "Automático" },
    { label: "Padres", sinNada: "Toleran", manual: "Desesperados", ekole: "Satisfechos" },
    { label: "Protección", sinNada: "Expuesto", manual: "Pierde familias", ekole: "Protegido + con familias" },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Hasta 78% menos tiempo de salida",
      body: "Lo que hoy toma 40-60 minutos puede bajar a 12-15. El padre llega, recoge y se va — en minutos, no en filas.",
    },
    {
      icon: ScrollText,
      title: "Cada salida documentada automáticamente",
      body: "Quién recogió, a qué hora, con qué autorización. Historial consultable. Sin trabajo adicional para su personal.",
    },
    {
      icon: Users,
      title: "Las familias sienten la diferencia desde el primer día",
      body: "El padre sabe con certeza que el colegio controla quién y cómo recoge a su hijo. La eficiencia enamora, pero la seguridad retiene.",
    },
    {
      icon: ShieldCheck,
      title: "Su protección personal documentada",
      body: "Si un padre reclama o hay una investigación: fecha, hora, clave verificada, tutor autorizado. Evidencia de diligencia — en su pantalla.",
    },
  ]

  return (
    <section id="solucion" className="relative overflow-hidden bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>La solución</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Ekole hace su salida{" "}
            <span className="font-display italic font-normal text-primary">3 veces más rápida</span> — y
            documenta cada entrega automáticamente.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-3xl text-center text-muted-foreground md:text-lg">
            <p>
              Cada tutor autorizado recibe una <strong className="text-foreground">clave de recogida</strong>
              {" "}— personal, intransferible y confidencial. Al recoger, la proporciona. El sistema verifica y
              registra la salida en segundos: quién recogió, a qué hora, con qué autorización — sin divulgar
              datos del alumno.
            </p>
            <p className="mt-4">
              Funciona desde el día uno <strong className="text-foreground">sin que un solo padre descargue
              nada.</strong> Sin hardware. Sin semanas de capacitación.
            </p>
          </div>
        </Reveal>

        {/* comparison table: 3 cols */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-4 border-b border-border bg-background text-xs font-semibold uppercase tracking-wider">
              <div className="px-5 py-4 text-muted-foreground">Dimensión</div>
              <div className="border-l border-border px-5 py-4 text-risk">Sin nada (hoy)</div>
              <div className="border-l border-border px-5 py-4 text-risk">Manual (imposible)</div>
              <div className="border-l border-border bg-safe-soft px-5 py-4 text-safe">Con Ekole</div>
            </div>
            {compareRows.map((r, i) => (
              <div
                key={r.label}
                className={cn(
                  "grid grid-cols-4 text-sm",
                  i !== compareRows.length - 1 && "border-b border-border",
                )}
              >
                <div className="px-5 py-4 font-medium text-foreground">{r.label}</div>
                <div className="border-l border-border px-5 py-4 text-muted-foreground">{r.sinNada}</div>
                <div className="border-l border-border px-5 py-4 text-muted-foreground">{r.manual}</div>
                <div className="flex items-center gap-2 border-l border-border bg-safe-soft/50 px-5 py-4 font-medium text-foreground">
                  <Check className="size-3.5 flex-shrink-0 text-safe" />
                  {r.ekole}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <PrimaryCTA href="#cta">Ver cómo funciona con mi colegio</PrimaryCTA>
            <p className="text-xs text-muted-foreground">
              20 min · Sin compromiso · Cupos limitados para ciclo 2026-2027
            </p>
          </div>
        </Reveal>

        {/* benefits */}
        <div className="mt-24 grid gap-5 md:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="flex h-full gap-5 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-safe-soft text-safe">
                  <b.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==============================================================
   CÓMO FUNCIONA — timeline 01 · 02 · 03
   ============================================================== */

function ComoFunciona() {
  const steps = [
    {
      num: "01",
      icon: Users,
      title: "Diagnóstico de su operación actual",
      duration: "20 min",
      body: "En una llamada entendemos su operación: cuántos alumnos, cuántas puertas, qué proceso siguen. Al colgar, usted ya tiene claridad sobre dónde está perdiendo tiempo y dónde está expuesto — lo use con nosotros o no.",
    },
    {
      num: "02",
      icon: Zap,
      title: "Activamos Ekole en menos de 24 horas",
      duration: "<24 h",
      body: "Configuramos el sistema con sus datos: alumnos, tutores autorizados y personal. Cada tutor autorizado recibe su clave de recogida. Su equipo recibe una capacitación de 15 minutos.",
    },
    {
      num: "03",
      icon: Check,
      title: "La salida cambia — y queda documentada — desde el primer día",
      duration: "Día 1",
      body: "El padre llega, da su clave, se lleva a su hijo. El sistema hace el resto. Usted tiene visibilidad total e historial consultable en todo momento.",
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>Cómo funciona</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            De primera llamada a{" "}
            <span className="font-display italic font-normal text-primary">salida documentada</span>: menos
            de 24 horas.
          </h2>
          <p className="mt-6 text-balance text-muted-foreground md:text-lg">
            Nosotros hacemos el 90% del trabajo. Usted solo necesita darnos los datos y aprobar.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* vertical connecting line (desktop) */}
          <div aria-hidden className="absolute left-9 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-primary/30 via-border to-transparent md:block" />

          <div className="flex flex-col gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                <div className="group relative flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md md:p-7">
                  <div className="relative flex flex-shrink-0 flex-col items-center">
                    <div className="flex size-[72px] items-center justify-center rounded-2xl bg-primary/5 ring-1 ring-primary/20">
                      <span className="font-mono text-xl font-semibold text-primary">{s.num}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <s.icon className="size-4 text-primary/70" />
                      <h3 className="text-lg font-semibold text-foreground md:text-xl">{s.title}</h3>
                      <Pill tone="primary">
                        <Clock className="size-3" />
                        {s.duration}
                      </Pill>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <PrimaryCTA href="#cta">Ver cómo funciona con mi colegio — 20 min, sin compromiso</PrimaryCTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FAQ
   ============================================================== */

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-foreground md:text-lg">{q}</span>
        <ChevronDown
          className={cn(
            "size-5 flex-shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">{a}</div>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const faqs = [
    {
      q: "¿Cuánto cuesta Ekole?",
      a: "Planes adaptados al tamaño de su colegio. En la demo le mostramos cuánto sería y lo comparamos con su costo operativo actual. Sin costo de instalación, sin contratos forzosos, primera semana por nuestra cuenta.",
    },
    {
      q: "¿Qué tan fácil es implementarlo?",
      a: "Menos de 24 horas, y lo hacemos nosotros. Usted aprueba una configuración; nosotros activamos el sistema, entregamos las claves a los tutores y capacitamos a su equipo en 15 minutos. El primer día de clases siguiente, la salida ya cambió.",
    },
    {
      q: "¿Los padres necesitan descargar una app?",
      a: (
        <>
          <p>
            No. Cada tutor autorizado recibe una clave de recogida personal. Al llegar, la proporciona y
            listo — igual de simple que dar un número de pedido en una ventanilla.
          </p>
          <p className="mt-3">
            Para las familias que con el tiempo quieran una experiencia completamente automática, existe una
            app opcional con detección por geocerca y encriptación extremo a extremo. Pero esto es un extra
            para quien lo quiera — el sistema base funciona igual de bien con la clave.
          </p>
        </>
      ),
    },
    {
      q: "¿Y si mi equipo o los padres necesitan tiempo para adaptarse?",
      a: "Es normal. Por eso la primera semana va por nuestra cuenta y los acompañamos paso a paso. La mayoría de los colegios reportan que padres y personal se adaptan en 2-3 días — la clave de recogida es tan simple que no requiere explicación. Pero si necesita ir a su ritmo, lo hacemos juntos.",
    },
    {
      q: "¿Los datos están seguros?",
      a: "Sí. Todos los datos van encriptados en tránsito y en reposo, cumplimos con la LFPDPPP (Ley Federal de Protección de Datos Personales en Posesión de los Particulares), y no compartimos información con terceros. Usted puede solicitar eliminación de los datos en cualquier momento y conserva la propiedad total de la información de su colegio.",
    },
    {
      q: "¿Qué pasa si no me convence?",
      a: "Sin contrato forzoso. Si no cumplimos, cancela sin costo. Nos ganamos su confianza con resultados, no con contratos.",
    },
    {
      q: "¿En qué se diferencia de otros sistemas escolares?",
      a: "Otros gestionan lo de DENTRO (calificaciones, asistencia, cobro). Ekole cubre el momento que el padre VIVE todos los días: la salida. No reemplazamos su sistema — lo complementamos donde ningún otro llega.",
    },
    {
      q: "¿El registro de salidas tiene validez como evidencia?",
      a: "Sí. Cada salida se documenta con fecha, hora, tutor autorizado, personal receptor y timestamp automático — exactamente los elementos que sustentan un argumento de supervisión. Es su evidencia objetiva de diligencia. (Como toda evidencia, recomendamos incluirla en su estrategia de respaldo general junto con su equipo legal.)",
    },
  ]

  return (
    <section id="preguntas" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Preguntas que nos hacen{" "}
            <span className="font-display italic font-normal text-primary">los directivos</span> antes de
            empezar.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <FAQItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==============================================================
   CTA FINAL
   ============================================================== */

function CTAFinal() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.14] mask-fade-edges" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary via-primary to-[hsl(var(--primary)/0.85)] p-10 text-primary-foreground shadow-2xl shadow-primary/20 md:p-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 size-80 rounded-full bg-[radial-gradient(closest-side,hsl(var(--safe)/0.25),transparent_70%)] blur-2xl" />
              <div className="absolute -bottom-24 -left-10 size-80 rounded-full bg-[radial-gradient(closest-side,hsl(0_0%_100%/0.15),transparent_70%)] blur-2xl" />
            </div>

            <div className="relative">
              <Pill tone="default">
                <Sparkles className="size-3" />
                <span className="text-foreground/90">Cupos ciclo 2026-2027</span>
              </Pill>
              <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Asegure el lugar de su colegio para el{" "}
                <span className="font-display italic font-normal">ciclo 2026-2027.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-balance text-base text-primary-foreground/80 md:text-lg">
                Cupos limitados. Cada implementación incluye acompañamiento personal de nuestro equipo durante
                el primer mes — por eso no podemos abrir la puerta a todos los colegios a la vez.
              </p>
              <p className="mt-4 max-w-2xl text-balance text-sm text-primary-foreground/70 md:text-base">
                En 20 minutos le mostramos cómo funciona con el caso de su colegio. Si lo que ve tiene
                sentido, reservamos su lugar y activamos en menos de 24 horas.
              </p>

              <div className="mt-10 flex flex-col items-start gap-3 md:flex-row md:items-center">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-medium text-primary shadow-lg transition-all hover:shadow-xl md:text-base"
                >
                  Ver cómo funciona con mi colegio — 20 min
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <span className="text-xs text-primary-foreground/70 md:ml-2">
                  20 min · Sin compromiso
                </span>
              </div>

              <p className="mt-10 max-w-2xl font-display text-xl italic text-primary-foreground/90 md:text-2xl">
                Cada día sin documentar es un día más de exposición. Los cupos del ciclo 2026-2027 se cierran
                pronto.
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/70">
                <Lock className="size-3.5" />
                <span>Sus datos están protegidos · No compartimos información con terceros</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FOOTER
   ============================================================== */

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            <Logo />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Creemos que ningún director debería quedar expuesto personalmente por operar un proceso que,
              hasta hoy, no tenía solución viable. Por eso creamos Ekole.
            </p>
            <p className="text-xs font-medium text-foreground">— El equipo de Ekole</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-foreground">Producto</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="/#problema" className="transition-colors hover:text-foreground">
                  Problema
                </a>
              </li>
              <li>
                <a href="/diagnostico" className="transition-colors hover:text-foreground">
                  Diagnóstico
                </a>
              </li>
              <li>
                <a href="/#solucion" className="transition-colors hover:text-foreground">
                  Solución
                </a>
              </li>
              <li>
                <a href="/#preguntas" className="transition-colors hover:text-foreground">
                  Preguntas
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="/#cta" className="transition-colors hover:text-foreground">
                  Solicitar demo
                </a>
              </li>
              <li>
                <a
                  href="https://www.ekole.app/privacy-and-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="https://www.ekole.app/terms-and-conditions"
                  className="transition-colors hover:text-foreground"
                >
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* legal notice */}
        <div className="mt-14 rounded-2xl border border-border bg-background/60 p-5 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold">
              i
            </span>
            <p>
              <strong className="text-foreground">Aviso legal.</strong> La información legal presentada en
              esta página — incluyendo referencias al Art. 1921 del Código Civil Federal, la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y los deberes de
              custodia escolar — es orientativa y tiene fines informativos. No constituye asesoría jurídica
              ni sustituye la consulta con un abogado especializado. Para aplicar estos conceptos a su caso
              concreto, recomendamos consultar con su equipo legal.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Ekole. Todos los derechos reservados.</div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-2 animate-pulse-dot rounded-full bg-safe/60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-safe" />
            </span>
            Cupos abiertos · ciclo 2026-2027
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ==============================================================
   PAGE COMPOSITION
   ============================================================== */

export default function SoftwareDevelopmentWebsite() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <Hero />
        <Problema />
        <Escenarios />
        <FalsoDilema />
        <Diagnostico />
        <Solucion />
        <ComoFunciona />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
