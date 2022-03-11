import { useState, useEffect } from 'react';
import { View, StyleSheet, Text,  Image} from 'react-native';
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getFirebaseBooks } from '../API/FirebaseAPI.js';

const BookPage = props => {
    
const [mybook, setMybook] = useState('');


useEffect(() => {
    const getMybook = async (isbn) => {
        const data = await getBook('9780132856201');
        const firebaseData = await getFirebaseBook('9780132856201');
        const firebaseDatas = await getFirebaseBooks();
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
            printtype: data.items[0].volumeInfo.printType,
            rating: firebaseData.rating
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
            <Text>rating: {mybook.rating}</Text>


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
