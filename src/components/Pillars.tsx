import React from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { EDUCATION_PILLARS } from "../data/pillars";
import { 
  Accessibility, 
  Scale, 
  Award, 
  Coins, 
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

// Helper component to resolve icons matching our types
const IconResolver = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "Accessibility":
      return <Accessibility className={className} />;
    case "Scale":
      return <Scale className={className} />;
    case "Award":
      return <Award className={className} />;
    case "BadgeRupee":
      return <Coins className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    default:
      return <ShieldAlert className={className} />;
  }
};

export const Pillars: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();

  const handleSpeech = (title: string, meaning: string) => {
    speakText(`सिद्धांत स्तम्भ: ${title}, जिसका अर्थ है ${meaning}`);
  };

  return (
    <section 
      id="pillars"
      className={`py-16 border-b transition-colors ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-yellow-400" 
          : "bg-slate-50/50 text-slate-800 border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded inline-block font-mono tracking-wider">
            PM EVIDYA CORE PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            पीएम ई-विद्या के 5 मूल आधार (Core Pillars)
          </h2>
          <p className={`text-sm ${highContrast ? "text-yellow-400" : "text-slate-500 font-mono"}`}>
            राष्ट्रीय शिक्षा नीति (NEP 2020) के सिद्धांतों पर आधारित राष्ट्र-व्यापी शैक्षणिक स्तंभ
          </p>
        </div>

        {/* Dynamic Card Layout Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {EDUCATION_PILLARS.map((p) => (
            <div
              key={p.titleEnglish}
              onMouseEnter={() => handleSpeech(p.titleHindi, p.titleEnglish)}
              className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between ${
                highContrast 
                  ? "border-yellow-300 bg-slate-900 text-yellow-300 hover:bg-slate-800" 
                  : "bg-white border-slate-200/80 hover:shadow-xl hover:border-amber-400 shadow-sm"
              }`}
            >
              <div className="space-y-4 text-left">
                {/* Custom Icon wrapper */}
                <div className={`p-3 rounded-xl inline-block ${
                  highContrast ? "bg-slate-950 text-yellow-300 border border-yellow-300" : "bg-gradient-to-tr from-amber-500 to-amber-600 text-white"
                }`}>
                  <IconResolver name={p.icon} className="h-6 w-6" />
                </div>

                <div className="space-y-1">
                  <header className="flex flex-col">
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{p.titleEnglish}</span>
                    <h3 className="text-lg font-black text-slate-800">{p.titleHindi}</h3>
                  </header>
                </div>

                <p className={`text-xs leading-relaxed ${highContrast ? "text-yellow-300" : "text-slate-500"}`}>
                  {p.descHindi}
                </p>
              </div>

              {/* Decorative base footer footer badge */}
              <div className="pt-4 border-t border-dashed border-slate-100 mt-4 flex items-center justify-between text-[9px] font-bold text-slate-400">
                <span>RSCERT UDAIPUR</span>
                <span className="text-emerald-600 uppercase font-mono bg-emerald-50 px-1 py-0.5 rounded">
                  PASSED
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
