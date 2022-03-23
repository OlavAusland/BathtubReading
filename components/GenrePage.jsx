import React, { useState, useEffect } 
from 'react';
import { View, StyleSheet, Text,  Image, Pressable, ScrollView, Modal} from 'react-native';
import { getFirebooksGenre } from '../API/FirebaseAPI.js'; 
import Placeholder from '../assets/Images/Computer-networking.jpg';


const GenrePage = props => {
    
    const [genre, setGenre] = useState("Computers")
    const[genreBooks, setGenreBooks] = useState([]);

    useEffect(() => {
        const getGenreBooks = async () =>{
            const genreBookslist = await getFirebooksGenre(genre)
            setGenreBooks(genreBookslist)

        }
        getGenreBooks();
        console.log("books", genreBooks)


    }, []);

    return(

        //list the books with mapping

        <View style={styles.Container}>
            <Text style={styles.Title}>{genre}</Text>
            <View style={styles.Booklisting}>
            {genreBooks.length > 0 &&
            genreBooks.map((book) => {
                return (
                    <View style={[styles.BookCard, styles.shadowProp]}>
                        <Image
                            style={styles.Imagestyle}
                            source={{uri: book.imageURI}}
                        />
                        <Text style={styles.Booktitle}>{book.title}</Text>
                    </View>
                );
            })
            }
            </View>
        </View>
    );
}


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
        fontSize: 45,
        fontWeight: 'normal',
        color:'black'
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