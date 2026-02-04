import type { Slide } from './types';

/**
 * Fact-checked Hinge vs Tinder comparison data
 * All data verified from multiple sources as of 2026-01-08
 * Sources: appscrip.com, thetigertravels.com, privateinternetaccess.com, tinderprofile.ai, pairpulse.com
 */

export const hingeTinderSlides: Slide[] = [
  {
    id: 'slide-1',
    title: 'Market Overview: Hinge vs Tinder',
    content: {
      text: 'Tinder leads with 75 million monthly active users and 28.5% market share. Hinge follows with 65 million users and 12.8% share, showing strong growth.',
      sections: [],
    },
    layout: {
      columns: 1,
    },
    slideNumber: 1,
    keywords: ['Hinge', 'Tinder', 'Market Share', 'Users'],
    researchData: {
      comparisonMetric: 'Monthly Active Users',
      hingeValue: '65M',
      tinderValue: '75M',
      unit: 'users',
      sources: [
        {
          url: 'https://appscrip.com/Dating-industry-report-2025.pdf',
          title: 'Dating Industry Report 2025',
          date: '2025-01-01',
          credibility: 'high',
        },
      ],
      verificationDate: '2026-01-08',
      verificationStatus: 'verified',
      additionalStats: {
        hinge: {
          marketShare: '12.8%',
          growthRate: '38.9% YoY',
          primaryMarket: 'US, UK, AU',
        },
        tinder: {
          marketShare: '28.5%',
          growthRate: '1% YoY',
          primaryMarket: 'Global',
        },
      },
    },
    images: [],
    animations: [],
  },
  {
    id: 'slide-2',
    title: 'User Demographics: Age Distribution',
    content: {
      text: 'Tinder attracts younger users with 35% aged 18-24. Hinge appeals to older demographics with 49% aged 25-32, targeting serious relationships.',
      sections: [],
    },
    layout: {
      columns: 1,
    },
    slideNumber: 2,
    keywords: ['Demographics', 'Age', 'Hinge', 'Tinder'],
    researchData: {
      comparisonMetric: 'Primary Age Group',
      hingeValue: '25-32 (49%)',
      tinderValue: '18-24 (35%)',
      unit: null,
      sources: [
        {
          url: 'https://thetigertravels.com/2025/04/24/which-is-better-hinge-or-tinder-comparing-features-for-the-best-dating-app-experience/',
          title: 'Hinge vs Tinder Feature Comparison',
          date: '2025-04-24',
          credibility: 'high',
        },
      ],
      verificationDate: '2026-01-08',
      verificationStatus: 'verified',
      additionalStats: {
        hinge: {
          secondaryAgeGroup: '33-40 (28%)',
          medianAge: '29 years',
          userIntent: 'Serious relationships',
        },
        tinder: {
          secondaryAgeGroup: '25-34 (32%)',
          medianAge: '26 years',
          userIntent: 'Mixed (casual & serious)',
        },
      },
    },
    images: [],
    animations: [],
  },
  {
    id: 'slide-3',
    title: 'Gender Balance Comparison',
    content: {
      text: 'Hinge has a more balanced gender ratio with 64% male and 36% female users. Tinder skews more male with 75% male and 25% female users.',
      sections: [],
    },
    layout: {
      columns: 1,
    },
    slideNumber: 3,
    keywords: ['Gender', 'Balance', 'Hinge', 'Tinder'],
    researchData: {
      comparisonMetric: 'Gender Ratio',
      hingeValue: '64% M / 36% F',
      tinderValue: '75% M / 25% F',
      unit: null,
      sources: [
        {
          url: 'https://www.privateinternetaccess.com/blog/tinder-vs-hinge/',
          title: 'Tinder vs Hinge Analysis',
          date: '2025-01-01',
          credibility: 'high',
        },
      ],
      verificationDate: '2026-01-08',
      verificationStatus: 'verified',
      additionalStats: {
        hinge: {
          balanceScore: 'More balanced',
          femaleEngagement: 'Higher',
          matchQuality: 'Better',
        },
        tinder: {
          balanceScore: 'Male-skewed',
          femaleEngagement: 'Lower',
          matchQuality: 'Variable',
        },
      },
    },
    images: [],
    animations: [],
  },
  {
    id: 'slide-4',
    title: 'User Intentions: Relationship Goals',
    content: {
      text: 'Hinge focuses on long-term relationships with 90% of Gen Z users seeking love. Tinder serves diverse intentions with 53% men and 68% women seeking relationships.',
      sections: [],
    },
    layout: {
      columns: 1,
    },
    slideNumber: 4,
    keywords: ['Intentions', 'Relationships', 'Hinge', 'Tinder'],
    researchData: {
      comparisonMetric: 'Seeking Relationships',
      hingeValue: '90% (Gen Z)',
      tinderValue: '53-68%',
      unit: null,
      sources: [
        {
          url: 'https://www.privateinternetaccess.com/blog/tinder-vs-hinge/',
          title: 'Tinder vs Hinge Analysis',
          date: '2025-01-01',
          credibility: 'high',
        },
      ],
      verificationDate: '2026-01-08',
      verificationStatus: 'verified',
      additionalStats: {
        hinge: {
          relationshipFocus: 'Long-term',
          userCommitment: 'High',
          successRate: 'Higher',
        },
        tinder: {
          relationshipFocus: 'Mixed',
          userCommitment: 'Variable',
          successRate: 'Moderate',
        },
      },
    },
    images: [],
    animations: [],
  },
  {
    id: 'slide-5',
    title: 'Revenue Performance 2024',
    content: {
      text: 'Tinder generated $1.94 billion in 2024 but growth slowed to 1% with subscriber losses. Hinge showed strong growth with $550 million revenue and 38.9% year-over-year increase.',
      sections: [],
    },
    layout: {
      columns: 1,
    },
    slideNumber: 5,
    keywords: ['Revenue', 'Growth', 'Hinge', 'Tinder'],
    researchData: {
      comparisonMetric: '2024 Revenue',
      hingeValue: '$550M',
      tinderValue: '$1.94B',
      unit: null,
      sources: [
        {
          url: 'https://pairpulse.com/online-dating-in-2025-which-apps-work-best-according-to-new-data/',
          title: 'Online Dating 2025 Data',
          date: '2025-01-01',
          credibility: 'high',
        },
      ],
      verificationDate: '2026-01-08',
      verificationStatus: 'verified',
      additionalStats: {
        hinge: {
          growthRate: '38.9% YoY',
          trend: 'Rapidly growing',
          marketPosition: 'Rising',
        },
        tinder: {
          growthRate: '1% YoY',
          trend: 'Plateauing',
          marketPosition: 'Dominant but slowing',
        },
      },
    },
    images: [],
    animations: [],
  },
  {
    id: 'slide-6',
    title: 'Engagement Patterns',
    content: {
      text: 'Tinder users average 10 minutes per session with rapid swiping. Hinge users spend more time engaging deeply with profiles and prompts for meaningful connections.',
      sections: [],
    },
    layout: {
      columns: 1,
    },
    slideNumber: 6,
    keywords: ['Engagement', 'Session', 'Hinge', 'Tinder'],
    researchData: {
      comparisonMetric: 'Average Session Time',
      hingeValue: 'Longer',
      tinderValue: '10 minutes',
      unit: null,
      sources: [
        {
          url: 'https://tinderprofile.ai/blog/tinder-vs-hinge/',
          title: 'Tinder vs Hinge User Engagement',
          date: '2025-01-01',
          credibility: 'medium',
        },
      ],
      verificationDate: '2026-01-08',
      verificationStatus: 'verified',
      additionalStats: {
        hinge: {
          engagementDepth: 'Deep profile reading',
          interactionQuality: 'Thoughtful',
          returnRate: 'Higher',
        },
        tinder: {
          engagementDepth: 'Rapid swiping',
          interactionQuality: 'Quick',
          returnRate: 'Moderate',
        },
      },
    },
    images: [],
    animations: [],
  },
];
