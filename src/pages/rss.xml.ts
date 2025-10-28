import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft === false && data.pubDate <= now;
  });

  // Sort by date, newest first
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'NooLife Blog',
    description: 'Science-backed insights on habit formation, Winter Arc transformations, and building a better life through 66-day habit tracking.',
    site: context.site || 'https://noolife.app',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
};
