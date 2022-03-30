import { StyleSheet } from "react-native"
 

export const homeStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 10
    },

    scroller: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 6 }
    },

    scrollButtons: {
        borderRadius: 10,
        padding: 5
    },

    listButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 2
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 5,
        backgroundColor: 'black'
    }
})

export const defaultViewStyle = StyleSheet.create({
    Container:{
        padding: 24,
        backgroundColor: "#F6EEE0"
    },
    Title:{
        alignSelf:"center",
        fontSize:45,
    },
    Booklisting:{
        alignContent: "flex-start",
    },
    BookContainer:{
        flex: 1,
        padding:24,
        backgroundColor: "#E4B7A0",
        alignItems: "baseline"
    },
    BookCard:{
        backgroundColor: "#194a50",
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal:25,
        width: "75%",
        marginVertical: 10,
        alignItems: 'center'
    },
    Booktitle:{
        fontSize: 15,
        fontWeight: 'normal',
        color:'white',
        alignContent: "center"
    },
    Imagestyle:{
        width: 200,
        height: 200,
        borderRadius:10

    },
    shadowProp:{
        shadowColor: '#100f0f',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5
    }
})