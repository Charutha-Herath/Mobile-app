import axios from 'axios';
import { Article } from '../types';

const API_KEY = 'f9419a132bbe47d290641102b5e5b7db';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category: string): Promise<Article[]> => {
  try {
    // For the 'everything' endpoint, we need to use 'q' parameter instead of 'category'
    // For actual category filtering, we should use the '/top-headlines' endpoint
    let url;
    let params: Record<string, string> = { apiKey: API_KEY };

    if (category === 'general' || category === 'breaking') {
      // Use top-headlines for general news
      url = `${BASE_URL}/top-headlines`;
      params.country = 'us'; // You can change this to your preferred country
    } else {
      // Use everything endpoint with the category as a search term
      url = `${BASE_URL}/everything`;
      params.q = category;
      params.sortBy = 'publishedAt';

      // Add date range (last 30 days)
      const date = new Date();
      date.setDate(date.getDate() - 30);
      params.from = date.toISOString().split('T')[0];
    }

    const response = await axios.get(url, { params });

    if (!response.data || !response.data.articles) {
      throw new Error('Invalid response format');
    }

    // Map the articles to ensure they match your Article type
    return response.data.articles.map((article: any, index: number) => ({
      id: article.url || `article-${index}`, // Use URL as ID or generate one
      title: article.title || '',
      description: article.description || '',
      content: article.content || '',
      url: article.url || '',
      image: article.urlToImage || '', // Note: News API uses urlToImage, not image
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        name: article.source?.name || 'Unknown',
        url: article.source?.url || '',
      },
      category: category,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Re-throw to handle in component
  }
};