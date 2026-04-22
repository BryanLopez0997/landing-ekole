"use client"

import * as React from "react"
import { ArrowRight, ShieldAlert } from "lucide-react"
import { Reveal, SectionLabel } from "@/components/software-development-website"
import {
  INVERTED,
  SECTIONS,
  WEIGHTS,
  getNivel,
  type Answer,
  type AnswerMap,
  type QId,
} from "./diagnostico/data"
import {
  AlertBanner,
  DocHeader,
  LiabilityCallout,
  ProgressBar,
  QuestionBlock,
  SectionHeader,
  cn,
} from "./diagnostico/parts"
import {
  BreakdownGrid,
  FineReference,
  PersonalLiability,
  ReputationCard,
  RiskVerdict,
  Scenarios,
  VisionCard,
} from "./diagnostico/results"
import { LeadForm, ThankYou, buildWaMessage, type FormSubmitData } from "./diagnostico/form"

type Phase = "quiz" | "results" | "thankyou"

export default function DiagnosticoTool() {
  const [answers, setAnswers] = React.useState<AnswerMap>({})
  const [phase, setPhase] = React.useState<Phase>("quiz")
  const [stickyVisible, setStickyVisible] = React.useState(false)
  const [submitData, setSubmitData] = React.useState<FormSubmitData | null>(null)
  const [dateStr, setDateStr] = React.useState("")

  const resultsRef = React.useRef<HTMLDivElement | null>(null)
  const formRef = React.useRef<HTMLDivElement | null>(null)
  const thankyouRef = React.useRef<HTMLDivElement | null>(null)

  const q8Visible = answers.q7 === "si"
  const requiredQs: QId[] = q8Visible
    ? ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"]
    : ["q1", "q2", "q3", "q4", "q5", "q6", "q7"]
  const totalRequired = requiredQs.length
  const answeredCount = requiredQs.filter((q) => answers[q] !== undefined).length
  const allAnswered = answeredCount === totalRequired

  const isAtRisk = React.useCallback(
    (q: QId) => {
      const v = answers[q]
      if (v === undefined) return false
      return INVERTED[q] ? v === "si" : v === "no"
    },
    [answers],
  )

  const score = React.useMemo(() => {
    let s = 0
    ;(Object.keys(WEIGHTS) as QId[]).forEach((q) => {
      if (isAtRisk(q)) s += WEIGHTS[q]
    })
    return s
  }, [isAtRisk])

  function setAnswer(q: QId, val: Answer) {
    setAnswers((prev) => {
      const next = { ...prev, [q]: val }
      if (q === "q7" && val !== "si") delete next.q8
      return next
    })
  }

  function calcular() {
    setPhase("results")
    const today = new Date()
    setDateStr(today.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" }))
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
    setTimeout(() => setStickyVisible(true), 2000)
  }

  function handleSubmit(data: FormSubmitData) {
    setSubmitData(data)
    setPhase("thankyou")
    setStickyVisible(false)
    setTimeout(() => {
      thankyouRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const { nivel } = getNivel(score)

  return (
    <div className="relative">
      <DocHeader />

      <div className="pb-4">
        <AlertBanner />
      </div>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-6">
          <LiabilityCallout />
        </div>
      </section>

      {/* QUIZ */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <SectionLabel>Evaluación · 8 preguntas</SectionLabel>
            <h2 className="mt-5 text-balance text-center text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
              Responda con la operación real de su colegio hoy
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-center text-sm leading-relaxed text-muted-foreground md:text-base">
              No lo que planea hacer — lo que efectivamente tiene documentado y en operación. Sus respuestas
              no se almacenan.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-8 max-w-md">
              <ProgressBar answered={answeredCount} total={totalRequired} />
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col gap-12">
            {SECTIONS.map((section, si) => (
              <Reveal key={section.num} delay={0.1}>
                <SectionHeader num={section.num} title={section.title} subtitle={section.subtitle} />
                <div className="flex flex-col gap-3">
                  {section.questions.map((q) => {
                    if (q.id === "q8" && !q8Visible) return null
                    return (
                      <QuestionBlock
                        key={q.id}
                        question={q}
                        answer={answers[q.id]}
                        atRisk={isAtRisk(q.id)}
                        onAnswer={(a) => setAnswer(q.id, a)}
                      />
                    )
                  })}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={calcular}
                disabled={!allAnswered}
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2",
                  allAnswered
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/30 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/35 active:translate-y-px active:shadow-sm"
                    : "cursor-not-allowed bg-muted text-muted-foreground",
                )}
              >
                Generar diagnóstico
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              {!allAnswered ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Responda{" "}
                  {totalRequired - answeredCount === 1
                    ? "la pregunta restante"
                    : `las ${totalRequired - answeredCount} preguntas restantes`}{" "}
                  para generar su diagnóstico
                </p>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  Sus respuestas no se registran · El diagnóstico se genera en su dispositivo
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESULTS */}
      {phase !== "quiz" && phase !== "thankyou" && (
        <div ref={resultsRef}>
          <div className="border-t border-border">
            <RiskVerdict score={score} isAtRisk={isAtRisk} dateStr={dateStr} />
          </div>
          <PersonalLiability score={score} isAtRisk={isAtRisk} />
          <BreakdownGrid isAtRisk={isAtRisk} />
          <Scenarios score={score} isAtRisk={isAtRisk} />
          <FineReference isAtRisk={isAtRisk} />
          <VisionCard />
          <ReputationCard />
          <div ref={formRef}>
            <LeadForm nivel={nivel} onSubmit={handleSubmit} />
          </div>
        </div>
      )}

      {/* THANK YOU */}
      {phase === "thankyou" && submitData && (
        <div ref={thankyouRef} className="border-t border-border">
          {(() => {
            const { waUrl, shareUrl, matriculaLabel } = buildWaMessage(submitData, nivel, isAtRisk)
            const riskCount = (Object.keys(WEIGHTS) as QId[]).filter((q) => isAtRisk(q)).length
            const tel = submitData.telefono
            const phoneFormatted = `${tel.slice(0, 2)} ${tel.slice(2, 6)} ${tel.slice(6)}`
            const firstName = submitData.nombre.split(" ")[0] || "Director"
            return (
              <ThankYou
                firstName={firstName}
                phoneFormatted={phoneFormatted}
                nivel={nivel}
                riskCount={riskCount}
                matriculaLabel={matriculaLabel}
                waUrl={waUrl}
                shareUrl={shareUrl}
              />
            )
          })()}
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-8">
        <p className="border-t border-border pt-6 text-center text-xs italic leading-relaxed text-muted-foreground">
          Esta herramienta es orientativa y no sustituye asesoría legal profesional. Los rangos de multas
          corresponden a la legislación federal y local vigente a 2025.
        </p>
      </div>

      {/* STICKY CTA — pill flotante con blur */}
      {stickyVisible && phase === "results" && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex animate-slide-up justify-center px-4">
          <div className="pointer-events-auto flex max-w-3xl items-center gap-3 rounded-full border border-border/70 bg-background/85 py-2 pl-4 pr-2 shadow-lg backdrop-blur-xl">
            <ShieldAlert className="size-4 flex-shrink-0 text-risk" />
            <span className="hidden text-sm text-foreground/85 sm:inline">
              Nivel <strong className="font-semibold text-risk">{nivel}</strong> · Reciba su guía
            </span>
            <span className="text-sm text-foreground/85 sm:hidden">
              <strong className="font-semibold text-risk">{nivel}</strong>
            </span>
            <button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-md active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Recibir guía
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
