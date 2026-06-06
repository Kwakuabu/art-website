import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#080F18] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C8973A] flex items-center justify-center">
                <span className="text-white font-mono font-bold text-sm">ART</span>
              </div>
              <span className="text-white font-semibold tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>ART Ghana</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Ghana's leading research platform connecting organisations and students with expert consultants.
            </p>
            <a href="mailto:info@artghana.com" className="flex items-center gap-2 text-[#C8973A] hover:text-white text-sm transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              <Mail size={14} /> info@artghana.com
            </a>
          </div>

          <div>
            <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-4">Platform</div>
            <ul className="flex flex-col gap-2.5">
              {["Services", "For Students", "Defence Panel", "ART Academy", "Consultants"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-4">Company</div>
            <ul className="flex flex-col gap-2.5">
              {["About Us", "Our Process", "Portfolio", "Blog", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2024 ART Ghana. Founded by Silas Asani Abudu.
          </p>
          <div className="flex items-center gap-4">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#C8973A] flex items-center justify-center transition-colors duration-200">
                <Icon size={14} className="text-white/60 hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
