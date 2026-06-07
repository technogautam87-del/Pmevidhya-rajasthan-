import React, { useState } from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { 
  Menu, 
  X, 
  Accessibility, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Tv, 
  Info, 
  Hand,
  Sparkles,
  Search
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    highContrast,
    fontSize,
    screenReaderActive,
    toggleHighContrast,
    setFontSize,
    toggleScreenReader,
    speakText,
  } = useAccessibility();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavHover = (text: string) => {
    speakText(text);
  };

  const navLinks = [
    { nameHindi: "मुख्य पृष्ठ", nameEnglish: "Home", href: "#home", icon: BookOpen },
    { nameHindi: "राजस्थानी चैनल्स", nameEnglish: "Rajasthan Channels", href: "#channels", icon: Tv },
    { nameHindi: "सांकेतिक भाषा", nameEnglish: "Sign Language Content", href: "#isl-section", icon: Hand },
    { nameHindi: "हमारे सिद्धांत", nameEnglish: "Core Pillars", href: "#pillars", icon: Info },
  ];

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 shadow-md border-b ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-yellow-400" 
          : "bg-white text-slate-800 border-slate-200"
      }`}
    >
      {/* Top Accessibility Bar */}
      <div 
        className={`text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-2 border-b ${
          highContrast ? "border-yellow-400 bg-slate-900" : "bg-blue-950 text-slate-200"
        }`}
        aria-label="Accessibility Toolbar"
      >
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-slate-900 px-2 py-0.5 rounded-sm font-bold text-[10px] tracking-wider animate-pulse">
            LIVE BROADCAST 24x7
          </span>
          <span 
            className="cursor-help"
            onMouseEnter={() => handleNavHover("पीएम ई-विद्या राजस्थान सरकार शिक्षा विभाग सहभागिता")}
          >
            राजस्थान सरकार शिक्षा विभाग • PM eVidya Inclusive Education Portal
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Virtual Screen Reader Control */}
          <button
            onClick={toggleScreenReader}
            onMouseEnter={() => handleNavHover("टॉकबैक या स्क्रीन पाठक को चालू या बंद करें")}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium cursor-pointer transition ${
              screenReaderActive 
                ? (highContrast ? "bg-yellow-300 text-slate-950" : "bg-amber-500 text-blue-950")
                : (highContrast ? "border border-yellow-400 hover:bg-slate-800" : "bg-blue-900/50 hover:bg-blue-900")
            }`}
            title="Screen Reader Simulation for Accessibility"
            id="btn-screeenreader"
          >
            {screenReaderActive ? (
              <>
                <Volume2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">रीडर ऑन (Reader ON)</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">रीडर ऑफ (Reader OFF)</span>
              </>
            )}
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            onMouseEnter={() => handleNavHover("उच्च कंट्रास्ट विजुअल थीम बदलें")}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium cursor-pointer transition border ${
              highContrast 
                ? "bg-yellow-300 border-yellow-300 text-slate-950" 
                : "border-slate-400/30 bg-blue-900/20 hover:bg-blue-900"
            }`}
            title="Toggle High Contrast for Low Vision"
            id="btn-highcontrast"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">उच्च कंट्रास्ट (Contrast)</span>
          </button>

          {/* Font Size Adjusters */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
            <span className="hidden md:inline mr-1 text-[10px] text-slate-400 uppercase font-mono">Font Size:</span>
            <button
              onClick={() => setFontSize("normal")}
              className={`px-2 py-0.5 rounded-sm font-semibold hover:bg-amber-600 transition ${
                fontSize === "normal" ? "bg-amber-500 text-slate-950" : "bg-slate-800"
              }`}
              title="Change Text Size to Normal"
              id="txt-sz-normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2 py-0.5 rounded-sm font-semibold hover:bg-amber-600 transition ${
                fontSize === "large" ? "bg-amber-500 text-slate-950" : "bg-slate-800"
              }`}
              title="Change Text Size to Large"
              id="txt-sz-large"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-2 py-0.5 rounded-sm font-semibold hover:bg-amber-600 transition ${
                fontSize === "xlarge" ? "bg-amber-500 text-slate-950" : "bg-slate-800"
              }`}
              title="Change Text Size to Extra Large"
              id="txt-sz-xl"
            >
              A++
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Brand Brand */}
          <a 
            href="#home"
            onMouseEnter={() => handleNavHover("पी एम ई-विद्या - राजस्थान चेप्टर। समावेशी शिक्षा पोर्टल")}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 p-1"
            id="nav-logo"
          >
            {/* National emblem themed/ashoka wheel themed custom SVG representing PM eVidya with Rajasthan map & sign language handshake */}
            <div className={`relative h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${
              highContrast ? "bg-yellow-300 text-slate-950" : "bg-gradient-to-tr from-amber-500 via-white to-emerald-600 text-blue-900"
            }`}>
              {/* Spinning visual core resembling ashoka chakra and inclusive hands */}
              <span className="z-10 text-xl">वि</span>
              <div className="absolute inset-0.5 border-2 border-dashed border-blue-900 rounded-full animate-[spin_40s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-lg font-black tracking-tight ${highContrast ? "text-yellow-300" : "text-blue-900"}`}>
                  PM eVidya
                </span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded font-bold uppercase tracking-wider ${
                  highContrast ? "bg-yellow-300 text-slate-950" : "bg-amber-100 text-amber-800"
                }`}>
                  राजस्थान (RJ)
                </span>
              </div>
              <p className={`text-xs ${highContrast ? "text-yellow-400" : "text-slate-500 font-medium"}`}>
                स्कूल शिक्षा का समावेशी मंच • State Chapter
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => handleNavHover(`${link.nameHindi}, ${link.nameEnglish}`)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 relative group ${
                    highContrast 
                      ? "hover:bg-slate-900 text-yellow-300 border-b-2 border-transparent hover:border-yellow-300" 
                      : "text-slate-700 hover:text-blue-900 hover:bg-blue-50/75"
                  }`}
                  id={`nav-link-${link.href.replace('#', '')}`}
                >
                  <Icon className={`h-4 w-4 ${highContrast ? "text-yellow-300" : "text-amber-500 group-hover:scale-110 transition-transform"}`} />
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] leading-[1.1] opacity-90 font-medium text-slate-400 group-hover:text-amber-600 transition-colors">
                      {link.nameEnglish}
                    </span>
                    <span className="text-sm font-bold mt-[1px]">{link.nameHindi}</span>
                  </div>
                </a>
              );
            })}

            {/* Helpline / Help Portal Portal Trigger */}
            <a
              href="#helpline"
              onMouseEnter={() => handleNavHover("सहायता और दिव्यांग परामर्श, Help Desk Desk")}
              className={`ml-4 flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-bold border transition ${
                highContrast 
                  ? "bg-slate-900 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-slate-950" 
                  : "bg-amber-600 border-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-600/10"
              }`}
              id="nav-helpline"
            >
              <Accessibility className="h-4 w-4 animate-bounce" />
              <span>दिव्यांग हेल्पडेस्क</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => handleNavHover("मेन्यू खोलें या बंद करें (Toggle menu)")}
              className={`p-2 rounded-lg transition-colors ${
                highContrast 
                  ? "hover:bg-slate-900 text-yellow-300" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-blue-900"
              }`}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div 
          className={`lg:hidden border-t px-4 pt-2 pb-6 space-y-2 ${
            highContrast ? "bg-slate-950 border-yellow-300 text-yellow-300" : "bg-white text-slate-800"
          }`}
          id="mobile-dropdown-menu"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                onMouseEnter={() => handleNavHover(`${link.nameHindi} link`)}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  highContrast ? "hover:bg-slate-900" : "hover:bg-slate-50 text-slate-700 hover:text-blue-900"
                }`}
                id={`mobile-link-${link.href.replace('#', '')}`}
              >
                <Icon className="h-5 w-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">{link.nameEnglish}</span>
                  <span className="text-base font-bold">{link.nameHindi}</span>
                </div>
              </a>
            );
          })}
          <div className="pt-4 border-t border-slate-600/20">
            <a
              href="#helpline"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center justify-center p-3 rounded-xl font-bold gap-2 text-center ${
                highContrast 
                  ? "bg-yellow-300 text-slate-950" 
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
              id="mobile-helpline-btn"
            >
              <Accessibility className="h-5 w-5" />
              <span>दिव्यांग सहायता परामर्श (Helpline)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
