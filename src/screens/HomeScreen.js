import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Alert, ActivityIndicator } from "react-native";
// import { Searchbar } from "react-native-dynamic-search-bar";
import Searchbar from "../components/SearchBar";
import Header from "../components/Header";
import { BooksItem } from "../components/Book";
import {bookData} from '../data/index.js';
import axios from "axios";
import { AuthContext } from "../context/auth-context";
import color from '../styles/index';

export const HomeScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Popular');
    const [bookdata, setBookdata] = useState([]);

    const authCxt = useContext(AuthContext);

    useEffect(()=> {
        async function fetchBooksData() {
            await axios.get('http://192.168.0.101:3200/books/all-books',{
            headers:{
                "verifytoken": `Bearer ${authCxt.token}`
            }
        }).then((response) => {
            console.log("response",response.data)
            // setBookdata(JSON.stringify(response));
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            Alert.alert("Failed to fetch book cover details");
        })
            // const response = await axios.get('http://192.168.0.101:3200/books/all-books',{
            //         headers:{
            //             "verifytoken": `Bearer ${authCxt.token}`
            //         }})
            // const data = JSON.stringify(response);
            // return data
        }

        fetchBooksData();
        // console.log(result)
        //  axios.get('http://192.168.0.101:3200/books/all-books',{
        //     headers:{
        //         "verifytoken": `Bearer ${authCxt.token}`
        //     }
        // }).then((response) => {
        //     console.log("response",response)
        //     // setBookdata(JSON.stringify(response));
        //     setIsLoading(false);
        // }).catch((err) => {
        //     setIsLoading(false);
        //     Alert.alert("Failed to fetch book cover details");
        // })
    },[])

    const renderItem = (bookitem) => {
        const book = bookitem.item
        const onPressHandler = () => {
            navigation.navigate('CoverDetails',{
                id:book.id
            })
        }
        const bookItem = {
            bookName:book.bookName,
            price:book.price,
            rating:book.rating,
            ratingCount:book.ratingCount,
            url:book.url,
            isSaved:book.isSaved,
            onPress:onPressHandler
        }
        return <BooksItem {...bookItem} />
    }
    const buttonChangeHandler = (category) => {
        setSelectedCategory(category)
    }
    if(isLoading) {
        return <ActivityIndicator size="large" color={color.primaryColor}/>
    }

    return (
        <View>
            <View style={styles.container}>
                <Header />
                <Searchbar />
                <View style={styles.buttonGroup}>
                    <Pressable onPress={() => buttonChangeHandler("Popular")} >
                        <Text style={[styles.buttonTitle, selectedCategory === 'Popular' && styles.selectedButton]}>
                            Popular
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => buttonChangeHandler("Recent")} >
                        <Text style={[styles.buttonTitle,selectedCategory === 'Recent' && styles.selectedButton]}>
                            Recent
                        </Text>
                    </Pressable>
                </View>
            </View>
            <FlatList style={{height:'78%'}} showsVerticalScrollIndicator={false} data={bookdata} keyExtractor={item => item.id} renderItem={renderItem} numColumns={2}/>
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        margin:10,
        marginTop:20,
        padding:10
    },
    buttonGroup:{
        backgroundColor:"#d5d5d5",
        borderRadius:10,
        minHeight:50,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10,
        // padding:10
    },
    buttonTitle:{
        fontSize:16,
        fontWeight:'400',
    },
    selectedButton:{
        backgroundColor:'white',
        paddingLeft:30,
        paddingRight:30,
        textAlign:'center',
        borderRadius:7,
        minHeight:40
    },
    buttonWrapper:{
        alignItems:'center',
        justifyContent:'center'
    }
})

export default HomeScreen;