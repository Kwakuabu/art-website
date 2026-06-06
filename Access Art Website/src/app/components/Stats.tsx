export function Stats() {
  const stats = [
    { value: "500+", label: "Research Projects", sub: "delivered nationwide" },
    { value: "98%", label: "Client Satisfaction", sub: "across all engagements" },
    { value: "2,400+", label: "Students Supported", sub: "from proposal to defence" },
    { value: "120+", label: "Expert Consultants", sub: "across 12 disciplines" },
  ];

  return (
    <section className="py-16 bg-[#C8973A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              <div className="text-white font-mono mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>
                {value}
              </div>
              <div className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
              <div className="text-white/60 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
