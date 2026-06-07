import React, { createContext, useContext, useState, useEffect } from "react";
import { DTHChannel } from "../types";
import { RAJASTHAN_CHANNELS } from "../data/channels";

interface ChannelContextType {
  channels: DTHChannel[];
  updateChannelLinks: (
    channelId: string,
    youtubeUrl: string,
    wavesUrl: string,
    youtubeVideoId?: string
  ) => void;
  updateChannelSchedule: (
    channelId: string,
    scheduleIdx: number,
    fields: {
      subject: string;
      subjectHindi: string;
      topic: string;
      topicHindi: string;
    }
  ) => void;
  resetToDefault: () => void;
}

const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<DTHChannel[]>([]);

  useEffect(() => {
    // Load from localStorage or set defaults
    const stored = localStorage.getItem("pmevidya_channels_rj");
    if (stored) {
      try {
        setChannels(JSON.parse(stored));
      } catch (e) {
        setChannels(RAJASTHAN_CHANNELS);
      }
    } else {
      // Set initial sample YouTube videos to showcase real embeds!
      const initial = RAJASTHAN_CHANNELS.map((ch, idx) => {
        // High quality NCERT & ISL lesson video IDs for demonstration
        const defaultVideoIds = [
          "L-E7bU-xHqM", // Class 1-3 Rhymes ISL NCERT
          "XonW_a8LdIs", // EVS Lesson
          "yUR_4QizkX8", // History lesson
          "vNAt8F8Tf7Q", // Science lesson
          "0q1Jg1YgZ2M"  // Senior secondary
        ];
        return {
          ...ch,
          youtubeVideoId: defaultVideoIds[idx] || "L-E7bU-xHqM"
        };
      });
      setChannels(initial);
      localStorage.setItem("pmevidya_channels_rj", JSON.stringify(initial));
    }
  }, []);

  const updateChannelLinks = (
    channelId: string,
    youtubeUrl: string,
    wavesUrl: string,
    youtubeVideoId?: string
  ) => {
    const updated = channels.map((ch) => {
      if (ch.id === channelId) {
        return {
          ...ch,
          youtubeUrl,
          wavesOttUrl: wavesUrl,
          youtubeVideoId: youtubeVideoId || ""
        };
      }
      return ch;
    });
    setChannels(updated);
    localStorage.setItem("pmevidya_channels_rj", JSON.stringify(updated));
  };

  const updateChannelSchedule = (
    channelId: string,
    scheduleIdx: number,
    fields: {
      subject: string;
      subjectHindi: string;
      topic: string;
      topicHindi: string;
    }
  ) => {
    const updated = channels.map((ch) => {
      if (ch.id === channelId) {
        const newSched = [...ch.schedule];
        if (newSched[scheduleIdx]) {
          newSched[scheduleIdx] = {
            ...newSched[scheduleIdx],
            ...fields
          };
        }
        return {
          ...ch,
          schedule: newSched
        };
      }
      return ch;
    });
    setChannels(updated);
    localStorage.setItem("pmevidya_channels_rj", JSON.stringify(updated));
  };

  const resetToDefault = () => {
    const initial = RAJASTHAN_CHANNELS.map((ch, idx) => {
      const defaultVideoIds = [
        "L-E7bU-xHqM",
        "XonW_a8LdIs",
        "yUR_4QizkX8",
        "vNAt8F8Tf7Q",
        "0q1Jg1YgZ2M"
      ];
      return {
        ...ch,
        youtubeVideoId: defaultVideoIds[idx] || "L-E7bU-xHqM"
      };
    });
    setChannels(initial);
    localStorage.setItem("pmevidya_channels_rj", JSON.stringify(initial));
  };

  return (
    <ChannelContext.Provider value={{ channels, updateChannelLinks, updateChannelSchedule, resetToDefault }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannels = () => {
  const context = useContext(ChannelContext);
  if (context === undefined) {
    throw new Error("useChannels must be used within a ChannelProvider");
  }
  return context;
};
