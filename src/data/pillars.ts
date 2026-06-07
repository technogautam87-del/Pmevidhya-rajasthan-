import { EducationPillar, BroadcastPlatform } from "../types";

export const EDUCATION_PILLARS: EducationPillar[] = [
  {
    titleEnglish: "Accessibility",
    titleHindi: "अभिगम्यता",
    descEnglish: "Ensuring no child is left behind. Developing special CWSN (Children with Special Needs) content, high-quality audio books, digital braille, and comprehensive Indian Sign Language (ISL) videos.",
    descHindi: "यह सुनिश्चित करना कि कोई भी बच्चा पीछे न छूटे। विशेष आवश्यकता वाले बच्चों (CWSN) के लिए विशेष सामग्री, उच्च-गुणवत्ता वाली ऑडियो पुस्तकें, डिजिटल ब्रेल और समग्र भारतीय सांकेतिक भाषा (ISL) वीडियो का निर्माण किया गया है।",
    icon: "Accessibility"
  },
  {
    titleEnglish: "Equity",
    titleHindi: "समता",
    descEnglish: "Bridging the gap between rural, semi-urban, desert, and tribal regions of Rajasthan (like Jaisalmer and Banswara) by providing uniform access to high-quality lessons.",
    descHindi: "राजस्थान के ग्रामीण, अर्ध-शहरी, मरुस्थलीय और जनजातीय क्षेत्रों (जैसे जैसलमेर और बांसवाड़ा) के बीच की खाई को पाटना और सभी को समान रूप से उच्च गुणवत्ता वाले पाठ प्रदान करना।",
    icon: "Scale"
  },
  {
    titleEnglish: "Quality",
    titleHindi: "गुणवत्ता",
    descEnglish: "Curriculum developed by state-level educational experts at RSCERT Udaipur and RBSE Ajmer, presented by highly qualified and trained teachers.",
    descHindi: "आरएससीईआरटी (RSCERT) उदयपुर और माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) अजमेर के विषय विशेषज्ञों द्वारा तैयार किया गया पाठ्यक्रम, जिसे प्रशिक्षित शिक्षक प्रस्तुत करते हैं।",
    icon: "Award"
  },
  {
    titleEnglish: "Affordability",
    titleHindi: "वहनीयता",
    descEnglish: "Making education 100% free of cost. Streaming classes 24/7 on direct-to-home (DTH) TV, DD Free Dish, web portals, and lightweight apps without requiring expensive internet.",
    descHindi: "शिक्षा को 100% निःशुल्क बनाना। महंगे इंटरनेट के बिना सीधे टेलीविजन (DTH) टीवी, डीडी फ्री डिश, वेब पोर्टल और हल्के ऐप्स के माध्यम से 24/7 निरंतर क्लास का प्रसारण।",
    icon: "BadgeRupee"
  },
  {
    titleEnglish: "Accountability",
    titleHindi: "जवाबदेही",
    descEnglish: "Adhering strictly to standard timetables, transparent feedback forms, academic audits, and alignment with the National Education Policy (NEP 2020).",
    descHindi: "मानक समय-सारणी का कड़ाई से पालन, पारदर्शी शिकायत एवं सुझाव निवारण प्रणाली, अकादमिक ऑडिट और राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुरूप शिक्षण संचालन।",
    icon: "ShieldCheck"
  }
];

export const BROADCAST_PLATFORMS: BroadcastPlatform[] = [
  {
    name: "DD Free Dish",
    nameHindi: "डीडी फ्री डिश",
    channelNumbers: "Ch. 148 - 152",
    description: "Available for free all across India. No monthly recharge required.",
    descriptionHindi: "पूरे भारत में निःशुल्क उपलब्ध। किसी मासिक रिचार्ज की आवश्यकता नहीं है।",
    logoType: "Tv"
  },
  {
    name: "Dish TV (Videocon d2h)",
    nameHindi: "डिश टीवी",
    channelNumbers: "Ch. 900+ Series",
    description: "Dedicated high-definition service for clear classroom delivery on commercial DTH.",
    descriptionHindi: "व्यावसायिक डीटीएच पर स्पष्ट कक्षाओं के प्रसारण के लिए समर्पित हाई-डेफिनिशन सेवाएं।",
    logoType: "Tv2"
  },
  {
    name: "Jio TV Mobile App",
    nameHindi: "जियो टीवी मोबाइल ऐप",
    channelNumbers: "Search: 'PM eVidya'",
    description: "Live-stream all 5 Rajasthan school channels anytime, anywhere on smartphones.",
    descriptionHindi: "स्मार्टफोन पर कभी भी, कहीं भी सभी 5 राजस्थान स्कूल चैनलों को लाइव-स्ट्रीम करें।",
    logoType: "Smartphone"
  },
  {
    name: "Waves OTT (Prasar Bharati)",
    nameHindi: "वेव्स ओटीटी (प्रसार भारती)",
    channelNumbers: "Live Streams Tab",
    description: "Prasar Bharati's dedicated digital streaming platform for state channels.",
    descriptionHindi: "राज्य के चैनलों के लिए प्रसार भारती का समर्पित डिजिटल ओटीटी स्ट्रीमिंग प्लेटफॉर्म।",
    logoType: "PlayCircle"
  },
  {
    name: "PM eVidya Android/iOS App",
    nameHindi: "पीएम ई-विद्या मोबाइल ऐप",
    channelNumbers: "QR Code / App Store",
    description: "Integrated app offering both live TV channels and downloadable e-books / PDFs.",
    descriptionHindi: "लाइव टीवी चैनलों और डाउनलोड करने योग्य ई-पुस्तकों / पीडीएफ दोनों की पेशकश करने वाला एकीकृत ऐप।",
    logoType: "Download"
  }
];
