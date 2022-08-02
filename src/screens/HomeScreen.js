import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { Searchbar } from "react-native-dynamic-search-bar";
import Searchbar from "../components/SearchBar";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import AuthScreen from "./AuthScreen";
import AuthButton from "../components/AuthButton";

const AppScreen = ({buttonHandler}) => {
    return (
        <View style={styles.container}>
            <Header />
            <Searchbar />
            <AuthButton onPress={buttonHandler} buttonLabel="logout"/>
        </View>
    )}

export const HomeScreen = () => {
    const {userToken, logoutHandler} = useContext(AuthContext);
    const buttonHandler = () => {
        logoutHandler();
        console.log("Clicked on logout button")
    }
    return (
        <>
        {
            userToken !== null  ?
            <AppScreen buttonHandler={buttonHandler} /> :
            <AuthScreen />
        }
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        marginTop:20,
        padding:10
    }
})

export default HomeScreen;