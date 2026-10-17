import { BentoFeatures } from './components/BentoFeatures';
import { ComparisonTable } from './components/ComparisonTable';
import { DownloadsSection } from './components/DownloadsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { SecurityArchitecture } from './components/SecurityArchitecture';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#0F141C] text-[#F8FAFC] selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-[#00E5FF] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#071018]"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <BentoFeatures />
        <ComparisonTable />
        <HowItWorks />
        <SecurityArchitecture />
        <DownloadsSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
