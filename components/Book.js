import { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TextInput, Image} from 'react-native';
import { db } from '../firebase-config.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import { getBook } from '../API/GoogleAPI.js';

const BookPage = props => {
    
const [mybook, setMybook] = useState('');

useEffect(() => {
    const getMybook = async (isbn) => {
        const data = await getBook('9780132856201').catch;
        setMybook({
            title: data.items[0].volumeInfo.title,
            author: data.items[0].volumeInfo.authors,
            genres: data.items[0].volumeInfo.categories,
            date: data.items[0].volumeInfo.publishedDate,
            imageURI: data.items[0].volumeInfo.imageLinks.thumbnail,
            description: data.items[0].volumeInfo.description,
            publisher: data.items[0].volumeInfo.publisher,
            language: data.items[0].volumeInfo.language,
            pages: data.items[0].volumeInfo.pageCount,
            printtype: data.items[0].volumeInfo.printType
        });
            
      }
      console.log(mybook)
      getMybook();
}, []); 


    return (
        <View style={styles.Bookcontainer}>
             <Image
                source={{ uri: mybook.imageURI }}
                style={{ width: 160, height: 170 }}
                />
            <Text style={styles.booktitle}>{mybook.title}</Text>
            <Text>Author(s): {mybook.author} </Text>
            <Text>Publisher: {mybook.publisher} </Text>
            <Text>Published: {mybook.date}</Text>
            <Text>Language: {mybook.language}</Text>
            <Text>Pages: {mybook.pages}</Text>
            <Text>Description: {mybook.description} </Text>
            <Text>Genre: {mybook.genres}</Text>
            <Text>Printtype: {mybook.printtype}</Text>
            <Text>rating</Text>


        </View>
    );
}
const styles = StyleSheet.create({
    Bookcontainer: {
        marginTop: 50,
        marginLeft: 50,
    },
    booktitle:{
        fontSize: 70,
        fontWeight: 'bold',
        fontfamily: 'lucida grande',
        color:'grey'
    }
  });
export default BookPage
