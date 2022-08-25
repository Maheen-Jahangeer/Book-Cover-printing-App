import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';

export const BooksItem = ({ bookName, price, url, rating, ratingCount, isSaved = false, onPress }) => {
    // console.log('booksdata', bookData)
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <View>
                    <Image style={styles.image} source={{ uri:"https://firebasestorage.googleapis.com/v0/b/book-cover-printing.appspot.com/o/IMG_20190628_161801.jpg?alt=media&token=e8d02de6-31f4-4d85-af43-7472b1825ec0" }} />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.title}>{bookName}</Text>
                    <View style={styles.ratingContainer}>
                        <Rating imageSize={20} style={styles.ratingStar} />
                        <Text style={styles.ratingCount}>
                            {ratingCount}
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text>
                            ₹{price} /-
                        </Text>
                        <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={28} />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: 320,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "space-around",
        backgroundColor: "#fff",
        borderColor: '#d5d5d5',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 5,
    },
    detailContainer: {
        marginTop: 20,
        justifyContent: 'space-around',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    ratingStar: {
        marginTop: 7
    },
    ratingCount: {
        color: '#f6f6f6',
    },
    title: {
        fontSize: 14,
        fontWeight: "bold"
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }
})
