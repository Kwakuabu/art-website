import { FileText, Search, PenTool, CheckCircle, Send, BookOpen, BarChart2 } from "lucide-react";

const steps = [
  { icon: FileText, step: "01", title: "Proposal Writing", desc: "Craft a compelling research proposal with expert guidance." },
  { icon: Search, step: "02", title: "Literature Review", desc: "Comprehensive review of existing research and academic sources." },
  { icon: PenTool, step: "03", title: "Methodology Design", desc: "Choose the right research design for your study." },
  { icon: BarChart2, step: "04", title: "Data Collection", desc: "Field surveys, interviews, and data gathering support." },
  { icon: CheckCircle, step: "05", title: "Analysis & Writing", desc: "Statistical analysis, write-up, and editing assistance." },
  { icon: Send, step: "06", title: "Publication", desc: "Submit and publish in recognised academic journals." },
];

export function Students() {
  return (
    <section id="students" className="py-28 bg-[#0D1B2A] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=1600&h=900&fit=crop&auto=format"
          alt="Student studying"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/50 to-[#0D1B2A]" />

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8973A]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">For Students</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
            From proposal to publication —<br />
            <span className="text-[#C8973A]">we walk with you.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div
              key={step}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#C8973A]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#C8973A]/15 flex items-center justify-center group-hover:bg-[#C8973A]/25 transition-colors">
                  <Icon size={20} className="text-[#C8973A]" />
                </div>
                <span className="text-white/15 font-mono font-bold" style={{ fontSize: "2rem" }}>{step}</span>
              </div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700 }}>
                {title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 bg-[#C8973A] hover:bg-[#B8872A] text-white px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <BookOpen size={18} /> Start Your Research Journey
          </a>
        </div>
      </div>
    </section>
  );
}
