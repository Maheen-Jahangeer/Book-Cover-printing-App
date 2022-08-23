import { View, Image, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
// import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign';
import { bookData } from '../data/index';

export const CartItem = ({ item }) => {
    const productData = bookData.find((bookdata) => bookdata.id === item.id)
    return (
        <View style={styles.container}>
            <Image source={{uri:productData.url}} style={styles.image}/>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>
                    {productData.bookName}
                </Text>
                <View>
                    <Rating imageSize={20} style={styles.rating}/>
                </View>
                <View style={styles.prizeContainer}>
                    <Text style={styles.price}>
                    ₹ {productData.price} /-
                    </Text>
                    <View style={styles.countContainer}>
                        <AntDesign name='pluscircleo' size={40} color="#595B60" />
                        <Text style={styles.quantity}>
                            {item.quantity}
                        </Text>
                        <AntDesign name='minuscircleo' size={40} color="#595B60" />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:150,
        // margin:10,
        paddingRight:50,
        padding:10,
        paddingTop:0,
        flexDirection:'row',
        borderBottomColor:'#d5d5d5',
        borderBottomWidth:1,
        marginTop:10
    },
    image:{
        height:'90%',
        width:'20%',
        marginRight:10,
        borderRadius:10
    },
    rating:{
        position:'absolute',
        top:-4
    },
    descriptionContainer:{
        justifyContent:'space-around',
        width:'90%'
    },
    title:{
        fontSize:17,
        fontWeight:"bold"
    },
    prizeContainer:{
        flexDirection:'row',
        justifyContent:'space-between' ,
        marginTop:20,
        alignItems:'center'
    },
    price:{
        fontSize:16,
    },
    countContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    quantity:{
        fontSize:15,
        margin:10,
        marginTop:0,
        marginBottom:0
    }
})