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
import { Cart } from './src/screens/CartScreen';

const stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <stack.Navigator screenOptions={{
//           contentStyle: { backgroundColor: '#ffffff' },
//           headerShown: false
//         }}>
//           <stack.Screen name='Home' component={HomeScreen} />
//           <stack.Screen name='Auth' component={AuthScreen} />
//           <stack.Screen name='Login' component={LoginScreen} />
//           <stack.Screen name='Register' component={RegisterScreen} />

//         </stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   )
// }

const TabScreen = () => {
  const tab = createBottomTabNavigator();
  return (
      <tab.Navigator>
        <tab.Screen name='Home' options={{tabBarIcon:'home'}} component={AuthenticatedContent} />
        <tab.Screen name='Cart' component={Cart} />
      </tab.Navigator>
  )
}

const HomeDrawer = () => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator>
      <drawer.Screen name='Navigation' component={Navigation} options={{ headerShown: false }} />
    </drawer.Navigator>
  )
}

const AuthenticatedContent = () => {
  return (
    <stack.Navigator>
      <stack.Screen name='Home' component={HomeDrawer} options={{ headerShown: false }} />
      <stack.Screen name='CoverDetails' component={CoverDetails} options={{
        headerTitleAlign: 'center', headerShown: true, headerTitleStyle: { fontSize: 15 }
      }} />
      <stack.Screen name='Cart' component={Cart} options={{ headerTitleAlign: 'center', headerShown: true }} />
    </stack.Navigator>
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
  return <TabScreen />
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

