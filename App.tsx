/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
enableScreens();
import React from 'react';
import Menu from './source/menu';
import Artikel from './source/artikel';
import ArticleDetail from './source/detail';
import Home from './source/home';
import Profile from './source/profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />
        <Stack.Screen name="Artikel" component={Artikel} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
