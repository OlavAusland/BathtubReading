import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { db } from "./firebase-config.js";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";

import LoginPage from './components/Login.js'
import HomePage from './components/Home.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const spendingCollectionRef = collection(db, "dailyspending");
  const [spentData, setSpentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDailySpent = async () => {
      const data = await getDocs(spendingCollectionRef);
      setSpentData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getDailySpent();
    setLoading(false);
  }, [false]);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="Home" component={HomePage}/>
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
