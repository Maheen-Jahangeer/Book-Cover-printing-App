import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {TextInput} from 'react-native-paper'
import AuthButton from '../components/AuthButton';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/login.png')} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                <Ionicons name='mail' size={32} style={styles.inputIcon}/>
                <TextInput mode='flat' placeholder='Email ID' style={styles.input}/>
                </View>
                <View style={styles.inputContainer}>
                <Ionicons name='lock-closed' size={32} style={styles.inputIcon}/>
                <TextInput mode='flat' placeholder='Email ID' right={<TextInput.Icon name="eye" />} style={styles.input} secureTextEntry/>
                </View>
            </View>
            <View style={styles.forgetContainer}>
                <Pressable>
                    <Text style={styles.forget} >Forget Password ?</Text>
                </Pressable>
            </View>
            <View>
                <AuthButton buttonLabel="Login" buttonStyle={styles.button} />
            </View>
            <View style={styles.newLogoutContainer}>
                <Text style={styles.newLogoutTitle}>New to Books app? <Text style={styles.newLogoutLink}>Register</Text> </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        margin:20
        // alignItems:"center"
    },
    imageContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:200,
        height:200,
    },
    textContainer:{
        justifyContent:'flex-start',
        alignItems:'center'
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        marginBottom:20
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10
    },
    inputIcon:{
        marginRight:10
    },
    input:{
        width:'80%'
    },
    forget:{
        color:'blue',
        textAlign:'right',
        marginRight:20,
        marginTop:10
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
    button:{
        marginTop:20,
        marginLeft:'5%'   
    }
})

export default LoginScreen;