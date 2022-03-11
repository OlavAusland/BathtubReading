import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { db } from "./firebase-config.js";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";

import LoginPage from './components/Login.js'
import ProfilePage from './components/Profile.js'
import RegisterPage from './components/Register.js';
import HomePage from './components/Home.js';
import BookPage from './components/Book.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Book'>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen name="Profile" component={ProfilePage}/>
        <Stack.Screen name="Home" component={HomePage}/>
        <Stack.Screen name="Book" component={BookPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
