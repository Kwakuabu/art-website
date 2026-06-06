import { BarChart2, Heart, TrendingUp, Briefcase, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Market Research",
    desc: "Consumer insights, competitive analysis, and market sizing for strategic growth decisions.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
    color: "#C8973A",
  },
  {
    icon: BarChart2,
    title: "Impact Assessment",
    desc: "Rigorous evaluation of programme outcomes with data-backed recommendations.",
    img: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=600&h=400&fit=crop&auto=format",
    color: "#4A9B8F",
  },
  {
    icon: Heart,
    title: "Health & Community",
    desc: "Public health studies, community needs assessments, and social research.",
    img: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=600&h=400&fit=crop&auto=format",
    color: "#E87D5A",
  },
  {
    icon: Briefcase,
    title: "Corporate Research",
    desc: "Business intelligence, feasibility studies, and strategic advisory support.",
    img: "https://images.unsplash.com/photo-1744973055006-a1c7dd30da62?w=600&h=400&fit=crop&auto=format",
    color: "#7B68EE",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">For Organisations</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0D1B2A", lineHeight: 1.2 }}>
              Research services<br />built for impact.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[#6B7280] leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              We match your organisation with vetted research professionals who deliver actionable insights on time and within scope.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, desc, img, color }) => (
            <div
              key={title}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div
                  className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}` }}
                >
                  <Icon size={18} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[#0D1B2A] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {desc}
                </p>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors" style={{ color, fontFamily: "'Inter', sans-serif" }}>
                  Learn more <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
