import type { Metadata } from "next"
import DiagnosticoTool from "@/components/diagnostico-tool"
import { HeroHeader, Footer } from "@/components/software-development-website"

export const metadata: Metadata = {
  title: "Diagnóstico de Exposición Legal — Ekole para Colegios",
  description:
    "Evalúe en 90 segundos el nivel de exposición legal de su colegio en 8 áreas de cumplimiento. Basado en LFPDPPP, CCF Art. 1920 y legislación federal vigente. Gratuito y confidencial.",
  openGraph: {
    title: "¿Cuál es el nivel de exposición legal de su colegio?",
    description:
      "Diagnóstico gratuito de 8 áreas de cumplimiento para colegios privados en México. Resultados inmediatos basados en legislación vigente.",
    type: "website",
    url: "https://www.ekole.app/diagnostico",
  },
}

export default function Page() {
  return (
    <>
      <HeroHeader />
      <main className="pt-16">
        <DiagnosticoTool />
      </main>
      <Footer />
    </>
  )
}
