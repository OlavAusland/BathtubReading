import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, Image, StyleSheet} from 'react-native'
import { getGenreBooks } from '../API/FirebaseAPI.js';

const GenrePage = props => {
    
    const[genreBooks, setGenreBooks] = useState('');

    useEffect(() => {
        const getMyGenreBooks = async (genre) =>{
            const firebaseData = await getGenreBooks('Computers');
            setGenreBooks({
                title: firebaseData.title,
                imageURI: firebaseData.imageURI
            });
        }
        console.log(genreBooks)
        getMyGenreBooks();
    }, []);
    
    return(
        <ScrollView>
             <View style={styles.Bookscontainer}>
                <Image
                    source={{ uri: genreBooks.imageURI}}
                    style={{width: 160, height: 170}}
                />
            <Text>{genreBooks.title}</Text>
            </View>
        </ScrollView>
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