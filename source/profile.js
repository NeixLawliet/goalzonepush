import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Footer from './footer';

const Profile = () => {
  const profiles = [
    {
      name: 'Moch Anwar Cahyana',
      role: 'Specialist Coding',
      image: require('../source/assets/profileimg/Image1.jpeg'),
    },
    {
      name: 'Aldi Muhamad Nurahman',
      role: 'Design',
      image: require('../source/assets/profileimg/Image2.jpeg'),
    },
    {
      name: 'Riky Fauzan',
      role: 'Design',
      image: require('../source/assets/profileimg/Image3.jpeg'),
    },
    {
      name: 'Ahmad Maulana',
      role: 'Sumber',
      image: require('../source/assets/profileimg/Image4.jpeg'),
    },
    {
      name: 'Abdul Latif',
      role: 'Sumber',
      image: require('../source/assets/profileimg/image5.jpeg'),
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require('../source/assets/img/logo/logo.png')}
        style={styles.fullWidthLogo}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Profile</Text>

        {profiles.map((profile, index) => (
          <View key={index} style={styles.card}>
            <Image source={profile.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.role}>{profile.role}</Text>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.information}>
                Sistem Informasi Universitas Adhhirajasa Reswara Sanjaya
              </Text>
            </View>
            <View style={styles.iconContainer}>{profile.icon}</View>
          </View>
        ))}
      </ScrollView>

      {/* Add Footer Component */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#004699',
    textAlign: 'left',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0b2573',
  },
  role: {
    fontSize: 14,
    color: '#26a59d',
    marginBottom: 4,
  },
  information: {
    fontSize: 14,
    color: '#555',
  },
  iconContainer: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
  },
});

export default Profile;
  