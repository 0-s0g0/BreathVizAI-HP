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
        subtitle: "Respiratory Sound Diagnosis Support",
        catchphrase: "BreathVizAI",
        catchphrase2: "the eyes",
        catchphrase3: "of AI.",
        tryDemo: "Try Demo",
      },
      mission: {
        label: "Our Mission",
        title: "Pioneering the future",
        title2: "of respiratory diagnosis.",
        description:
          "From clinical auscultation to telemedicine, a next-generation respiratory sound analysis platform powered by AI. Visualizing sound to create accessible, high-precision diagnostic support for everyone.",
      },
      features: {
        label: "Features",
        items: [
          {
            number: "01",
            title: "Sound to Image",
            subtitle: "Spectrogram Visualization",
            description:
              "Convert respiratory sounds into spectrogram images in real-time. Evolving auscultation from ears and experience to visual analysis.",
            icon: "ImageIcon",
          },
          {
            number: "02",
            title: "Sound Classification",
            subtitle: "AI-Powered Diagnosis Support",
            description:
              "Automatic pattern recognition using deep learning. Classifies normal and abnormal sounds with over 95% accuracy.",
            icon: "Brain",
          },
          {
            number: "03",
            title: "Learn with Sound & Image",
            subtitle: "Interactive Learning",
            description:
              "Innovative learning environment combining audio and visual data. Supports skill improvement and telemedicine compatibility.",
            icon: "GraduationCap",
          },
        ],
      },
      howto: {
        label: "How to Use",
        title: "Simple 3-Step Process",
        steps: [
          { step: "01", title: "Record", description: "Record respiratory sounds with your smartphone or device" },
          { step: "02", title: "Analyze", description: "AI automatically generates spectrograms and classifies" },
          { step: "03", title: "Review", description: "Get visual reports and detailed analysis results" },
        ],
      },
      team: {
        label: "Team",
        title: "Development Team",
        members: [
          { name: "Kenta Tanaka", role: "CEO / AI Researcher", image: "K" },
          { name: "Misaki Yamada", role: "CTO / Engineer", image: "M" },
          { name: "Shota Sato", role: "Medical Advisor", image: "S" },
          { name: "Ai Suzuki", role: "UX Designer", image: "A" },
        ],
      },
      news: {
        label: "News",
        items: [
        {
            "date": "2026.01.20",
            "tag": "Release",
            "title": "BreathViz AI Official Site is Now Live",
            "detail": "We have launched the official project site for BreathViz AI. Explore our deep learning-powered lung sound analysis demos. Witness the future of respiratory diagnostics.",
            "image": "/news/news5.png"
        },
        {
            "date": "2025.12.05",
            "tag": "Event",
            "title": "Spoke at ROCKET PITCH NIGHT FUKUOKA 2025",
            "detail": "Presented BreathViz AI during the student session at Fukuoka's premier pitch event. Received invaluable feedback, validating our product-market fit and the social impact of our technology.",
            "image": "/news/news4.png"
        },
        {
            "date": "2025.10.15",
            "tag": "Award",
            "title": "Winner of Grand Prize at Geekten 2025",
            "detail": "Achieved the highest honor, the Grand Prize, along with the WingArc1st Corporate Award at Japan's largest student tech exhibition.",
            "image": "/news/news3.png"
        },
        {
            "date": "2025.08.10",
            "tag": "Event",
            "title": "Participated in Geeks Camp Fukuoka Hackathon",
            "detail": "I participated in the “Geeks Camp” held at the Fukuoka venue. I interacted with many engineers, employees, and students, and received a lot of feedback on our product.",
            "image": "/news/news2.png"
        },
        {
            "date": "2025.06.30",
            "tag": "Award",
            "title": "JunctionX Kyutech 2025 - 2nd Prize Winners",
            "detail": "Secured the 2nd Prize at the international hackathon held at Kyushu Institute of Technology. Delivered a technical demo and pitch in English, gaining international recognition for our innovative approach to healthcare AI.",
            "image": "/news/news1.png"
        }
        ],
        more: "View Details",
        moreall: "View All News",
      },
      faq: {
        label: "FAQ",
        title: "Frequently Asked Questions",
        items: [
          { q: "What devices are supported?", a: "We support iOS, Android, and web browsers. Integration with dedicated digital stethoscopes is also available." },
          { q: "How accurate is it?", a: "Our latest AI model achieves over 95% accuracy in classifying normal and abnormal sounds." },
          { q: "Is API integration available?", a: "Yes, we provide a RESTful API that enables integration with EMR systems and other medical platforms." },
          { q: "What are the implementation costs?", a: "Costs vary based on facility size and requirements. Please contact us for details." },
        ],
      },
      contact: {
        label: "Contact",
        title: "API Integration & Inquiries",
        description: "If you have any questions about BreathViz AI API integration, implementation, or other inquiries, please feel free to contact us.",
        form: {
          name: "Name",
          email: "Email",
          organization: "Organization",
          message: "Message",
          submit: "Send Message",
        },
      },
      footer: {
        copyright: "© 2025 BreathViz AI. All rights reserved.",
      },
}as const;