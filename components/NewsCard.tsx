import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    // Ensure we're passing a string ID that can be properly serialized
    const encodedId = encodeURIComponent(String(article.id));
    router.push(`/article/${encodedId}`);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {article.image ? (
        <Image 
          source={{ uri: article.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{article.title || 'Untitled'}</Text>
        <Text style={styles.description} numberOfLines={2}>{article.description || 'No description available'}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source?.name || 'Unknown'}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  image: {
    height: 180,
    width: '100%',
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
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  description: {
    fontSize: 14,
    color: '#3A3A3C',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  source: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#8E8E93',
  },
});