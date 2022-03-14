import { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet} from 'react-native'
import { getGenreBooks } from '../API/GoogleAPI.js';

const GenrePage = props => {
    
    const[genreBooks, setGenreBooks] = useState('');

    useEffect(() => {
        const getMyGenreBooks = async (genre) =>{
            const firebaseData = await getGenreBooks('Computers');
            const firebaseDatas = await getGenreBooks();
            setGenreBooks({
                title: firebaseData.title,
                imageURI: firebaseData.imageURI
            });
        }
        console.log(genreBooks)
        getMyGenreBooks();
    }, []);
    
    return(
        <View style={styles.Bookscontainer}>
            <Image
            source={{ uri: genreBooks.imageURI}}
            style={{width: 160, heigh: 170}}
            />
            <Text>{genreBooks.title}</Text>
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