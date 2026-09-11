import { Bot, Mic, Workflow, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AiFlowDiagram } from "@/components/ai/AiFlowDiagram";

const capabilities = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description:
      "Conversational interfaces wired into real product data and backend logic, not just a prompt in a box.",
  },
  {
    icon: Mic,
    title: "Voice Agents",
    description:
      "Voice-driven interaction flows built on AI APIs, designed for real conversational use cases.",
  },
  {
    icon: Zap,
    title: "AI API Integration & Prompt Engineering",
    description:
      "Structured prompt design and reliable integration with LLM providers inside production systems.",
  },
  {
    icon: Workflow,
    title: "n8n Workflow Automation",
    description:
      "Automated workflows connecting apps, AI services, and internal tools — cutting out manual, repetitive operations.",
  },
];

export function AiAutomation() {
  return (
    <section id="ai-automation" className="relative border-b border-border py-28">
      <Container>
        <SectionHeading
          eyebrow="AI & Automation"
          title="AI & Intelligent Systems"
          description="I'm a software engineer who builds applications and automation powered by AI — not a machine-learning researcher. That means practical, reliable systems: chatbots, voice agents, and workflows that plug straight into a product's real backend and data."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal from="left">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                Request lifecycle
              </p>
              <AiFlowDiagram />
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <Reveal key={capability.title} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
                  <capability.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-sm font-semibold text-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {capability.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
