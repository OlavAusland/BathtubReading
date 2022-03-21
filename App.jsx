import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { db } from "./firebase-config";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";

import LoginPage from './components/Login'
import ProfilePage from './components/Profile'
import RegisterPage from './components/Register';
import HomePage from './components/Home';
import BookPage from './components/Book';
import { TestPage } from './components/Test';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

console.ignoredYellowBox = ['Setting a timer'];
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Home()
{
  return(
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='Book'>
      <Tab.Screen name="Book" component={BookPage}/>
      {/*<Tab.Screen name="Profile" component={ProfilePage}/>*/}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Book'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Login' component={LoginPage}/>
        <Stack.Screen name='Register' component={RegisterPage}/>
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
