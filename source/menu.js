import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Footer from './footer'; // Pastikan file footer.js ada
  
const Menu = ({navigation}) => {
  const [categories, setCategories] = useState([]); // State untuk menyimpan kategori
  const [loading, setLoading] = useState(true); // State untuk loading

  // Kategori statis untuk liga sepak bola dengan gambar dan deskripsi
  const leagueCategories = [
    {
      id: '1',
      name: 'Premier League',
      logo: require('../source/assets/img/category/premier.png'),
      description: 'Top-tier English football league.',
    },
    {
      id: '2',
      name: 'La Liga',
      logo: require('../source/assets/img/category/Laliga.png'),
      description: 'The pride of Spanish football.',
    },
    {
      id: '3',
      name: 'Serie A',
      logo: require('../source/assets/img/category/seri-A.png'),
      description: 'Elite Italian football league.',
    },
    {
      id: '4',
      name: 'Bundesliga',
      logo: require('../source/assets/img/category/bundesliga.png'),
      description: 'Premier German football league.',
    },
    {
      id: '5',
      name: 'Ligue 1',
      logo: require('../source/assets/img/category/ligue-1.png'),
      description: 'Top French football competition.',
    },
  ];

  useEffect(() => {
    // Simulasikan pengambilan data API
    console.log('League Categories:', leagueCategories);
    setCategories(leagueCategories);
    setLoading(false);
  }, []);

  const renderCategory = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('Artikel', {category: item.name})}
      style={styles.categoryContainer}>
      <Image source={item.logo} style={styles.categoryImage} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Berita Kategori</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00A900" />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Footer tetap ada di bawah */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004699',
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#d3f1df',
    borderRadius: 8,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191F33',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#22a49a',
  },
});

export default Menu;
