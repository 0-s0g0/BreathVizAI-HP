export const ja = {
      nav: {
        features: "機能",
        howto: "使い方",
        team: "チーム",
        news: "ニュース",
        faq: "FAQ",
        contact: "お問い合わせ",
        launch: "アプリを開く",
      },
hero: {
        title: "BreathViz AI",
        subtitle: "次世代 呼吸音モニタリング・プラットフォーム", 
        catchphrase: "BreathViz AI",
        catchphrase2: "熟練の「耳」を、すべての現場に", 
        catchphrase3: "日常の呼吸音を電子収音デバイスで録音するだけで、AIによる自動解析を利用できます。バイタルチェックの記録業務を効率化し、呼吸器疾患の早期発見を支えます。",
        tryDemo: "デモを試す",
      },
      mission: {
        label: "Our Mission",
        title: "呼吸音診断の未来を、",
        title2: "AIで切り拓く。",
        description:
          "医療現場の聴診から遠隔診療まで、AIが実現する次世代の呼吸音分析プラットフォーム。音を可視化し、誰もが手軽で高精度な診断支援を受けられる世界を目指します。",
      },
      features: {
        label: "Features",
        items: [
          {
            number: "01",
            title: "音を画像へ",
            subtitle: "スペクトログラム可視化",
            description:
              "呼吸音をリアルタイムでスペクトログラム画像へ。従来は耳と経験に頼ってきた聴診を、視覚的な分析へと進化させます。",
            icon: "ImageIcon",
          },
          {
            number: "02",
            title: "音を分類",
            subtitle: "AIによる異常音分類支援",
            description:
              "深層学習により、呼吸音のパターンを自動識別します。正常音と異常音(断続性ラ音、連続性ラ音、両方)へと4クラスに分類します。",
            icon: "Brain",
          },
          {
            number: "03",
            title: "柔軟なシステム連携", 
            subtitle: "マルチデバイス・外部API対応",
            description:
              "特定の端末に依存せず、電子聴診器を用いて、お手持ちのスマートフォンですぐに利用可能です。また、外部APIとして既存の医療・介護システムへシームレスに統合できるため、環境を選ばず導入いただけます。",
            icon: "Share2", 
          },
        ],
      },
      howto: {
        label: "How to Use",
        title: "3ステップで簡単操作",
        steps: [
          { step: "01", title: "録音", description: "スマートフォンやデバイスで呼吸音を録音" },
          { step: "02", title: "分析", description: "AIが自動でスペクトログラムを生成し分類" },
          { step: "03", title: "結果確認", description: "視覚的なレポートと詳細な分析結果を取得" },
        ],
      },
      team: {
        label: "Team",
        title: "開発チーム",
        members: [
          { name: "大島 龍晟", role: "Backend Engineer", image: "T" },
          { name: "十河 伶衣", role: "Frontend Engineer", image: "Y" },
        ],
      },
      news: {
        label: "News",
        items: [
        {
            "date": "2026.01.20",
            "tag": "Release",
            "title": "BreathViz AI 公式サイトを公開しました",
            "detail": "BreathViz AIのプロジェクトサイトを公開。深層学習を用いた呼吸音解析のデモや、今後の展開について掲載しています。私たちが目指す未来の体験をぜひご覧ください。",
            "image": "/news/news5.png"
        },
        {
            "date": "2025.12.11",
            "tag": "Event",
            "title": "ROCKET PITCH NIGHT FUKUOKA 2025 に登壇",
            "detail": "福岡で開催されたピッチイベントに登壇しました。学生セッションにてBreathViz AIのプレゼンを行い、審査員フィードバックをいただきました。プロダクトの市場性と社会的意義を再確認する貴重な機会となりました。",
            "image": "/news/news4.png"
        },
        {
            "date": "2025.11.30",
            "tag": "Award",
            "title": "技育展2025にて優賞＆企業賞をダブル受賞",
            "detail": "学生エンジニアの祭典「技育展2025」にて、最高賞である優勝（最優秀賞）およびウイングアーク１ｓｔ賞を受賞しました",
            "image": "/news/news3.png"
        },
        {
            "date": "2025.11.16",
            "tag": "Event",
            "title": "技育キャンプ ハッカソン福岡大会に参加",
            "detail": "福岡会場にて開催された「技育キャンプ」に参加しました。多くのエンジニアや社員の皆様、学生の方と交流しプロダクトのFBをたくさんいただけました。",
            "image": "/news/news2.png"
        },
        {
            "date": "2025.09.28",
            "tag": "Award",
            "title": "JunctionX Kyutech 2025 で 2nd Prize を受賞",
            "detail": "九州工業大学で開催された国際ハッカソンにて、準優勝にあたる 2nd Prize を受賞しました。多国籍なメンバーや審査員に対し、英語でのピッチと技術デモを実施しました。グローバルな視点でのプロダクト開発の重要性を学びました。",
            "image": "/news/news1.png"
        },
        ],        
        more: "詳しく見る",
        moreall: "すべてのニュース",
      },
      faq: {
        label: "FAQ",
        title: "よくある質問",
        items: [
          { q: "対応デバイスは何ですか？", a: "iOS、Android、Webブラウザに対応しています。専用のデジタル聴診器との連携も可能です。" },
          { q: "API連携は可能ですか？", a: "はい、RESTful APIを提供しており、電子カルテシステムや他の医療システムとの連携が可能です。" },
          { q: "導入コストはどのくらいですか？", a: "施設の規模や要件により異なります。詳細はお問い合わせください。" },
        ],
      },
      contact: {
        label: "Contact",
        title: "API連携・導入のご相談",
        description: "BreathViz AIのAPI連携、導入に関するご相談、その他ご質問がございましたら、お気軽にお問い合わせください。",
        form: {
          name: "お名前",
          email: "メールアドレス",
          organization: "組織名",
          message: "お問い合わせ内容",
          submit: "送信する",
        },
      },
      footer: {
        copyright: "© 2025 BreathViz AI. All rights reserved.",
      },
}as const;