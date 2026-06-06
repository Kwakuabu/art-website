export function Process() {
  const steps = [
    { num: "01", title: "Brief", desc: "Share your research needs, timeline, and objectives with us.", emoji: "📋" },
    { num: "02", title: "Match", desc: "We pair you with a vetted expert perfectly suited to your project.", emoji: "🔗" },
    { num: "03", title: "Execute", desc: "Your matched researcher delivers high-quality work to agreed milestones.", emoji: "⚡" },
    { num: "04", title: "Deliver", desc: "Receive polished, publication-ready outputs with full quality assurance.", emoji: "✅" },
  ];

  return (
    <section className="py-24 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">How It Works</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#ffffff" }}>
            Four steps to great research.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#C8973A]/40 to-transparent hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ num, title, desc, emoji }) => (
              <div key={num} className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 hover:bg-white/10 transition-colors">
                  <span style={{ fontSize: "2rem" }}>{emoji}</span>
                  <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#C8973A] flex items-center justify-center">
                    <span className="text-white font-mono text-xs font-bold">{num.slice(1)}</span>
                  </div>
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
