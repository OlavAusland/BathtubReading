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