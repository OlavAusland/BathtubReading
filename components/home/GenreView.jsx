import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as firebaseApi from "../../api/firebaseAPI";
import { Rating } from 'react-native-ratings';

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
                            <Text>Genre: {book.genres.join(',')}</Text>
                            <View style={{marginTop:25, alignItems:'flex-start'}}>
                                <Rating
                                    type='star'
                                    ratingCount={5}
                                    imageSize={30}
                                    readonly={true}
                                    ratingTextColor={'rgba(0, 0, 0, 0)'}
                                    startingValue={book.rating}
                                    tintColor='#F6EEE0'
                                    fractions = {1}
                                />
                            </View>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    );
}