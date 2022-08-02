import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading]  = useState(true);
    const [userToken, setUserToken] = useState(null);

    const loginHandler = () => {
        setUserToken('maheen@1223!!');
        setIsLoading(false);
    }

    const logoutHandler = () => {
        setUserToken(null);
        setIsLoading(false);
    }

    const value = {
        isLoading, userToken, loginHandler, logoutHandler
    }

    return <AuthContext.Provider value={value} >
        {children}
    </AuthContext.Provider>
}