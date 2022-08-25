import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { useHandler } from 'react-native-reanimated';

export const AuthContext = createContext({
    user: {},
    token: '',
    isAuthenticated: false,
    authHandler: () => { },
    userHandler: () => { },
    logoutHandler: () => { }
})


export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const [authuser, setAuthUser] = useState({});

    const authHandler = (token) => {
        setAuthToken(token);
        // setAuthUser(userData.user);
        AsyncStorage.setItem('token', token);
    }

    const userHandler = (userId) => {
        setAuthUser(userId);
        console.log('user', userId)
        AsyncStorage.setItem('user', userId)
    }

    const logoutHandler = () => {
        setAuthToken(null);
        // setAuthUser(null);
        AsyncStorage.removeItem('token');
        // AsyncStorage.removeItem('user');
    }

    const value = {
        user:authuser,
        token: authToken,
        isAuthenticated: !!authToken,
        authHandler: authHandler,
        logoutHandler: logoutHandler,
        userHandler:userHandler
    }

    return <AuthContext.Provider value={value} >
        {children}
    </AuthContext.Provider>

}
