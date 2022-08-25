import { useContext, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './src/context/auth-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppLoading, {AppLoadingProps} from 'expo-app-loading'
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterButton';
import { AuthProvider } from './src/context/auth-context';
import { CoverDetails } from './src/screens/CoverDetailScreen'; 4
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import color from './src/styles/index';
import { Ionicons } from '@expo/vector-icons';
import { Cart } from './src/screens/CartScreen';
import { FavouriteScreen } from './src/screens/FavouriteScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

const stack = createNativeStackNavigator();

const HomeDrawer = () => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator>
      <drawer.Screen name='Home page' component={HomeScreen} options={{ headerShown: false }} />
      <drawer.Screen name='Profile' component={ProfileScreen} options={{headerShown:false}} />
    </drawer.Navigator>
  )
}

const AuthenticatedContent = () => {
  const tab  = createBottomTabNavigator();
  return (
    <tab.Navigator screenOptions={{
      headerStyle:{backgroundColor:color.primaryColor},
      headerTintColor:'white'
    }}>
      <tab.Screen name='Home' component={HomeDrawer} options={{ headerShown: false,
      tabBarIcon: ({color, size} )=> <Ionicons name='home' color={color} size={size}/>   }} />
      <tab.Screen name='Cart' component={Cart} options={{ headerTitleAlign: 'center', headerShown: true, tabBarIcon: ({color, size} )=> <Ionicons name='cart' color={color} size={size}/> }} />
      <tab.Screen name='Favourite' component={FavouriteScreen} options={{ headerShown: false,
      tabBarIcon: ({color, size} )=> <Ionicons name='heart' color={color} size={size}/> }}  />
    </tab.Navigator>
  )
}

const AuthContent = () => {
  return (
    <stack.Navigator screenOptions={{
      contentStyle: { backgroundColor: '#ffffff' },
      headerShown: false
    }}>
      <stack.Screen name='Login' component={LoginScreen} />
      <stack.Screen name='Register' component={RegisterScreen} />
    </stack.Navigator>
  )
}

const Navigation = () => {
  const authCtxt = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authCtxt.isAuthenticated && <AuthContent />}
      {authCtxt.isAuthenticated && <AuthenticatedContent />}
    </NavigationContainer>
  )
}

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  const authCtxt = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        authCtxt.authHandler(token);
      }
      setIsLoading(false);
    }
    fetchToken()
  }, [])

  if (isLoading) {
    return (
      <View>
        <Text>Failed</Text>
      </View>)
  }
  return <Navigation />
}

export default App = () => {
  return (
    <>
      <StatusBar style='light' />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  )
}

