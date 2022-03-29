import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as firebaseApi from "../api/firebaseAPI.js";
import { SearchResultsView } from "./home/SearchResultsView";
import { GenreView } from "./home/GenreView"
import { DefaultHome } from './home/DefaultView';
import { homeStyles } from '../styles/HomeStyles';
import { getAllGenres } from '../api/firebaseAPI.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase-config.js";

export default function HomePage({ navigation }) {

    const [allGenres, setAllGenres] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [queryGenre, setQueryGenre] = useState('');
    const [displayGenre, setDisplayGenre] = useState(false);
    const [searching, setSearching] = useState(false);
    const [books, setBooks] = useState();
    const [rating, setRating] = useState([]);
    
    useEffect(async() => {
        const getRatings = async() => {
            const result = await firebaseApi.getAllRatings();
            const ratings = new Map();
            result.forEach(async(item) => {
                const propertyNames = Object.getOwnPropertyNames(item);
                let rating = 0;
                let count = 0;
                let id = 0;
                propertyNames.forEach((propertyName) => {
                    //console.log("Property name: " + propertyName);
                    if (propertyName === "id") {
                        id = item[propertyName];
                        //console.log("ID: " + id);
                    } else if(propertyName !== "id") {
                        rating += item[propertyName].rating;
                        count += 1;
                        //console.log("Rating: " + rating);
                    }
                })
                ratings.set(id, rating / count);
            });
            setRating(ratings);
        }

        getRatings();
    },[])


    const handleGenreChange = (val) => {
        setSearching(false)
        if (queryGenre === val) { setDisplayGenre(false); setQueryGenre('') }
        else { setDisplayGenre(true); setQueryGenre(val) }
    }

    const handleSearch = (event) => {
        setSearchKeyword(event.nativeEvent.text);
        setSearching(searchKeyword.length > 0);
    }

    useEffect(async () => { const genres = await getAllGenres(); setAllGenres(genres) }, []);

    return (
        <View style={[homeStyles.container, { flexDirection: 'column' }]}>
            <View style={{ flex: 3, backgroundColor: "#194a50", borderBottomColor: 'black' }}>
                <View><Text style={{ fontSize: 50, marginLeft: 10, color: 'white' }}> Discovery </Text></View>
                <View style={{ width: '55%', borderRadius: 10, marginLeft: 25, marginTop: 10, backgroundColor: '#FFFFFF', flexDirection: 'row' }}>
                    <View style={{ height: '80%', marginRight: 10, marginLeft: 5 }}>
                        <Icon name="search" size={20} color="#000000" />
                    </View>
                    <TextInput
                        onEndEditing={(e) => handleSearch(e)}
                        onPressIn={() => { setSearching(true) }}
                        placeholder="Search"
                        style={{ width: '90%'}}
                    />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#FFFFFF", borderBottomColor: 'black' }}>
                <ScrollView style={homeStyles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {allGenres.length > 0 &&
                        allGenres.map((elem, index) => {
                            return (
                                <View key={elem} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={homeStyles.scrollButtons}>
                                        <Button title={elem.toUpperCase()} color="#194a50" onPress={() => { handleGenreChange(elem); }} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ flex: 9, backgroundColor: "#194a50" }}>
                {(!displayGenre && !searching) && <DefaultHome navigation={navigation} />}
                {(displayGenre && !searching) && <GenreView genre={queryGenre} navigation={navigation} />}
                {(searching) && <SearchResultsView books={books} navigation={navigation} keyword={searchKeyword} />}
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
