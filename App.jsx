import { StyleSheet, LogBox } from 'react-native';
import LoginPage from './components/Login'
import ProfilePage from './components/Profile'
import RegisterPage from './components/Register';
import HomePage from './components/Home';
import BookPage from './components/Book';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
LogBox.ignoreLogs(['Setting a timer']);

console.ignoredYellowBox = ['Setting a timer'];
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function BathubReading()
{
  return(
    <Tab.Navigator initialRouteName='Profile'>
      <Tab.Screen name="Home" component={HomePage}/>
      <Tab.Screen name="Profile" component={ProfilePage}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen name='BathubReading' component={BathubReading}/>
        <Stack.Screen name='Book' component={BookPage}/>
        <Stack.Screen name='Login' component={LoginPage} />
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
