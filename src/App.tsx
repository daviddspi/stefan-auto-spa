import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, useInView } from 'motion/react';
import { 
  Settings, 
  Wrench,
  Cpu,
  Shield,
  Car,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Droplets,
  Users,
  History,
  Wind,
  ZoomIn,
  MessageCircle,
  Sparkles,
  Zap,
  Check,
  MessageSquare,
  Play,
  Volume2,
  VolumeX,
  Calendar,
  ExternalLink,
  Gem,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_CONFIG } from './config';

// --- Components ---

// AnnouncementBar removed for cleaner UI

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Početna', href: '#' },
    { 
      name: 'Cenovnik', 
      href: '#price-list',
      dropdown: [
        { name: 'Paketi', href: '#packages' },
        { name: 'Pojedinačne usluge', href: '#price-list' },
      ]
    },
    { name: 'Galerija', href: '#gallery' },
    { name: 'O Nama', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      setIsMobileMenuOpen(false);

      if (targetId === '') {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        // Allow mobile menu exit animation to start
        setTimeout(() => {
          const navbarHeight = isScrolled ? 80 : 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'bg-secondary/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8 md:py-12'}`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, '#')}
            className="flex items-center active:scale-95 transition-transform" 
            aria-label="Početna"
          >
            <img 
              src={BUSINESS_CONFIG.logo} 
              alt={BUSINESS_CONFIG.name} 
              className={`h-11 md:h-14 w-auto object-contain transition-all duration-500`} 
            />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group py-2"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href || '#'} 
                  className={`text-[16px] font-bold tracking-wide transition-colors duration-300 flex items-center gap-2 ${activeDropdown === link.name ? 'text-primary' : 'text-white/80 hover:text-white'}`}
                  onClick={(e) => {
                    if (link.dropdown) {
                      e.preventDefault();
                    } else {
                      scrollToSection(e, link.href || '#');
                    }
                  }}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </a>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 ease-out" />

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 pt-4"
                      >
                        <div className="bg-secondary/98 backdrop-blur-3xl border border-white/10 rounded-none p-2 min-w-[240px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]">
                          {link.dropdown.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={(e) => scrollToSection(e, sub.href)}
                              className="group/item flex items-center justify-between px-5 py-4 rounded-none text-[13px] font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                            >
                              <span>{sub.name}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden lg:flex bg-primary hover:bg-white hover:text-primary active:scale-95 text-white px-8 py-4 rounded-none text-[12px] font-black tracking-[0.2em] transition-all transform flex items-center justify-center border border-primary shadow-[0_10px_30px_-5px_rgba(47,52,153,0.3)]"
            >
              ZAKAŽI TERMIN
            </a>

            {/* Premium Mobile Trigger with Color Change */}
            <button
              className="lg:hidden relative z-70 flex flex-col justify-center items-center w-10 h-10 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              <div className={`w-8 h-[2.5px] mb-2 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[10.5px] bg-primary' : 'bg-white'}`} />
              <div className={`w-8 h-[2.5px] transition-all duration-500 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[0px] bg-primary' : 'bg-white'}`} />
              <div className={`w-5 h-[2.5px] mt-2 self-end transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-0 translate-x-5' : 'bg-primary opacity-100'}`} />
            </button>
          </div>
        </div>

        {/* Refined Absolute Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 right-0 bg-secondary/98 backdrop-blur-2xl border-t border-white/5 overflow-hidden shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-8 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <div key={link.name} className="flex flex-col border-b border-white/5 last:border-0">
                    <div className="flex items-center justify-center relative">
                      <div className="flex items-center gap-3">
                        <a
                          href={link.href || '#'}
                          onClick={(e) => {
                            if (link.dropdown) {
                              setMobileExpanded(mobileExpanded === link.name ? null : link.name);
                            } else {
                              scrollToSection(e, link.href || '#');
                            }
                          }}
                          className="py-4 text-[18px] font-bold text-white/90 hover:text-primary transition-colors flex items-center gap-3"
                        >
                          <span className="text-primary text-xs opacity-40 italic">0{i + 1}</span>
                          {link.name}
                        </a>
                        {link.dropdown && (
                          <button 
                            onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                            className="flex items-center justify-center text-white/40 hover:text-primary ml-1"
                            aria-label="Toggle dropdown"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === link.name ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>

                    {link.dropdown && (
                      <AnimatePresence>
                        {mobileExpanded === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/5 mb-4"
                          >
                            {link.dropdown.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={(e) => scrollToSection(e, sub.href)}
                                className="block py-4 text-[14px] font-medium text-white/50 hover:text-white text-center"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="px-12 bg-primary text-white py-4 rounded-none font-black tracking-[0.3em] uppercase text-center shadow-primary-glow text-xs hover:bg-white hover:text-primary transition-all active:scale-95"
                  >
                    ZAKAŽI
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// Hero Slide replaced with single video

const Hero = () => {
  const [highlight, setHighlight] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse tracking for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    mouseX.set(x);
    mouseY.set(y);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const highlightTimer = setInterval(() => setHighlight(h => !h), 3000);
    return () => clearInterval(highlightTimer);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden pb-20 md:pb-0" 
      style={{ minHeight: '100svh' }}
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <video
          src="/videos/hero.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-secondary/60" />

        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Hero copy */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-[85vh] md:h-auto flex flex-col pt-32 md:pt-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center flex flex-col items-center h-full md:h-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary/20 backdrop-blur-md rounded-none border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary">Premium Spa</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-[4.5rem] lg:text-[5rem] font-black leading-[1.1] md:leading-[1.1] mb-6 md:mb-8 tracking-tighter uppercase flex flex-col items-center">
            <motion.span 
              animate={{ 
                color: highlight ? 'var(--color-primary)' : '#ffffff',
                textShadow: highlight ? '0 0 30px rgba(47, 52, 153, 0.5)' : '0 0 0px rgba(255,255,255,0)'
              }} 
              transition={{ duration: 1.2 }}
              className="flex flex-col md:flex-row items-center gap-x-4"
            >
              <span className="block">Vratite svom</span>
              <span className="block">automobilu</span>
            </motion.span>
            <motion.span 
              animate={{ 
                color: !highlight ? 'var(--color-primary)' : '#ffffff',
                textShadow: !highlight ? '0 0 30px rgba(47, 52, 153, 0.5)' : '0 0 0px rgba(255,255,255,0)'
              }} 
              transition={{ duration: 1.2 }}
              className="flex flex-col md:flex-row items-center gap-x-4"
            >
              <span className="block">fabrički</span>
              <span className="block">sjaj i miris</span>
            </motion.span>
          </h1>
          <p className="text-white/50 text-[13px] md:text-[15px] mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed text-balance">
            Vaš automobil zaslužuje tretman bez kompromisa. 
            Ovde u Mirijevu svakom detalju prilazim sa maksimalnom posvećenošću i ljubavlju prema svom poslu.
          </p>

          {/* Premium Social Proof Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-3 mb-10 bg-white/5 backdrop-blur-md border border-white/10 p-1.5 pl-3 pr-4 rounded-none w-fit mx-auto shadow-2xl"
          >
            <div className="w-8 h-8 rounded-none bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-white">5.0</span>
                <span className="text-[11px] font-bold text-white/40">Google Rating</span>
              </div>
              <p className="text-[11px] font-bold text-primary tracking-wide leading-tight">
                70+ Verifikovanih recenzija
              </p>
            </div>
          </motion.div>

          {/* Buttons Hidden on Mobile per Request */}
          <div className="hidden md:flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full md:w-auto mb-12 md:mb-0 mt-auto md:mt-0">
            <motion.a 
              href="#contact"
              style={{ x: magneticX, y: magneticY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetMouse}
              className="w-full md:w-auto md:h-16 bg-primary hover:bg-primary/90 active:scale-95 text-white px-10 py-4 md:py-0 rounded-none font-black tracking-[0.25em] uppercase text-[11px] transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl shadow-primary/20 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                ZAKAŽI TERMIN <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                initial={false}
              />
            </motion.a>
            
            <div className="flex flex-col gap-2 w-full md:w-auto h-full">
              {BUSINESS_CONFIG.contact.phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="w-full md:w-auto md:h-16 bg-white/5 hover:bg-white/10 active:scale-95 text-white px-8 py-4 md:py-0 rounded-none font-black tracking-[0.25em] uppercase text-[11px] transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" /> {phone}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MarqueeStats = () => {
  const marqueeItems = [
    { text: 'KOCH CHEMIE', sub: 'SYSTEM PARTNER' },
    { text: 'POLIRANJE', sub: 'MULTI-STAGE' },
    { text: 'MENZERNA', sub: 'GERMAN QUALITY' },
    { text: 'KERAMIKA', sub: 'GTECHNIQ / GYEON' },
    { text: 'DUBINSKO', sub: 'INTERIOR SPA' },
    { text: 'RUPES', sub: 'ITALIAN PASSION' },
  ];

  const displayItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="bg-surface py-6 md:py-12 border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-surface via-surface/90 to-transparent z-10" />

      <motion.div 
        animate={{ x: [0, -915] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 md:gap-20 whitespace-nowrap w-fit px-10"
      >
        {displayItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 group">
            <span className={`text-xl md:text-4xl font-black italic tracking-tighter transition-colors duration-500 ${idx % 2 === 0 ? 'text-primary' : 'text-white'}`}>
              {item.text.charAt(0) + item.text.slice(1).toLowerCase()}
            </span>
            <div className="flex items-center gap-2 md:gap-3 w-full justify-center">
              <div className={`h-[1px] w-2 md:w-4 ${idx % 2 === 0 ? 'bg-primary/40' : 'bg-white/10'}`} />
              <span className="text-[10px] md:text-sm font-bold text-white/30 tracking-wide">
                {item.sub.charAt(0) + item.sub.slice(1).toLowerCase()}
              </span>
              <div className={`h-[1px] w-2 md:w-4 ${idx % 2 === 0 ? 'bg-primary/40' : 'bg-white/10'}`} />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const springValue = useSpring(0, {
    duration: 3000,
    bounce: 0,
  });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const About = () => {
  const stats = [
    { label: 'Zadovoljnih klijenata', value: 70, suffix: '+', icon: Users, delay: 0.1 },
    { label: 'Godina iskustva', value: 5, suffix: '+', icon: History, delay: 0.2 },
    { label: 'Sređenih vozila', value: 500, suffix: '+', icon: Car, delay: 0.3 }
  ];

  return (
    <section className="py-24 bg-secondary relative overflow-hidden" id="about">
      {/* Cinematic Background Lights */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 blur-[250px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[11px] uppercase">O Nama</span>
            <div className="h-1 w-12 bg-primary" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[220px]">
          
          {/* Main Story Tile (2x2 on desktop, 2xAuto on mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-2 md:row-span-2 bg-surface/40 backdrop-blur-3xl border border-white/5 py-10 px-8 md:px-12 flex flex-col items-center lg:items-start text-center lg:text-left group hover:border-primary/20 transition-all duration-500"
          >
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 border border-primary/20">
                Naša Misija
              </span>
              <span className="border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                Ocena 5.0 ★
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
              Više od običnog pranja.<br/> <span className="text-primary opacity-80">Strast prema perfekciji.</span>
            </h3>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xl mb-8">
              {BUSINESS_CONFIG.longDescription}
            </p>
            
            <div className="mt-auto w-full sm:w-auto">
              <a 
                href="#contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-8 md:px-10 py-4 md:py-5 font-black tracking-[0.25em] uppercase text-[11px] hover:bg-primary/90 transition-all active:scale-95 group/btn"
              >
                Rezerviši Termin
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Video Tile (2x2 on mobile, 1x2 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-2 md:col-span-1 md:row-span-2 bg-surface/40 backdrop-blur-3xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-500 min-h-[300px] md:min-h-0"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
            >
              <source src="/videos/abUsVideo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <p className="text-white font-black uppercase italic text-lg md:text-xl tracking-tighter">Proces Rada</p>
              <div className="h-0.5 w-12 bg-primary mt-2 group-hover:w-20 transition-all duration-500" />
            </div>
          </motion.div>

          {/* Stats Tiles (1x1 each on desktop, mixed on mobile) */}
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.8 }}
              className={`
                bg-surface/40 backdrop-blur-3xl border border-white/5 p-6 md:p-8 
                flex flex-col justify-center items-center text-center group 
                hover:bg-primary/5 hover:border-primary/20 transition-all duration-500
                ${idx === 2 ? 'col-span-2 md:col-span-1' : 'col-span-1'}
              `}
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1 md:mb-2 italic">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
// --- Gallery Lightbox ---

const Lightbox = ({ items, startIndex, onClose }: {
  items: { type: string, src: string, label: string }[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(startIndex);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % items.length);
      if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [items.length, onClose]);

  const prev = () => setCurrent(c => (c - 1 + items.length) % items.length);
  const next = () => setCurrent(c => (c + 1) % items.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galerija"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-none flex items-center justify-center transition-colors active:scale-95"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-10 z-10 w-14 h-14 bg-white/5 hover:bg-primary/20 rounded-none flex items-center justify-center transition-all active:scale-95 border border-white/10"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center"
          >
            {items[current].type === 'video' ? (
              <video
                src={items[current].src}
                className="max-w-full max-h-full rounded-none shadow-2xl"
                controls
                autoPlay
              />
            ) : (
              <img
                src={items[current].src}
                alt={items[current].label}
                className="max-w-full max-h-full object-contain rounded-none shadow-2xl"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center">
          <p className="text-xl font-black uppercase italic tracking-tighter text-white mb-2">{items[current].label}</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-white/40 text-sm font-bold tabular-nums">{current + 1} / {items.length}</span>
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 transition-all duration-500 rounded-none ${i === current ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={e => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-10 z-10 w-14 h-14 bg-white/5 hover:bg-primary/20 rounded-none flex items-center justify-center transition-all active:scale-95 border border-white/10"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
    </motion.div>
  );
};

const BeforeAfterSlider = ({ before, after, label }: { before: string, after: string, label: string }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-square rounded-none overflow-hidden cursor-ew-resize select-none border border-white/5"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={(e) => handleMove(e.clientX)}
    >
      {/* After Image */}
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="Posle" />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="Pre" />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-primary z-20"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-none flex items-center justify-center shadow-[0_0_20px_rgba(16,66,63,0.5)] border-2 border-white/20">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-white/60 rounded-none" />
            <div className="w-0.5 h-3 bg-white/60 rounded-none" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-secondary/60 backdrop-blur-md px-3 py-1 rounded-none text-xs font-black uppercase tracking-widest text-white/90 z-10">Pre</div>
      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-none text-xs font-black uppercase tracking-widest text-white z-10">Posle</div>
      
      {/* Info Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <p className="text-white font-black italic uppercase tracking-tight text-sm">{label}</p>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = [
    { type: 'video', src: '/videos/v1.mp4', label: 'Premium Detailing Proces', size: 'lg' },
    { type: 'image', src: '/images/gallery/gallery-7.jpg', label: 'BMW Detailing', size: 'sm' },
    { type: 'image', src: '/images/gallery/gallery-8.jpg', label: 'Interior Nega', size: 'sm' },
    { type: 'video', src: '/videos/v2.mp4', label: 'Eksterna Priprema', size: 'sm' },
    { type: 'image', src: '/images/gallery/gallery-9.jpg', label: 'Dashboard Detailing', size: 'lg' },
    { type: 'video', src: '/videos/v3.mp4', label: 'Završni Sjaj', size: 'sm' },
  ];

  return (
    <section className="py-24 bg-secondary">
      <div id="gallery" className="scroll-mt-26"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[11px] uppercase">Galerija</span>
            <div className="h-1 w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">
            Umetnost <span className="text-primary">Detalja</span>
          </h2>
          <p className="text-white/50 text-[13px] md:text-[15px] max-w-2xl mx-auto leading-relaxed">
            Svaki automobil je platno. Pogledajte transformacije koje postavljaju nove standarde u auto-spa svetu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setLightboxIndex(idx)}
              className={`relative group cursor-pointer overflow-hidden border border-white/5 shadow-2xl ${
                item.size === 'lg' ? 'md:row-span-2' : ''
              }`}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted loop playsInline
                    onMouseOver={e => (e.target as HTMLVideoElement).play()}
                    onMouseOut={e => {
                      (e.target as HTMLVideoElement).pause();
                      (e.target as HTMLVideoElement).currentTime = 0;
                    }}
                  />
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase">
                      {item.type === 'video' ? 'Video Prikaz' : 'Fotografija'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-4">
                    {item.label}
                  </h3>
                  <div className="w-10 h-10 bg-white items-center justify-center hidden lg:flex">
                    <ZoomIn className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const reviews = BUSINESS_CONFIG.reviews;
  // Starting at the middle set for seamless infinite scrolling
  const [index, setIndex] = useState(reviews.length * 2);
  const [dimensions, setDimensions] = useState({
    cardWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 320,
    gap: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 40
  });

  const step = dimensions.cardWidth + dimensions.gap;
  const extendedReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        cardWidth: isMobile ? 260 : 320,
        gap: isMobile ? 20 : 40
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  useEffect(() => {
    if (index >= reviews.length * 4) {
      setIndex(reviews.length * 2);
    }
  }, [index, reviews.length]);

  return (
    <section className="py-12 sm:py-24 bg-secondary relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[11px] uppercase">Šta Kažu Klijenti</span>
            <div className="h-1 w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">
            Showroom <span className="text-primary">Iskustva</span>
          </h2>
          <p className="text-white/50 text-[13px] md:text-[15px] max-w-2xl mx-auto leading-relaxed px-4">
             Poverenje koje smo stekli kroz stotine radnih sati na najekskluzivnijim automobilima.
          </p>
        </div>

        {/* The Slider Container with Gradient Masks */}
        <div className="relative w-full h-[420px] sm:h-[550px] flex items-center overflow-hidden">
          {/* Shadow Overlays */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-64 bg-gradient-to-r from-secondary via-secondary/80 to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-64 bg-gradient-to-l from-secondary via-secondary/80 to-transparent z-30 pointer-events-none" />

          <motion.div 
            animate={{ 
              x: -(index * step) - (dimensions.cardWidth / 2)
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.32, 0.72, 0, 1] 
            }}
            className="flex items-center absolute left-1/2"
            style={{ 
              gap: `${dimensions.gap}px`,
              width: 'max-content' 
            }}
          >
            {extendedReviews.map((review, idx) => {
              const isCenter = idx === index;

              return (
                <div
                  key={idx}
                  className={`
                    shrink-0 p-8 md:p-12
                    bg-surface/80 backdrop-blur-3xl border transition-all duration-1000
                    ${isCenter 
                      ? 'border-primary/40 shadow-[0_0_80px_rgba(47,52,153,0.3)] opacity-100 scale-110 z-20' 
                      : 'border-white/5 opacity-30 scale-90 blur-[6px] z-10'}
                    rounded-none flex flex-col relative
                  `}
                  style={{ width: `${dimensions.cardWidth}px` }}
                >
                  <div className="flex gap-1 mb-8">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-white text-sm sm:text-base md:text-lg italic mb-10 leading-relaxed flex-1 text-balance">
                    "{review.text}"
                  </p>

                  <div className="border-t border-white/10 pt-8 mt-auto">
                    <p className="font-black uppercase italic tracking-tight text-white text-base sm:text-lg">{review.name}</p>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                       Verifikovan klijent
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-2 flex justify-center gap-3 sm:gap-4">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const currentRel = index % reviews.length;
                setIndex(index + (idx - currentRel));
              }}
              className={`h-1 cursor-pointer transition-all duration-500 rounded-none ${
                (index % reviews.length) === idx ? 'w-12 sm:w-16 bg-primary' : 'w-4 sm:w-6 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceModal = ({ service, onClose, currentClass }: { service: any, onClose: () => void, currentClass: number }) => {
  if (!service) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div className="absolute inset-0 bg-secondary/95 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-surface border border-white/10 w-full max-w-2xl rounded-none overflow-hidden relative z-10 shadow-2xl overflow-y-auto max-h-[90vh] premium-scroll"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-none flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Detalji Usluge</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-8 leading-tight">{service.name}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 p-6 rounded-none border border-white/5">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Cena (Klasa {currentClass + 1})</p>
              <p className="text-2xl font-black text-white tracking-tighter">
                {service.prices ? `${service.prices[currentClass]?.toLocaleString()} EUR` : service.price}
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-none border border-white/5">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Trajanje</p>
              <p className="text-2xl font-black text-white tracking-tighter">{service.duration || "Po dogovoru"}</p>
            </div>
          </div>

          {service.subServices && (
            <div className="mb-10 space-y-6">
              <h4 className="text-xl font-bold uppercase italic tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Dodatne opcije i pod-usluge
              </h4>
              <div className="overflow-hidden rounded-none border border-white/5 bg-white/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-primary">Stavka</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-primary text-right">Doplata / Cena</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {service.subServices.map((sub: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-white/80">{sub.name}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-black text-white">
                            {sub.prices[currentClass] === 0 
                              ? "Po dogovoru" 
                              : sub.prices[currentClass] === -1 
                                ? "Na upit" 
                                : `${sub.prices[currentClass]?.toLocaleString()} EUR`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h4 className="text-xl font-bold uppercase italic tracking-tight flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" /> Proces rada
            </h4>
            <p className="text-white/60 text-lg leading-relaxed">
              {service.longDesc || service.desc}
            </p>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-black tracking-[0.25em] uppercase text-[11px] py-5 rounded-none text-center transition-all shadow-primary-glow"
            >
              Zakaži termin
            </a>
            <button 
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black tracking-[0.25em] uppercase text-[11px] py-5 rounded-none transition-all"
            >
              Zatvori
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PricingCard = ({ plan, idx, vehicleClass }: any) => {
  const isBasic = plan.title.toLowerCase().includes('basic');
  const isVip = plan.title.toLowerCase().includes('vip');
  const isSpecial = isBasic || isVip;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      className={`relative p-8 h-fit rounded-none border transition-all duration-200 hover:-translate-y-2 flex flex-col group/card shadow-xl hover:shadow-2xl ${
        isBasic 
          ? 'bg-primary border-transparent text-white shadow-[0_0_40px_rgba(47,52,153,0.3)] hover:shadow-[0_0_60px_rgba(47,52,153,0.4)] z-10' 
          : isVip
            ? 'bg-surface/40 backdrop-blur-md border-primary/60 text-white shadow-[0_0_50px_rgba(47,52,153,0.25)] hover:shadow-[0_0_70px_rgba(47,52,153,0.4)] ring-2 ring-primary/30 z-10'
            : plan.recommended
              ? 'bg-surface/40 backdrop-blur-md border-primary/40 text-white shadow-[0_0_30px_rgba(47,52,153,0.15)] ring-1 ring-primary/20 z-10'
              : 'bg-surface/40 backdrop-blur-md border-white/10 hover:border-white/20 text-white'
      }`}
    >
      {plan.badge && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-black tracking-[0.2em] px-6 py-2 rounded-none uppercase z-20 whitespace-nowrap shadow-2xl ${
          isBasic || plan.recommended 
            ? 'bg-white text-primary' 
            : 'bg-primary text-white'
        }`}>
          {plan.badge.toUpperCase()}
        </div>
      )}

      <div className="relative z-10 pt-2 flex flex-col h-full">
        <h3 className={`text-3xl font-black italic mb-2 tracking-tighter ${isBasic ? 'text-white' : 'text-white'}`}>
          {plan.title}
        </h3>
        <p className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${
          isBasic ? 'text-white/80' : plan.recommended || isSpecial ? 'text-primary' : 'text-white/40'
        }`}>
          {plan.subtitle}
        </p>
        <div className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2 ${
          isBasic ? 'text-white/60' : 'text-white/40'
        }`}>
          <Clock className="w-3.5 h-3.5" /> {plan.duration}
        </div>
        
        <div className="mb-10 flex items-baseline">
          <AnimatePresence mode="wait">
            <motion.div
              key={vehicleClass}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline gap-1"
            >
              <span className={`text-5xl md:text-6xl font-black tracking-tighter tabular-nums ${isBasic ? 'text-white' : 'text-white'}`}>
                {plan.prices ? plan.prices[vehicleClass].toLocaleString() : plan.price.replace('od ', '').replace(' EUR', '')}
              </span>
              <span className={`text-2xl font-black ml-1 uppercase ${isBasic ? 'text-white/90' : 'text-primary'}`}>€</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="space-y-4 mb-10 min-h-[220px]">
          {plan.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-4 group/item">
              <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isBasic ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
              <span className={`text-xs font-medium tracking-wide leading-relaxed transition-colors ${
                isBasic ? 'text-white/90 group-hover/item:text-white' : 'text-white/70 group-hover/item:text-white'
              }`}>
                {item.charAt(0) + item.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 relative z-20">
          <a 
            href="#contact"
            className={`w-full py-5 rounded-none font-black tracking-[0.25em] uppercase text-[11px] flex items-center justify-center transition-all active:scale-95 group/btn shadow-[0_0_20px_rgba(47,52,153,0.3)] ${
              isBasic 
                ? 'bg-white text-primary hover:bg-white/90' 
                : 'bg-primary text-white hover:bg-white hover:text-primary'
            }`}
          >
            Zakaži Paket <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [vehicleClass, setVehicleClass] = useState(0); // 0: Manji auto, 1: Limuzina, 2: SUV/Džip
  const [selectedService, setSelectedService] = useState<any>(null);

  const classes = ["Mali auto", "Srednji auto", "Veliki auto"];

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div id="packages" className="scroll-mt-26"></div>
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-none blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[11px] uppercase">Paketi</span>
            <div className="h-1 w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">Odaberi svoj nivo nege</h2>
          <p className="text-white/50 text-[13px] md:text-[15px] max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
            Transparentni paketi prilagođeni vašim potrebama. Svaki paket garantuje potpunu posvećenost detaljima.
          </p>
          
          {/* Vehicle Class Selector (Moved here) */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {classes.map((className, idx) => (
              <button
                key={idx}
                onClick={() => setVehicleClass(idx)}
                className={`px-8 py-4 rounded-none font-black tracking-widest uppercase text-xs transition-all border ${
                  vehicleClass === idx 
                    ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30 ring-4 ring-primary/10' 
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {className}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {BUSINESS_CONFIG.packages.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} idx={idx} vehicleClass={vehicleClass} />
          ))}
        </div>

        {/* Satisfaction Guarantee */}
        <div className="mt-32 w-full">
          <div className="bg-surface/40 backdrop-blur-md border border-white/10 rounded-none p-10 md:p-14 flex flex-col lg:flex-row items-center gap-10 md:gap-14 text-center lg:text-left transition-colors duration-500 hover:border-primary/50 group shadow-2xl">
            <div className="relative shrink-0">
              <div className="w-20 h-20 border-2 border-primary rotate-45 rounded-none flex items-center justify-center bg-surface/80 backdrop-blur-sm shadow-[0_0_30px_rgba(47,52,153,0.2)] group-hover:shadow-[0_0_50px_rgba(47,52,153,0.4)] transition-all duration-500">
                <Shield className="w-8 h-8 text-primary -rotate-45" strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-4 text-white">
                100% Garancija kvaliteta
              </h3>
              <p className="text-white/60 text-sm md:text-[15px] font-medium tracking-wide leading-relaxed max-w-2xl">
                Svaki tretman obavljamo isključivo sa najkvalitetnijim alatima i hemijom, uz strogu kontrolu svakog mikrona. Vaše zadovoljstvo i izgled vozila su nam jedini prioriteti.
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <a 
                href="#contact"
                className="w-full lg:w-auto bg-primary text-white px-10 py-5 rounded-none font-black tracking-[0.25em] uppercase text-[11px] flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white hover:text-primary shadow-[0_0_20px_rgba(47,52,153,0.3)] active:scale-95 group/btn"
              >
                Dokazano najbolji <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Table Section */}
        <div className="mt-26 scroll-mt-26" id="price-list">
          <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[11px] uppercase">Cenovnik Usluga</span>
            <div className="h-1 w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Pojedinačne Usluge</h2>
            
            {/* Vehicle Class Selector (Added here as well) */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {classes.map((className, idx) => (
                <button
                  key={idx}
                  onClick={() => setVehicleClass(idx)}
                  className={`px-8 py-4 rounded-none font-black tracking-widest uppercase text-xs transition-all border ${
                    vehicleClass === idx 
                      ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30 ring-4 ring-primary/10' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {className}
                </button>
              ))}
            </div>
            <p className="mt-6 text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">Cene se sinhronizovano ažuriraju za sve pakete i usluge</p>
          </div>

          <div className="bg-surface/20 rounded-none border border-white/5 overflow-hidden backdrop-blur-md">
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 md:px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-primary">Usluga</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-primary hidden md:table-cell">Opis</th>
                    <th className="px-6 md:px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-primary text-right hidden md:table-cell">Cena</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {BUSINESS_CONFIG.serviceCategories.flatMap(cat => cat.services).map((service, sIdx) => (
                    <tr 
                      key={sIdx} 
                      onClick={() => setSelectedService(service)}
                      className="hover:bg-white/[0.05] cursor-pointer transition-all group"
                    >
                      <td className="px-6 md:px-8 py-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-col min-w-0">
                             <span className="text-base md:text-xl font-black text-white/90 group-hover:text-primary transition-colors tracking-tight leading-tight mb-1 truncate md:whitespace-normal">{service.name}</span>
                             {/* Mobile Price Indicator */}
                             <div className="md:hidden mt-1">
                               <span className="text-[15px] font-black text-primary tracking-tighter uppercase italic">
                                {service.prices 
                                  ? (service.prices[vehicleClass] || service.prices[0] || 0) > 0 
                                    ? `${(service.prices[vehicleClass] || service.prices[0]).toLocaleString()} EUR` 
                                    : "Na upit"
                                  : service.price}
                               </span>
                             </div>
                            <div className="flex items-center gap-1.5 opacity-0 md:group-hover:opacity-100 transition-opacity">
                              <span className="text-primary text-xs font-black uppercase tracking-[0.2em]">Saznaj više</span>
                              <ArrowRight className="w-3 h-3 text-primary transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                          {/* Mobile Arrow Indicator */}
                          <div className="md:hidden">
                            <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-white/60 leading-relaxed max-w-xs hidden md:table-cell">{service.desc}</td>
                      <td className="px-6 md:px-8 py-6 text-right hidden md:table-cell">
                        <div className="flex flex-col items-end">
                          <span className="text-xl md:text-2xl font-black tracking-tighter text-white whitespace-nowrap">
                            {service.prices 
                              ? service.prices[vehicleClass] === 0 
                                ? "Po dogovoru" 
                                : service.prices[vehicleClass] === -1 
                                  ? "Na upit" 
                                  : `${service.prices[vehicleClass]?.toLocaleString()} EUR` 
                              : service.price}
                          </span>
                          {service.note && service.prices && (
                            <span className="text-xs font-bold text-primary uppercase mt-1">
                              {/* EUR labels removed */}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Service Detail Modal */}
          <AnimatePresence>
            {selectedService && (
              <ServiceModal 
                service={selectedService} 
                currentClass={vehicleClass}
                onClose={() => setSelectedService(null)} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const primaryPhone = BUSINESS_CONFIG.contact.phones[0];
  const cleanPhone = primaryPhone.replace(/\s+/g, '').replace('+', '');

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div id="contact" className="scroll-mt-26"></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
              <div className="h-1 w-8 sm:w-12 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase">Zakaži termin</span>
              <div className="h-1 w-8 sm:w-12 bg-primary lg:hidden" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-8 leading-tight text-center lg:text-left">
              Brz dogovor <br />
              <span className="text-primary">putem aplikacija.</span>
            </h2>
            
            <p className="text-white/40 text-sm md:text-base mb-12 leading-relaxed text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              Preskočite čekanje i popunjavanje formi. Pošaljite nam poruku direktno na WhatsApp ili Viber i dobićete odgovor u najkraćem mogućem roku.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Telefon</span>
                </div>
                <a href={`tel:${primaryPhone}`} className="text-xl font-black italic hover:text-primary transition-colors">
                  {primaryPhone}
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Email</span>
                </div>
                <a href={`mailto:${BUSINESS_CONFIG.contact.emails[0]}`} className="text-sm font-black italic hover:text-primary transition-colors truncate block">
                  {BUSINESS_CONFIG.contact.emails[0]}
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Lokacija</span>
                </div>
                <a 
                  href="https://www.google.com/maps/place/Stefan+Auto+Spa/@44.787117,20.5421095,800m/data=!3m2!1e3!4b1!4m6!3m5!1s0x475a71001fd9110d:0x1607e7b3756b8091!8m2!3d44.787117!4d20.5421095!16s%2Fg%2F11xzy7_r_p?entry=ttu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-black italic hover:text-primary transition-colors block leading-tight"
                >
                  Smederevski put, Beograd
                </a>
              </div>

              {/* Instagram Card */}
              <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-6 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Instagram className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Zapratite nas</span>
                </div>
                <a 
                  href="https://www.instagram.com/stefanautospa_detailing/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-black italic hover:text-primary transition-colors block truncate"
                >
                  @stefanautospa_detailing
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 text-white/10 justify-center lg:justify-start">
               <div className="h-px flex-1 bg-white/5" />
               <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Stefan Auto Spa 2026</span>
               <div className="h-px flex-1 bg-white/5" />
            </div>
          </div>

          {/* Right Side: Direct Actions */}
          <div className="flex flex-col gap-4">
            {/* WhatsApp - Main Action */}
            <motion.a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366] group border border-[#25D366]/20 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageCircle className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10">
                <span className="text-[#25D366] group-hover:text-white text-[10px] font-black uppercase tracking-[0.3em] bg-[#25D366]/10 px-3 py-1 border border-[#25D366]/20 mb-6 inline-block">Najbrži odgovor</span>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic leading-none tracking-tighter">
                  Pošalji poruku <br />
                  <span className="text-[#25D366] group-hover:text-white/80 transition-colors">WhatsApp</span>
                </h3>
              </div>
              <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs relative z-10 mt-12">
                <span>Kreni u čet</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.a>

            {/* Viber - Secondary Action */}
            <motion.a
              href={`viber://chat?number=${cleanPhone}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#7360f2]/10 hover:bg-[#7360f2] group border border-[#7360f2]/20 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Phone className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10">
                <span className="text-[#7360f2] group-hover:text-white text-[10px] font-black uppercase tracking-[0.3em] bg-[#7360f2]/10 px-3 py-1 border border-[#7360f2]/20 mb-6 inline-block">Viber Zakazivanje</span>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic leading-none tracking-tighter">
                  Zakaži termin <br />
                  <span className="text-[#7360f2] group-hover:text-white/80 transition-colors">Viber</span>
                </h3>
              </div>
              <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs relative z-10 mt-12">
                <span>Pošalji upit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "Koliko traje kompletan detailing tretman?",
      a: "Vreme trajanja zavisi od izabranog paketa i trenutnog stanja vašeg vozila. Poseban fokus se stavlja na najsitnije detalje, tako da tretmani mogu trajati od 3 do čak 48 sati za napredne usluge keramičke zaštite."
    },
    {
      q: "Koja je razlika između voskiranja i keramičke zaštite?",
      a: "Voskaranje pruža odličan sjaj i zaštitu do par meseci. Premium Keramička zaštita se fizički vezuje za molekule laka formirajući stakleni omotač koji je neuporedivo tvrđi, pruža vrhunsku hidrofobnost i štiti auto od hemikalija i ogrebotina godinama."
    },
    {
      q: "Da li garantujete za bezbednost mog vozila?",
      a: "Apsolutno. Vaš auto se tokom boravka u našem studiju tretira sa najvećim mogućim poštovanjem. Studio poseduje nadzor, a preparati su rigorozno testirani i ne sadrže štetne kiseline."
    },
    {
      q: "Da li je obavezno zakazivanje unapred?",
      a: "Da, obzirom da naša usluga podrazumeva višečasovnu posvećenost svakom automobilu pojedinačno, termin je obavezno rezervisati nekoliko dana unapred kako bismo mogli u potpunosti da se posvetimo vašem vozilu."
    }
  ];

  return (
    <section className="py-24 bg-secondary" id="faq">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 relative"
      >
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-[11px] uppercase">Česta Pitanja</span>
            <div className="h-1 w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Sve što treba da znate</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-none overflow-hidden transition-all duration-300 ${openIdx === idx ? 'bg-surface/50 border-primary/40 shadow-[0_0_30px_rgba(47,52,153,0.15)]' : 'bg-surface/20 backdrop-blur-sm border-white/10 hover:border-white/20'}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between gap-6 group"
              >
                <h4 className={`text-sm md:text-[15px] font-bold tracking-wide transition-colors ${openIdx === idx ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                  {faq.q}
                </h4>
                <div className={`w-10 h-10 shrink-0 border rounded-none flex items-center justify-center transition-all duration-500 ${openIdx === idx ? 'border-primary bg-primary text-white rotate-45' : 'border-white/20 text-white/50 bg-transparent group-hover:border-white/50'}`}>
                  <Plus className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8 text-white/60 text-sm md:text-[15px] leading-relaxed border-t border-white/5 pt-6 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// --- Mobile Sticky Booking Bar ---
const MobileStickyBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-secondary/95 backdrop-blur-xl border-t border-white/10 px-2 py-3 flex gap-2 safe-area-inset-bottom">
    {BUSINESS_CONFIG.contact.phones.map((phone, idx) => (
      <a
        key={idx}
        href={`tel:${phone}`}
        className="flex-1 bg-surface border border-white/10 text-white py-3 rounded-none font-black tracking-tighter uppercase text-sm text-center flex flex-col items-center justify-center active:scale-95 transition-transform"
        aria-label={`Pozovi ${idx + 1}`}
      >
        <Phone className="w-4 h-4 mb-1" aria-hidden="true" /> {phone}
      </a>
    ))}
    <a
      href="#contact"
      className="flex-[1.5] bg-primary text-white py-3 rounded-none font-black tracking-widest uppercase text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
    >
      ZAKAŽI <ArrowRight className="w-5 h-5" aria-hidden="true" />
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center">
                <img 
                  src={BUSINESS_CONFIG.logo} 
                  alt={`${BUSINESS_CONFIG.name} Logo`} 
                  className="h-12 md:h-16 w-auto object-contain" 
                />
              </div>
            </div>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              Specijalizovan studio za kompletnu negu i zaštitu premijum vozila. Vrhunska kozmetika, najsavremenije tehnike i decenijsko iskustvo u detailingu.
            </p>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              <a href={BUSINESS_CONFIG.contact.social.instagram} className="w-11 h-11 bg-surface rounded-none flex items-center justify-center hover:bg-primary active:scale-95 transition-all text-white hover:text-white" aria-label="Follow us on Instagram" role="listitem">
                <Instagram size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/60 mb-6">Navigacija</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Početna</a></li>
              <li><a href="#packages" className="text-white/60 hover:text-primary transition-colors">Paketi</a></li>
              <li><a href="#gallery" className="text-white/60 hover:text-primary transition-colors">Galerija</a></li>
              <li><a href="#about" className="text-white/60 hover:text-primary transition-colors">O Nama</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-primary transition-colors">Česta Pitanja</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/60 mb-6">Kontakt</h3>
            <ul className="space-y-4 text-sm">
              {BUSINESS_CONFIG.contact.phones.map((phone, idx) => (
                <li key={idx}>
                  <a href={`tel:${phone}`} className="text-white/60 hover:text-primary transition-colors font-medium">{phone}</a>
                </li>
              ))}
              {BUSINESS_CONFIG.contact.emails.map((email, idx) => (
                <li key={idx}>
                  <a href={`mailto:${email}`} className="text-white/60 hover:text-primary transition-colors font-medium">{email}</a>
                </li>
              ))}
              <li className="text-white/60 font-medium">{BUSINESS_CONFIG.contact.locations.map(l => l.name).join(' i ')}</li>
              <li className="text-white/60 font-medium">{BUSINESS_CONFIG.contact.workingHours}</li>
            </ul>

          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. SVA PRAVA ZADRŽANA.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-bold tracking-[0.3em] uppercase">Politika privatnosti</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-bold tracking-[0.3em] uppercase">Uslovi korišćenja</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white">
      {/* Skip to main content — keyboard/screen reader navigation */}
      <a href="#main-content" className="skip-link">
        Preiđi na glavni sadrzaj
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <MarqueeStats />
        <Pricing />
        <Gallery />
        <Testimonials />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
