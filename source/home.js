import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Footer from './footer'; // Pastikan Footer sudah didefinisikan

const Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeNewsSlide, setActiveNewsSlide] = useState(0);
  const [activeCategorySlide, setActiveCategorySlide] = useState(0);

  // Fetch news data from API
  const fetchNewsData = async () => {
    const apiUrl = `https://newsapi.org/v2/everything?q=football&apiKey=c8ad3119322e4eee947cb275f397157c`;

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const result = await response.json();
      const filteredArticles = result.articles.filter(
        article => article.title && article.description && article.urlToImage,
      );
      setNews(filteredArticles);

      const leagueCategories = [
        {
          id: '1',
          name: 'Premier League',
          logo: require('../source/assets/img/category/premier.png'),
        },
        {
          id: '2',
          name: 'La Liga',
          logo: require('../source/assets/img/category/Laliga.png'),
        },
        {
          id: '3',
          name: 'Serie A',
          logo: require('../source/assets/img/category/seri-A.png'),
        },
        {
          id: '4',
          name: 'Bundesliga',
          logo: require('../source/assets/img/category/bundesliga.png'),
        },
        {
          id: '5',
          name: 'Ligue 1',
          logo: require('../source/assets/img/category/ligue-1.png'),
        },
      ];
      setCategories(leagueCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  // Fungsi untuk menangani perubahan slide berita
  const handleNewsScroll = event => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== activeNewsSlide) {
      setActiveNewsSlide(slide);
    }
  };

  // Fungsi untuk menangani perubahan slide kategori
  const handleCategoryScroll = event => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== activeCategorySlide) {
      setActiveCategorySlide(slide);
    }
  };

  // Optimized ArticleItem Component
  const ArticleItem = React.memo(({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.articleContainer}>
      <Image
        source={{
          uri: item.urlToImage || 'https://via.placeholder.com/150',
        }}
        style={styles.articleImage}
      />
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <View style={styles.readMoreContainer}>
        <Text style={styles.readMoreText}>Baca Selengkapnya</Text>
      </View>
    </TouchableOpacity>
  ));

  // Render Header
  const renderHeader = () => (
    <View>
      {/* Full-width logo at the top */}
      <Image
        source={require('../source/assets/img/logo/logo.png')}
        style={styles.fullWidthLogo}
      />

      {/* Slider untuk Foto Berita */}
      {loading ? (
        <ActivityIndicator size="large" color="#00A900" />
      ) : (
        <>
          <FlatList
            data={news.slice(0, 5)} // Ambil 5 berita pertama untuk slider
            horizontal
            pagingEnabled
            onScroll={handleNewsScroll}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {} /* Arahkan ke detail berita */}
                style={styles.sliderItem}>
                <Image
                  source={{
                    uri: item.urlToImage || 'https://via.placeholder.com/300',
                  }}
                  style={styles.sliderImage}
                />
                <Text style={styles.sliderTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            style={styles.sliderContainer}
          />
          <View style={styles.indicatorContainer}>
            {news.slice(0, 5).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  activeNewsSlide === index ? styles.activeIndicator : null,
                ]}
              />
            ))}
          </View>
        </>
      )}

      {/* Informasi Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Aplikasi Berita Bola</Text>
        <Text style={styles.descriptionText}>
          Aplikasi ini dirancang untuk para pecinta sepak bola yang ingin
          mendapatkan informasi terkini dan terpercaya seputar dunia sepak bola.
        </Text>
      </View>

      {/* Slider untuk Kategori Liga */}
      <Text style={styles.subTitle}>Kategori Liga</Text>
      <FlatList
        data={categories}
        horizontal
        pagingEnabled
        onScroll={handleCategoryScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Artikel', { category: item.name })
            }
            style={styles.categoryCard}>
            <View style={styles.categoryIconContainer}>
              <Image source={item.logo} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        style={styles.categoryList}
      />
      <View style={styles.indicatorContainer}>
        {categories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeCategorySlide === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
      <Text style={styles.subTitle}>Berita Terkini</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ArticleItem
            item={item}
            onPress={() => {} /* Navigate to detailed article */}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollViewContent}
        initialNumToRender={5} // Render awal 5 item
        maxToRenderPerBatch={10} // Batch maksimal 10 item
        windowSize={5} // Jendela render
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
      />

      {/* Footer fixed at the bottom */}
      <Footer style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    paddingBottom: 70, // Space for footer
  },
  fullWidthLogo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  sliderContainer: {
    marginVertical: 15,
  },
  sliderItem: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    width: 300,
  },
  sliderImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  sliderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191F33',
    padding: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004699',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#004699',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004699',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#009990',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    width: 120,
  },
  categoryIconContainer: {
    backgroundColor: '#d2f1df',
    padding: 12,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#00A900',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 14,
    color: '#191F33',
    fontWeight: 'bold',
  },
  articleContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191F33',
  },
  articleDescription: {
    fontSize: 14,
    color: '#767E94',
    marginTop: 5,
  },
  readMoreContainer: {
    backgroundColor: '#009990',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#d7fbb9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#191F33',
    padding: 20,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#009990',
  },
});

export default Home;
