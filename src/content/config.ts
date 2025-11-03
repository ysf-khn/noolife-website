import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('NooLife Team'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const habits = defineCollection({
  type: 'data',
  schema: z.object({
    habitName: z.string(),
    habitSlug: z.string(),
    category: z.enum(['core', 'optional']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    typicalDaysToAutomate: z.string(),
    shortDescription: z.string(),
    scientificBenefits: z.array(z.string()),
    researchCitations: z.array(z.object({
      study: z.string(),
      finding: z.string(),
      link: z.string().url().optional()
    })),
    relatedHabits: z.array(z.string()),
    commonBarriers: z.array(z.string()),
    progressionPlan: z.string(),
    nooLifeFeatureHighlight: z.string(),
    testimonial: z.string().optional(),
    ctaAngle: z.string(),
    heroImage: z.string().url(),
    tags: z.array(z.string()),
    metaKeywords: z.array(z.string())
  })
});

const challenges = defineCollection({
  type: 'data',
  schema: z.object({
    challengeName: z.string(),
    challengeSlug: z.string(),
    duration: z.number(),
    goal: z.string(),
    goalSlug: z.string(),
    includedHabits: z.array(z.string()),
    targetAudience: z.string(),
    scientificRationale: z.string(),
    weekByWeekBreakdown: z.array(z.object({
      week: z.number(),
      focus: z.string(),
      expectedDifficulty: z.string()
    })),
    successMetrics: z.string(),
    commonPitfalls: z.array(z.string()),
    nooLifeFeatureHighlight: z.string(),
    heroImage: z.string().url(),
    tags: z.array(z.string()),
    metaKeywords: z.array(z.string()),
    ctaAngle: z.string(),
    testimonial: z.string().optional(),
    phaseBreakdowns: z.array(z.object({
      phase: z.number(),
      phaseLabel: z.string(),
      dayRange: z.string(),
      phaseGoal: z.string(),
      keyMilestones: z.array(z.string()),
      expectedProgress: z.string()
    })).optional(),
    transformationMetrics: z.array(z.object({
      metric: z.string(),
      baseline: z.string(),
      expected: z.string()
    })).optional(),
    customizationOptions: z.array(z.object({
      area: z.string(),
      options: z.array(z.string())
    })).optional(),
    challengeFAQs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  })
});

const winterArc = defineCollection({
  type: 'data',
  schema: z.object({
    challengeName: z.string(),
    challengeSlug: z.string(),
    duration: z.number(),
    focus: z.string(),
    focusSlug: z.string(),
    winterArcDefinition: z.string(),
    whyWinterWorks: z.string(),
    coreHabits: z.array(z.string()),
    targetAudience: z.string(),
    scientificRationale: z.string(),
    weekByWeekBreakdown: z.array(z.object({
      week: z.number(),
      focus: z.string(),
      expectedDifficulty: z.string()
    })),
    expectedTransformation: z.string(),
    commonExcuses: z.array(z.string()),
    excuseRebuttals: z.array(z.string()),
    winterArcTimeline: z.string(),
    commonPitfalls: z.array(z.string()),
    nooLifeIntegration: z.string(),
    heroImage: z.string().url(),
    tags: z.array(z.string()),
    metaKeywords: z.array(z.string()),
    ctaAngle: z.string(),
    testimonial: z.string().optional()
  })
});

const solutions = defineCollection({
  type: 'data',
  schema: z.object({
    problem: z.string(),
    problemSlug: z.string(),
    commonSymptoms: z.array(z.string()),
    rootCauses: z.array(z.string()),
    scientificExplanation: z.string(),
    failedSolutions: z.array(z.string()),
    whyTheyFail: z.string(),
    actualSolution: z.string(),
    nooLifeApproach: z.string(),
    expectedTimeline: z.string(),
    weekBreakdown: z.array(z.object({
      week: z.number(),
      focus: z.string(),
      expectedProgress: z.string()
    })).optional(),
    relatedHabits: z.array(z.string()),
    relatedChallenges: z.array(z.string()),
    relatedProblems: z.array(z.string()).optional(),
    testimonial: z.string().optional(),
    ctaAngle: z.string(),
    trustSignal: z.string().optional(),
    heroImage: z.string().url(),
    tags: z.array(z.string()),
    metaKeywords: z.array(z.string()),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    }))
  })
});

const habitCombinations = defineCollection({
  type: 'data',
  schema: z.object({
    combinationName: z.string(),
    combinationSlug: z.string(),
    habit1Slug: z.string(),
    habit2Slug: z.string(),
    habit1Name: z.string(),
    habit2Name: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    searchVolume: z.number(),
    competitionLevel: z.enum(['low', 'medium', 'high']),
    tier: z.enum(['tier1', 'tier2', 'tier3', 'tier4']),
    shortDescription: z.string(),
    synergyScience: z.object({
      headline: z.string(),
      explanation: z.string(),
      researchCitations: z.array(z.object({
        study: z.string(),
        finding: z.string(),
        link: z.string().url().optional()
      })),
      neuroscience: z.string().optional()
    }),
    stackingProtocol: z.object({
      timing: z.string(),
      order: z.string(),
      bestPractice: z.string()
    }),
    combinedBenefits: z.array(z.object({
      benefit: z.string(),
      explanation: z.string(),
      uniqueToCombination: z.boolean()
    })),
    progressionPlan: z.object({
      overview: z.string(),
      weeklyBreakdown: z.array(z.object({
        weekRange: z.string(),
        habit1Focus: z.string(),
        habit2Focus: z.string(),
        combinedGoal: z.string()
      }))
    }),
    commonMistakes: z.array(z.string()),
    nooLifeIntegration: z.string(),
    relatedCombinations: z.array(z.string()),
    relatedChallenges: z.array(z.string()),
    ctaAngle: z.string(),
    testimonial: z.string().optional(),
    heroImage: z.string().url(),
    tags: z.array(z.string()),
    metaKeywords: z.array(z.string()),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    }))
  })
});

const demographics = defineCollection({
  type: 'data',
  schema: z.object({
    demographicName: z.string(),
    demographicSlug: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    searchVolume: z.number(),
    competitionLevel: z.enum(['low', 'medium', 'high']),
    tier: z.enum(['tier1', 'tier2', 'tier3']),
    shortDescription: z.string(),

    // Pain points & solutions
    keyPainPoints: z.array(z.string()),
    nooLifeSolutions: z.array(z.object({
      habitSlug: z.string(),
      habitName: z.string(),
      whyRelevant: z.string()
    })),

    // Demographics & psychographics
    targetAudience: z.object({
      ageRange: z.string(),
      psychographics: z.array(z.string()),
      painPointIntensity: z.enum(['high', 'very-high']),
      conversionLikelihood: z.enum(['medium', 'medium-high', 'high', 'very-high'])
    }),

    // Featured habits (prioritized for this demographic)
    featuredHabits: z.array(z.object({
      habitSlug: z.string(),
      habitName: z.string(),
      demographicRelevance: z.string(),
      expectedImpact: z.string()
    })),

    // Rating appeals
    ratingAppeals: z.array(z.object({
      ratingType: z.enum(['overall', 'discipline', 'strength', 'wisdom', 'focus', 'confidence']),
      demographicAngle: z.string()
    })),

    // Social proof
    socialProof: z.object({
      testimonial: z.string().optional(),
      statistic: z.string(),
      userCount: z.string().optional()
    }),

    // Related content
    relatedHabits: z.array(z.string()),
    relatedChallenges: z.array(z.string()),
    relatedSolutions: z.array(z.string()),

    // SEO
    heroImage: z.string().url(),
    tags: z.array(z.string()),
    metaKeywords: z.array(z.string()),
    ctaAngle: z.string(),

    // FAQ
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    }))
  })
});

export const collections = { blog, habits, challenges, 'winter-arc': winterArc, solutions, 'habit-combinations': habitCombinations, demographics };
