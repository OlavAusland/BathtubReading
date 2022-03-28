import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { DisplayUserLists } from '../profile/DisplayUserLists';
import { getBooks } from '../../api/googleAPI';
import { useState, useEffect } from 'react'

export const DisplayResults = (props) => {
    const [books, setBooks] = useState(props.books);

    useEffect(() => {
        setBooks(props.books);
    }, [props.books]);

    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#E4B7A0' }}>
            {books.items && books.items.map((book, index) => {
                return (
                    <View key={'book' + index} style={{ flex: 1, backgroundColor: '#F6EEE0', flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Book', { isbn: `${book.id}` }) }}>
                            <Image
                                style={{ width: 125, height: 125, margin: 10 }}
                                source={'../assets/Images/NoImage.jpg'}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text>Title: {book.volumeInfo.title}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}


export const SearchResultsView = (props) => {

    const [keyword, setKeyword] = useState('');
    const [books, setBooks] = useState([]);

    const handleGoogleFetch = async() => {
        const books = await getBooks(keyword);
        setBooks(books)
    };

    if(props.books !== undefined && props.books.length > 0)
    {
        return (
            <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'#F6EEE0'}}>
                {props.books.map((book, index) => {
                    return(
                        <View key={book + index} style={{flex:1, backgroundColor:'#F6EEE0', flexDirection:'row', marginTop:10, alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                            <Image source={{ uri:book.imageURI }} style={{width:125, height:125, margin:10}} />
                                : <Image
                                    style={{width:125, height:125, margin:10}}
                                    source={book.items[index].volumeInfo.imageLinks.thumbnail ? book.items[index].volumeInfo.imageLinks.thumbnail : '../assets/Images/NoImage.jpg'}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text>Title: {book.items[index].volumeInfo.title}</Text>
                                <Text>ISBN: IUnknown</Text>
                                <Text>Genre: {book.items[index].volumeInfo.categories.join(',')}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        );
    }else{
        return(
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <TextInput placeholder="isbn/title" style={{flex:1, backgroundColor:'#FFFFFF', height:40, borderRadius:10}} onChange={(e) => {setKeyword(e.nativeEvent.text)}}/>
                    <Pressable style={{flex:1, backgroundColor:'#FAB232',  width:'50%', borderRadius:10, justifyContent:'center', alignItems:'center'}} onPress={() => handleGoogleFetch()}>
                        <Text style={{fontSize:30}}>Add Book</Text>
                    </Pressable>
                </View>
                <View style={{flex:5}}>
                    {DisplayResults({books:books})}
                </View>
            </View>
            
        );
    }
}