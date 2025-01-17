import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

const Artikel = ({ route, navigation }) => {
  const { category } = route.params; // Get category from the navigation params
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles based on selected category
  useEffect(() => {
    const fetchArticles = async () => {
      const apiUrl = `https://newsapi.org/v2/everything?q=${category}&apiKey=b926fa57e0d942da8ec05457e3737139`;
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        const result = await response.json();
        const filteredArticles = result.articles.filter(
          (article) => article.title && article.description && article.urlToImage
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  // Render each article item
  const renderArticleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => navigation.navigate('ArticleDetail', { article: item })} // Navigate to detailed article
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }}
          style={styles.articleImage}
        />
        <Text style={styles.articleTitle}>{item.title}</Text>
      </View>
      <Text style={styles.articleDescription}>{item.description}</Text>
      
      {/* "Read More" button that navigates to detailed view */}
      <TouchableOpacity 
        style={styles.readMoreButton}
        onPress={() => navigation.navigate('ArticleDetail', { article: item })}
      >
        <Text style={styles.readMoreText}>Baca Selengkapnya</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/img/arrow_back.png')} // Path ke gambar ikon "Back"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Artikel <Text style={styles.categoryName}>{category}</Text>
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00A900" />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#191F33', // Dark color for professionalism
    borderRadius: 10,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: '#fff', // Background putih untuk tombol back
    borderRadius: 12, // Membuat tombol terlihat lebih rounded
    alignItems: 'center',
    justifyContent: 'center',
    width: 30, // Lebar tombol back
    height: 30, // Tinggi tombol back
  },
  backIcon: {
    width: 20, // Lebar ikon back
    height: 20, // Tinggi ikon back
    resizeMode: 'contain', // Supaya ikon tetap proporsional
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500', // Bold font for the title
    color: '#FFFFFF', // White text for contrast
    letterSpacing: 1.5,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFD700', // Gold color for category name for elegance
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  articleContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191F33',
    marginTop: 10,
  },
  articleDescription: {
    fontSize: 14,
    color: '#767E94',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  readMoreButton: {
    backgroundColor: '#009990',
    paddingVertical: 8,
    margin: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Artikel;
