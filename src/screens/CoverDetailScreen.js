import {View, Text, Image, StyleSheet} from 'react-native';
import {useLayoutEffect} from 'react';
import {Rating} from 'react-native-ratings';
import AuthButton from '../components/AuthButton.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { bookData } from "../data";

export const CoverDetails = ({route, navigation}) => {
    const coverId = route.params.id;
    const coverData = bookData.find((coverData) => coverData.id === coverId);

    useLayoutEffect(()=> {
        navigation.setOptions({
            title:coverData.bookName
        })
    },[])

    const checkoutHandler = () => {
        navigation.replace('Cart')
    }

    return(
        <View style={styles.container}>
            <Image source={{uri:coverData.url}} style={styles.image}/>
            <Text style={styles.title}>
                {coverData.bookName}
            </Text>
            <View style={styles.prizeContainer}>
                <Text>
                    Save 40% now
                </Text>
                <Text style={styles.price}>
            ₹{coverData.price}/-
            </Text>
            <Ionicons name={coverData.isSaved ? 'bookmark' : 'bookmark-outline'} size={28}/>
            </View>
            
            <Text style={styles.description}>
                {coverData.bookDisciption}
            </Text>
            <View style={styles.ratingContainer} >
                <Rating imageSize={20} style={styles.rating}/>
                <Text>
                    ({coverData.ratingCount})
                </Text>
            </View>
            <AuthButton buttonLabel="Add to card" buttonStyle={styles.button}/>
            <AuthButton buttonLabel="Checkout" buttonStyle={styles.button} onPress={checkoutHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:4,
        padding:10,
        justifyContent:'space-around',
    }, 
    image:{
        width:'100%',
        height:300,
        borderRadius:10
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    rating:{
        backgroundColor:'#d5d5d5'
    },
    description:{
        color:'#d5d5d5',
        fontSize:14
    },
    prizeContainer:{
        flexDirection:'row',
        borderRadius:10,
        justifyContent:"space-around",
        backgroundColor:"#B1BAE7",
        alignItems:'center',
        padding:15
    },
    price:{
        fontStyle:'italic',
        fontSize:22,
        fontWeight:'400'
    },
    button:{
        backgroundColor:"#6F7FCA",
        width:'100%',
        minHeight:50
    },
    ratingContainer:{
        flexDirection:'row'
    }
})