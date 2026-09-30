import type { Localized } from './locales'

/**
 * UI copy. Every locale must satisfy this interface, so a missing or misspelled key
 * is a type error rather than a blank string at runtime.
 */
export interface Messages {
  nav: {
    label: string
    home: string
    projects: string
    about: string
    github: string
    menu: string
    switchLanguage: string
  }
  common: {
    skipToContent: string
    opensInNewTab: string
    viewProjects: string
    /** Punctuation between a label and its value, e.g. "View Case Study: Title". */
    labelSeparator: string
  }
  home: {
    focusLabel: string
    featuredTitle: string
    featuredDescription: string
    viewAllProjects: string
    skillsTitle: string
    skillsDescription: string
    aboutTitle: string
    viewAbout: string
  }
  project: {
    viewCaseStudy: string
    techStack: string
  }
  caseStudy: {
    allProjects: string
    highlights: string
    challenge: string
    solution: string
    pagerLabel: string
    previous: string
    next: string
    sections: {
      overview: string
      role: string
      problem: string
      architecture: string
      solution: string
      challenges: string
      techStack: string
      results: string
      learnings: string
    }
  }
  pages: {
    projectsTitle: string
    projectsDescription: string
    aboutTitle: string
  }
  about: {
    description: string
    experienceTitle: string
    strengthsTitle: string
    contactTitle: string
    contactDescription: string
    email: string
  }
  notFound: {
    title: string
    description: string
    backHome: string
    browseProjects: string
  }
  footer: {
    builtWith: string
  }
}

const zhTW = {
  nav: {
    label: '主要導覽',
    home: '首頁',
    projects: '作品',
    about: '關於我',
    github: 'GitHub',
    menu: '選單',
    switchLanguage: '切換語言',
  },
  common: {
    skipToContent: '跳至主要內容',
    opensInNewTab: '另開新分頁',
    viewProjects: '查看作品',
    labelSeparator: '：',
  },
  home: {
    focusLabel: '技術重點',
    featuredTitle: '精選作品',
    featuredDescription: '實際開發過的專案，每個都附有完整的 Case Study。',
    viewAllProjects: '查看全部作品',
    skillsTitle: '技能',
    skillsDescription: '依領域整理的主要技術。',
    aboutTitle: '關於我',
    viewAbout: '了解更多',
  },
  project: {
    viewCaseStudy: '查看案例',
    techStack: '使用技術',
  },
  caseStudy: {
    allProjects: '所有作品',
    highlights: '重點功能',
    challenge: '挑戰',
    solution: '解法',
    pagerLabel: '更多作品',
    previous: '上一個作品',
    next: '下一個作品',
    sections: {
      overview: '專案概述',
      role: '我的角色',
      problem: '問題',
      architecture: '架構與流程',
      solution: '解決方案',
      challenges: '技術挑戰',
      techStack: '技術棧',
      results: '成果',
      learnings: '學到的事',
    },
  },
  pages: {
    projectsTitle: '作品',
    projectsDescription: '實際參與開發的專案。每個專案都整理了背景、我的角色、架構與技術挑戰。',
    aboutTitle: '關於我',
  },
  about: {
    description: '工作背景、經歷與專長。',
    experienceTitle: '工作經歷',
    strengthsTitle: '專長',
    contactTitle: '聯絡方式',
    contactDescription: '歡迎透過 GitHub 了解更多我的程式碼。',
    email: 'Email',
  },
  notFound: {
    title: '找不到頁面',
    description: '這個網址不存在，可能已被移動或輸入有誤。',
    backHome: '回到首頁',
    browseProjects: '瀏覽作品',
  },
  footer: {
    builtWith: '以 Vue 3、TypeScript 與 Vite 打造',
  },
} satisfies Messages

const en = {
  nav: {
    label: 'Primary',
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    github: 'GitHub',
    menu: 'Menu',
    switchLanguage: 'Switch language',
  },
  common: {
    skipToContent: 'Skip to content',
    opensInNewTab: 'opens in a new tab',
    viewProjects: 'View Projects',
    labelSeparator: ': ',
  },
  home: {
    focusLabel: 'Focus areas',
    featuredTitle: 'Featured Projects',
    featuredDescription: 'Projects I have built, each with a full case study.',
    viewAllProjects: 'View all projects',
    skillsTitle: 'Skills',
    skillsDescription: 'Main technologies, grouped by area.',
    aboutTitle: 'About',
    viewAbout: 'View About',
  },
  project: {
    viewCaseStudy: 'View Case Study',
    techStack: 'Tech stack',
  },
  caseStudy: {
    allProjects: 'All projects',
    highlights: 'Key features',
    challenge: 'Challenge',
    solution: 'Solution',
    pagerLabel: 'More projects',
    previous: 'Previous project',
    next: 'Next project',
    sections: {
      overview: 'Overview',
      role: 'My Role',
      problem: 'Problem',
      architecture: 'Architecture / Flow',
      solution: 'Solution',
      challenges: 'Technical Challenges',
      techStack: 'Tech Stack',
      results: 'Result',
      learnings: 'What I Learned',
    },
  },
  pages: {
    projectsTitle: 'Projects',
    projectsDescription:
      'Projects I have worked on, each with its background, my role, the architecture and the technical challenges.',
    aboutTitle: 'About',
  },
  about: {
    description: 'Background, experience and strengths.',
    experienceTitle: 'Experience',
    strengthsTitle: 'Strengths',
    contactTitle: 'Contact',
    contactDescription: 'See more of my code on GitHub.',
    email: 'Email',
  },
  notFound: {
    title: 'Page not found',
    description: 'This page does not exist. It may have moved, or the address may be mistyped.',
    backHome: 'Back to Home',
    browseProjects: 'Browse Projects',
  },
  footer: {
    builtWith: 'Built with Vue 3, TypeScript and Vite',
  },
} satisfies Messages

export const MESSAGES: Localized<Messages> = { 'zh-TW': zhTW, en }
