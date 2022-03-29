import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { DisplayUserLists } from '../profile/DisplayUserLists';
import { getBooks } from '../../api/googleAPI';
import { useState, useEffect } from 'react'

export const SearchResultsView = (props) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async() => {
        setLoading(true)
        const books = await getBooks(props.keyword);
        setBooks(books)
    }, [props.keyword]);

    useEffect(() => {setLoading(false)}, [books])

    if(!loading) 
    {
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#194a50'}}>
                {books.items && books.items.map((book, index) => {
                    if(!book.volumeInfo.industryIdentifiers) {return (<View  key={'nobook' + index}>
                        <Text>Book does not exist. are you Sure you typed the right title</Text>
                    </View>)} 
                    if(book.volumeInfo.industryIdentifiers[0].type === 'OTHER'){return}
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
    }else{
        return(
            <View style={{flex:1, alignItems:'center'}}>
                <Image
                    style={{ width: 150, height: 150, marginTop:50}}
                    source={require('../../assets/Images/Search.gif')}
                />
            </View>
        );
    }
}