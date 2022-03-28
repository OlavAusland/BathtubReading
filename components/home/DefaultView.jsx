import { Text, View,  Image,  ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { homeStyles } from '../../styles/HomeStyles';
import * as firebaseApi from "../../api/firebaseAPI";

export const DefaultHome = (props) =>
{
    const [newest, setNewest] = useState([]);
    const [topTen, setTopTen] = useState([]);
    
    useEffect(async() => {
        const result = await firebaseApi.getNewestBooks();
        setNewest(result);
    }, [])
    return(
        <View style={[homeStyles.container, { flexDirection: 'row' }]}>
            <View style={{ flex: 1, backgroundColor: "#F6EEE0", borderRightColor: 'black', borderRightWidth: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}> TOP 10 </Text>
            </View>
            <View style={{ flex: 1, borderBottomWidth:1, backgroundColor: "#F6EEE0", borderRightColor: 'black', alignItems: 'center' }}>
                <Text style={{ fontSize: 34, marginTop: 10, fontWeight:'bold'}}> NEWEST </Text>
                <ScrollView style={{backgroundColor:'#F6EEE0',width:'100%'}}>
                    {newest.map((book, index) => {
                        return(
                            <View key={book + index} style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                    <Image
                                        style={{flex:1, height:100, width:100}}
                                        source={book.imageURI ? {uri: book.imageURI} : '../assets/Images/NoImage.jpg'}
                                    />
                                </TouchableOpacity>
                                <Text style={{flex:1}} numberOfLines={5} adjustsFontSizeToFit>{book.title}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}