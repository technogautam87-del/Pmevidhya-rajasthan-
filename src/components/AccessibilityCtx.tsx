import React, { createContext, useContext, useState, useEffect } from "react";

export type FontSizeLevel = "normal" | "large" | "xlarge";
export type LanguageMode = "bilingual" | "hindi" | "english";

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: FontSizeLevel;
  screenReaderActive: boolean;
  languageMode: LanguageMode;
  toggleHighContrast: () => void;
  setFontSize: (size: FontSizeLevel) => void;
  toggleScreenReader: () => void;
  setLanguageMode: (mode: LanguageMode) => void;
  speakText: (text: string, lang?: "hi-IN" | "en-US") => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSizeState] = useState<FontSizeLevel>("normal");
  const [screenReaderActive, setScreenReaderActive] = useState<boolean>(false);
  const [languageMode, setLanguageMode] = useState<LanguageMode>("bilingual");

  // Keep track of active synthesis utterance so we can speak / cancel
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
    speakNotification(
      highContrast ? "High Contrast Mode Disabled" : "उच्च कंट्रास्ट मोड सक्षम किया गया (High Contrast Mode Enabled)",
      highContrast ? "en-US" : "hi-IN"
    );
  };

  const setFontSize = (size: FontSizeLevel) => {
    setFontSizeState(size);
    const msgs = {
      normal: "सामान्य फ़ॉन्ट आकार (Normal text size)",
      large: "बड़ा फ़ॉन्ट आकार (Large text size)",
      xlarge: "अति बड़ा फ़ॉन्ट आकार (Extra large text size)",
    };
    speakNotification(msgs[size], "hi-IN");
  };

  const toggleScreenReader = () => {
    const next = !screenReaderActive;
    setScreenReaderActive(next);
    if (next) {
      speakText("स्क्रीन रीडर चालू है। अब आप तत्वों पर कर्सर ले जाकर सुन सकते हैं। (Screen reader narrator is active. Hover over elements to listen.)", "hi-IN");
    } else {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const speakText = (text: string, forceLanguage?: "hi-IN" | "en-US") => {
    if (!screenReaderActive && !forceLanguage) return; 
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop current speech

    // Remove tags if any
    const cleanText = text.replace(/<[^>]*>/g, "");

    const lang = forceLanguage || (/[अ-ज्ञ]/.test(text) ? "hi-IN" : "en-US");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
    setCurrentUtterance(utterance);
  };

  const speakNotification = (text: string, forceLanguage?: "hi-IN" | "en-US") => {
    // Notifications are safety spoke even if virtual narrator isn't checked
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = forceLanguage || "hi-IN";
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        screenReaderActive,
        languageMode,
        toggleHighContrast,
        setFontSize,
        toggleScreenReader,
        setLanguageMode,
        speakText,
        stopSpeaking,
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-200 ${
          highContrast
            ? "bg-slate-950 text-yellow-300 font-bold"
            : "bg-[#f8fafc] text-slate-800"
        } ${
          fontSize === "large"
            ? "font-large-active"
            : fontSize === "xlarge"
            ? "font-xlarge-active"
            : ""
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
