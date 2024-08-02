const links = {
  twitter: "https://twitter.com/nemo",
  github: "https://github.com/nemo",
  githubAccount: "https://github.com/nemo",
  discord: "https://discord.com/users/nemo",
  calDotCom: "https://cal.com/nemo",
}

export const siteConfig = {
  name: "NemoShop",
  description: "An open source starter for project",
  url: "https://nemo.com",
  ogImage: "https://nemo.png",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/products",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "Build a Board",
          href: "/build-a-board",
          description: "Build your own custom skateboard.",
          items: [],
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
        },
      ],
    },
  ],
  links,
  footerNav: {
    locales: [
      { title: "English(UK)", href: "", external: false },
      { title: "Français(FR)", href: "", external: false },
      { title: "العربية", href: "", external: false },
      { title: "ⵜⴰⵎⴰⵣⵉⵖⵜ", href: "", external: false },
      { title: "Español (España)", href: "", external: false },
      { title: "italiano", href: "", external: false },
      { title: "Deutsch", href: "", external: false },
      { title: "Português (Brasil)", href: "", external: false },
      { title: "हिन्दी", href: "", external: false },
      { title: "中文(简体)", href: "", external: false },
      { title: "日本語", href: "", external: false },
    ],
    links: [
      { title: "Sign Up", href: "", external: false },
      { title: "Log in", href: "", external: false },
      { title: "Messenger", href: "", external: false },
      { title: "Facebook Lite", href: "", external: false },
      { title: "Watch", href: "", external: false },
      { title: "Places", href: "", external: false },
      { title: "Games", href: "", external: false },
      { title: "Marketplace", href: "", external: false },
      { title: "Facebook Pay", href: "", external: false },
      { title: "Oculus", href: "", external: false },
      { title: "Portal", href: "", external: false },
      { title: "Instagram", href: "", external: false },
      { title: "Bulletin", href: "", external: false },
      { title: "Local", href: "", external: false },
      { title: "Fundraisers", href: "", external: false },
      { title: "Services", href: "", external: false },
      { title: "Voting Information Centre", href: "", external: false },
      { title: "Groups", href: "", external: false },
      { title: "About", href: "", external: false },
      { title: "Create ad", href: "", external: false },
      { title: "Create Page", href: "", external: false },
      { title: "Developers", href: "", external: false },
      { title: "Careers", href: "", external: false },
      { title: "Privacy", href: "", external: false },
      { title: "Cookies", href: "", external: false },
      { title: "AdChoices", href: "", external: false },
      { title: "Terms", href: "", external: false },
      { title: "Help", href: "", external: false },
    ],
  },
  allMenu: [
    {
      name: "Campus",
      icon: "/icons/sidebar/campus.png",
      description:
        "A unique, exclusive space for college students on Facebook.",
    },
    {
      name: "Events",
      icon: "/icons/sidebar/events.png",
      description:
        "Organize or find events and other things to do online and nearby.",
    },
    {
      name: "Find Friends",
      icon: "/icons/sidebar/friends.png",
      description: "Search for friends or people you may know.",
    },
    {
      name: "Groups",
      icon: "/icons/sidebar/groups.png",
      description: "Connect with people who share your interests.",
    },
    {
      name: "News Feed",
      icon: "/icons/sidebar/feed.png",
      description: "See relevant posts from people and Pages you follow.",
    },
    {
      name: "Pages",
      icon: "/icons/sidebar/pages.png",
      description: "Discover and connect with businesses on Facebook.",
    },
    {
      name: "Gaming Video",
      icon: "/icons/sidebar/gaming.png",
      description: "Watch and connect with your favorite games and streamers.",
    },
    {
      name: "Play Games",
      icon: "/icons/sidebar/play.png",
      description: "Play your favorite games.",
    },
    {
      name: "Watch",
      icon: "/icons/sidebar/watch.png",
      description:
        "A video destination personalized to your interests and connections.",
    },
    {
      name: "Facebook Pay",
      icon: "/icons/sidebar/pay.png",
      description: "A seamless, secure way to pay on the apps you already use.",
    },
    {
      name: "Marketplace",
      icon: "/icons/sidebar/marketplace.png",
      description: "Buy and sell in your community.",
    },
    {
      name: "Recent Ad Activity",
      icon: "/icons/sidebar/recent.png",
      description: "See all the ads you interacted with on Facebook.",
    },
    {
      name: "Memories",
      icon: "/icons/sidebar/memories.png",
      description: "Browse your old photos, videos and posts on Facebook.",
    },
    {
      name: "Saved",
      icon: "/icons/sidebar/saved.png",
      description: "Find posts, photos and videos that you saved for later.",
    },
    {
      name: "Weather",
      icon: "/icons/sidebar/weather.png",
      description:
        "Check your local forecast and sign up for daily weather notifications.",
    },
    {
      name: "Ads",
      icon: "/icons/sidebar/ads.png",
      description: "Create, manage and track the performance of your ads.",
    },
    {
      name: "Jobs",
      icon: "/icons/sidebar/jobs.png",
      description: "Find a job that's right for you.",
    },
    {
      name: "Climate science center",
      icon: "/icons/sidebar/climate.png",
      description: "Learn about climate change and its effects.",
    },
    {
      name: "COVID-19 Information Center",
      icon: "/icons/sidebar/covid.png",
      description:
        "See the latest prevention tips, community resources and updates from health organizations.",
    },
    {
      name: "Community Help",
      icon: "/icons/sidebar/community.png",
      description:
        "Get involved in your community by creating a drive, requesting or offering help or volunteering.",
    },
    {
      name: "Fundraisers",
      icon: "/icons/sidebar/fundraisers.png",
      description: "Donate and raise money for nonprofits and personal causes.",
    },
    {
      name: "Messenger",
      icon: "/icons/sidebar/messenger.png",
      description: "Chat instantly with your friends and connections.",
    },
    {
      name: "Messenger Kids",
      icon: "/icons/sidebar/messkids.png",
      description: "Let kids message with close friends and family.",
    },
  ],
  createMenu: [
    {
      name: "Post",
      icon: "m_post_icon",
    },
    {
      name: "Story",
      icon: "m_story_icon",
    },
    {
      name: "Room",
      icon: "m_room_icon",
    },
    {
      name: "Page",
      icon: "m_page_icon",
    },

    {
      name: "Ad",
      icon: "m_ad_icon",
    },
    {
      name: "Group",
      icon: "m_group_icon",
    },
    {
      name: "Event",
      icon: "m_event_icon",
    },
    {
      name: "Marketplace Listing",
      icon: "m_post_mar",
    },
    {
      name: "Job",
      icon: "m_post_job",
    },
  ],
  leftMenu: [
    {
      text: "Friends",
      img: "friends",
    },
    {
      text: "Memories",
      img: "memories",
    },
    {
      text: "Saved",
      img: "saved",
    },
    {
      text: "Groups",
      img: "groups",
      notification: "5 new",
    },
    {
      text: "Video",
      img: "watch",
      notification: "9 new videos",
    },
    {
      text: "Ads Manager",
      img: "ads",
    },
    {
      text: "Climate science center",
      img: "climate",
    },
    {
      text: "Events",
      img: "events",
    },
    {
      text: "Feeds",
      img: "recent",
    },
    {
      text: "Fundraisers",
      img: "fund",
    },
    {
      text: "Gaming Video",
      img: "gaming",
    },
    {
      text: "Marketplace",
      img: "marketplace",
    },
    {
      text: "Messenger",
      img: "messenger",
    },
    {
      text: "Messenger Kids",
      img: "messkids",
    },
    {
      text: "Orders and payments",
      img: "pay",
    },
    {
      text: "Pages",
      img: "pages",
    },
    {
      text: "Play games",
      img: "play",
    },
    {
      text: "Recent ad activity",
      img: "recentad",
    },
    {
      text: "Ad Center",
      img: "ad",
    },
    {
      text: "Campus",
      img: "campus",
    },

    {
      text: "Community Help",
      img: "community",
    },
    {
      text: "COVID-19 Information Centrer",
      img: "covid",
    },
    {
      text: "Emotional health",
      img: "emotional",
    },
    {
      text: "Favorites",
      img: "fav",
    },
    {
      text: "Jobs",
      img: "jobs",
    },
    {
      text: "Live videos",
      img: "live",
    },
    {
      text: "Weather",
      img: "weather",
    },
  ],
  shortcutMenu: [
    {
      text: "My Youtube channel",
      img: "ytb",
    },
    {
      text: "My Instagram",
      img: "insta",
    },
  ],
  languages: [
    { key: "af", native: "Afrikaans", translation: "Afrikaans" },
    { key: "sq", native: "Shqip", translation: "Albanian" },
    { key: "ar", native: "العربية", translation: "Arabic" },
    { key: "hy", native: "Հայերեն", translation: "Armenian" },
    { key: "az", native: "Azərbaycan dili", translation: "Azerbaijani" },
    { key: "eu", native: "Euskara", translation: "Basque" },
    { key: "be", native: "Беларуская", translation: "Belarusian" },
    { key: "bn", native: "বাংলা", translation: "Bengali" },
    { key: "bs", native: "Bosanski", translation: "Bosnian" },
    { key: "bg", native: "Български", translation: "Bulgarian" },
    { key: "my", native: "မြန်မာစာ", translation: "Burmese" },
    { key: "ca", native: "Català", translation: "Catalan" },
    { key: "ceb", native: "Cebuano", translation: "Cebuano" },
    { key: "hr", native: "Hrvatski", translation: "Croatian" },
    { key: "cs", native: "Čeština", translation: "Czech" },
    { key: "da", native: "Dansk", translation: "Danish" },
    { key: "nl", native: "Nederlands", translation: "Dutch" },
    { key: "en_us", native: "English (US)", translation: "English (US)" },
    { key: "en_gb", native: "English (UK)", translation: "English (UK)" },
    { key: "eo", native: "Esperanto", translation: "Esperanto" },
    { key: "et", native: "Eesti", translation: "Estonian" },
    { key: "fil", native: "Filipino", translation: "Filipino" },
    { key: "fi", native: "Suomi", translation: "Finnish" },
    {
      key: "fr_fr",
      native: "Français (France)",
      translation: "French (France)",
    },
    {
      key: "fr_ca",
      native: "Français (Canada)",
      translation: "French (Canada)",
    },
    { key: "ka", native: "ქართული", translation: "Georgian" },
    { key: "de", native: "Deutsch", translation: "German" },
    { key: "el", native: "Ελληνικά", translation: "Greek" },
    { key: "gu", native: "ગુજરાતી", translation: "Gujarati" },
    { key: "he", native: "עברית", translation: "Hebrew" },
    { key: "hi", native: "हिन्दी", translation: "Hindi" },
    { key: "hu", native: "Magyar", translation: "Hungarian" },
    { key: "is", native: "Íslenska", translation: "Icelandic" },
    { key: "id", native: "Bahasa Indonesia", translation: "Indonesian" },
    { key: "ga", native: "Gaeilge", translation: "Irish" },
    { key: "it", native: "Italiano", translation: "Italian" },
    { key: "ja", native: "日本語", translation: "Japanese" },
    { key: "kn", native: "ಕನ್ನಡ", translation: "Kannada" },
    { key: "kk", native: "Қазақ тілі", translation: "Kazakh" },
    { key: "km", native: "ខ្មែរ", translation: "Khmer" },
    { key: "ko", native: "한국어", translation: "Korean" },
    {
      key: "ku",
      native: "Kurdî (Kurmanji)",
      translation: "Kurdish (Kurmanji)",
    },
    { key: "lo", native: "ລາວ", translation: "Lao" },
    { key: "lv", native: "Latviešu", translation: "Latvian" },
    { key: "lt", native: "Lietuvių", translation: "Lithuanian" },
    { key: "mk", native: "Македонски", translation: "Macedonian" },
    { key: "ms", native: "Bahasa Melayu", translation: "Malay" },
    { key: "ml", native: "മലയാളം", translation: "Malayalam" },
    { key: "mt", native: "Malti", translation: "Maltese" },
    { key: "mr", native: "मराठी", translation: "Marathi" },
    { key: "mn", native: "Монгол", translation: "Mongolian" },
    { key: "ne", native: "नेपाली", translation: "Nepali" },
    { key: "no", native: "Norsk (bokmål)", translation: "Norwegian (Bokmål)" },
    { key: "ps", native: "پښتو", translation: "Pashto" },
    { key: "fa", native: "فارسی", translation: "Persian" },
    { key: "pl", native: "Polski", translation: "Polish" },
    {
      key: "pt_br",
      native: "Português (Brasil)",
      translation: "Portuguese (Brazil)",
    },
    {
      key: "pt_pt",
      native: "Português (Portugal)",
      translation: "Portuguese (Portugal)",
    },
    { key: "pa", native: "ਪੰਜਾਬੀ", translation: "Punjabi" },
    { key: "ro", native: "Română", translation: "Romanian" },
    { key: "ru", native: "Русский", translation: "Russian" },
    { key: "sr", native: "Српски", translation: "Serbian" },
    { key: "si", native: "සිංහල", translation: "Sinhala" },
    { key: "sk", native: "Slovenčina", translation: "Slovak" },
    { key: "sl", native: "Slovenščina", translation: "Slovenian" },
    { key: "so", native: "Soomaali", translation: "Somali" },
    {
      key: "es_es",
      native: "Español (España)",
      translation: "Spanish (Spain)",
    },
    {
      key: "es_la",
      native: "Español (Latinoamérica)",
      translation: "Spanish (Latin America)",
    },
    { key: "sw", native: "Kiswahili", translation: "Swahili" },
    { key: "sv", native: "Svenska", translation: "Swedish" },
    { key: "ta", native: "தமிழ்", translation: "Tamil" },
    { key: "te", native: "తెలుగు", translation: "Telugu" },
    { key: "th", native: "ภาษาไทย", translation: "Thai" },
    { key: "tr", native: "Türkçe", translation: "Turkish" },
    { key: "uk", native: "Українська", translation: "Ukrainian" },
    { key: "ur", native: "اردو", translation: "Urdu" },
    { key: "uz", native: "Oʻzbekcha", translation: "Uzbek" },
    { key: "vi", native: "Tiếng Việt", translation: "Vietnamese" },
    { key: "cy", native: "Cymraeg", translation: "Welsh" },
  ],
}
