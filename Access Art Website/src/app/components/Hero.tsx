import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1B2A]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=1600&h=900&fit=crop&auto=format"
          alt="Research professional"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/80 to-transparent" />
      </div>

      {/* Decorative geometric shapes */}
      <div className="absolute top-32 right-20 w-72 h-72 rounded-full bg-[#C8973A]/10 blur-3xl" />
      <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-[#C8973A]/15 blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#C8973A]/20 border border-[#C8973A]/30 rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8973A] animate-pulse" />
            <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase">Ghana's Research Partner</span>
          </div>

          <h1 className="text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900 }}>
            Research that<br />
            <span className="text-[#C8973A]">moves Africa</span><br />
            forward.
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
            Connecting organisations and students with expert research, data analytics, and academic support — built for Ghana and beyond.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="flex items-center gap-2 bg-[#C8973A] hover:bg-[#B8872A] text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              For Organisations <ArrowRight size={16} />
            </a>
            <a
              href="#students"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              For Students <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {[
            { icon: TrendingUp, label: "Projects Delivered", value: "500+", color: "#C8973A" },
            { icon: Users, label: "Active Consultants", value: "120+", color: "#4A9B8F" },
            { icon: BookOpen, label: "Students Supported", value: "2,400+", color: "#7B68EE" },
            { icon: TrendingUp, label: "Organisations Served", value: "85+", color: "#E87D5A" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}20` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div className="text-white font-mono text-2xl font-bold mb-1">{value}</div>
              <div className="text-white/50 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-white/30 text-xs font-mono tracking-widest">SCROLL</span>
      </div>
    </section>
  );
}
