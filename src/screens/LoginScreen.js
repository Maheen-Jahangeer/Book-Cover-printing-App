// import {useContext} from 'react';
import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, TextInput } from 'react-native-paper'
import AuthButton from '../components/AuthButton';
// import {AuthContext} from '../context/AuthCon';
import {AuthContext} from '../context/auth-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({ navigation }) => {
    const authCtxt = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email:"",
        password:""
    });

    const registerButtonHandler = () => {
        navigation.replace('Register')
    }
    
    const loginHandler = async() => {
        await axios.post('http://192.168.0.101:3200/auth/login',{
            email:userData.email,
            password:userData.password
        }).then((response) => {
            console.log('user response', response)
            authCtxt.userHandler(response.data.user._id)
            authCtxt.authHandler(response.data.accessKey);
        }).catch(err => Alert.alert("Failed to login, Please try again"));
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/login.png')} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name='mail' size={32} style={styles.inputIcon} />
                    <TextInput mode='flat' placeholder='Email ID' style={styles.input} onChangeText={text => setUserData({...userData, email:text})} />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed' size={32} style={styles.inputIcon} />
                    <TextInput mode='flat' placeholder='Email ID' right={<TextInput.Icon name="eye" />} style={styles.input} secureTextEntry onChangeText={text => setUserData({...userData,password:text})}/>
                </View>
            </View>
            <View style={styles.forget}>
                <Pressable>
                    <Text style={styles.forget} >Forget Password ?</Text>
                </Pressable>
            </View>
            <View>
                <AuthButton buttonLabel="Login" buttonStyle={styles.button} onPress={loginHandler} />
            </View>
            <View style={styles.newLogoutContainer}>
                <Text style={styles.newLogoutTitle}>New to Books app?</Text>
                <Pressable onPress={registerButtonHandler}>
                    <Text style={styles.newLogoutLink}>Register</Text> 
                    </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
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
    forget: {
        color: 'blue',
        textAlign: 'right',
        marginRight: 20,
        marginTop: 10
    },
    newLogoutContainer: {
        alignContent: 'center',
        justifyContent:'center',
        marginTop: '10%',
        flexDirection:'row'
    },
    newLogoutTitle: {
        color: '#D6D5D4',
        fontSize: 16,
        marginBottom:10
    },
    newLogoutLink: {
        color: 'blue',
        fontSize: 16,
        marginBottom:9,
        marginLeft:3
    },
    button: {
        marginTop: 20,
        marginLeft: '5%'
    },
    pressable:{
        marginTop:10
    }
})

export default LoginScreen;