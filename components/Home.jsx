import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet} from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function HomePage()
{
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>
            <View style={{ flex: 1.5, backgroundColor: "C2ACAC", borderBottomColor: 'black', borderBottomWidth:1}}>
                <Image style={{height: '80', width:'80'}}
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