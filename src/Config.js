export const config = {
  ws_url: process.env.ws_url,
  page: {
    eventi: {
      revalidate: 3600,
    },
    index: {
      revalidate: 3600,
      max_news_per_homepage: 4,
    },
    leNostreCronache: {
      revalidate: 3600,
    },
    news: {
      revalidate: 1800,
      max_news_per_page: 4,
    },
    news_tags: {
      revalidate: 1800,
      max_news_per_page: 4,
    },
    news_author: {
      revalidate: 1800,
      max_news_per_page: 4,
    },
    news_news: {
      revalidate: 1800,
    },
  }
};
