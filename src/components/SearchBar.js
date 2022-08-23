import { TextInput, StyleSheet } from "react-native"

const onChangeTextHandler = (enteredText) => {
    console.log("entered Text", enteredText)
}

const Searchbar = () => {
    return <TextInput placeholder="Search here" onChangeText={onChangeTextHandler} style={ styles.container }/>
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        // maxWidth:'90%',
        margin:'auto',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#d5d5d5',
        shadowOffset:{height:5, width:0},
        shadowColor:'black',
        shadowRadius:0.5,
        shadowOpacity:0.5,
        paddingLeft:10,
        minHeight:50,
        marginTop:20
    }
})

export default Searchbar;