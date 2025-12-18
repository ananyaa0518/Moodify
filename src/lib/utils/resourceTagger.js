/**
 * Resource Tagger
 * Tags and categorizes resources based on content and mood relevance
 */

export class ResourceTagger {
  // Resource categories
  static categories = {
    meditation: "Mindfulness & Meditation",
    exercise: "Physical Activity & Exercise",
    therapy: "Therapy & Counseling",
    inspiration: "Inspiration & Motivation",
    education: "Education & Learning",
    community: "Community & Connection",
    hobby: "Hobbies & Interests",
    other: "Other Resources",
  };

  // Keywords for auto-tagging
  static categoryKeywords = {
    meditation: [
      "meditation",
      "mindfulness",
      "breathing",
      "yoga",
      "calm",
      "relaxation",
    ],
    exercise: [
      "exercise",
      "fitness",
      "workout",
      "run",
      "walk",
      "sports",
      "active",
    ],
    therapy: [
      "therapy",
      "counseling",
      "therapist",
      "mental health",
      "psychology",
      "treatment",
    ],
    inspiration: [
      "inspire",
      "motivation",
      "encourage",
      "success",
      "goal",
      "achieve",
      "story",
    ],
    education: [
      "learn",
      "education",
      "guide",
      "tutorial",
      "course",
      "class",
      "training",
    ],
    community: [
      "community",
      "support",
      "group",
      "connect",
      "social",
      "forum",
      "together",
    ],
    hobby: ["hobby", "interest", "craft", "art", "music", "creative", "fun"],
  };

  // Mood-category affinity matrix
  static moodCategoryAffinity = {
    happy: { inspiration: 0.9, hobby: 0.8, community: 0.7, exercise: 0.6 },
    sad: { therapy: 0.9, meditation: 0.8, community: 0.8, inspiration: 0.6 },
    anxious: { meditation: 0.9, therapy: 0.85, exercise: 0.7, education: 0.6 },
    angry: { exercise: 0.9, meditation: 0.8, hobby: 0.7, community: 0.6 },
    overwhelmed: {
      meditation: 0.9,
      exercise: 0.8,
      therapy: 0.8,
      education: 0.5,
    },
    lonely: { community: 0.95, hobby: 0.7, inspiration: 0.6, exercise: 0.5 },
    hopeful: { inspiration: 0.9, education: 0.7, community: 0.7, hobby: 0.6 },
    confused: { education: 0.9, therapy: 0.7, community: 0.6 },
  };

  /**
   * Auto-tag resource based on content
   */
  static autoTag(resourceData) {
    const { title, description, content } = resourceData;
    const text = `${title} ${description} ${content}`.toLowerCase();

    const tags = [];
    const scores = {};

    // Score each category
    for (const [category, keywords] of Object.entries(this.categoryKeywords)) {
      let score = 0;
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        score += (text.match(regex) || []).length;
      }
      scores[category] = score;
    }

    // Get top 2 categories
    const sortedCategories = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .filter(([, score]) => score > 0);

    return sortedCategories.map(([category]) => category);
  }

  /**
   * Get recommended category for mood
   */
  static getRecommendedCategory(mood) {
    const affinities = this.moodCategoryAffinity[mood];
    if (!affinities) return "community"; // default

    // Return category with highest affinity
    return Object.entries(affinities).sort(([, a], [, b]) => b - a)[0][0];
  }

  /**
   * Get affinity score between mood and category
   */
  static getMoodCategoryAffinity(mood, category) {
    return this.moodCategoryAffinity[mood]?.[category] || 0.5;
  }

  /**
   * Score resource relevance to mood
   */
  static scoreResourceRelevance(resource, mood) {
    let score = 0;

    // Mood tag match (highest priority)
    if (resource.moodTags && resource.moodTags.includes(mood)) {
      score += 0.5;
    }

    // Category affinity
    if (resource.category) {
      const affinity = this.getMoodCategoryAffinity(mood, resource.category);
      score += affinity * 0.4;
    }

    // User rating/helpfulness
    if (resource.helpfulCount && resource.unhelpfulCount) {
      const helpfulRatio =
        resource.helpfulCount /
        (resource.helpfulCount + resource.unhelpfulCount);
      score += helpfulRatio * 0.1;
    }

    return Math.min(score, 1); // Cap at 1.0
  }

  /**
   * Filter and rank resources for mood
   */
  static rankResourcesForMood(resources, mood) {
    return resources
      .map((resource) => ({
        ...resource,
        relevanceScore: this.scoreResourceRelevance(resource, mood),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Batch tag multiple resources
   */
  static batchTag(resourceArray) {
    return resourceArray.map((resource) => ({
      ...resource,
      categories: this.autoTag(resource),
    }));
  }

  /**
   * Get category description
   */
  static getCategoryDescription(category) {
    return this.categories[category] || "Resources";
  }

  /**
   * Validate resource has required tags
   */
  static validateResourceTags(resource) {
    return {
      hasMoodTags: resource.moodTags && resource.moodTags.length > 0,
      hasCategory: !!resource.category,
      isValid: !!(resource.moodTags?.length > 0 && resource.category),
    };
  }
}
