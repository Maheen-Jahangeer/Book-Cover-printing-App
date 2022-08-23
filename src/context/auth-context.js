import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authHandler: () => { },
    logoutHandler: () => { }
})


export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();

    const authHandler = (token) => {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setAuthToken(null);
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authHandler: authHandler,
        logoutHandler: logoutHandler
    }

    return <AuthContext.Provider value={value} >
        {children}
    </AuthContext.Provider>

}
