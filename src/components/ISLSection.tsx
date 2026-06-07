import React, { useState } from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { motion, AnimatePresence } from "motion/react";
import { 
  Hand, 
  Volume2, 
  Sparkles, 
  Video, 
  ArrowRight,
  BookOpen, 
  PhoneCall, 
  HelpCircle,
  Accessibility
} from "lucide-react";

interface ISLKeyphrase {
  wordHindi: string;
  wordEnglish: string;
  gestureDescriptionHindi: string;
  gestureDescriptionEnglish: string;
  svgGestureType: "hello" | "teacher" | "school" | "rajasthan" | "book" | "thankyou";
  emojiRepresentative: string;
}

const ISL_PHRASES: ISLKeyphrase[] = [
  {
    wordHindi: "नमस्ते",
    wordEnglish: "Hello / Namaste",
    gestureDescriptionHindi: "दोनों हाथों की हथेलियों को छाती के पास आपस में जोड़ें (जैसे पारंपरिक अभिवादन) और सिर को थोड़ा सा झुकाएं।",
    gestureDescriptionEnglish: "Press both palms together close to chest in standard respectful greeting gesture, tipping the head slightly.",
    svgGestureType: "hello",
    emojiRepresentative: "🙏"
  },
  {
    wordHindi: "शिक्षक / गुरुजी",
    wordEnglish: "Teacher / Guru",
    gestureDescriptionHindi: "दाहिने हाथ की तर्जनी उंगली को माथे के पास से आगे की ओर ले जाएं, जैसे ज्ञान की ज्योति फैला रहे हों।",
    gestureDescriptionEnglish: "Place index finger of right hand near the temple/forehead, and guide it forward, symbolizing spreading light.",
    svgGestureType: "teacher",
    emojiRepresentative: "🧑‍🏫"
  },
  {
    wordHindi: "स्कूल / विद्यालय",
    wordEnglish: "School / Vidhyalay",
    gestureDescriptionHindi: "दोनों हथेलियों से दो बार ताली बजाएं, और फिर हाथों को जोड़कर झोपड़ीनुमा छत जैसी मुद्रा बनाएं।",
    gestureDescriptionEnglish: "Clap both hands flat together twice, then join fingertips to form a triangular roof-top shape.",
    svgGestureType: "school",
    emojiRepresentative: "🏫"
  },
  {
    wordHindi: "राजस्थान",
    wordEnglish: "Rajasthan",
    gestureDescriptionHindi: "दोनों हाथों की उंगलियों की नोक को सिर के ऊपर ले जाकर एक मुकुट (Crown) जैसी आकृति दर्शाएं।",
    gestureDescriptionEnglish: "Position fingers of both hands lightly touching above your head, mimicking a royal crown shape.",
    svgGestureType: "rajasthan",
    emojiRepresentative: "👑"
  },
  {
    wordHindi: "किताब / पुस्तक",
    wordEnglish: "Book / Pustak",
    gestureDescriptionHindi: "दोनों हथेलियों को आपस में सटाकर रखें, फिर धीरे से उन्हें खोलें जैसे कोई किताब का पन्ना खोला जा रहा हो।",
    gestureDescriptionEnglish: "Hold flat palms pressed tight, then open them outwards from the bottom edge like unfolding a page.",
    svgGestureType: "book",
    emojiRepresentative: "📖"
  },
  {
    wordHindi: "धन्यवाद",
    wordEnglish: "Thank You / Dhanyavad",
    gestureDescriptionHindi: "दाहिने हाथ की सपाट हथेली की उँगलियों को होठों को छूकर धीरे से आगे हवा में नीचे की ओर ले जाएं।",
    gestureDescriptionEnglish: "Form a flat hand horizontally touching your chin/lips, then slide it down and forward with a warm smile.",
    svgGestureType: "thankyou",
    emojiRepresentative: "🤝"
  }
];

export const ISLSection: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();
  const [selectedPhrase, setSelectedPhrase] = useState<ISLKeyphrase | null>(ISL_PHRASES[0]);

  const handleSpeech = (text: string) => {
    speakText(text, /[अ-ज्ञ]/.test(text) ? "hi-IN" : "en-US");
  };

  const handlePhraseSelect = (phrase: ISLKeyphrase) => {
    setSelectedPhrase(phrase);
    handleSpeech(`${phrase.wordHindi}, ${phrase.wordEnglish}. ${phrase.gestureDescriptionHindi}`);
  };

  return (
    <section 
      id="isl-section"
      className={`py-16 border-b transition-colors relative ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-yellow-400" 
          : "bg-slate-50 text-slate-800 border-slate-200"
      }`}
    >
      <div className="absolute top-0 right-0 h-40 w-40 opacity-5 bg-gradient-to-l from-amber-500 to-transparent pointer-events-none rounded-bl-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* State Sign-Language Focus Banner / Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-amber-100 text-amber-900 shadow-sm border border-amber-200">
            <Accessibility className="h-4 w-4 text-amber-700 animate-spin-slow" />
            <span>समावेशी पाठ्यक्रम विंग &amp; CWSN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            दिव्यांग बच्चों के लिए समर्पित विंग (Divyang &amp; CWSN Cell) 🤟
          </h2>

          <div 
            onMouseEnter={() => handleSpeech("राजस्थान में स्कूल शिक्षा का कंटेंट पीएम ई-विद्या पर भारतीय सांकेतिक भाषा में भी उपलब्ध है।")}
            className={`p-5 rounded-2xl border-4 text-center ${
              highContrast 
                ? "bg-slate-900 border-yellow-300 text-yellow-300 font-black" 
                : "bg-white border-dashed border-emerald-600/30 text-emerald-800 shadow-lg"
            }`}
          >
            {/* SPECIAL BOLD HINDI DIRECTIVE HIGHLIGHT */}
            <p className="text-lg md:text-xl font-bold font-sans">
              “राजस्थान में स्कूल शिक्षा का कंटेंट पीएम ई-विद्या पर भारतीय सांकेतिक भाषा (Sign Language) में भी उपलब्ध है।”
            </p>
            <p className="text-xs md:text-sm text-slate-500 mt-2 font-semibold font-mono">
              (Rajasthan context school education content is also available in Indian Sign Language (ISL) on PM eVidya)
            </p>
          </div>
        </div>

        {/* Outer Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Learn ISL Applet / Sign Trainer */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className={`p-6 rounded-2xl border flex-1 flex flex-col justify-between h-full ${
              highContrast ? "bg-slate-900 border-yellow-300" : "bg-white border-slate-200/80 shadow-md"
            }`}>
              
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-black text-amber-600 flex items-center gap-2">
                      <Hand className="h-5 w-5 animate-pulse" />
                      <span>सांकेतिक भाषा सीखें / Interactive ISL Guide</span>
                    </h3>
                    <p className={`text-xs mt-1 ${highContrast ? "text-yellow-400" : "text-slate-400 font-medium"}`}>
                      शीघ्रता से बुनियादी कक्षाओं के शब्दों के लिए सांकेतिक भाषा की मुद्राओं को सीखें और अभ्यास करें।
                    </p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded">
                    Bilingual Widget
                  </span>
                </div>

                {/* Phrase Select Button Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
                  {ISL_PHRASES.map((p) => (
                    <button
                      key={p.wordHindi}
                      onClick={() => handlePhraseSelect(p)}
                      className={`p-3 rounded-xl border text-left transition transform duration-150 cursor-pointer ${
                        selectedPhrase?.wordHindi === p.wordHindi
                          ? (highContrast 
                              ? "bg-yellow-300 text-slate-950 border-yellow-300 scale-[1.03] font-black shadow-lg" 
                              : "bg-amber-500 border-amber-500 text-slate-950 scale-[1.03] font-extrabold shadow-md shadow-amber-500/20")
                          : (highContrast
                              ? "border-slate-800 hover:bg-slate-800 text-yellow-300"
                              : "border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700")
                      }`}
                      id={`btn-phrase-${p.svgGestureType}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.emojiRepresentative}</span>
                        <div className="flex flex-col truncate">
                          <span className="text-xs opacity-75 font-semibold text-slate-500">{p.wordEnglish.split(" / ")[0]}</span>
                          <span className="text-sm font-bold truncate">{p.wordHindi}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Area for Active Phrase Choice */}
              {selectedPhrase && (
                <div className={`mt-6 p-5 rounded-xl border border-dashed flex flex-col md:flex-row items-center gap-5 justify-between ${
                  highContrast ? "bg-slate-950 border-yellow-300" : "bg-blue-50/50 border-blue-200/50"
                }`}>
                  
                  {/* Dynamic Graphical Vector Representation */}
                  <div className="h-32 w-32 shrink-0 bg-white border border-slate-200 shadow-sm rounded-full flex flex-col items-center justify-center relative overflow-hidden pulse-glow-saffron">
                    <span className="text-5xl">{selectedPhrase.emojiRepresentative}</span>
                    <div className="absolute bottom-1 bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase">
                      Gesture ID: {selectedPhrase.svgGestureType}
                    </div>
                  </div>

                  {/* Descriptive Text */}
                  <div className="space-y-3 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-blue-900">{selectedPhrase.wordHindi}</h4>
                      <span className="text-slate-400 font-bold">|</span>
                      <p className="text-xs font-semibold text-slate-500">{selectedPhrase.wordEnglish}</p>
                    </div>

                    <div className="space-y-1.5">
                      <p className={`text-xs ${highContrast ? "text-yellow-300" : "text-sm text-slate-700 font-medium"}`}>
                        <strong>संकेत विधि:</strong> {selectedPhrase.gestureDescriptionHindi}
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        <strong>Signing Code:</strong> {selectedPhrase.gestureDescriptionEnglish}
                      </p>
                    </div>

                    {/* Narrate button */}
                    <button
                      onClick={() => handleSpeech(`${selectedPhrase.wordHindi}. ${selectedPhrase.gestureDescriptionHindi}`)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                      id="btn-speak-phrase"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>मुद्रा विधि स्पष्टीकरण ऑडियो सुनें (Hear explanation)</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* Right Column: Other inclusive tools */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className={`p-6 rounded-2xl border flex-1 space-y-5 flex flex-col justify-between ${
              highContrast ? "bg-slate-900 border-yellow-300" : "bg-white border-slate-200/80 shadow-md"
            }`}>
              
              <div className="space-y-4">
                <h3 className="text-xl font-black text-emerald-700 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 animate-spin-slow text-amber-500" />
                  <span>CWSN / दिव्यांग ई-संसाधन</span>
                </h3>
                <p className={`text-xs ${highContrast ? "text-yellow-400" : "text-slate-500"}`}>
                  दिव्यांग छात्रों की समग्र उन्नति के लिए NCERT तथा राजस्थान शिक्षा बोर्ड द्वारा जारी विशेष संसाधन:
                </p>

                {/* Sub features */}
                <div className="space-y-3">
                  {[
                    {
                      title: "सुगम्य पुस्तकालय (Audio Books)",
                      desc: "दृष्टिबाधित बच्चों के लिए हिंदी व अंग्रेजी में विशेष रूप से रिकॉर्डेड ऑडियो पुस्तक श्रृंखला।",
                      action: "सुनना शुरू करें (Open Audio Desk)"
                    },
                    {
                      title: "डिजिटल ब्रेल बुक्स (Braille PDFs)",
                      desc: "स्क्रीन-रीडर अनुकूल ब्रेल पाठ्य सामग्री, कक्षा 1 से 12 तक के मुख्य विषयों के लिए।",
                      action: "डाउनलोड ब्रेल लाइब्रेरी (Downloand Braille)"
                    },
                    {
                      title: "विशेषज्ञ परामर्श हेल्पलाइन",
                      desc: "विशेष शिक्षकों से वन-टू-वन बात करने और मानसिक मनोवैज्ञानिक मार्गदर्शन के लिए दूरभाष केंद्र।",
                      action: "परामर्श टोल-फ्री: 1800-112-199"
                    }
                  ].map((feat) => (
                    <div 
                      key={feat.title}
                      className={`p-3 rounded-xl border border-slate-100 transition hover:-translate-y-0.5 hover:shadow-sm ${
                        highContrast ? "border-yellow-300 hover:bg-slate-800" : "hover:bg-slate-50 bg-slate-50/50"
                      }`}
                    >
                      <h4 className="text-xs md:text-sm font-black text-slate-800">{feat.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{feat.desc}</p>
                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-100">
                        <span className="text-[10px] text-amber-600 font-bold cursor-pointer hover:underline flex items-center gap-1">
                          {feat.action}
                          <ArrowRight className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[8px] tracking-wider bg-slate-200 text-slate-600 px-1 py-0.5 rounded uppercase font-bold">Free</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2">
                <a
                  href="#channels"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-center border transition ${
                    highContrast
                      ? "bg-yellow-300 text-slate-950 border-yellow-300"
                      : "bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800"
                  }`}
                  id="browse-isl-tv-btn"
                >
                  <Video className="h-4 w-4" />
                  <span>सांकेतिक भाषा (ISL) आधारित टीवी लेक्चर्स देखें</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
