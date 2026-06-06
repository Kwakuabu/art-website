import { Clock, Users, ArrowUpRight } from "lucide-react";

const courses = [
  {
    title: "Research Methods Fundamentals",
    level: "Beginner",
    duration: "6 weeks",
    students: "340+",
    img: "https://images.unsplash.com/photo-1648301033733-44554c74ec50?w=500&h=300&fit=crop&auto=format",
    tag: "Most Popular",
    tagColor: "#C8973A",
  },
  {
    title: "Quantitative Data Analysis",
    level: "Intermediate",
    duration: "8 weeks",
    students: "210+",
    img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&h=300&fit=crop&auto=format",
    tag: "Data Science",
    tagColor: "#4A9B8F",
  },
  {
    title: "Academic Writing & Publishing",
    level: "Intermediate",
    duration: "5 weeks",
    students: "180+",
    img: "https://images.unsplash.com/photo-1694175271713-a6e2cc378980?w=500&h=300&fit=crop&auto=format",
    tag: "Writing",
    tagColor: "#7B68EE",
  },
  {
    title: "Impact Evaluation Masterclass",
    level: "Advanced",
    duration: "10 weeks",
    students: "95+",
    img: "https://images.unsplash.com/photo-1744973055006-a1c7dd30da62?w=500&h=300&fit=crop&auto=format",
    tag: "Advanced",
    tagColor: "#E87D5A",
  },
];

const levelColor: Record<string, string> = {
  Beginner: "#4A9B8F",
  Intermediate: "#C8973A",
  Advanced: "#E87D5A",
};

export function Academy() {
  return (
    <section id="academy" className="py-28 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">ART Academy</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0D1B2A", lineHeight: 1.2 }}>
              Sharpen your<br />research edge.
            </h2>
          </div>
          <p className="text-[#6B7280] max-w-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Structured courses taught by Ghana's leading researchers — from beginner foundations to advanced methodologies.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map(({ title, level, duration, students, img, tag, tagColor }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className="absolute top-3 left-3 text-white text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: tagColor }}
                >
                  {tag}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span
                  className="text-xs font-mono mb-2"
                  style={{ color: levelColor[level] }}
                >
                  {level}
                </span>
                <h3 className="text-[#0D1B2A] mb-3 flex-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}>
                  {title}
                </h3>
                <div className="flex items-center justify-between text-xs text-[#9CA3AF]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {students}
                  </span>
                </div>
                <button className="mt-4 flex items-center justify-center gap-1 w-full border border-[#E8E3D9] hover:border-[#C8973A] hover:text-[#C8973A] text-[#0D1B2A] text-sm py-2.5 rounded-xl transition-all duration-200" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Enrol Now <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
