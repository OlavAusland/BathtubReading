import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as firebaseApi from "../api/firebaseAPI.js";
import { SearchResultsView } from "./home/SearchResultsView";
import { GenreView} from "./home/GenreView"
import { DefaultHome } from './home/DefaultView';
import { homeStyles } from '../styles/HomeStyles';


export default function HomePage({ navigation }) {
    
    const [genre, setGenre] = useState('')
    const [displayGenre, setDisplayGenre] = useState(false);
    const [searching, setSearching] = useState(false);
    const [books, setBooks] = useState();

    const handleGenreChange = (val) => {
        setSearching(false)
        if(genre === val){setDisplayGenre(false);setGenre('')}
        else{setDisplayGenre(true);setGenre(val)}
    }

    const handleSearch = () => {
        setSearching(true)
        setDisplayGenre(false)
        setGenre('')
    }

    const handleSearchResults = (books) => {
        setBooks(books)
        setSearching(false)
    }

    const handleOnEndEditing = async(e) => {
        console.log("Handleonediting: " + e.nativeEvent.text);
        const bookquery = await firebaseApi.getBooksByKeyword(e.nativeEvent.text);
        setBooks(bookquery)
    }

    return (
        <View style={[homeStyles.container, { flexDirection: 'column' }]}>
            <View style={{ flex: 3, backgroundColor: "#A45C40", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <View><Text style={{ fontSize: 50, marginLeft: 10}}> Discovery </Text></View>
                <View style={{width:'55%',borderRadius:10, marginLeft:25, marginTop:10, backgroundColor:'#FFFFFF'}}>
                    <TextInput
                        onEndEditing={(e) => handleOnEndEditing(e)}
                        onPressIn={() => {setSearching(true)}}
                        placeholder="Search"
                    />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <ScrollView style={homeStyles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        ['Computers', 'Science','Classic','Horror','Fantasy', 'Romance', 'Non-Fiction'].map((elem, index) => {
                            return (
                                <View key={elem} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={homeStyles.scrollButtons}>
                                        <Button title={elem.toUpperCase()} color="#A45C40" onPress={() => {handleGenreChange(elem);}} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ flex: 7, backgroundColor: "#F6EEE0" }}>
                {(!displayGenre && !searching ) && <DefaultHome navigation={navigation}/>}
                {(displayGenre && !searching ) && <GenreView genre={genre} navigation={navigation}/>}
                {(searching) && <SearchResultsView books={books} />} 
            </View>
        </View>
    );
}





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
