import { View, Text, StyleSheet } from "react-native";
// import { Searchbar } from "react-native-dynamic-search-bar";
import Searchbar from "../components/SearchBar";
import Header from "../components/Header";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <Searchbar />
        </View>
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