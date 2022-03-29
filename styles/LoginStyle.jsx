import { StyleSheet } from "react-native"

export const loginStyle = StyleSheet.create({
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
    loginButtons: {
        backgroundColor: "#F6EEE0",
        color: '#000000',
        marginTop: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: '80%'
       
        
    },
    buttontext:{
        fontSize: 20,
    }
});