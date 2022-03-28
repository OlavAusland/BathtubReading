import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { DisplayUserLists } from '../profile/DisplayUserLists';
import { getBooks } from '../../api/googleAPI';
import { useState, useEffect } from 'react'
import { map } from '@firebase/util';

export const SearchResultsView = (props) => {
    const [books, setBooks] = useState([]);

    useEffect(async() => {
        const books = await getBooks(props.keyword);
        setBooks(books)
    }, [props.keyword]);

    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#194a50'}}>
            {books.items && books.items.map((book, index) => {
                if(!book.volumeInfo.industryIdentifiers) {return} 
                return (
                    <View key={'book' + index} style={{ flex: 1, backgroundColor: '#F6EEE0', flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <View style={{flex:2}}>
                            <TouchableOpacity style={{flex:1}} onPress={() => { props.navigation.navigate('Book', { isbn: `${book.volumeInfo.industryIdentifiers[0].identifier}`, book:book }) }}>
                                <Image
                                    style={{ width: 125, height: 125, margin: 10 }}
                                    source={book.volumeInfo.imageLinks ? {uri: book.volumeInfo.imageLinks.thumbnail} : require('../../assets/Images/NoImage.jpg')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:3, height:'80%'}}>
                            <Text style={{fontWeight:'bold'}}>Title: {book.volumeInfo.title}</Text>
                            <Text>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors}</Text>
                            <Text>Published: {book.volumeInfo.publishedDate}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}