import { Briefcase, Mail, ArrowRight } from "lucide-react";

export function Vacancies() {
  return (
    <section id="vacancies" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-[#C8973A] text-xs font-mono tracking-widest uppercase block mb-3">Careers</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0D1B2A", lineHeight: 1.2 }}>
            Work with us.
          </h2>
        </div>

        <div className="border border-[#E8E3D9] rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-16 h-16 rounded-2xl bg-[#F8F6F1] flex items-center justify-center shrink-0">
            <Briefcase size={28} className="text-[#C8973A]" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0D1B2A" }}>
              No open positions right now
            </h3>
            <p className="text-[#6B7280] mt-3 leading-relaxed max-w-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              We don't have any vacancies at the moment, but we're always interested in hearing from talented researchers, analysts, and writers. Send us your CV and we'll be in touch when the right role opens up.
            </p>
          </div>

          <a
            href="mailto:careers@accessresearchtechnologies.com"
            className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#1a2f45] text-white px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 whitespace-nowrap shrink-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Mail size={16} /> Send Your CV <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
