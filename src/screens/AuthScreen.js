import {View, Text, StyleSheet,Image } from 'react-native';
import AuthButton from '../components/AuthButton';
import {constants} from '../styles/index';

const AuthScreen = ({navigation}) => {
    const onPressHandler = () => {
        navigation.replace("Login")
    }
    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={require('../../assets/sitting.jpg')} />
                <Text style={styles.title}>No Show Less here</Text>
                <Text style={styles.title}>Only Read more</Text>
            </View>
            <AuthButton buttonLabel="Get Start" buttonStyle={styles.button} onPress={onPressHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width:300,
        height:300
    },
    title:{
        color:"blue",
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        maxWidth:'100%',
        lineHeight:35
    },
    button:{
        backgroundColor:"#6F7FCA",
        width:'80%',
        minHeight:50,
        marginTop:60
    }
})

export default AuthScreen;