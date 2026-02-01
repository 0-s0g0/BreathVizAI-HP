export const en = {
  nav: {
    features: "Features",
    howto: "How to Use",
    team: "Team",
    news: "News",
    faq: "FAQ",
    contact: "Contact",
    launch: "Launch App",
  },
  hero: {
    title: "BreathViz AI",
    subtitle: "Next-Generation Respiratory Sound Monitoring Platform",
    catchphrase: "BreathViz AI",
    catchphrase2: "Expert Ears for Every Healthcare Setting",
    catchphrase3: "Simply record respiratory sounds with a digital device to leverage AI-powered automated analysis. Streamline vital sign documentation and support the early detection of respiratory diseases.",
    tryDemo: "Try Demo",
  },
  mission: {
    label: "Our Mission",
    title: "Pioneering the Future",
    title2: "of Lung Sound Diagnosis with AI.",
    description:
      "A next-generation respiratory sound analysis platform that bridges the gap between clinical auscultation and remote medicine. By visualizing sound, we aim to create a world where high-precision diagnostic support is accessible to everyone.",
  },
  features: {
    label: "Features",
    items: [
      {
        number: "01",
        title: "Sound to Image",
        subtitle: "Spectrogram Visualization",
        description:
          "Convert respiratory sounds into real-time spectrograms. We evolve auscultation—which traditionally relied on ears and experience—into a data-driven visual analysis.",
        icon: "ImageIcon",
      },
      {
        number: "02",
        title: "Sound Classification",
        subtitle: "AI-Powered Adventitious Sound Detection",
        description:
          "Deep learning automatically identifies respiratory patterns. Sounds are classified into four categories: Normal, Crackles, Wheezes, or Both.",
        icon: "Brain",
      },
      {
        number: "03",
        title: "Flexible Integration",
        subtitle: "Multi-device & API Support",
        description:
          "Device-agnostic and ready for use with your smartphone and digital stethoscopes. Our external API allows seamless integration with existing medical and nursing care systems.",
        icon: "Share2",
      },
    ],
  },
  howto: {
    label: "How to Use",
    title: "3 Simple Steps",
    steps: [
      { step: "01", title: "Record", description: "Record respiratory sounds using a smartphone or digital device." },
      { step: "02", title: "Analyze", description: "AI automatically generates a spectrogram and classifies the sound." },
      { step: "03", title: "Review", description: "Receive a visual report and detailed analysis results instantly." },
    ],
  },
  team: {
    label: "Team",
    title: "Development Team : KamiLab",
    members: [
      { name: "Ryusei Oshima", role: "Backend Engineer", image: "/icons/Ryu.jpg", xUrl: "https://x.com/o4_ryu5ei" },
      { name: "Rei Sogo", role: "Frontend Engineer", image: "/icons/Rei.jpg", xUrl: "https://x.com/0_s0g0" },
    ],
  },
  news: {
    label: "News",
    items: [
      {
        date: "2026.01.20",
        tag: "Release",
        title: "BreathViz AI Official Website Launched",
        detail: "We have launched our project site featuring AI-powered respiratory analysis demos and our future roadmap. Experience the future of healthcare with us.",
        image: "/news/news5.png"
      },
      {
        date: "2026.01.19",
        tag: "Adoption",
        title: "Selected for University Startup Grant Program",
        detail: "We have been selected for the PreGAP Fund Grant Program for business development aimed at creating startups from Kyutech. The funds will be used for future development to improve product quality and expand functionality.",
        image: "/news/news6.png"
      },
      {
        date: "2025.12.11",
        tag: "Event",
        title: "Presented at ROCKET PITCH NIGHT FUKUOKA 2025",
        detail: "Presented BreathViz AI during the student session in Fukuoka. We received valuable feedback from judges, reaffirming the market potential and social impact of our product.",
        image: "/news/news4.png"
      },
      {
        date: "2025.11.30",
        tag: "Award",
        title: "Won Grand Prize & Corporate Award at Geekten 2025",
        detail: "At Geekten 2025, a major festival for student engineers, we were honored with the Grand Prize (First Place) and the WingArc1st Corporate Award.",
        image: "/news/news3.png"
      },
      {
        date: "2025.11.16",
        tag: "Event",
        title: "Participated in Geek Camp Hackathon Fukuoka",
        detail: "Joined the Fukuoka session of Geek Camp. We engaged with many engineers, professionals, and students, gaining extensive feedback for product improvement.",
        image: "/news/news2.png"
      },
      {
        date: "2025.09.28",
        tag: "Award",
        title: "Won 2nd Prize at JunctionX Kyutech 2025",
        detail: "Secured 2nd Prize at the international hackathon held at Kyushu Institute of Technology. Conducted our pitch and technical demo in English to a global panel of judges.",
        image: "/news/news1.png"
      },
    ],
    more: "Read More",
    moreall: "All News",
  },
  faq: {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      { q: "What devices are supported?", a: "We support iOS, Android, and web browsers. Integration with specialized digital stethoscopes is also available." },
      { q: "Is API integration available?", a: "Yes, we provide a RESTful API for seamless integration with Electronic Health Records (EHR) and other medical systems." },
      { q: "What is the cost of implementation?", a: "Costs vary depending on the facility size and specific requirements. Please contact us for a detailed proposal." },
    ],
  },
  contact: {
    label: "Contact",
    title: "Inquiries for API & Integration",
    description: "For questions regarding API integration, implementation, or any other inquiries, please feel free to reach out to us.",
    form: {
      name: "Name",
      email: "Email Address",
      organization: "Organization",
      message: "Message",
      submit: "Submit",
    },
  },
  footer: {
    copyright: "© 2025 BreathViz AI. All rights reserved.",
  },
} as const;