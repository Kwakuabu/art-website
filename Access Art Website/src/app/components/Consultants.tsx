import { DollarSign, Globe, Award, TrendingUp, ArrowRight } from "lucide-react";

const perks = [
  { icon: DollarSign, title: "Competitive Earnings", desc: "Set your own rates and earn on a flexible schedule." },
  { icon: Globe, title: "Remote-First", desc: "Work with organisations across Ghana and beyond from anywhere." },
  { icon: Award, title: "Professional Growth", desc: "Attend workshops, gain certifications, and build your profile." },
  { icon: TrendingUp, title: "Grow Your Network", desc: "Connect with top researchers, academics, and industry experts." },
];

export function Consultants() {
  return (
    <section id="consultants" className="py-28 bg-[#0D1B2A] relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1744973149087-179e3ed54eae?w=1600&h=900&fit=crop&auto=format"
          alt="Research professional"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-[#0D1B2A]/70" />
      </div>

      <div className="absolute top-20 right-20 w-80 h-80 bg-[#C8973A]/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-4">Consultant Programme</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15 }}>
              Share your expertise.<br />
              <span className="text-[#C8973A]">Earn doing what</span><br />
              you love.
            </h2>
            <p className="text-white/60 mt-6 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Join Ghana's fastest-growing research network. We connect skilled researchers with organisations that need your expertise.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-[#C8973A] hover:bg-[#B8872A] text-white px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Apply to Join <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#C8973A]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C8973A]/15 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#C8973A]" />
                </div>
                <h4 className="text-white mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>
                  {title}
                </h4>
                <p className="text-white/45 text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
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
