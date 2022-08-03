import { Ionicons } from '@expo/vector-icons';
import {TextInput} from 'react-native-paper';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';

const RegisterScreen = ({navigation}) => {
    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:""
    });

    const registerHandler = async () => {
      await axios.post('http://192.168.0.101:3200/auth/register',{
        username:userData.username,
        email:userData.email,
        password:userData.password
       }).then((response)=> {
        console.log(`Registration successfull with response ${JSON.stringify(response)}`)
        navigation.replace("Home")
       }).catch(err => console.log("Failed", err))
    }

    const loginHandler = () => {
        console.log("Login handler")
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/Register.png')} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name='mail' size={32} style={styles.inputIcon}/>
                    <TextInput mode='flat' placeholder='Email ID' style={styles.input} onChangeText={(text) => setUserData({...userData, email:text})}/>
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='people' size={32} style={styles.inputIcon}/>
                    <TextInput mode='flat' placeholder='User name' style={styles.input} onChangeText={(text) =>{
                        setUserData({...userData, username:text})}} />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed' size={32} style={styles.inputIcon}/>
                    <TextInput mode='flat' placeholder='Password' style={styles.input} secureTextEntry right={<TextInput.Icon name="eye" />} onChangeText={(text) => setUserData({...userData, password:text})}  />
                </View>
                </View>
                <View style={styles.buttoncotainer}>
                    <Text style={styles.agreement}>By signing up, you're agree to our <Text style={styles.terms}>Terms and Conditions</Text>and <Text style={styles.terms}>Privacy Policies</Text></Text>
                    <AuthButton buttonLabel="Register" buttonStyle={styles.button} onPress={registerHandler} />
                </View>
                <View style={styles.newLogoutContainer}>
                <Text style={styles.newLogoutTitle}>Joined us before? <Text onPress={loginHandler} style={styles.newLogoutLink}>Login</Text> </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
        // alignItems:"center"
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    inputIcon: {
        marginRight: 10
    },
    input: {
        width: '80%'
    },
    agreement:{
        fontSize:16,
        lineHeight:24,
        textAlign:'center'
    },
    terms:{
        fontSize:16,
        color:'blue'
    },
    newLogoutContainer:{
        alignItems:'center',
        marginTop:'10%'
    },
    newLogoutTitle:{
        color:'#D6D5D4',
        fontSize:16
    },
    newLogoutLink:{
        color:'blue',
        fontSize:16
    },
    buttoncotainer:{
        marginTop:10,
    },
    button:{
        marginTop:20,
        marginLeft:'5%'   
    }
})

export default RegisterScreen;