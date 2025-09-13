import { getUniqueArticles } from "./articleData";

// Get unique articles from the comprehensive article data
export const fakeArticles = getUniqueArticles().map((article) => ({
  id: article.id,
  title: article.title,
  authors: article.authors,
  abstract: article.abstract,
  keywords: article.keywords,

  publicationDate: article.publicationDate,
  journal: article.journal,
  volume: article.volume,
  pages: article.pages,
  doi: article.doi,
  citations: article.citations,
  downloads: article.downloads,
}));
  