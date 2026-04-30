import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Play, Instagram, Linkedin, Send } from 'lucide-react';

// --- Types ---
interface GalleryItem {
  title: string;
  eyebrow: string;
  copy: string;
  type: string;
  image: string;
  alt: string;
}

interface PlantItem {
  category: string;
  title: string;
  description: string;
  area: string;
  layout: string;
  type: string;
  image: string;
  alt: string;
}

// --- Data ---
const GALLERY_DATA: GalleryItem[] = [
  {
    title: "Rua Estados Unidos",
    eyebrow: "ADDRESS",
    copy: "Presença absoluta em um endereço que se impõe.",
    type: "facade",
    image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180620.png",
    alt: "Fachada do 702 Estados Unidos ao entardecer"
  },
  {
    title: "View",
    eyebrow: "VIEW BY JARDIM EUROPA",
    copy: "Horizonte particular para o verde do Jardim Europa.",
    type: "view",
    image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180559.png",
    alt: "Vista para o Jardim Europa ao entardecer"
  },
  {
    title: "Architecture",
    eyebrow: "ARCHITECTURE BY TRIPTYQUE",
    copy: "Precisão sem excessos em um projeto irreplicável.",
    type: "architecture",
    image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180535.png",
    alt: "Detalhe arquitetônico da fachada verde"
  }
];

const PLANTS_DATA: PlantItem[] = [
  {
    category: "Apartamentos tipo",
    title: "Apartamentos tipo",
    description: "Plantas de 50 m² e 56 m² com 1 dormitório, e 70 m² com 2 dormitórios.",
    area: "50 m², 56 m² e 70 m²",
    layout: "1 e 2 dormitórios",
    type: "Tipo",
    image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20145917.png",
    alt: "Planta de apartamento tipo"
  },
  {
    category: "Apartamentos Garden",
    title: "Apartamentos Garden",
    description: "Gardens com metragens de 70 m², 99 m², 117 m², 135 m² e 147 m².",
    area: "70 m² a 147 m²",
    layout: "Gardens",
    type: "Garden",
    image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20145917.png",
    alt: "Planta de apartamento Garden"
  },
  {
    category: "Penthouses",
    title: "Penthouses",
    description: "Penthouses de 143 m² e 165 m² com 2 suítes.",
    area: "143 m² e 165 m²",
    layout: "2 suítes",
    type: "Penthouse",
    image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20145917.png",
    alt: "Planta de penthouse"
  }
];

const BrandLogo = ({ className = "h-4" }: { className?: string }) => (
  <img 
    src="https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Logo_negativo_centra.svg" 
    alt="702" 
    className={className} 
    onError={(e) => (e.currentTarget.style.display = 'none')}
  />
);

// --- Sub-components ---

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);
      
      const sections = ['hero', 'manifesto', 'galeria', 'diferenciais', 'plantas', 'contato'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'manifesto', label: '702 Estados Unidos' },
    { id: 'galeria', label: 'Galeria' },
    { id: 'diferenciais', label: 'Lazer' },
    { id: 'plantas', label: 'Plantas' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[var(--ease-silent)] backdrop-blur-xl bg-[var(--carbon-translucent)] border-b border-white/10 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <span className="text-[13px] tracking-[0.24em] uppercase font-normal text-[var(--porcelain)]">702 Estados Unidos</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative text-[11px] tracking-[0.24em] uppercase py-1 transition-all duration-300 ${activeSection === link.id ? 'text-[var(--porcelain)] tracking-[0.28em] after:w-full' : 'text-[var(--mist)] hover:text-[var(--porcelain)] hover:tracking-[0.28em] after:w-0 hover:after:w-full'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[var(--porcelain)] after:transition-all after:duration-300`}
            >
              {link.label}
            </a>
          ))}
        </nav>
 
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-px bg-[var(--porcelain)] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-px bg-[var(--porcelain)] ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-px bg-[var(--porcelain)] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[var(--carbon)] p-8 border-b border-white/10"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs tracking-[0.24em] uppercase text-[var(--mist)] hover:text-[var(--porcelain)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 150]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[var(--carbon)]">
      <motion.div 
        style={{ 
          y,
          backgroundImage: 'linear-gradient(180deg, rgba(29, 29, 27, 0.28), rgba(29, 29, 27, 0.52)), url("https://raw.githubusercontent.com/gustavokzintel/702-eua/main/ChatGPT-Image-7-de-abr.png")'
        }} 
        className="absolute inset-0 bg-cover bg-center transform scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[var(--carbon)]/80" />
      
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 lg:px-12">
        <p className="text-[11px] tracking-[0.32em] uppercase text-[var(--porcelain)] opacity-80">ADDRESS | VIEW | ARCHITECTURE</p>
        
        <div className="self-center w-full max-w-[760px] filter drop-shadow-2xl">
          <BrandLogo className="w-full h-auto" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-md space-y-4">
            <p className="italic text-[var(--porcelain)] text-sm opacity-90">Quando nada é supérfluo, tudo é definitivo.</p>
            <p className="text-[var(--porcelain)] font-medium text-base tracking-wide">50m² a 165m² · 1 e 2 dorms · 1 vaga</p>
            <p className="text-[var(--mist)] leading-relaxed text-sm">O lifestyle dos Jardins e a essência do Jardim Europa juntos em um endereço.</p>
            <p className="text-[10px] tracking-[0.24em] uppercase text-[var(--mist)] pt-2">Rua Estados Unidos, 702 - Jardins, São Paulo / SP</p>
          </div>
          <a 
            href="#contato" 
            className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-[var(--porcelain)] bg-[var(--porcelain)] text-[var(--carbon)] text-[12px] tracking-[0.24em] uppercase font-semibold transition-all duration-300 hover:bg-transparent hover:text-[var(--porcelain)]"
          >
            Tenho Interesse
          </a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const items = [
    { text: "Presença absoluta:", bold: " Rua Estados Unidos, um endereço que se impõe." },
    { text: "Horizonte particular:", bold: " vista irrestrita para o verde do Jardim Europa." },
    { text: "Precisão sem excessos:", bold: " projeto irreplicável by Triptyque." },
  ];

  return (
    <section id="manifesto" className="relative flex items-center min-h-screen bg-[var(--carbon)] py-40 overflow-hidden">
      <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[var(--mist)] opacity-30 whitespace-nowrap hidden lg:block">
        <span className="text-[11px] tracking-[0.32em] uppercase">Address | View | Architecture</span>
      </div>
      <div className="absolute bottom-12 left-12 text-[var(--mist)] opacity-30">
        <span className="text-[11px] tracking-[0.32em] uppercase">01 / Manifesto</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full space-y-12">
        {items.map((item, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-[var(--porcelain)] text-xl md:text-2xl lg:text-3xl tracking-[0.18em] uppercase font-light leading-snug"
          >
            <span className="font-medium">{item.text}</span>{item.bold}
          </motion.p>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          viewport={{ once: true }}
          className="pt-12 text-lg md:text-xl text-[var(--mist)] italic tracking-wide"
        >
          Um equilíbrio raro entre lugar, perspectiva e forma.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          viewport={{ once: true }}
          className="text-[var(--porcelain)] uppercase tracking-[0.24em] font-medium"
        >
          Quando nada é acessório, tudo é definitivo.
        </motion.p>
      </div>
    </section>
  );
}

function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="galeria" className="relative bg-[var(--porcelain)] text-[var(--carbon)] py-24 px-6 overflow-hidden">
      <div className="absolute right-0 top-0 w-[30vw] opacity-[0.03] select-none pointer-events-none -translate-y-1/4 grayscale invert">
        <BrandLogo className="w-full h-auto" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.48em] uppercase text-black/50">Curadoria Visual</p>
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest">Galeria</h2>
            <p className="text-black/70 leading-loose max-w-md">Lugar, perspectiva e forma em uma sequência visual pensada para apresentar o 702 Estados Unidos com presença, silêncio e precisão.</p>
          </div>
          <div className="h-px bg-black/20 w-full mb-4"></div>
        </header>

        <div className="grid grid-cols-6 gap-4">
          {GALLERY_DATA.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedIdx(i)}
              className={`relative overflow-hidden cursor-pointer group bg-[var(--carbon)] min-h-[440px] col-span-6 md:col-span-2`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 opacity-90" />
              
              <div className="absolute top-6 right-6 text-[10px] tracking-widest text-white/60 font-medium">0{i + 1}</div>
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <div className="flex items-center gap-4 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] tracking-[0.38em] uppercase">{item.eyebrow}</span>
                  <div className="h-px bg-white/40 flex-1 max-w-[80px]"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest leading-tight">{item.title}</h3>
                <p className="text-xs text-white/50 mt-4 max-w-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">{item.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full bg-[var(--carbon)] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X size={18} />
              </button>

              <div 
                className="aspect-video bg-cover bg-center" 
                style={{ backgroundImage: `url("${GALLERY_DATA[selectedIdx].image}")` }}
              />
              
              <div className="p-8 md:p-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-end gap-8 text-white">
                <div>
                  <p className="text-[10px] tracking-[0.38em] uppercase text-white/50 mb-4">{GALLERY_DATA[selectedIdx].eyebrow}</p>
                  <h3 className="text-3xl md:text-5xl font-light uppercase tracking-widest">{GALLERY_DATA[selectedIdx].title}</h3>
                  <p className="text-[white]/60 mt-6 max-w-xl leading-relaxed">{GALLERY_DATA[selectedIdx].copy}</p>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedIdx((selectedIdx - 1 + GALLERY_DATA.length) % GALLERY_DATA.length)}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedIdx((selectedIdx + 1) % GALLERY_DATA.length)}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Lazer() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { 
      title: "Fitness", 
      desc: "Intensidade e foco em espaços que inspiram superação.", 
      tag: "01 / Workout at Home",
      image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180612.png"
    },
    { 
      title: "Piscina", 
      desc: "Momentos de pausa em cenários criados para desacelerar o tempo.", 
      tag: "02 / Wellness at Home",
      image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180543.png"
    },
    { 
      title: "Espaço Gourmet", 
      desc: "Encontros que merecem o tempo certo e o lugar exato.", 
      tag: "03 / Gourmet at Home",
      image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180543.png" // Fallback to piscina if not provided
    },
    { 
      title: "Solarium", 
      desc: "O entardecer ganha nova dimensão quando o Jardim Europa expande seus horizontes.", 
      tag: "04 / Sunshine by Jardim Europa",
      image: "https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20180543.png" // Fallback to piscina if not provided
    },
  ];

  return (
    <section id="diferenciais" className="bg-[var(--carbon)] overflow-hidden">
      <div className="py-32 px-6 text-center space-y-6">
        <p className="text-[10px] tracking-[0.48em] uppercase text-[var(--mist)]">Lazer e Áreas Comuns</p>
        <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-[var(--porcelain)]">At Home.</h2>
      </div>

      <div className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0 flex transition-transform duration-700 ease-[var(--ease-editorial)]" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((slide, i) => (
            <div key={i} className="min-w-full h-full relative overflow-hidden">
               <div 
                 className="absolute w-[80%] h-full bg-cover bg-center" 
                 style={{ backgroundImage: `url("${slide.image}")` }}
               />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[var(--carbon)] diagonal-clip-left"></div>
          <div className="absolute inset-y-0 right-0 w-[45%] flex flex-col justify-center px-12 md:px-24 text-right items-end pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 max-w-sm"
              >
                <p className="text-[10px] tracking-[0.42em] uppercase text-[var(--mist)]">{slides[idx].tag}</p>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-[var(--porcelain)]">{slides[idx].title}</h3>
                  <div className="w-14 h-px bg-white/30 ml-auto pt-8"></div>
                </div>
                <p className="text-[var(--mist)] leading-relaxed text-sm font-light">{slides[idx].desc}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-8">
              <div className="text-[11px] tracking-[0.24em] text-white/50">0{idx + 1} / 04</div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIdx((idx - 1 + 4) % 4)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => setIdx((idx + 1) % 4)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 text-center">
        <a href="#contato" className="inline-flex items-center justify-center min-h-[48px] px-10 rounded-full border border-[var(--porcelain)] text-[var(--porcelain)] uppercase text-[11px] font-medium tracking-[0.22em] transition-all hover:bg-[var(--porcelain)] hover:text-[var(--carbon)]">
          Quero Conhecer o 702 Estados Unidos
        </a>
      </div>
    </section>
  );
}

function Plantas() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="plantas" className="bg-[var(--mist)] text-[var(--carbon)] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.5em] uppercase text-black/50">Espaços e Dimensões</p>
            <h2 className="text-5xl md:text-6xl font-light uppercase tracking-widest">Plantas</h2>
            <p className="italic text-black/70 font-light text-lg">Escolha a melhor planta para se encaixar no seu dia a dia.</p>
          </div>
          <div className="h-px bg-black/20 w-full mb-4"></div>
        </header>

        <div className="flex flex-wrap gap-4 mb-20">
          {PLANTS_DATA.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] border transition-all duration-500 ${activeIdx === i ? 'bg-[var(--carbon)] text-[var(--porcelain)] border-[var(--carbon)] translate-y-[-2px]' : 'bg-transparent text-[var(--carbon)] border-[var(--carbon)]/30 hover:border-[var(--carbon)]'}`}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-stretch bg-[var(--porcelain)] p-6 md:p-12 border border-black/10">
          <div className="relative aspect-square md:aspect-auto bg-[#f5f4f2] overflow-hidden border border-black/10 flex items-center justify-center p-12">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_22%_18%,#fff,transparent_28%),linear-gradient(135deg,#e3e1df,#c6c6c4)]" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[30vw] opacity-[0.03] select-none pointer-events-none grayscale invert">
              <BrandLogo className="w-full h-auto" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <div 
                  className="w-full h-full bg-contain bg-center bg-no-repeat filter drop-shadow-2xl" 
                  style={{ backgroundImage: `url("${PLANTS_DATA[activeIdx].image}")` }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center space-y-12">
             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <p className="text-[10px] tracking-[0.42em] uppercase text-black/40">0{activeIdx + 1} / 03</p>
                  <h3 className="text-4xl md:text-5xl font-light uppercase tracking-widest">{PLANTS_DATA[activeIdx].title}</h3>
                  <p className="text-black/60 leading-relaxed max-w-md">{PLANTS_DATA[activeIdx].description}</p>
                </motion.div>
             </AnimatePresence>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-3 pt-6 border-t border-black/10">
                  <p className="text-[10px] uppercase tracking-widest text-black/50">Metragem</p>
                  <p className="text-sm font-medium">{PLANTS_DATA[activeIdx].area}</p>
                </div>
                <div className="space-y-3 pt-6 border-t border-black/10">
                  <p className="text-[10px] uppercase tracking-widest text-black/50">Diferencial</p>
                  <p className="text-sm font-medium">{PLANTS_DATA[activeIdx].layout}</p>
                </div>
             </div>

             <div className="flex flex-wrap gap-4 pt-12">
                <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-black/60 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[var(--carbon)] hover:text-white">
                  Ver Planta Completa
                  <ChevronRight size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', method: '', msg: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contato" className="min-h-screen bg-[var(--carbon-deep)] text-[var(--porcelain)] overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="relative min-h-[400px] lg:min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-left" 
            style={{ backgroundImage: 'url("https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20183013.png")' }}
          />
          <div className="absolute inset-0 bg-[var(--carbon-deep)] contact-diagonal-clip"></div>
          <div className="absolute top-12 left-12 writing-vertical-lr text-[11px] tracking-[0.32em] uppercase text-white/50 opacity-60">
            Address | View | Architecture
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-24 lg:p-32 space-y-12 max-w-2xl mx-auto lg:mx-0">
          <div className="space-y-6">
             <p className="text-[10px] tracking-[0.48em] uppercase text-[var(--mist)]">Contato</p>
             <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest leading-snug">Preencha o formulário e prepare-se para viver uma nova etapa.</h2>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="space-y-2 group border-b border-white/20 focus-within:border-white transition-all py-4">
                  <label className="text-[10px] tracking-widest uppercase text-white/40 block">Seu nome</label>
                  <input 
                    type="text" 
                    required 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    placeholder="Nome completo"
                    className="w-full bg-transparent border-none outline-none text-lg font-light placeholder:text-white/20" 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 group border-b border-white/20 focus-within:border-white transition-all py-4">
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block">E-mail</label>
                    <input 
                      type="email" 
                      required 
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      placeholder="seu@email.com"
                      className="w-full bg-transparent border-none outline-none text-lg font-light placeholder:text-white/20" 
                    />
                  </div>
                  <div className="space-y-2 group border-b border-white/20 focus-within:border-white transition-all py-4">
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block">Telefone</label>
                    <input 
                      type="tel" 
                      required 
                      value={formState.phone}
                      onChange={e => setFormState({...formState, phone: e.target.value})}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-transparent border-none outline-none text-lg font-light placeholder:text-white/20" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-[10px] tracking-widest uppercase text-white/40">Como prefere o contato?</p>
                  <div className="flex flex-wrap gap-8">
                    {['WhatsApp', 'Telefone', 'E-mail'].map((method) => (
                      <label key={method} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="method" 
                          value={method} 
                          className="sr-only"
                          onChange={e => setFormState({...formState, method: e.target.value})}
                        />
                        <span className={`text-xs uppercase tracking-widest transition-all ${formState.method === method ? 'text-white border-b border-white' : 'text-white/50 border-b border-transparent group-hover:text-white'}`}>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full md:w-auto px-12 py-4 rounded-full border border-white/30 text-white uppercase text-[11px] font-bold tracking-[0.24em] transition-all hover:bg-white hover:text-black flex items-center justify-center gap-4 group"
                >
                  Enviar Interesse
                  <Send size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-12"
              >
                <h3 className="text-6xl font-light uppercase tracking-[0.2em] text-[var(--porcelain)]">Obrigado.</h3>
                <p className="text-xl text-[var(--mist)] font-light leading-relaxed">Sua manifestação de interesse foi registrada com precisão.<br/>Em breve um de nossos consultores entrará em contato.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0e0e0c] text-[var(--mist)] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
                 <div className="space-y-2">
                   <p className="text-[var(--porcelain)] font-semibold uppercase tracking-[0.24em] text-sm">702 Estados Unidos</p>
                   <p className="text-[10px] uppercase tracking-[0.32em] text-white/30">Address | View | Architecture</p>
                 </div>
             <p className="italic text-sm leading-relaxed opacity-70">Quando nada é supérfluo, tudo é definitivo.</p>
          </div>

          <div className="space-y-6">
            <p className="text-[var(--porcelain)] font-semibold uppercase tracking-widest text-xs">Acesso</p>
            <ul className="space-y-3 text-sm">
              <li>Rua Estados Unidos, 702</li>
              <li>Jardins · São Paulo / SP</li>
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-[var(--porcelain)] font-semibold uppercase tracking-widest text-xs">Interação</p>
            <ul className="space-y-3 text-sm">
              <li>+55 11 0000-0000</li>
              <li>contato@702estadosunidos.com.br</li>
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-[var(--porcelain)] font-semibold uppercase tracking-widest text-xs">Incorporação</p>
            <div className="flex gap-4">
               <div className="px-6 py-3 border border-white/10 text-[9px] tracking-widest text-white/40 uppercase">Sequoia</div>
               <div className="px-6 py-3 border border-white/10 text-[9px] tracking-widest text-white/40 uppercase">BSP</div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] tracking-wide text-white/30 max-w-3xl leading-loose">
            Imagens meramente ilustrativas. Sujeito a alterações sem aviso prévio. Memorial de incorporação registrado no Cartório de Registro de Imóveis. CRECI · Sequoia + BSP Empreendimentos Imobiliários.
          </p>
          <div className="flex gap-12 shrink-0">
             <a href="#" className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors">
               <Instagram size={14} />
               Instagram
             </a>
             <a href="#" className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors">
               <Linkedin size={14} />
               LinkedIn
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main App ---

export default function App() {
  return (
    <div className="relative font-sans antialiased text-[var(--mist)] selection:bg-[var(--porcelain)] selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="bg-[var(--carbon)] py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center mb-16 space-y-6 w-full">
               <p className="text-[10px] tracking-[0.48em] uppercase text-white/30">Filme da Campanha</p>
               <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-white">702 Estados Unidos</h2>
            </div>
            
            <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden shadow-2xl">
               <div 
                 className="absolute inset-0 bg-cover bg-center" 
                 style={{ backgroundImage: 'url("https://raw.githubusercontent.com/gustavokzintel/702-eua/main/ChatGPT-Image-7-de-abra.png")' }}
               />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer hover:bg-black/20 transition-all duration-700">
                  <div className="w-24 h-24 rounded-full border border-white/40 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="fill-white text-white ml-1" size={32} />
                  </div>
               </div>
            </div>
          </div>
        </section>

        <Manifesto />
        
        <Gallery />
        
        <section id="diferenciais-list" className="bg-[var(--mist)] text-[var(--carbon)] py-40 px-6">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32">
              <div className="lg:sticky lg:top-32 h-fit space-y-8">
                 <p className="text-[10px] tracking-[0.48em] uppercase text-black/40">Diferenciais</p>
                 <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest leading-none">Presença <br/>Absoluta.</h2>
                 <p className="text-black/60 italic text-xl font-light">Presença absoluta é um endereço que se impõe.</p>
              </div>

              <div className="space-y-2">
                 {[
                   "Portaria blindada com clausura para pedestres e veículos",
                   "Gerador para áreas comuns",
                   "Aquecimento central a gás",
                   "Carregadores elétricos nos subsolos",
                   "Bicicletário decorado com bomba de pressão",
                   "Reúso de água para irrigação",
                   "Previsão de aquecimento solar na cobertura",
                   "Infraestrutura para automação residencial"
                 ].map((feat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                     className="grid grid-cols-[60px_1fr] gap-8 py-8 border-b border-black/10 group hover:border-black transition-colors"
                   >
                     <span className="text-[10px] font-bold text-black/30 pt-1 group-hover:text-black">0{i + 1}</span>
                     <p className="text-lg font-light leading-relaxed">{feat}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        <Lazer />
        
        <Plantas />

        <section className="bg-[var(--carbon)] text-[var(--porcelain)] py-40 px-6">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-32 items-start">
              <div className="lg:sticky lg:top-32 space-y-8">
                 <p className="text-[10px] tracking-[0.48em] uppercase text-white/30">Estágio da Obra</p>
                 <div className="space-y-2">
                   <p className="text-7xl md:text-9xl font-light tracking-tighter leading-none">59,42<span className="text-3xl opacity-50 ml-1">%</span></p>
                   <p className="text-[10px] uppercase tracking-[0.32em] text-white/50 pl-2 text-center md:text-left">Concluído</p>
                 </div>
              </div>

              <div className="w-full space-y-10">
                 {[
                   { name: "Escavação", p: 100 },
                   { name: "Fundação", p: 100 },
                   { name: "Estrutura", p: 97 },
                   { name: "Alvenaria", p: 78 },
                   { name: "Elétrica", p: 48 },
                   { name: "Hidráulica", p: 47 },
                   { name: "Acabamento", p: 19 },
                   { name: "Fachada", p: 0 },
                 ].map((item, i) => (
                   <div key={i} className="space-y-4">
                     <div className="flex justify-between items-end text-[10px] uppercase tracking-widest text-white/40">
                        <span>{item.name}</span>
                        <span>{item.p}%</span>
                     </div>
                     <div className="h-1 bg-white/10 relative overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.p}%` }}
                          transition={{ duration: 1.5, delay: i * 0.1, ease: 'circOut' }}
                          viewport={{ once: true }}
                          className="absolute inset-y-0 left-0 bg-[var(--porcelain)]"
                        />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section id="localizacao" className="bg-[var(--carbon)] py-40 px-6 border-t border-white/5">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-8">
                 <p className="text-xs text-white/40 uppercase tracking-[0.32em]">View | Architecture | <span className="text-white font-semibold">Address by Rua Estados Unidos</span></p>
                 <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest leading-normal">Rua Estados Unidos, 702<br/>Jardins, São Paulo / SP</h2>
                 <div className="space-y-6 text-white/60 leading-loose text-lg font-light max-w-lg">
                   <p>O único residencial da Rua Estados Unidos, localizado no melhor bairro de São Paulo, próximo aos melhores restaurantes, bares e lojas da cidade.</p>
                   <p>A 5 minutos do Parque do Ibirapuera, possui uma vista deslumbrante para o Jardim Europa.</p>
                 </div>
              </div>

              <div className="aspect-square bg-[var(--carbon-deep)] border border-white/10 relative overflow-hidden flex items-center justify-center">
                 <div 
                   className="absolute inset-0 opacity-20 bg-cover bg-center grayscale" 
                   style={{ backgroundImage: 'url("https://raw.githubusercontent.com/gustavokzintel/702-eua/main/Captura%20de%20tela%202026-04-30%20182046.png")' }}
                 />
                 <div className="relative z-10 w-full h-full p-24">
                   <svg viewBox="0 0 600 600" className="w-full h-full">
                     <g stroke="white" strokeWidth="0.5" opacity="0.2" fill="none">
                       <line x1="0" y1="120" x2="600" y2="100"/><line x1="0" y1="380" x2="600" y2="360"/>
                       <line x1="120" y1="0" x2="100" y2="600"/><line x1="380" y1="0" x2="360" y2="600"/>
                     </g>
                     <line x1="40" y1="290" x2="560" y2="320" stroke="white" strokeWidth="2" opacity="0.8"/>
                     <circle cx="300" cy="305" r="30" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                     <circle cx="300" cy="305" r="5" fill="white" />
                     <text x="315" y="300" fill="white" className="text-xl font-bold tracking-widest">702</text>
                   </svg>
                 </div>
              </div>
           </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
