import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Students } from "./components/Students";
import { Defence } from "./components/Defence";
import { Process } from "./components/Process";
import { QualityAssurance } from "./components/QualityAssurance";
import { Academy } from "./components/Academy";
import { Vacancies } from "./components/Vacancies";
import { Consultants } from "./components/Consultants";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#F8F6F1]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Students />
      <QualityAssurance />
      <Defence />
      <Academy />
      <Vacancies />
      <Consultants />
      <Footer />
    </div>
  );
}
