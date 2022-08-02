import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterButton';
import { AuthProvider } from './src/context/AuthContext';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <stack.Navigator screenOptions={{
        contentStyle:{backgroundColor:'#ffffff'}, headerShown:false
        }}>
          <stack.Screen name='Auth' component={AuthScreen}/>
          <stack.Screen name='Login' component={LoginScreen} />
          <stack.Screen name='Home' component={HomeScreen} />
          <stack.Screen name='Register' component={RegisterScreen} />
        </stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
