import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigationState, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Tambahkan jika menggunakan vector icons

const Footer = () => {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );

  const isHomeFocused = currentRouteName === 'Home';
  const isMenuFocused = currentRouteName === 'Menu';
  const isProfileFocused = currentRouteName === 'Profile';

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        {/* Jika menggunakan gambar */}
        <Image
          source={require('./assets/img/footer/home.png')} // Ganti dengan path ke gambar Anda
          style={[
            styles.icon,
            isHomeFocused ? styles.iconActive : styles.iconInactive,
          ]}
        />
        {/* Jika menggunakan vector icons */}
        {/* <Icon
          name="home"
          size={24}
          color={isHomeFocused ? '#00A900' : '#B6FFA1'}
        /> */}
        <Text style={isHomeFocused ? styles.textActive : styles.textInactive}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}>
        <Image
          source={require('./assets/img/footer/menu.png')} // Ganti dengan path ke gambar Anda
          style={[
            styles.icon,
            isMenuFocused ? styles.iconActive : styles.iconInactive,
          ]}
        />
        {/* Jika menggunakan vector icons */}
        {/* <Icon
          name="bars"
          size={24}
          color={isMenuFocused ? '#00A900' : '#B6FFA1'}
        /> */}
        <Text style={isMenuFocused ? styles.textActive : styles.textInactive}>
          Menu
        </Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('./assets/img/footer/profile.png')} // Ganti dengan path ke gambar Anda
          style={[
            styles.icon,
            isProfileFocused ? styles.iconActive : styles.iconInactive,
          ]}
        />
        {/* Jika menggunakan vector icons */}
        {/* <Icon
          name="user"
          size={24}
          color={isProfileFocused ? '#00A900' : '#73EC8B'}
        /> */}
        <Text
          style={isProfileFocused ? styles.textActive : styles.textInactive}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconInactive: {
    tintColor: '#73EC8B', // Warna ikon tidak aktif
  },
  iconActive: {
    tintColor: '#00A900', // Warna ikon aktif
  },
  textInactive: {
    color: '#73EC8B',
    fontSize: 12,
    marginTop: 4,
  },
  textActive: {
    color: '#00A900',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Footer;
