import React, { useState, useEffect } 
from 'react';
import { View, StyleSheet, Text,  Image, Pressable, ScrollView, Modal} from 'react-native';
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getFirebaseBooks } from '../API/FirebaseAPI.js'; 

export default function HomePage()
{
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>
            <View style={{ flex: 1.5, backgroundColor: "C2ACAC", borderBottomColor: 'black', borderBottomWidth:1}}>
                <Image style={{height: '80pt', width:'80pt'}}
                    source={require('../assets/favicon.png')}
                />
            </View>
            <View style={{ flex: 5, backgroundColor: "C2ACAC" }}>
                <View style={[styles.container, {flexDirection:'row'}]}>
                <View style={{ flex: 1, backgroundColor: "C2ACAC", borderRightColor: 'black', borderRightWidth:1}}></View>
                <View style={{ flex: 1, backgroundColor: "C2ACAC" }}></View>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1
    }
})

const MySearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    );
  };