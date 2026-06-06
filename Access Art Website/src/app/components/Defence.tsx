import { Shield, CheckCircle, Star } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "GHS 350",
    color: "#4A9B8F",
    bg: "from-[#4A9B8F]/10 to-[#4A9B8F]/5",
    border: "border-[#4A9B8F]/30",
    features: ["1-panel review", "Written feedback", "48hr turnaround", "Basic Q&A prep"],
    icon: Shield,
  },
  {
    name: "Standard",
    price: "GHS 650",
    color: "#C8973A",
    bg: "from-[#C8973A]/15 to-[#C8973A]/5",
    border: "border-[#C8973A]/40",
    features: ["3-panel review", "Mock defence session", "24hr turnaround", "Detailed critique", "Revision guidance"],
    icon: Star,
    popular: true,
  },
  {
    name: "Premium",
    price: "GHS 1,100",
    color: "#7B68EE",
    bg: "from-[#7B68EE]/10 to-[#7B68EE]/5",
    border: "border-[#7B68EE]/30",
    features: ["5-panel expert review", "Two mock sessions", "12hr turnaround", "Plagiarism check", "AI screening", "Publication support"],
    icon: CheckCircle,
  },
];

export function Defence() {
  return (
    <section id="defence" className="py-28 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">Defence Service</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0D1B2A", lineHeight: 1.2 }}>
            Defend with confidence.
          </h2>
          <p className="text-[#6B7280] mt-4 max-w-md mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Expert panel reviews that prepare you to present your research with clarity and authority.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map(({ name, price, color, bg, border, features, icon: Icon, popular }) => (
            <div
              key={name}
              className={`relative rounded-2xl bg-gradient-to-br ${bg} border ${border} p-8 flex flex-col ${popular ? "md:-mt-4 md:mb-4 shadow-xl" : ""}`}
            >
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C8973A] text-white text-xs font-mono px-4 py-1 rounded-full tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div className="text-[#0D1B2A] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{name}</div>
                  <div className="font-mono font-bold" style={{ color, fontSize: "1.25rem" }}>{price}</div>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#374151]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <CheckCircle size={15} style={{ color }} className="flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: color, color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                Book Panel Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
