import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {AuthContext} from '../context/auth-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from "react";

const Header = () => {
    const authCtxt = useContext(AuthContext);
    const logoutHandler = () => {
        authCtxt.logoutHandler();
    }
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Hey Maheen</Text>
                <Ionicons name="hand-right-outline" color="#a39e14" size={32} />
            </View>
            <Pressable onPress={() => logoutHandler()}>
                <Image  source={require('../../assets/profile.jpg')} style={styles.profileImage}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginRight:10
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    profileImage:{
        width:60,
        height:60,
        borderRadius:50,
        borderWidth:1,
    }
})

export default Header;