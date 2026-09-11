import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const pillars = [
  {
    title: "Full Stack Delivery",
    description:
      "React and Next.js on the front end, Node.js and Express APIs underneath, PostgreSQL/MongoDB for data — designed and shipped end to end.",
  },
  {
    title: "Real-Time by Default",
    description:
      "WebSockets and Socket.IO for live bidding, messaging, and multi-user dashboards that stay in sync without a page refresh.",
  },
  {
    title: "AI-Augmented Products",
    description:
      "Chatbots, voice agents, and prompt-engineered API integrations wired into real backends — plus n8n automation connecting it all together.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-b border-border py-28">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="A full stack engineer who treats AI as infrastructure, not a gimmick."
          description={`Over ${site.experienceYears} years, I've built the kind of software companies actually run on — marketplaces, prediction platforms, booking systems — and increasingly, the AI and automation layers that sit inside them.`}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-border-strong">
                <span className="text-xs font-mono text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 max-w-3xl text-pretty text-lg leading-relaxed text-ink-secondary">
            My work spans multilingual marketplaces with live bidding, prediction
            platforms with automated payouts and KYC, and AI-enabled communication
            tools — always with the same focus: production-ready code, clear
            architecture, and interfaces people actually enjoy using.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
