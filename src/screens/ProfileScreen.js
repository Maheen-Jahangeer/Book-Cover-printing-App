import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import AuthButton from '../components/AuthButton';
import color from '../styles/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/auth-context';

export const ProfileScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const authCxt = useContext(AuthContext);
    const [user, setUser] = useState({
        username: "",
        email: "",
        address: "",
        pincode: "",
        phoneNumber: "",
    });

    const fetchUser = () => {
        AsyncStorage.getItem('user').then(async (response) => {
            await axios.get(`http://192.168.0.101:3200/user/find/${response}`, {
                headers: {
                    "verifytoken": `Bearer ${authCxt.token}`
                }
            }).then((response) => {
                console.log('user', response.data)
                setUser({ ...user, email: response.data.email });
                setUser({ ...user, username: response.data.username });
            }).catch((err) => console.error(err))
        }).catch((error) => console.error(error))


    }
    useEffect(() => {
        fetchUser();
    }, [])

    const navigate = useNavigation();

    const upadteHandler = async () => {
        AsyncStorage.getItem('user').then(async (response) => {
            await axios.put(`http://192.168.0.101:3200/user/update/${response}`, {
                username: user.username,
                email: user.email,
                address: user.address,
                pincode: user.pincode,
                phoneNumber: user.phoneNumber
            }).then((response) => {
                navigate.navigate('Cart')
            }).catch((err) => console.error(err))
        })
    }

    const profilePicHandler = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={{uri:'https://drive.google.com/file/d/0B552WaqYE3IERmRSTk11bU5FdGdCcUxzNWdNVmJxLUJmYUlF/view?resourcekey=0-Y7FyoVKeKg6vyCDUtXf4qw'}} style={styles.image} />
                <Pressable style={{ backgroundColor: 'transparent' }} onPress={profilePicHandler} >
                    <View style={styles.pictureContainer}>
                        <Ionicons name='pencil' />
                        <Text style={styles.title}>
                            update profile picture
                        </Text>
                    </View>
                </Pressable>
                <View style={styles.wrapper}>
                    <View style={styles.inputContainer}>
                        <Text styles={styles.fullName}>
                            Full Name
                        </Text>
                        <TextInput style={styles.textInput} value={user.username} onChangeText={(text) => setUser({ ...user, username: text })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text styles={styles.fullName}>
                            Email Address
                        </Text>
                        <TextInput style={styles.textInput} keyboardType="email-address" value={user.email} onChangeText={(text) => setUser({ ...user, email: text })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text styles={styles.fullName}>
                            Address
                        </Text>
                        <TextInput style={styles.textInput} value={user.address} onChangeText={(text) => setUser({ ...user, address: text })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text styles={styles.fullName}>
                            Pincode
                        </Text>
                        <TextInput style={styles.textInput} keyboardType="number-pad" value={user.pincode} onChangeText={(text) => setUser({ ...user, pincode: text })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text styles={styles.fullName}>
                            Phone Number
                        </Text>
                        <TextInput style={styles.textInput} keyboardType="number-pad" value={user.phoneNumber} onChangeText={(text) => setUser({ ...user, phoneNumber: text })} />
                    </View>
                    <AuthButton buttonLabel="Update profile" buttonStyle={styles.updateButton} onPress={upadteHandler} />
                </View>
                {
                    modalVisible &&
                    <Modal animationType='fade' visible={modalVisible}  >
                        <View style={styles.modalView}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.warningTitle}>
                                    Currentlyy we dont have the functionallity for accepting image files from your folder.. Please provide us drive link!!
                                </Text>
                                <TextInput style={[styles.textInput, styles.profilepicInput]} />
                                <View style={styles.modalButtonContainer}>
                                    <AuthButton buttonLabel='Update' buttonStyle={styles.updateButton} />
                                    <AuthButton buttonLabel='Cancel' buttonStyle={styles.modalCancel} buttonLabelColor="black"
                                    onPress={profilePicHandler} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20
    },
    pictureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },
    title: {
        fontWeight: '400',
        marginLeft: 10
    },
    textInput: {
        minHeight: 50,
        borderRadius: 10,
        borderColor: '#d5d5d5',
        borderWidth: 1,
        marginTop: 8,
        paddingLeft: 15,
        color: 'black',
        fontSize: 18
    },
    fullName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d5d5d5'
    },
    inputContainer: {
        minWidth: '100%',
        marginTop: 20,
        minHeight: 70
    },
    wrapper: {
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-around'
    },
    updateButton: {
        minWidth: '100%',
        backgroundColor: color.primaryColor
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalContainer: {
        width: 300,
        height: 300,
        margin: 10,
        padding: 6,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: '#000',
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 10
    },
    warningTitle: {
        color: '#c00c00',
        fontSize: 15,
        fontWeight: "400",
        marginTop: 8,
    },
    profilepicInput: {
        minWidth: '100%',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30
    },
    modalButtonContainer: {
        marginTop:20,
        flexDirection: 'row',
        // justifyContent:'space-between',
        maxWidth: '100%',
        flexWrap: 'wrap'
    },
    modalCancel: {
        backgroundColor: 'white',
        borderColor: color.primaryColor,
        borderWidth: 2,
        color: '#000',
        minWidth: '100%'
    }
})