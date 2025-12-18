export function matchResourcesToMood(sentimentScore, resources) {
  // sentimentScore: -1 to 1
  let moodCategory;
  
  if (sentimentScore >= 0.05) {
    moodCategory = 'Positive';
  } else if (sentimentScore <= -0.05) {
    moodCategory = 'Negative';
  } else {
    moodCategory = 'Neutral';
  }

  // Filter resources by mood match
  const matched = resources.filter(r => r.moodMatch === moodCategory);
  
  // Sort by upvotes
  return matched.sort((a, b) => b.upvotes - a.upvotes);
}

export function suggestTagsFromText(text) {
  const tagKeywords = {
    anxiety: ['anxious', 'worry', 'panic', 'nervous', 'fear'],
    depression: ['sad', 'depressed', 'hopeless', 'empty', 'numb'],
    stress: ['stress', 'overwhelm', 'pressure', 'burden', 'tired'],
    sleep: ['insomnia', 'sleep', 'tired', 'fatigue', 'rest'],
    relationships: ['lonely', 'alone', 'relationship', 'breakup', 'family']
  };

  const lowerText = text.toLowerCase();
  const suggestedTags = [];

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      suggestedTags.push(tag);
    }
  }

  return suggestedTags.length > 0 ? suggestedTags : ['general'];
}
