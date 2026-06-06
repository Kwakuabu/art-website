import { Menu } from "lucide-react";

export function Navbar() {
  const links = ["Services", "Students", "Defence", "Academy", "Consultants"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#C8973A] flex items-center justify-center">
            <span className="text-white font-mono font-bold text-sm">ART</span>
          </div>
          <span className="text-white font-semibold tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>ART Ghana</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#login" className="text-white/70 hover:text-white text-sm transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
            Login
          </a>
          <a
            href="#get-started"
            className="bg-[#C8973A] hover:bg-[#B8872A] text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get Started
          </a>
        </div>

        <button className="md:hidden text-white">
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
}
