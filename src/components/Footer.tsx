import React, { useState } from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Accessibility,
  HeartHandshake
} from "lucide-react";

export const Footer: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();
  const [ticketName, setTicketName] = useState("");
  const [ticketCwsn, setTicketCwsn] = useState("speech");
  const [ticketMessage, setTicketMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSpeech = (text: string) => {
    speakText(text);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketMessage) return;
    setFormSubmitted(true);
    speakText(
      "धन्यवाद! आपका सहायता अनुरोध दर्ज कर लिया गया है। हमारा विशेष दूरभाष शिक्षक आपसे जल्द ही संपर्क करेगा। (Thank you, support request filed successfully! Our specialist teacher will contact you shortly.)",
      "hi-IN"
    );
  };

  return (
    <footer 
      id="helpline"
      className={`border-t transition-colors ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-yellow-400" 
          : "bg-blue-950 text-slate-100 border-slate-800"
      }`}
    >
      
      {/* Helpdesk Area Consultation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Helpdesk Info */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-[10px] uppercase bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full font-bold ml-1 inline-block">
              दिव्यांग CWSN सहायता केंद्र (SUPPORT HUB)
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              दिव्यांग छात्र शिक्षक संपर्क केंद्र
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              राजस्थान में विशेष आवश्यकताओं वाले विद्यार्थियों (CWSN), अभिभावकों अथवा शिक्षकों के लिए निःशुल्क सहायता पोर्टल। अपने प्रश्न दर्ज करें, और हमारे प्रशिक्षित साइन-लैंग्वेज व विशेष शिक्षक आपको वापस संपर्क करेंगे।
            </p>

            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg text-amber-500">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Toll-Free Helpline 24/7</p>
                  <p className="text-sm font-black text-white">1800-112-199 / 1800-111-265</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg text-amber-500">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Support E-mail</p>
                  <p className="text-sm font-black text-white">ciet.helpdesk@nic.in</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg text-amber-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Education Directorate</p>
                  <p className="text-sm font-black text-white">आरएससीईआरटी, सहेली मार्ग, उदयपुर, राजस्थान (RSCERT Udaipur)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Helpdesk Request Form Form */}
          <div className="lg:col-span-7">
            <div className={`p-5 rounded-2xl border ${
              highContrast ? "border-yellow-300 bg-slate-900" : "bg-white/5 border-white/10"
            }`}>
              {formSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 animate-bounce">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h4 className="text-lg font-black text-white">आपका अनुरोध दर्ज हो गया है!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    धन्यवाद। हमारे विशेष आवश्यकता संभाग (CWSN Cell) के अधिकारी २४ से ४८ घंटे के भीतर दिए गए नंबर पर तुरंत संपर्क करेंगे।
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-amber-500 font-bold underline cursor-pointer"
                    id="btn-new-ticket"
                  >
                    नया अनुरोध दर्ज करें (New Request)
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4 text-left">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-white/5 pb-2">
                    ऑनलाइन परामर्श / सहायता फॉर्म (Support Ticket Form)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">विद्यार्थी / अभिभावक का नाम (Name) *</label>
                      <input 
                        type="text" 
                        required
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        placeholder="जैसे: राहुल शर्मा" 
                        className="w-full text-xs p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                        id="input-support-name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">विशेष आवश्यकता का प्रकार (CWSN Type) *</label>
                      <select 
                        value={ticketCwsn}
                        onChange={(e) => setTicketCwsn(e.target.value)}
                        className="w-full text-xs p-3 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                        id="select-support-cwsn"
                      >
                        <option value="speech">सांकेतिक भाषा (Hearing / Speech Impaired)</option>
                        <option value="visual">दृष्टिबाधित (Visually Impaired - Audio books/braille)</option>
                        <option value="learning">धीमा अधिगम (Slow Leaner / Mental wellness support)</option>
                        <option value="other">सामान्य सहायता / अन्य (General Guidance)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">अभिभावक का फोन अथवा WhatsApp नंबर (Mobile No) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="जैसे: 98290XXXXX" 
                      className="w-full text-xs p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                      id="input-support-tel"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">आपकी समस्या/प्रश्न का विवरण (Your Query / Needs) *</label>
                    <textarea 
                      rows={3}
                      required
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="उदाहरण: मुझे कक्षा 6 की इतिहास विषय के सांकेतिक भाषा वाले लेक्चर्स का लिंक डाउनलोड करने में सहायता चाहिए..." 
                      className="w-full text-xs p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                      id="textarea-support-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-amber-500 text-slate-950 font-black text-xs cursor-pointer hover:bg-amber-600 transition"
                    id="btn-submit-support"
                  >
                    सहायता अनुरोध सबमिट करें (Submit Help Ticket)
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Flag / Ministry attribution base footer footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-xs text-slate-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-left">
            {/* Indian Flag custom visual layout */}
            <div className="flex flex-col w-12 h-8 rounded overflow-hidden border border-white/10 shrink-0">
              <span className="bg-[#FF9933] h-1/3" />
              <span className="bg-white h-1/3 flex items-center justify-center">
                {/* Ashoka chakra wheel */}
                <span className="h-1.5 w-1.5 rounded-full border border-blue-900 border-dashed animate-spin" />
              </span>
              <span className="bg-[#138808] h-1/3" />
            </div>

            <div>
              <p className="font-extrabold text-white text-sm">पीएम ई-विद्या (राजस्थान चेप्टर • भारत सरकार पहल)</p>
              <p className="text-[11px] text-slate-300 mt-0.5">शिक्षा मंत्रालय, स्कूल शिक्षा और साक्षरता विभाग, भारत सरकार।</p>
              <p className="text-[10px] text-slate-500">© 2026 PM eVidya State Chapter. All Inclusive educational contents licensed free under CC BY-SA 4.0.</p>
            </div>
          </div>

          {/* Quick legal/Attributions references */}
          <div className="flex flex-wrap gap-4 text-[10px] justify-center md:justify-end">
            <a href="https://pmevidya.education.gov.in" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5 text-slate-400 hover:text-white">
              <span>National PM eVidya Portal</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <span className="text-slate-700">|</span>
            <a href="https://diksha.gov.in" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5 text-slate-400 hover:text-white">
              <span>दीक्षा (DIKSHA) राजस्थान</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <span className="text-slate-700">|</span>
            <a href="https://education.rajasthan.gov.in" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5 text-slate-400 hover:text-white">
              <span>शाला दर्पण (Shala Darpan) Portal</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};
