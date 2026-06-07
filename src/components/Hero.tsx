import React from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { Hand, Tv, ChevronRight, PlayCircle, HeartHandshake, Eye } from "lucide-react";

export const Hero: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();

  const handleSpeech = (text: string) => {
    speakText(text);
  };

  return (
    <section 
      id="home"
      className={`relative overflow-hidden pt-6 pb-16 lg:py-20 ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-b border-yellow-400" 
          : "bg-gradient-to-b from-blue-50/70 via-amber-50/30 to-white"
      }`}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      
      {/* Top Banner Requirement: "PM eVIDYA content in Indian Sign Language (ISL) is now available for inclusive learning" */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div 
          onClick={() => handleSpeech("महत्वपूर्ण सूचना: भारतीय सांकेतिक भाषा (ISL) में पीएम ई-विद्या का कंटेंट अब समावेशी शिक्षा के लिए उपलब्ध है।")}
          className={`cursor-pointer rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 transition duration-150 relative overflow-hidden shadow-md ${
            highContrast 
              ? "bg-slate-900 border-2 border-yellow-300 text-yellow-300" 
              : "bg-amber-500 text-slate-950 border border-amber-600/20"
          }`}
          id="main-alert-banner"
        >
          {/* Accent decoration */}
          <div className="absolute -right-6 -bottom-6 opacity-10 bg-black rounded-full h-24 w-24 pointer-events-none" />
          
          <div className="p-2.5 rounded-xl bg-white/20 text-slate-950 flex shrink-0 pulse-glow-saffron">
            <Hand className="h-6 w-6 animate-bounce" />
          </div>
          <div>
            <span className="font-extrabold text-[10px] uppercase tracking-widest bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded-full inline-block mb-1.5 md:mb-0.5">
              महत्वपूर्ण सूचना / IMPORTANT ALERT
            </span>
            <h2 className="text-sm md:text-base font-black leading-snug">
              "PM eVIDYA content in Indian Sign Language (ISL) is now available for inclusive learning."
            </h2>
            <p className="text-xs md:text-sm font-bold opacity-90 mt-0.5">
              राजस्थान में स्कूल शिक्षा का कंटेंट पीएम ई-विद्या पर भारतीय सांकेतिक भाषा (Sign Language) में भी उपलब्ध है।
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black tracking-wide border uppercase bg-gradient-to-r from-amber-50 to-emerald-50 text-indigo-900 border-indigo-100 shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>शिक्षा मंत्रालय, भारत सरकार एवं राजस्थान सरकार</span>
            </div>

            <div 
              onMouseEnter={() => handleSpeech("पीएम ई विद्या राजस्थान चैप्टर। एक समग्र शिक्षा, हर घर तक।")}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                {highContrast ? (
                  <>
                    <span className="text-yellow-300">PM eVidya</span> <br />
                    <span className="text-yellow-400">राजस्थान चैप्टर (RJ)</span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-950 block">PM eVidya</span>
                    <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-700 bg-clip-text text-transparent block font-extrabold">
                      राजस्थान चैप्टर (RJ)
                    </span>
                  </>
                )}
              </h1>
              
              <h3 className="text-lg sm:text-xl font-extrabold text-indigo-900">
                एक समग्र शिक्षा, हर घर तक (Inclusive Education to Every Doorstep)
              </h3>

              <p className={`text-base leading-relaxed ${highContrast ? "text-yellow-300" : "text-slate-600 max-w-2xl"}`}>
                राजस्थान के मरुस्थल से लेकर वन क्षेत्रों तक, हर छात्र को सुलभ, निःशुल्क और गुणवत्तापूर्ण शिक्षा! 
                विशेष आवश्यकता वाले दिव्यांग बच्चों (CWSN) के लिए विशेष रूप से तैयार टीवी व्याख्यान और भारतीय सांकेतिक भाषा (ISL) आधारित अभ्यास सत्र।
              </p>
            </div>

            {/* Quick Stats Grid Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-xl border ${
                highContrast ? "border-yellow-300 bg-slate-900" : "bg-white border-slate-200/80 shadow-sm"
              }`}>
                <div className="text-2xl font-black text-amber-600">5</div>
                <div className="text-xs font-bold text-slate-400">समर्पित DTH चैनल (RJ148 - RJ152)</div>
              </div>
              <div className={`p-4 rounded-xl border ${
                highContrast ? "border-yellow-300 bg-slate-900" : "bg-white border-slate-200/80 shadow-sm"
              }`}>
                <div className="text-2xl font-black text-rose-600">100%</div>
                <div className="text-xs font-bold text-slate-400">भारतीय सांकेतिक भाषा (ISL) सपोर्ट</div>
              </div>
              <div className={`p-4 rounded-xl border col-span-2 sm:col-span-1 ${
                highContrast ? "border-yellow-300 bg-slate-900" : "bg-white border-slate-200/80 shadow-sm"
              }`}>
                <div className="text-2xl font-black text-emerald-600">24/7</div>
                <div className="text-xs font-bold text-slate-400">अनवरत निःशुल्क प्रसारण (Free To Air)</div>
              </div>
            </div>

            {/* Interactive Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#channels"
                onMouseEnter={() => handleSpeech("राजस्थानी स्कूल चैनल देखें")}
                className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold transition-all transform shadow-lg ${
                  highContrast 
                    ? "bg-yellow-300 text-slate-950 hover:bg-yellow-400" 
                    : "bg-blue-900 hover:bg-blue-950 text-white shadow-blue-950/10 hover:-translate-y-0.5"
                }`}
                id="hero-watch-btn"
              >
                <Tv className="h-5 w-5" />
                <span>लाइव चैनल देखें (RJ148 - RJ152)</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              
              <a
                href="#isl-section"
                onMouseEnter={() => handleSpeech("भारतीय सांकेतिक भाषा कंटेंट ब्राउज़ करें")}
                className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold transition-all border ${
                  highContrast 
                    ? "border-yellow-300 bg-slate-900 text-yellow-300 hover:bg-slate-800" 
                    : "bg-white border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-amber-400"
                }`}
                id="hero-isl-btn"
              >
                <Hand className="h-5 w-5 text-amber-500 animate-pulse" />
                <span>सांकेतिक भाषा (ISL) विंग</span>
              </a>
            </div>

          </div>

          {/* Right Vector/Visual Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Outer glowing rings */}
              <div className={`absolute inset-0 rounded-3xl opacity-30 blur-2xl ${
                highContrast ? "bg-yellow-500" : "bg-gradient-to-tr from-amber-400 via-rose-300 to-emerald-400"
              }`} />
              
              {/* Interactive Vector Canvas Custom Render */}
              <div className={`w-full h-full relative rounded-2xl overflow-hidden p-6 border flex flex-col justify-between ${
                highContrast 
                  ? "bg-slate-900 border-yellow-300" 
                  : "bg-white border-slate-200 shadow-2xl"
              }`}>
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500" />
                    <span className="flex h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest bg-slate-100 text-slate-500 uppercase px-2 py-0.5 rounded">
                    ISL INTERPRETER VIRTUAL DEMO
                  </span>
                </div>

                {/* Simulated inclusive classroom center screen with vector hands */}
                <div className="my-auto py-4 space-y-4 text-center">
                  
                  {/* Decorative Hand Sign Vector representing Welcome/Hello in ISL */}
                  <div className="flex justify-center items-center gap-4">
                    
                    {/* Visual box left: Teacher */}
                    <div className="relative flex flex-col items-center">
                      <div className="h-20 w-20 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center overflow-hidden">
                        {/* Vector graphic representation of an educator signing "नमस्ते / Hello" */}
                        <svg className="h-14 w-14 text-blue-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8a3 3 0 0 0-3-3 3 3 0 0 0-3 3v8a3 3 0 0 0 3 3 3 3 0 0 0 3-3V8z" />
                          <path d="M10 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4" />
                          <circle cx="12" cy="12" r="10" stroke="none" fill="currentColor" fillOpacity="0.1" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">शिक्षक (Teacher)</span>
                    </div>

                    {/* Linking Arrow */}
                    <div className="text-amber-500 font-extrabold text-lg animate-pulse">🤝</div>

                    {/* Visual box right: ISL Sign overlay showing the actual signing hands vector */}
                    <div className="relative flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-amber-50 border-4 border-amber-500 flex flex-col items-center justify-center pulse-glow-saffron overflow-hidden">
                        {/* Hands vector */}
                        <svg className="h-12 w-12 text-amber-600 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-amber-600 mt-1 uppercase tracking-wider">सांकेतिक भाषा (ISL)</span>
                    </div>

                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500">
                      "नमस्ते (Hello) को इस प्रकार प्रदर्शित करें"
                    </p>
                    <div className="inline-block bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full font-extrabold">
                      कक्षा 1 से 12 तक निःशुल्क शिक्षा
                    </div>
                  </div>

                </div>

                {/* Visual Footer card describing inclusive learning indicators */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-left">
                  <div>
                    <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Interactive Subtitles</p>
                    <p className="text-xs font-semibold text-blue-900">द्विभाषी सबटाइटल्स सक्रिय (Bilingual subtitles active)</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 p-1.5 rounded-lg flex shrink-0">
                    <Eye className="h-4 w-4" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
