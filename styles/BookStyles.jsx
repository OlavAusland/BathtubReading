import { StyleSheet } from "react-native"

export const bookStyles = StyleSheet.create({
    Booktext: {
        marginTop: '9%',
        padding: '3%',
        backgroundColor: "#E4B7A0",
        fontSize: 80
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
    namelist: {
        justifyContent: "center",
        fontSize: 30,
    },
    section: {
        flex:1,
        width:'100%',
        flexDirection: 'row',
        margin: '1%',
        justifyContent: 'flex-start'
      },
    pageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A45C40',
        height: '100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#F6EEE0',
        borderRadius: 20,
        padding: 70,
        alignItems: 'center',
        elevation: 5,
        fontSize: 20
    },
    
    buttonOpen: {
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
    buttonClose: {
        backgroundColor: '#A45C40',
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
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 40,
    },
    checkBoxStyle: {
        paddingLeft: 5,
        paddingRight: 5
    },
    checkboxtext:{
        
    }
});