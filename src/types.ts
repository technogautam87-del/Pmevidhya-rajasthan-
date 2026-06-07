export interface DTHChannel {
  id: string; // e.g. "RJ148"
  name: string; // e.g. "RJ148 - Class 1 to 3"
  classRange: string; // e.g. "कक्षा 1 - 3 (Classes 1 - 3)"
  titleHindi: string;
  titleEnglish: string;
  descriptionHindi: string;
  descriptionEnglish: string;
  islAvailable: boolean;
  schedule: Array<{
    time: string;
    subject: string;
    subjectHindi: string;
    topic: string;
    topicHindi: string;
    hasISL: boolean;
  }>;
  youtubeUrl: string;
  wavesOttUrl: string;
  currentPlaybackUrl?: string; // For simulation
  youtubeVideoId?: string; // Real YouTube Video ID for the live player
}

export interface EducationPillar {
  titleEnglish: string;
  titleHindi: string;
  descEnglish: string;
  descHindi: string;
  icon: string; // Name of Lucide icon
}

export interface BroadcastPlatform {
  name: string;
  nameHindi: string;
  channelNumbers: string;
  description: string;
  descriptionHindi: string;
  logoType: string;
}
