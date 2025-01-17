import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ArticleDetail = ({ route, navigation }) => {
  const { article } = route.params; // Get article data from route parameters

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/img/arrow_back.png')} // Path ke gambar ikon back
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article Detail</Text>
      </View>

      {/* Main Content */}
      <ScrollView>
        {/* Header Image */}
        <Image
          source={{ uri: article.urlToImage || 'https://via.placeholder.com/200' }}
          style={styles.articleImage}
        />

        {/* Article Content */}
        <View style={styles.content}>
          {/* Category */}
          <Text style={styles.categoryText}>{article.category ? article.category : 'No Category'}</Text>

          {/* Title */}
          <Text style={styles.title}>{article.title}</Text>

          {/* Description */}
          {article.description && (
            <Text style={styles.description}>
              {article.description}
            </Text>
          )}

          {/* Article Body */}
          <Text style={styles.body}>
            {article.content
              ? article.content.replace(/\[\+\d+ chars\]/, '') // Remove unwanted characters if any
              : 'No additional content available.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9', // Light gray background for the content
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: '#fff', // Background putih untuk tombol back
    borderRadius: 12, // Membuat tombol terlihat lebih rounded
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, // Lebar tombol back
    height: 40, // Tinggi tombol back
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001c6e',
  },
  articleImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // To make it stick to the image
  },
  categoryText: {
    fontSize: 16,
    color: '#169e96', // Green color for category
    marginBottom: 8,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#001c6e', // Dark text for title
    marginBottom: 12,
    lineHeight: 34, // Line height for better readability
  },
  description: {
    fontSize: 18,
    color: '#0c4f9e',
    marginBottom: 16,
    textAlign: 'justify',
    fontStyle: 'italic', // Italic for description
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0c4f9e',
    textAlign: 'justify', // Justified for neat text alignment
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    fontSize: 18,
    color: '#ff6347', // Red color for errors
    fontWeight: 'bold',
  },
});

export default ArticleDetail;
