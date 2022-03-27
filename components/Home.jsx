import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getFirebooksGenre, getNewestFirebaseBooks, getBooksByKeyword} from '../API/FirebaseAPI'

function SearchResultsView(props)
{
    const [books, setBooks] = useState([]);

    useEffect(async() => {
        const result = await getBooksByKeyword(props.keyword)
        setBooks(result);
    }, [props.keyword])

    useEffect(() => {console.log(books)}, [books])

    if(books.length > 0)
    {
        return (
            <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'#E4B7A0'}}>
                {books.map((book, index) => {
                    return(
                        <View key={book + index} style={{flex:1, backgroundColor:'#F6EEE0', flexDirection:'row', marginTop:10, alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                <Image
                                    style={{width:125, height:125, margin:10}}
                                    source={{uri:book.imageURI}}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text>Title: {book.title}</Text>
                                <Text>ISBN: {book.isbn}</Text>
                                <Text>Genre: {book.genres.join(',')}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        );
    }else{
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Pressable style={{backgroundColor:'#FAB232', width:'50%', borderRadius:10, marginTop:25, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:30}}>Add Book</Text>
                </Pressable>
            </View>
        );
    }
}

function DefaultHome(props)
{
    const [newest, setNewest] = useState([]);
    const [topTen, setTopTen] = useState([]);
    
    useEffect(async() => {
        const result = await getNewestFirebaseBooks();
        setNewest(result);
    }, [])
    return(
        <View style={[styles.container, { flexDirection: 'row' }]}>
            <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderRightColor: 'black', borderRightWidth: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}> TOP 10 </Text>
            </View>
            <View style={{ flex: 1, borderBottomWidth:1, backgroundColor: "#E4B7A0", borderRightColor: 'black', alignItems: 'center' }}>
                <Text style={{ fontSize: 34, marginTop: 10, fontWeight:'bold'}}> NEWEST </Text>
                <ScrollView style={{backgroundColor:'#F6EEE0',width:'100%'}}>
                    {newest.map((book, index) => {
                        return(
                            <View key={book + index} style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                    <Image
                                        style={{flex:1, height:100, width:100}}
                                        source={{uri: book.imageURI}}
                                    />
                                </TouchableOpacity>
                                <Text style={{flex:1}} numberOfLines={5} adjustsFontSizeToFit>Computer Networking</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

function GenreHome(props)
{
    console.log(props.genre)
    const genre = props.genre;
    const [genreBooks, setGenreBooks] = useState([]);

    useEffect(() => {
        const getGenreBooks = async () =>{
            const genreBookslist = await getFirebooksGenre(genre)
            setGenreBooks(genreBookslist)

        }
        getGenreBooks();

    }, [props.genre]);

    return (
        <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'#E4B7A0'}}>
            {genreBooks.map((book, index) => {
                return(
                    <View key={book + index} style={{flex:1, backgroundColor:'#F6EEE0', flexDirection:'row', marginTop:10, alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                            <Image
                                style={{width:125, height:125, margin:10}}
                                source={{uri:book.imageURI}}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text>Title: {book.title}</Text>
                            <Text>ISBN: {book.isbn}</Text>
                            <Text>Genre: {book.genres.join(',')}</Text>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    );
}


export default function HomePage({ navigation }) {
    
    const [genre, setGenre] = useState('')
    const [displayGenre, setDisplayGenre] = useState(false);
    const [searching, setSearching] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');

    const HandleGenreChange = (val) => {
        if(genre == val){setDisplayGenre(false);setGenre('')}
        else{setDisplayGenre(true);setGenre(val)}
    }

    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={{ flex: 3, backgroundColor: "#A45C40", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <View><Text style={{ fontSize: 50, marginLeft: 10}}> Discovery </Text></View>
                <View style={{width:'55%',borderRadius:10, marginLeft:25, marginTop:10, backgroundColor:'#FFFFFF'}}>
                    <TextInput
                        onEndEditing={(e) => {setSearchKeyword(e.nativeEvent.text);console.log(e.nativeEvent.text);getBooksByKeyword(e.nativeEvent.text);}}
                        onPressIn={() => {setSearching(false)}}
                        placeholder="Search"
                    />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        ['Computers', 'Science','Classic','Horror','Fantasy', 'Romance', 'Non-Fiction'].map((elem, index) => {
                            return (
                                <View key={elem} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.scrollButtons}>
                                        <Button title={elem.toUpperCase()} color="#A45C40" onPress={() => {HandleGenreChange(elem);}} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ flex: 7, backgroundColor: "#F6EEE0" }}>
                {(!displayGenre && !searching && false) && <DefaultHome navigation={navigation}/>}
                {(displayGenre && !searching && false) && <GenreHome genre={genre} navigation={navigation}/>}
                {true && <SearchResultsView keyword={searchKeyword}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 2
    },

    scroller: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 6 }
    },

    scrollButtons: {
        borderRadius: 10,
        padding: 5,
        margin: 10
    },

    listButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 2
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 5,
        backgroundColor: 'black'
    }
})

const MySearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <TextInput
            placeholder="..."
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};
