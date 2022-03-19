import React, { useState, useEffect } 
from 'react';
import { View, StyleSheet, Text,  Image, Pressable, ScrollView, Modal} from 'react-native';
import { getFirebooksGenre } from '../API/FirebaseAPI.js'; 
import Placeholder from '../assets/Images/Computer-networking.jpg';


const GenrePage = props => {
    
    const[genreBooks, setGenreBooks] = useState([]);

    useEffect(() => {
        const getGenreBooks = async (genre = 'Computers') =>{
            const genreBookslist = await getFirebooksGenre(genre)
            const books = genreBookslist.map((item) => {
                return Object.getOwnPropertyNames(item);
            })
        
            setGenreBooks(books)

            console.log("books", genreBooks)

        }
        getGenreBooks();
        console.log("books", genreBooks)
    }, []);

    return(

        //map each book...

        <View style={styles.Container}>
            <Text style={styles.GenreTitle}>Genre</Text>
            <View style={styles.Booklisting}>
            <View style={styles.BookContainer}>
            <Image
                style={styles.Imagestyle}
                source={Placeholder}
            />
            <Text style={styles.Booktitle}>BookTitle</Text>
            </View>
            <View style={styles.BookContainer}>
            <Image
                style={styles.Imagestyle}
                source={Placeholder}
            />
            <Text style={styles.Booktitle}>BookTitle</Text>
            </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    Container:{
        flex: 1,
        padding: 24,
        backgroundColor: "#F6EEE0"
    },
    GenreTitle:{
        alignSelf: "center",
        fontSize: 100
    },
    Booklisting:{
        alignContent: "flex-start"
    },
    BookContainer:{
        flex: 1,
        padding:24,
        backgroundColor: "#E4B7A0",
        alignItems: "baseline"
    },
    Booktitle:{
        fontSize: 45,
        fontWeight: 'bold',
        color:'black'
    },
    Imagestyle:{
        width: 200,
        height: 260

    }
})

export default GenrePage