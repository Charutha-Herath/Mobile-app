import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Linking, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react-native';
import { fetchNews } from '../../utils/api';
import { Article } from '../../types';

export default function ArticleDetailScreen() {
  const params = useLocalSearchParams();
  const id = params.id ? String(params.id) : '';
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setError('Invalid article ID');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // In a real app, we would fetch a single article by ID
        // For this demo, we'll fetch all articles and find the one we need
        const category = 'general'; // Default category
        const articles = await fetchNews(category);
        const decodedId = typeof id === 'string' ? decodeURIComponent(id) : '';
        const foundArticle = articles.find(a => a.id === decodedId);
        
        if (!foundArticle) {
          // Try other categories if not found
          const businessArticles = await fetchNews('business');
          const sportsArticles = await fetchNews('sports');
          
          const article = 
            businessArticles.find(a => a.id === decodedId) || 
            sportsArticles.find(a => a.id === decodedId);
            
          if (article) {
            setArticle(article);
          } else {
            setError('Article not found');
          }
        } else {
          setArticle(foundArticle);
        }
      } catch (err) {
        setError('Failed to load article details');
        console.error('Error loading article:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy • h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };

  const openArticleUrl = () => {
    if (article?.url) {
      Linking.openURL(article.url).catch(err => {
        console.error('Error opening URL:', err);
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !article) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Article not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {article.image ? (
        <Image 
          source={{ uri: article.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
        
        <Text style={styles.description}>{article.description}</Text>
        
        {article.content && (
          <Text style={styles.body}>{article.content}</Text>
        )}
        
        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={openArticleUrl}
          activeOpacity={0.7}
        >
          <Text style={styles.linkButtonText}>Read Full Article</Text>
          <ExternalLink size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  placeholderImage: {
    backgroundColor: '#E1E1E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
    lineHeight: 32,
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  source: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#8E8E93',
  },
  description: {
    fontSize: 16,
    color: '#3A3A3C',
    marginBottom: 20,
    lineHeight: 24,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    color: '#3A3A3C',
    lineHeight: 24,
    marginBottom: 30,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});