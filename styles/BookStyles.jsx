import { StyleSheet } from "react-native";

export const bookStyles = StyleSheet.create({
    Booktext: {
        marginTop: '9%',
        padding: '3%',
        backgroundColor: "#F6EEE0",
        fontSize: 80,
        width:'100%'
    },
    booktitle: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'black'
    },
    bookAuthor: {
        fontSize: 19
    },
    bookRating: {
        fontSize: 19,
        marginBottom: "10%"
    },
    bookDescription: {
        fontSize: 19,
        backgroundColor: "#F6EEE0",
        padding: '5%',
    },
    bookimage: {
        width: 200,
        height: 250,
        marginTop: "10%",
    },
    imageBox: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { height: 2, width: 2 },
    },
     
    pageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#194a50',
        height: '100%'
    },
   
    
    openModalButton: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        marginBottom: 20,
        width: '90%',
        height: 60,
        justifyContent:'center',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    modalButton: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 5,
        justifyContent:'center',
        alignContent: 'center',
        elevation: 2,
        marginLeft: 5,
        marginTop:60,
        height: 50,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
   
    modalView: {
        margin: 20,
        backgroundColor: '#194a50',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        
    },
    modalTitel: {
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 45,
        color: '#FFFFFF'
    },
      
    checkboxView: {
        flex:1,
        width:'100%',
        flexDirection: 'row',
        marginTop: 10,
      },

    checkBoxStyle: {
        width: 30,
        height: 30,
        marginLeft: 15,
        backgroundColor:'#FFFFFF'
    },

    checkboxtext:{
        fontSize: 25,
        marginLeft: 10,
        color: '#FFFFFF'
    }
});