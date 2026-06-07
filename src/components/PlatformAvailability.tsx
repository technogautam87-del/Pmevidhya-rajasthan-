import React from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { BROADCAST_PLATFORMS } from "../data/pillars";
import { 
  Tv, 
  Smartphone, 
  PlayCircle, 
  Download,
  Info,
  QrCode
} from "lucide-react";

const PlatformIconResolver = ({ type, className }: { type: string; className: string }) => {
  switch (type) {
    case "Tv":
      return <Tv className={className} />;
    case "Tv2":
      return <Tv className={className + " brightness-125"} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "PlayCircle":
      return <PlayCircle className={className} />;
    case "Download":
      return <Download className={className} />;
    default:
      return <Tv className={className} />;
  }
};

export const PlatformAvailability: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();

  const handleSpeech = (text: string) => {
    speakText(text);
  };

  return (
    <section 
      id="availability"
      className={`py-16 ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-b border-yellow-400" 
          : "bg-white text-slate-800 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Text and Platform Grid */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded inline-block font-mono tracking-wider">
                MULTIPLATEFORM AVAILABILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                अनेक माध्यम, एक संपूर्ण शिक्षा
              </h2>
              <p className={`text-sm ${highContrast ? "text-yellow-400" : "text-slate-500"}`}>
                डिश टीवी से लेकर मोबाइल ऐप तक, पीएम ई-विद्या हर आधुनिक और पारंपरिक माध्यम पर उपलब्ध है।
              </p>
            </div>

            {/* List with Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BROADCAST_PLATFORMS.map((plat) => (
                <div
                  key={plat.name}
                  onMouseEnter={() => handleSpeech(`${plat.nameHindi}. ${plat.descriptionHindi}`)}
                  className={`p-4 rounded-xl border flex gap-3 transition hover:shadow-md ${
                    highContrast
                      ? "border-yellow-300 bg-slate-900"
                      : "bg-slate-50/50 border-slate-200/80 hover:bg-slate-50 hover:border-amber-400"
                  }`}
                  id={`plat-card-${plat.name.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <div className={`p-2 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center ${
                    highContrast ? "bg-slate-950 border border-yellow-300 text-yellow-300" : "bg-blue-50 text-blue-900"
                  }`}>
                    <PlatformIconResolver type={plat.logoType} className="h-5 w-5 text-amber-500" />
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-blue-900">
                      {plat.nameHindi} ({plat.name})
                    </h4>
                    <p className="text-[10px] font-mono text-amber-700 font-bold mt-0.5">
                      शीर्षक / स्थान: {plat.channelNumbers}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {plat.descriptionHindi}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Block: QR Code Mockup Graphic representation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className={`p-6 rounded-3xl border text-center space-y-4 max-w-sm w-full mx-auto ${
              highContrast 
                ? "bg-slate-900 border-yellow-300" 
                : "bg-gradient-to-tr from-amber-50 via-white to-blue-50 border-slate-200 shadow-lg"
            }`}>
              
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-2xl border-4 border-dashed border-amber-400 shadow-inner inline-block">
                  {/* Styled SVG representing a QR Code */}
                  <svg className="h-32 w-32 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="3" width="6" height="6" rx="1" />
                    <rect x="3" y="15" width="6" height="6" rx="1" />
                    <path d="M9 17h2v2h-2zm4-14h2v2h-2zm2 10h4v2h-4zm2 4h2v2h-2zm-3-3h1" />
                    <path d="M12 12h2v2h-2z" />
                    <rect x="6" y="6" width="0.01" height="0.01" strokeWidth="4" />
                    <rect x="18" y="6" width="0.01" height="0.01" strokeWidth="4" />
                    <rect x="6" y="18" width="0.01" height="0.01" strokeWidth="4" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1.5 text-center">
                <h4 className="text-base font-black text-slate-800">
                  मोबाइल ऐप डाउनलोड करें
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  इस क्यूआर कोड (QR Code) को स्कैन करके सीधे अपने स्मार्टफोन पर पीएम ई-विद्या का आधिकारिक ऐप इंस्टॉल करें।
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded">
                  Android App
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded">
                  Apple iOS App
                </span>
              </div>

              <p className="text-[9px] text-slate-400 font-mono italic">
                *App is completely free and requires zero subscription fees.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
