import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,  Image, ScrollView, Modal} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFirebooksGenre } from '../API/FirebaseAPI.js'; 


const GenrePage = props => {
    
    const [genre, setGenre] = useState("Computers")
    const[genreBooks, setGenreBooks] = useState([]);

    useEffect(() => {
        const getGenreBooks = async () =>{
            const genreBookslist = await getFirebooksGenre(genre)
            setGenreBooks(genreBookslist)

        }
        getGenreBooks();

    }, []);

    const onPress = () => {
        alert("bitch ass hoe")
    }

    return(
        <ScrollView style={styles.Container}>
            <Text style={styles.Title}>{genre}</Text>
            <View style={styles.Booklisting}>
            {genreBooks.length > 0 &&
            genreBooks.map((book, index) => {
                return (
                    <View key={'Book-' + index} style={[styles.BookCard, styles.shadowProp]}>
                        <TouchableOpacity
                        onPress={() => {onPress()}}>
                        <Image
                            style={styles.Imagestyle}
                            source={{uri: book.imageURI}}
                        />
                        <Text style={styles.Booktitle}>{book.title}</Text>
                            </TouchableOpacity> 
                    </View>
                );
            })
            }
            </View>
        </ScrollView>
    );
}

// COLORS: Cream: #F6EE0, Peach: #E4B7A0, Desert Sun: #A45C40, Coral: #C38370

const styles = StyleSheet.create({
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
        backgroundColor: "#E4B7A0",
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal:25,
        width: "100%",
        marginVertical: 10,
        alignItems: 'center'
    },
    Booktitle:{
        fontSize: 30,
        fontWeight: 'normal',
        color:'black',
        alignContent: "center"
    },
    Imagestyle:{
        width: 200,
        height: 260,

    },
    shadowProp:{
        shadowColor: '#100f0f',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5
    }
})

export default GenrePage