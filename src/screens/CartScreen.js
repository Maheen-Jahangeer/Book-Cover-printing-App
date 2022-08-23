import { useLayoutEffect } from "react"
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Ionicons from "@expo/vector-icons/SimpleLineIcons";
import color from '../styles/index';
import { cartItems } from '../data/index';
import { CartItem } from "../components/CartItem";
import AuthButton from "../components/AuthButton";

export const Cart = ({ navigation }) => {
    const renderItem = (itemdata) => {
        return <CartItem item={itemdata.item} />
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Cart"
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.totalCountContainer}>
                <Ionicons name="bag" size={20} color={color.primaryColor} />
                <Text style={styles.total}>
                    You have 3 items in your list chart
                </Text>
            </View>
            <FlatList data={cartItems} keyExtractor={item => item.id} renderItem={renderItem} />
            <View style={styles.prizeContainer}>
                <Text style={styles.totalPrizeTitle}>
                    Total
                </Text>
                <Text style={styles.totalPrize}>
                    ₹100 /-
                </Text>
            </View>
            <AuthButton buttonLabel="Checkout" buttonStyle={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 10,
        padding: 15
    },
    totalCountContainer: {
        minHeight: 50,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: color.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center'
    },
    total: {
        fontSize: 17,
        color: color.primaryColor,
        marginLeft: 10
    },
    prizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 12,
        shadowOpacity: 0.25,
        elevation: 4,
    },
    totalPrizeTitle: {
        color: "#d5d5d5",
        fontSize: 16,
    },
    totalPrize: {
        fontSize: 17,
        fontWeight: '500'
    },
    button: {
        backgroundColor: color.primaryColor,
        width: '100%',
        minHeight: 50
    }
})