import React, { useState, useEffect } from "react";
import { useAccessibility } from "./AccessibilityCtx";
import { useChannels } from "./ChannelCtx";
import { DTHChannel } from "../types";
import { Skeleton } from "./Skeleton";
import { 
  Tv, 
  Youtube, 
  ExternalLink, 
  Clock, 
  Volume2, 
  CheckCircle,
  Accessibility,
  Eye,
  Info,
  Calendar,
  Share2,
  ListRestart,
  Presentation,
  Play
} from "lucide-react";

export const ChannelGrid: React.FC = () => {
  const { highContrast, speakText } = useAccessibility();
  const { channels } = useChannels();
  
  const [selectedChannel, setSelectedChannel] = useState<DTHChannel | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number>(0);
  const [islOverlayActive, setIslOverlayActive] = useState<boolean>(true);
  const [simulatedSubtitlesActive, setSimulatedSubtitlesActive] = useState<boolean>(true);
  
  // Choose between "Interactive Simulation with ISL Avatar" or "Real Embedded YouTube Player"
  const [playerMode, setPlayerMode] = useState<"simulation" | "youtube">("simulation");

  // Timer count for simulating broadcast progress bar
  const [progressVal, setProgressVal] = useState<number>(35);

  // Buffer state simulating Boneyard-styled loading screen
  const [isFeedLoading, setIsFeedLoading] = useState<boolean>(false);
  // Manual toggle to display boneyard skeleton state persistently for user demo
  const [boneyardActive, setBoneyardActive] = useState<boolean>(false);

  // Set default selected channel once channels are loaded
  useEffect(() => {
    if (channels.length > 0 && !selectedChannel) {
      setSelectedChannel(channels[0]);
    } else if (channels.length > 0 && selectedChannel) {
      // Find updated channel object to keep youtube urls/ids in sync with Admin panel edits
      const updated = channels.find(c => c.id === selectedChannel.id);
      if (updated) {
        setSelectedChannel(updated);
      }
    }
  }, [channels, selectedChannel]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressVal((prev) => (prev >= 100 ? 5 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  if (!selectedChannel) {
    return (
      <div className="py-16 text-center text-slate-500 font-bold">
        लोड हो रहा है... (Loading Channels...)
      </div>
    );
  }

  // Update starting index when channel changes
  const handleChannelSelect = (channel: DTHChannel) => {
    setIsFeedLoading(true);
    setSelectedChannel(channel);
    setSelectedSubjectIndex(0);
    setProgressVal(Math.floor(Math.random() * 50) + 10);
    speakText(
      `चैनल ${channel.id}. ${channel.titleHindi}. ${channel.classRange}.`
    );
    setTimeout(() => {
      setIsFeedLoading(false);
    }, 800);
  };

  const handleSubjectSelect = (idx: number, subjName: string) => {
    setIsFeedLoading(true);
    setSelectedSubjectIndex(idx);
    setProgressVal(0);
    speakText(`व्याख्यान विषय: ${subjName}`);
    setTimeout(() => {
      setIsFeedLoading(false);
    }, 600);
  };

  const activeScheduleItem = selectedChannel.schedule[selectedSubjectIndex] || selectedChannel.schedule[0];

  return (
    <section 
      id="channels"
      className={`py-16 border-b ${
        highContrast 
          ? "bg-slate-950 text-yellow-300 border-yellow-400" 
          : "bg-white text-slate-800 border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded inline-block font-mono tracking-wider">
              DTH CHANNELS (RJ148 - RJ152)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              राजस्थान पाठ्यचर्या टीवी चैनल्स
            </h2>
            <p className={`text-sm ${highContrast ? "text-yellow-400" : "text-slate-500 max-w-2xl"}`}>
              राजस्थान स्कूल शिक्षा के लिए सरकार द्वारा अधिकृत 5 विशिष्ट सेटेलाइट टीवी चैनल्स। नीचे दिए गए टीवी प्लेयर का उपयोग कर अपनी लाइव कक्षा का आनंद लें।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs shrink-0 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-1.5 px-2 py-1">
              <span className="flex h-3 w-3 rounded-full bg-red-600 animate-pulse" />
              <span className="font-bold text-slate-700 uppercase tracking-wide">
                Live Interactive Streaming Workspace
              </span>
            </div>
            
            <span className="h-4 w-[1px] bg-slate-300 hidden sm:block" />

            {/* Interactive Boneyard Simulator Toggle Button */}
            <button
              onClick={() => {
                setBoneyardActive(!boneyardActive);
                speakText(boneyardActive 
                  ? "बोनीयार्ड पिक्सेल-परफेक्ट स्केलेटन पूर्वावलोकन बंद किया गया।" 
                  : "बोनीयार्ड पिक्सेल-परफेक्ट स्केलेटन पूर्वावलोकन चालू किया गया। इससे बिना किसी लेआउट शिफ्ट के सटीक लोडिंग फ्रेम प्रदर्शित होते हैं।"
                );
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase transition-all duration-300 cursor-pointer ${
                boneyardActive
                  ? "bg-slate-900 text-yellow-300 shadow-inner border border-slate-950"
                  : "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow"
              }`}
              title="Toggle Boneyard-designed Pixel-Perfect CSS Skeleton Simulation mode"
              id="btn-toggle-boneyard"
            >
              <span className="animate-pulse">💀</span>
              <span>Boneyard Skeleton: {boneyardActive ? "ACTIVE (सक्रिय)" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Layout: Splitting into Channel Select Sidebar & Simulated Custom Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Channels Showcase Table / Grid (Filters / Choosers) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 text-left">
              चैनल सूची चुनें (Select Channel)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-2.5">
              {channels.map((channel) => {
                const isActive = selectedChannel.id === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => handleChannelSelect(channel)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 transform cursor-pointer flex justify-between items-center ${
                      isActive
                        ? (highContrast 
                            ? "bg-slate-900 border-4 border-yellow-300 text-yellow-300" 
                            : "bg-blue-50 border-2 border-blue-900 text-blue-950 shadow-md translate-x-1.5")
                        : (highContrast
                            ? "border-slate-800 hover:bg-slate-900/60"
                            : "border-slate-200 hover:bg-slate-50 bg-slate-50/30 text-slate-700 hover:border-slate-300")
                    }`}
                    id={`btn-channel-${channel.id}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className={`p-2.5 rounded-lg shrink-0 ${
                        isActive
                          ? (highContrast ? "bg-yellow-300 text-slate-950" : "bg-blue-900 text-white")
                          : ("bg-slate-200 text-slate-600")
                      }`}>
                        <Tv className="h-5 w-5" />
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-base">{channel.id}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            FREE DISH
                          </span>
                        </div>
                        <p className="text-xs font-semibold opacity-90 mt-0.5">
                          {channel.titleHindi}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {channel.classRange}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        ISL 🤟
                      </span>
                      {isActive && (
                        <span className="text-xs text-red-600 font-bold flex items-center gap-1 animate-pulse">
                          ● LIVE
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Informational Notice cards */}
            <div className={`p-4 rounded-2xl border ${
              highContrast ? "border-yellow-300 bg-slate-900 text-left" : "bg-amber-500/10 border-amber-500/20 text-amber-900 text-left"
            }`}>
              <div className="flex gap-2">
                <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  <strong>प्रसार भारती साझेदारी:</strong> राजस्थान के सभी चैनल्स डीडी फ्री डिश के अतिरिक्त <strong>Waves OTT Application</strong> तथा यूट्यूब लाइव पर 24 घंटे सीधे प्रसारित किए जाते हैं।
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Highly visual Simulated Interactive TV Player */}
          <div className="lg:col-span-12 xl:col-span-7">
            
            {/* TV Enclosure container */}
            <div className={`rounded-3xl border overflow-hidden shadow-xl ${
              highContrast ? "border-yellow-300 bg-slate-950" : "bg-slate-900 border-slate-800 text-slate-100"
            }`}>
              
              {/* TV Screen Panel Header */}
              <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap justify-between items-center gap-2 text-left">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-wide uppercase text-slate-300">
                    Broadcast Feed: {selectedChannel.id}
                  </span>
                  
                  {/* Mode switcher tabs inside TV header */}
                  <div className="inline-flex gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold uppercase shrink-0">
                    <button
                      onClick={() => setPlayerMode("simulation")}
                      className={`px-2 py-1 rounded cursor-pointer transition ${
                        playerMode === "simulation" 
                          ? "bg-amber-500 text-slate-950" 
                          : "text-slate-400 hover:text-slate-100"
                      }`}
                      title="Digital simulation with animated Indian Sign Language Avatar representation"
                      id="btn-mode-simulation"
                    >
                      <span>डिजिटल श्यामपट्ट (Blackboard)</span>
                    </button>
                    <button
                      onClick={() => {
                        setPlayerMode("youtube");
                        speakText("यूट्यूब लाइव लेक्चर वीडियो मोड सक्रिय किया गया।");
                      }}
                      className={`px-2 py-1 rounded cursor-pointer transition flex items-center gap-1 ${
                        playerMode === "youtube" 
                          ? "bg-red-600 text-white" 
                          : "text-slate-400 hover:text-red-500"
                      }`}
                      title="Real interactive video lecture broadcast imported from your credentials links"
                      id="btn-mode-youtube"
                    >
                      <Youtube className="h-3 w-3 text-white" />
                      <span>यूट्यूब लाइव (Real Video)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Overlay choices disabled inside youtube player since it's built into video */}
                  {playerMode === "simulation" && (
                    <>
                      <label className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                        <input 
                          type="checkbox" 
                          checked={islOverlayActive}
                          onChange={() => setIslOverlayActive(!islOverlayActive)}
                          className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 bg-slate-900"
                        />
                        <span>ISL दुभाषिया</span>
                      </label>

                      <label className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                        <input 
                          type="checkbox" 
                          checked={simulatedSubtitlesActive}
                          onChange={() => setSimulatedSubtitlesActive(!simulatedSubtitlesActive)}
                          className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 bg-slate-900"
                        />
                        <span>सबटाइटल्स</span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Switch between loading/skeleton states and actual video/simulation content */}
              {(isFeedLoading || boneyardActive) ? (
                <>
                  {/* Match the Aspect Video of Simulated TV Screen Canvas */}
                  <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
                    {/* Boneyard tribute badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/90 rounded-lg px-2.5 py-1 text-[9px] font-mono text-yellow-300 border border-yellow-500/30 flex items-center gap-1.5 z-20 animate-pulse">
                      <span>💀 BONEYARD-JS: PIXEL-PERFECT DOM SKELETON</span>
                    </div>

                    {/* Channel Indicator Overlay Skeleton */}
                    <div className="absolute top-4 right-4 bg-slate-950/80 rounded-lg px-2.5 py-1 border border-slate-800/80 flex items-center gap-2 z-20">
                      <div className="h-2 w-2 rounded-full bg-slate-700 animate-pulse" />
                      <Skeleton className="h-3.5 w-10" />
                    </div>

                    {/* Left side text/content skeletons matching Simulated Blackboard spacing */}
                    <div className="my-auto max-w-lg space-y-3 z-10 text-left">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-7 w-3/4 sm:w-2/3" />
                      <Skeleton className="h-3.5 w-1/3" />

                      {/* Stylized blackboard math layout replication */}
                      <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/50 max-w-xs space-y-2">
                        <Skeleton className="h-2.5 w-1/3" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </div>

                    {/* SIGN LANGUAGE INTERPRETER SIMULATOR OVERLAY SKELETON */}
                    {islOverlayActive && (
                      <div className="absolute bottom-5 right-5 h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-slate-850 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-2">
                        <Skeleton className="h-2.5 w-12 mb-1" />
                        <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                        <Skeleton className="h-2.5 w-12 mt-1.5" />
                      </div>
                    )}

                    {/* Subtitles Overlay bottom left skeleton */}
                    {simulatedSubtitlesActive && (
                      <div className="z-10 bg-black/50 border border-slate-800 rounded p-2 text-left max-w-sm sm:max-w-md space-y-1.5">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                      </div>
                    )}
                  </div>

                  {/* Progress/Broadcast status bar skeleton */}
                  <div className="bg-slate-950 px-6 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <Skeleton className="h-3.5 w-24" />
                    </div>
                    <div className="w-1/3 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <Skeleton className="h-3.5 w-14" />
                  </div>

                  {/* Subject Schedule Timetable Tabs skeletons */}
                  <div className="bg-slate-950/50 p-4 border-t border-slate-800 text-left space-y-3">
                    <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-start">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      <Skeleton className="h-4 w-56" />
                    </h5>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/20 text-left space-y-2">
                          <Skeleton className="h-2.5 w-12" />
                          <Skeleton className="h-3.5 w-5/6 font-bold" />
                          <Skeleton className="h-2.5 w-1/2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Watch Live dynamic links skeletons */}
                  <div className="bg-slate-950 p-5 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <div className="space-y-1.5">
                      <Skeleton className="h-3.5 w-48" />
                      <Skeleton className="h-2.5 w-36" />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      <Skeleton className="h-10 w-40 rounded-xl" />
                      <Skeleton className="h-10 w-40 rounded-xl" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* TV Screen Canvas Simulated */}
                  <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
                    
                    {/* Channel Indicator Overlay Top Right */}
                    <div className="absolute top-4 right-4 bg-slate-950/80 rounded-lg px-2.5 py-1 text-xs font-bold border border-slate-700/60 flex items-center gap-2 z-25">
                      <span className="text-red-500 font-extrabold font-mono text-[10px]">● LIVE</span>
                      <p className="text-amber-400">{selectedChannel.id}</p>
                    </div>

                    {/* Switch between modes */}
                    {playerMode === "youtube" && selectedChannel.youtubeVideoId ? (
                      /* Real YouTube Iframe Player */
                      <div className="absolute inset-0 w-full h-full bg-slate-950 z-10 animate-fade-in">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${selectedChannel.youtubeVideoId}?autoplay=1&mute=1&rel=0`}
                          title="PM eVidya Broadcast Lecture"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      /* Digital Blackboard Simulation */
                      <>
                        {/* Left side: Simulated E-Learning Blackboard / Slide Deck content */}
                        <div className="my-auto max-w-lg space-y-3 z-10 text-left">
                          <span className="text-[10px] font-bold text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded uppercase tracking-wider bg-amber-500/10">
                            {activeScheduleItem.subject}
                          </span>
                          
                          <h4 className="text-lg sm:text-2xl font-black text-white hover:text-amber-300 transition-colors">
                            {activeScheduleItem.topicHindi}
                          </h4>
                          <p className="text-xs text-slate-400 italic">
                            Topic: {activeScheduleItem.topic}
                          </p>

                          {/* Stylized vector representation of blackboard math/diagram */}
                          <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/40 font-mono text-[10px] sm:text-[11px] text-emerald-300 max-w-sm">
                            <p className="text-slate-400">{'// राजस्थान राज्य पाठ्यक्रम अभ्यास'}</p>
                            <p className="font-bold text-white mt-1">
                              {selectedChannel.id === "RJ148" && "★ क से कबूतर / 1 + 2 = 3 गिनती अभ्यास"}
                              {selectedChannel.id === "RJ149" && "★ जल चक्र (EVS): जल संरक्षण की विधियां"}
                              {selectedChannel.id === "RJ150" && "★ दुर्ग संरचना: चित्तौड़गढ़ दुर्ग की स्थापत्य कला"}
                              {selectedChannel.id === "RJ151" && "★ त्रिकोणमिति सूत्र: sin²θ + cos²θ = 1"}
                              {selectedChannel.id === "RJ152" && "★ स्थिर वैद्युतिकी: कूलॉम का नियम (F = k * q1*q2/r²)"}
                            </p>
                          </div>
                        </div>

                        {/* SIGN LANGUAGE INTERPRETER SIMULATOR OVERLAY */}
                        {islOverlayActive && (
                          <div className="absolute bottom-5 right-5 h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-amber-500 bg-slate-950/90 pulse-glow-saffron z-20 flex flex-col items-center justify-center overflow-hidden">
                            {/* Floating signing character simulation */}
                            <div className="absolute top-1.5 bg-amber-500 text-slate-950 text-[7px] sm:text-[8px] font-black tracking-wider uppercase px-1 py-0.5 rounded">
                              ISL INTERPRETER
                            </div>
                            {/* Animated hand outline moving nicely */}
                            <svg className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500 animate-[bounce_1.5s_infinite] mt-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                            <span className="text-[8px] sm:text-[9px] text-amber-500 font-bold mt-1 font-mono uppercase tracking-wide">
                              {selectedChannel.id === "RJ148" && "Welcome Sign"}
                              {selectedChannel.id === "RJ149" && "Water Signs"}
                              {selectedChannel.id === "RJ150" && "Fort Sign"}
                              {selectedChannel.id === "RJ151" && "Math Notation"}
                              {selectedChannel.id === "RJ152" && "Science Lecture"}
                            </span>
                          </div>
                        )}

                        {/* Subtitles Overlay bottom left */}
                        {simulatedSubtitlesActive && (
                          <div className="z-10 bg-black/75 rounded p-2 text-left text-[10px] sm:text-xs text-yellow-305 font-bold max-w-sm sm:max-w-md border border-slate-800">
                            🔔 "शिक्षक: {selectedChannel.id === "RJ148" && "बच्चों, आज हम वर्णों को चित्रों की सहायता से पहचानना सीखेंगे। (Kids, let's learn alphabets today.)"}"
                            {selectedChannel.id === "RJ149" && "आइए राजस्थान की पुरानी जल संचयन बावलियों के इतिहास को समझें। (Let's explore Baoris.)"}
                            {selectedChannel.id === "RJ150" && "मेवाड़ के महाराणा प्रताप और उनके स्वामिभक्त घोड़े चेतक की शौर्य गाथा। (The legacy of Maharana Pratap.)"}
                            {selectedChannel.id === "RJ151" && "त्रिकोणमितीय सारणी में विशिष्ट कोणों के मान ज्ञात करने की सरल ट्रिक। (Trigonometry Shortcuts.)"}
                            {selectedChannel.id === "RJ152" && "कूलॉम के नियम के अनुसार दो विद्युत आवेशों के मध्य कार्यरत बल। (Coulomb's Law forces.)"}
                          </div>
                        )}
                      </>
                    )}

                  </div>

                  {/* Progress/Broadcast status bar */}
                  <div className="bg-slate-950 px-6 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span className="font-semibold text-slate-400 text-[11px] sm:text-xs">समय चक्र: {activeScheduleItem.time}</span>
                    </div>
                    <div className="w-1/3 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full transition-all duration-1000" 
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono">{progressVal}% Completed</span>
                  </div>

                  {/* Subject Schedule Timetable Tabs */}
                  <div className="bg-slate-950/50 p-4 border-t border-slate-800 text-left">
                    <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 justify-start">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      <span>दैनिक प्रसारण समय-सारणी (Broadcast Schedule)</span>
                    </h5>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {selectedChannel.schedule.map((sch, idx) => {
                        const isSelected = selectedSubjectIndex === idx;
                        return (
                          <button
                            key={sch.time + idx}
                            onClick={() => handleSubjectSelect(idx, sch.subjectHindi)}
                            className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                              isSelected
                                ? "bg-slate-800 border-amber-500 text-white"
                                : "border-slate-800 hover:bg-slate-900 text-slate-400"
                            }`}
                            id={`btn-schedule-${idx}`}
                          >
                            <p className="text-[9px] font-mono tracking-tighter opacity-75">{sch.time.split(" - ")[0]}</p>
                            <p className="text-xs font-bold leading-tight truncate mt-0.5">{sch.subjectHindi}</p>
                            <p className="text-[9px] text-slate-500 truncate">{sch.topicHindi}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* PLACEHOLDERS REQUIREMENT: "Watch Live" Links containing dynamic active values */}
                  <div className="bg-slate-950 p-5 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <div>
                      <p className="text-xs font-bold text-slate-300">आधिकारिक बाहरी लाइव स्ट्रीमिंग लिंक (Active Links)</p>
                      <p className="text-[10px] text-slate-500">Official Direct Satellite &amp; IPTV Portal Feeds</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      <a
                        href={selectedChannel.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer transition"
                        title="Watch Official YouTube Playlist Content"
                        id={`btn-youtube-${selectedChannel.id}`}
                      >
                        <Youtube className="h-4 w-4" />
                        <span>Watch Playlist on YouTube</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <a
                        href={selectedChannel.wavesOttUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition"
                        title="Watch IPTV Live broadcast"
                        id={`btn-waves-${selectedChannel.id}`}
                      >
                        <Tv className="h-4 w-4" />
                        <span>Waves OTT (Prasar Bharati)</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
