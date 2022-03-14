import { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet} from 'react-native'
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getFirebaseBooks } from '../API/FirebaseAPI.js';

const GenrePage = props => {

    const [books, setbooks] = useState('');

    useEffect(() => {
        const getBook = async (isbn) => {
            const data = await getBook('9780132856201');
            const firebaseData = await getFirebaseBook('9780132856201');
            const firebaseDatas = await getFirebaseBooks();
            setbooks({
                title: data.items[0].volumeInfo.title,
                imageURI: data.items[0].volumeInfo.imageLinks.thumbnail
            }); 
        }
        console.log(books)
        getBook();
    }, []);
    
    return(
        <View style={styles.Bookscontainer}>
            HELLO
        </View>

    );
}

const styles = StyleSheet.create({
    Bookscontainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default GenrePage