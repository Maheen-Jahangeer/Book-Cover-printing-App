import { View, Text, Pressable, StyleSheet } from 'react-native';

const AuthButton = ({ buttonLabel, onPress, buttonStyle }) => {
    return (
        <View style={[styles.container, buttonStyle && buttonStyle]}>
            <Pressable onPress={onPress} android_ripple>
                <Text style={styles.label}>{buttonLabel}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '92%',
        minHeight: 45,
        marginTop:10,
        // left:'7%',
        borderRadius: 6,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:16
    }
})

export default AuthButton;