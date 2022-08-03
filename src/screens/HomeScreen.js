import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { Searchbar } from "react-native-dynamic-search-bar";
import Searchbar from "../components/SearchBar";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import AuthScreen from "./AuthScreen";
import AuthButton from "../components/AuthButton";

export const HomeScreen = ({buttonHandler}) => {
    return (
        <View style={styles.container}>
            <Header />
            <Searchbar />
            <AuthButton onPress={buttonHandler} buttonLabel="logout"/>
        </View>
    )}


const styles = StyleSheet.create({
    container:{
        margin:10,
        marginTop:20,
        padding:10
    }
})

export default HomeScreen;