import React, { useState } from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { useChannels } from "./ChannelCtx";
import { 
  Settings, 
  Lock, 
  Unlock, 
  X, 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Youtube, 
  Link, 
  BookOpen, 
  ArrowRight,
  Tv,
  Eye,
  Info
} from "lucide-react";

export const AdminPanel: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();
  const { channels, updateChannelLinks, resetToDefault } = useChannels();

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");

  const [selectedChId, setSelectedChId] = useState("RJ148");
  const [ytPlaylistUrl, setYtPlaylistUrl] = useState("");
  const [ytVideoId, setYtVideoId] = useState("");
  const [wavesUrl, setWavesUrl] = useState("");
  
  const [successMsg, setSuccessMsg] = useState("");

  // Quick default password for administrative control
  const CORRECT_PASSCODE = "1234";

  const handleOpenPanel = () => {
    setIsOpen(true);
    setPassError("");
    setSuccessMsg("");
    // Find selected channel defaults
    const activeCh = channels.find((c) => c.id === selectedChId);
    if (activeCh) {
      setYtPlaylistUrl(activeCh.youtubeUrl);
      setYtVideoId(activeCh.youtubeVideoId || "");
      setWavesUrl(activeCh.wavesOttUrl);
    }
    speakText("ऑथराइजेशन हेतु एडमिन पैनल लॉक स्क्रीन खुला है। कृपया पासवर्ड दर्ज करें। (Admin Panel screen opened. Enter credentials.)");
  };

  const handleClosePanel = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setPassError("");
      const activeCh = channels.find((c) => c.id === selectedChId);
      if (activeCh) {
        setYtPlaylistUrl(activeCh.youtubeUrl);
        setYtVideoId(activeCh.youtubeVideoId || "");
        setWavesUrl(activeCh.wavesOttUrl);
      }
      speakText("सफलतापूर्वक लॉगिन किया गया। अब आप चैनलों के यूट्यूब लिंक को अपडेट कर सकते हैं। (Authentication successful.)");
    } else {
      setPassError("गलत पासवर्ड! (Incorrect Code. Try '1234')");
      speakText("गलत पासवर्ड, कृपया पुनः प्रयास करें। (Incorrect passcode. Please try again.)");
    }
  };

  const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chId = e.target.value;
    setSelectedChId(chId);
    const activeCh = channels.find((c) => c.id === chId);
    if (activeCh) {
      setYtPlaylistUrl(activeCh.youtubeUrl);
      setYtVideoId(activeCh.youtubeVideoId || "");
      setWavesUrl(activeCh.wavesOttUrl);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateChannelLinks(selectedChId, ytPlaylistUrl, wavesUrl, ytVideoId);
    setSuccessMsg(`चैनल ${selectedChId} के यूट्यूब लिंक और लाइव लेक्चर को सफलतापूर्वक सक्रिय किया गया! (Successfully activated YouTube links for ${selectedChId}!)`);
    speakText(`चैनल ${selectedChId} के यूट्यूब वीडियो लिंक्स सफलतापूर्वक सहेजे गए। (Successfully saved changes for Channel ${selectedChId}.)`);
    
    // Clear message after 4s
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  const handleReset = () => {
    if (window.confirm("क्या आप सभी चैनलों को डिफ़ॉल्ट सरकारी शिक्षा लिंक्स पर वापस सेट करना चाहते हैं? (Are you sure you want to reset all channel configurations to educational defaults?)")) {
      resetToDefault();
      const firstCh = channels.find((c) => c.id === "RJ148");
      if (firstCh) {
        setYtPlaylistUrl(firstCh.youtubeUrl);
        setYtVideoId(firstCh.youtubeVideoId || "");
        setWavesUrl(firstCh.wavesOttUrl);
      }
      setSuccessMsg("सभी लिंक्स को सफलतापूर्वक डिफ़ॉल्ट पर रीसेट कर दिया गया है!");
      speakText("सभी चैनलों के लिंक्स को डिफ़ॉल्ट पर रीसेट कर दिया गया है।");
    }
  };

  return (
    <>
      {/* Floating Sticky Admin Config Trigger Option Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleOpenPanel}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs shadow-2xl border transition-all duration-300 transform hover:scale-105 cursor-pointer ${
            highContrast
              ? "bg-yellow-300 border-yellow-300 text-slate-950"
              : "bg-blue-950 border-blue-900 text-amber-400 hover:bg-blue-900"
          }`}
          title="Open admin configuration to activate links"
          id="btn-admin-panel-float"
        >
          <Settings className="h-4 w-4 animate-spin-slow text-amber-400" />
          <span>यूट्यूब लिंक एक्टिवेशन पैनल (Admin Panel)</span>
        </button>
      </div>

      {/* Admin Panel Dialog Box Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          
          <div className={`w-full max-w-lg rounded-3xl border shadow-2xl relative overflow-hidden ${
            highContrast 
              ? "bg-slate-950 border-yellow-300 text-yellow-300" 
              : "bg-white text-slate-800 border-slate-200"
          }`}>
            
            {/* Header */}
            <div className={`px-6 py-4 flex justify-between items-center border-b ${
              highContrast ? "border-yellow-400" : "bg-blue-950 text-slate-100 border-slate-800"
            }`}>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-amber-400 animate-pulse" />
                <div>
                  <h3 className="text-sm font-black tracking-wide uppercase text-amber-500">
                    PM eVidya (RJ) • Admin Panel
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    यूट्यूब लेक्चर और प्लेलिस्ट एक्टिवेशन कंसोल
                  </p>
                </div>
              </div>
              <button
                onClick={handleClosePanel}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Close admin modal"
                id="btn-admin-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Inner Content Case based on authentication */}
            {!isAuthenticated ? (
              /* Passcode Authorization Screen Screen */
              <div className="p-8 text-center space-y-6">
                <div className="h-16 w-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto my-2">
                  <Lock className="h-8 w-8 animate-pulse" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-black">एडमिनिस्ट्रेटर पासवर्ड आवश्यक है</h4>
                  <p className="text-xs text-slate-500">
                    शिक्षक/संयोजक द्वारा यूट्यूब लिंक्स को प्रबंधित करने के लिए सुरक्षा पासकोड की आवश्यकता है।
                  </p>
                  <p className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded inline-block">
                    🔐 डेमो पासकोड: <span className="font-mono text-xs underline">1234</span>
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3 max-w-xs mx-auto">
                  <input
                    type="password"
                    maxLength={6}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="सुरक्षा पासकोड दर्ज करें (Enter Passcode)"
                    className="w-full text-center text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 text-slate-900"
                    id="admin-passcode-input"
                  />
                  
                  {passError && (
                    <p className="text-xs font-bold text-red-600 animate-bounce">{passError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl cursor-pointer transition shadow-md"
                    id="btn-admin-submit-pass"
                  >
                    पैनल को प्रमाणित करें (Authenticate)
                  </button>
                </form>

                <p className="text-[10px] text-slate-400">
                  PM eVidya State Chapter Security Guidelines. Code matches local storage profile.
                </p>
              </div>
            ) : (
              /* ACTIVE CHANNEL UTILITY PANEL */
              <div className="p-6">
                
                {successMsg && (
                  <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-bounce">
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSave} className="space-y-4 text-left">
                  
                  {/* Select Channel */}
                  <div>
                    <label className="text-xs font-black text-slate-500 block mb-1">
                      चैनल चुनें (Choose Channel to Configure) *
                    </label>
                    <select
                      value={selectedChId}
                      onChange={handleChannelChange}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                      id="select-admin-target-channel"
                    >
                      {channels.map((ch) => (
                        <option key={ch.id} value={ch.id}>
                          {ch.id} : {ch.titleHindi} ({ch.classRange.split(" (")[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Channel Description Banner Informative */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-500 flex gap-2">
                    <Info className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <span className="font-bold">सक्रिय विषय:</span> {channels.find(c => c.id === selectedChId)?.schedule[0]?.subject} <br />
                      <span className="font-bold">लक्ष्य वर्ग:</span> {channels.find(c => c.id === selectedChId)?.classRange}
                    </div>
                  </div>

                  {/* Config youtube active Video Id */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600 block flex items-center gap-1">
                      <Youtube className="h-3.5 w-3.5 text-red-600" />
                      <span>सिम्युलेटर हेतु यूट्यूब लाइव लेक्चर वीडियो आई-डी (YouTube Video ID) *</span>
                    </label>
                    <p className="text-[9px] text-slate-400 leading-none">
                      यहाँ कोई भी रीयल यूट्यूब वीडियो कोड जैसे <span className="font-mono font-bold bg-slate-100 px-1 py-0.5 rounded text-amber-600">L-E7bU-xHqM</span> या <span className="font-mono font-bold bg-slate-100 px-1 py-0.5 rounded text-amber-600">XonW_a8LdIs</span> डाले जिससे वह लाइव प्लेयर में चलने लगेगा!
                    </p>
                    <input
                      type="text"
                      required
                      placeholder="जैसे: y-mpxbA8d3Q"
                      value={ytVideoId}
                      onChange={(e) => setYtVideoId(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 font-bold focus:outline-none focus:border-amber-500"
                      id="input-admin-yt-videoid"
                    />
                  </div>

                  {/* Config youtube Playlist URL */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600 block flex items-center gap-1">
                      <Link className="h-3.5 w-3.5 text-blue-600" />
                      <span>यूट्यूब प्लेलिस्ट का बाहरी लिंक (YouTube Playlist external URL) *</span>
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/playlist?list=..."
                      value={ytPlaylistUrl}
                      onChange={(e) => setYtPlaylistUrl(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      id="input-admin-playlist-url"
                    />
                  </div>

                  {/* Waves OTT URL */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-600 block">Prasar Bharati (Waves OTT) लाइव लिंक *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://prasarbharati.gov.in/waves-ott/"
                      value={wavesUrl}
                      onChange={(e) => setWavesUrl(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      id="input-admin-waves-url"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                      id="btn-admin-reset-default"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>सिस्टम रीसेट (Reset defaults)</span>
                    </button>

                    <button
                      type="submit"
                      className="py-3 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-600 flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      id="btn-admin-save-links"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>कन्फ़िगरेशन सहेजें</span>
                    </button>
                  </div>

                </form>

              </div>
            )}

            {/* Footer */}
            <div className={`px-6 py-3 border-t text-[10px] text-center text-slate-400 ${
              highContrast ? "border-yellow-300" : "bg-slate-50"
            }`}>
              Powered by PM eVidya Inclusive Education Hub. Changes reflect immediately across the app!
            </div>

          </div>

        </div>
      )}
    </>
  );
};
