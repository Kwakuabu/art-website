import { ScanLine, Bot, BadgeCheck } from "lucide-react";

const layers = [
  {
    icon: ScanLine,
    title: "Plagiarism Detection",
    desc: "Every submission is scanned through industry-leading plagiarism detection software before delivery.",
    step: "Layer 1",
    color: "#4A9B8F",
  },
  {
    icon: Bot,
    title: "AI Screening",
    desc: "Advanced AI analysis ensures research integrity and flags any machine-generated content.",
    step: "Layer 2",
    color: "#C8973A",
  },
  {
    icon: BadgeCheck,
    title: "Quality Scoring",
    desc: "Our expert reviewers rate each deliverable on methodology, clarity, and academic rigour.",
    step: "Layer 3",
    color: "#7B68EE",
  },
];

export function QualityAssurance() {
  return (
    <section className="py-24 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden h-80 md:h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&auto=format"
                alt="Quality analytics dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0D1B2A]/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#C8973A]/15 flex items-center justify-center">
                <BadgeCheck size={22} className="text-[#C8973A]" />
              </div>
              <div>
                <div className="text-[#0D1B2A] font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Quality Assured</div>
                <div className="text-[#6B7280] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>3-layer verification</div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">Quality Assurance</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#0D1B2A", lineHeight: 1.2 }} className="mb-6">
              Research you can trust,<br />every time.
            </h2>

            <div className="flex flex-col gap-5">
              {layers.map(({ icon: Icon, title, desc, step, color }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs" style={{ color }}>{step}</span>
                      <span className="text-[#0D1B2A] font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{title}</span>
                    </div>
                    <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
