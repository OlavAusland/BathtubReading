import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as firebaseApi from "../../api/firebaseAPI";

export const GenreView = (props) =>
{
    const genre = props.genre;
    const [genreBooks, setGenreBooks] = useState([]);

    useEffect(() => {
        const getGenreBooks = async () =>{
            const genreBookslist = await firebaseApi.getBookGenre(genre)
            setGenreBooks(genreBookslist)

        }
        getGenreBooks();

    }, [props.genre]);

    return (
        <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'#F6EEE0'}}>
            {genreBooks.map((book, index) => {
                return(
                    <View key={book + index} style={{flex:1, backgroundColor:'#F6EEE0', flexDirection:'row', marginTop:10, alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                            <Image
                                style={{width:125, height:125, margin:10}}
                                source={book.imageURI !==' '? {uri:book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text>Title: {book.title}</Text>
                            <Text>ISBN: {book.id}</Text>
                            <Text>Genre: {book.genres.join(',')}</Text>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    );
}