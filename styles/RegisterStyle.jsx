import { StyleSheet } from "react-native"

export const registersStyles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex:1,
        alignItems:'center',
        backgroundColor: "#A45C40"
    },
    input: {
        width: '80%',
        color: "#000000",
        fontSize: 18,
        backgroundColor: "#FFFFFF",
        borderRadius:8,
        padding:5,
        marginBottom:20,
        height:40,
        shadowColor: '#171717',
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    registerButtons:{

        backgroundColor: "#F6EEE0",
        color: '#000000',
        marginTop: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    buttontext:{
        fontSize: 20,
    }
})