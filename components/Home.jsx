import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as firebaseApi from "../api/firebaseAPI.js";
import { SearchResultsView } from "./home/SearchResultsView";
import { GenreView} from "./home/GenreView"
import { DefaultHome } from './home/DefaultView';
import { homeStyles } from '../styles/HomeStyles';
import { getAllGenres } from '../api/firebaseAPI.js';


export default function HomePage({ navigation }) {
    
    const [allGenres, setAllGenres] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [queryGenre, setQueryGenre] = useState('');
    const [displayGenre, setDisplayGenre] = useState(false);
    const [searching, setSearching] = useState(false);
    const [books, setBooks] = useState();

    const handleGenreChange = (val) => {
        setSearching(false)
        if(queryGenre === val){setDisplayGenre(false);setQueryGenre('')}
        else{setDisplayGenre(true);setQueryGenre(val)}
    }

    const handleSearch = (event) => {
        setSearchKeyword(event.nativeEvent.text);
        setSearching(searchKeyword.length > 0);
    }

    useEffect(async() => {const genres = await getAllGenres(); setAllGenres(genres)}, []);

    return (
        <View style={[homeStyles.container, { flexDirection: 'column' }]}>
            <View style={{ flex: 3, backgroundColor: "#194a50", borderBottomColor: 'black'}}>
                <View><Text style={{ fontSize: 50, marginLeft: 10, color: 'white'}}> Discovery </Text></View>
                <View style={{width:'55%',borderRadius:10, marginLeft:25, marginTop:10, backgroundColor:'#FFFFFF'}}>
                    <TextInput
                        onEndEditing={(e) => handleSearch(e)}
                        onPressIn={() => {setSearching(true)}}
                        placeholder="Search"
                    />
                </View>
            </View>
            <View style={{ flex:1, backgroundColor: "#FFFFFF", borderBottomColor: 'black'}}>
                <ScrollView style={homeStyles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {allGenres.length > 0 &&
                        allGenres.map((elem, index) => {
                            return (
                                <View key={elem} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={homeStyles.scrollButtons}>
                                        <Button title={elem.toUpperCase()} color="#194a50" onPress={() => {handleGenreChange(elem);}} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ flex: 9, backgroundColor: "#194a50" }}>
                {(!displayGenre && !searching ) && <DefaultHome navigation={navigation}/>}
                {(displayGenre && !searching ) && <GenreView genre={queryGenre} navigation={navigation}/>}
                {(searching) && <SearchResultsView books={books} navigation={navigation} keyword={searchKeyword}/>} 
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
