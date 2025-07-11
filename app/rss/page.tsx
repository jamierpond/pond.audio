import Parser from 'rss-parser';

const RSS_FEEDS = [
  { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { name: 'Reuters', url: 'https://www.reuters.com/rss' },
  { name: 'Associated Press', url: 'https://apnews.com/apf-topnews' },
  { name: 'Financial Times', url: 'https://www.ft.com/rss' },
  { name: 'Washington Post', url: 'https://feeds.washingtonpost.com/rss/world' },
  { name: 'NPR', url: 'https://feeds.npr.org/1001/rss.xml' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { name: 'Deutsche Welle', url: 'https://rss.dw.com/xml/rss-en-all' },
  { name: 'France24', url: 'https://www.france24.com/en/rss' },
  { name: 'The Economist', url: 'https://www.economist.com/rss' },
  { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' }
];

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  feedName: string;
  image?: string;
}

function extractImageFromContent(content: string): string | null {
  if (!content) return null;
  
  // Try multiple image extraction patterns
  const patterns = [
    /<img[^>]+src="([^">]+)"/i,
    /<img[^>]+src='([^'>]+)'/i,
    /src="([^"]+\.(jpg|jpeg|png|gif|webp)[^"]*)"/i,
    /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp)/i
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

async function fetchAllFeeds(): Promise<FeedItem[]> {
  const allItems: FeedItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parser = new Parser();
      const parsedFeed = await parser.parseURL(feed.url);
      
      const feedItems = parsedFeed.items.slice(0, 10).map(item => {
        // Try multiple sources for images
        let image = null;
        
        // Try enclosure first
        if (item.enclosure?.url) {
          image = item.enclosure.url;
        }
        
        // Try media content
        if (!image && item['media:content']) {
          image = item['media:content'].url;
        }
        
        // Try media thumbnail
        if (!image && item['media:thumbnail']) {
          image = item['media:thumbnail'].url;
        }
        
        // Try content extraction
        if (!image) {
          const content = item.content || item['content:encoded'] || item.description || '';
          image = extractImageFromContent(content);
        }
        
        // Try itunes:image
        if (!image && item['itunes:image']) {
          image = item['itunes:image'].href;
        }
        
        return {
          title: item.title || 'No title',
          link: item.link || '#',
          pubDate: item.pubDate || '',
          contentSnippet: item.contentSnippet,
          feedName: feed.name,
          image
        };
      });

      allItems.push(...feedItems);
    } catch (error) {
      console.error(`Error fetching feed ${feed.url}:`, error);
    }
  }

  return allItems.sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

export default async function RSSPage() {
  const allItems = await fetchAllFeeds();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Headlines</h1>
      
      <div className="space-y-6">
        {allItems.map((item, index) => (
          <article key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              {item.image && (
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {item.feedName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.pubDate).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="font-semibold text-lg mb-2 leading-tight">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </a>
                </h2>
                
                {item.contentSnippet && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.contentSnippet.substring(0, 500)}...
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}