import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeArticles() {
  const sources = [
    {
      url: 'https://www.psychologytoday.com/us/blog',
      selector: '.views-row',
      titleSelector: '.field-title a',
      linkSelector: '.field-title a',
      moodMatch: 'Neutral'
    },
    {
      url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/',
      selector: '.listing-item',
      titleSelector: '.listing-item__title',
      linkSelector: 'a',
      moodMatch: 'Negative'
    }
  ];

  const articles = [];

  for (const source of sources) {
    try {
      const { data } = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(data);

      $(source.selector).each((i, elem) => {
        if (i < 5) { // Limit to 5 per source
          const title = $(elem).find(source.titleSelector).text().trim();
          let link = $(elem).find(source.linkSelector).attr('href');
          
          if (link && !link.startsWith('http')) {
            link = new URL(link, source.url).href;
          }

          if (title && link) {
            articles.push({
              title,
              url: link,
              type: 'article',
              moodMatch: source.moodMatch,
              source: new URL(source.url).hostname,
              tags: []
            });
          }
        }
      });
    } catch (error) {
      console.error(`Error scraping ${source.url}:`, error.message);
    }
  }

  return articles;
}
