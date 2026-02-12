export const en = {
  nav: {
    features: "Features",
    howto: "How to Use",
    team: "Team",
    news: "News",
    faq: "FAQ",
    contact: "Contact",
    launch: "Open App",
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
      "A next-generation respiratory sound analysis platform that bridges the gap between clinical auscultation and telemedicine. By visualizing sound, we aim for a world where anyone can easily access diagnostic support for respiratory health.",
  },
  features: {
    label: "Features",
    items: [
      {
        number: "01",
        title: "Sound to Image",
        subtitle: "Spectrogram Visualization",
        description:
          "Convert respiratory sounds into real-time spectrograms. We evolve traditional auscultation—once dependent on ears and experience—into an intuitive visual analysis.",
        icon: "ImageIcon",
      },
      {
        number: "02",
        title: "Sound Classification",
        subtitle: "AI-Aided Abnormal Sound Detection",
        description:
          "Automatically identify respiratory patterns using deep learning. The AI classifies sounds into four categories: Normal, Crackles, Wheezes, or Both.",
        icon: "Brain",
      },
      {
        number: "03",
        title: "Flexible Integration",
        subtitle: "Multi-device & API Support",
        description:
          "Device-agnostic and ready for use on smartphones with digital stethoscopes. Seamlessly integrate with existing medical or care systems via our external API, regardless of your environment.",
        icon: "Share2",
      },
    ],
  },
  howto: {
    label: "How to Use",
    title: "Simple 3-Step Operation",
    steps: [
      { step: "01", title: "Record", description: "Record respiratory sounds using a smartphone or digital device." },
      { step: "02", title: "Analyze", description: "AI automatically generates a spectrogram and classifies the sound." },
      { step: "03", title: "Review", description: "Get visual reports and detailed analysis results instantly." },
    ],
  },
  team: {
    label: "Team",
    title: "Development Team: Kami-Lab",
    members: [
      { name: "Ryusei Oshima", role: "Backend Engineer", image: "/icons/Ryu.jpg", xUrl: "https://x.com/o4_ryu5ei" },
      { name: "Rei Sogo", role: "Frontend Engineer", image: "/icons/Rei.jpg", xUrl: "https://x.com/0_s0g0" },
    ],
  },
  news: {
    label: "News",
    items: [
      {
        date: "2026.02.02",
        tag: "Award",
        title: "Received Chairman's Award at Fukuoka Future IT Startup Awards",
        detail: "We received the Chairman's Award at a startup support program hosted by Fukuoka Prefecture.",
        image: "/news/news8.jpg"
      },
      {
        date: "2026.01.31",
        tag: "Release",
        title: "BreathViz AI Official Website Launched",
        detail: "We have launched the project site for BreathViz AI, featuring our deep learning-based respiratory analysis demo and future roadmap. Experience the future we are building.",
        image: "/news/news7.jpg"
      },
      {
        date: "2026.01.19",
        tag: "Adoption",
        title: "Selected for University Business Grant",
        detail: "We were selected for the PreGAP Fund, a grant for business development aimed at creating startups from Kyushu Institute of Technology. We will use these funds to improve product quality and expand features.",
        image: "/news/news6.jpg"
      },
      {
        date: "2025.12.11",
        tag: "Event",
        title: "Presented at ROCKET PITCH NIGHT FUKUOKA 2025",
        detail: "Spoke at a pitch event in Fukuoka. During the student session, we presented BreathViz AI and received feedback from judges, reaffirming its market potential and social impact.",
        image: "/news/news4.jpg"
      },
      {
        date: "2025.11.30",
        tag: "Award",
        title: "Won Grand Prize & Corporate Award at Geekten 2025",
        detail: "At Geekten 2025, one of Japan's largest student engineer festivals, we received the top Grand Prize and the WingArc1st Corporate Award.",
        image: "/news/news3.jpg"
      },
      {
        date: "2025.11.16",
        tag: "Event",
        title: "Participated in Geek Camp Caravan Fukuoka",
        detail: "Joined Geek Camp in Fukuoka. We connected with many engineers and students, receiving valuable feedback on our product.",
        image: "/news/news2.jpg"
      },
      {
        date: "2025.09.28",
        tag: "Award",
        title: "Won 2nd Prize at JunctionXKyutech 2025",
        detail: "Awarded 2nd Prize at the international hackathon held at Kyushu Institute of Technology. We conducted our pitch and technical demo in English for a global jury.",
        image: "/news/news1.jpg"
      },
    ],
    more: "Read More",
    moreall: "All News",
  },
  faq: {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      { q: "Which devices are supported?", a: "We support iOS, Android, and web browsers. The platform is responsive for both PC and mobile, and can be paired with specialized digital stethoscopes." },
      { q: "Is API integration available?", a: "Yes, we provide a RESTful API for seamless integration with electronic medical records (EMR) and other healthcare systems." },
      { q: "What is the implementation cost?", a: "Costs vary based on the scale of the facility and specific requirements. Please contact us for a detailed quote." },
    ],
  },
  contact: {
    label: "Contact",
    title: "Inquiries regarding API & Implementation",
    description: "Please feel free to reach out for consultations on API integration, implementation, or any other questions regarding BreathViz AI.",
    form: {
      name: "Name",
      email: "Email Address",
      organization: "Organization",
      message: "Message",
      submit: "Send Message",
    },
  },
  footer: {
    copyright: "© 2025 BreathViz AI. All rights reserved.",
  },
} as const;