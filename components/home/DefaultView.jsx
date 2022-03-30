import { Text, View,  Image,  StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, Dimensions} from 'react';
import { homeStyles } from '../../styles/HomeStyles';
import * as firebaseApi from "../../api/firebaseAPI";
import { Rating } from 'react-native-ratings';
import { defaultHomeStyle } from '../../styles/HomeStyles';

export const DefaultHome = (props) =>
{
    const [newest, setNewest] = useState([]);
    const [topTen, setTopTen] = useState([]);
 
    
    useEffect(async() => {
        const result = await firebaseApi.getNewestBooks();
        setNewest(result);
    }, []);

    useEffect(async() => {
        const result = await firebaseApi.getTopBooks();
        setTopTen(result);
    }, []);

   
    
    return(
        
        <View style={[homeStyles.container, { flexDirection: 'row' }]}>
            <ScrollView horizontal={true} snapToAlignment={'center'} snapToInterval={0} decelerationRate={0} contentContainerStyle={{width:'200%'}}>
                <View style={{ flex: 1, backgroundColor: "#F6EEE0", borderRightColor: 'black', borderRightWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 34, marginTop: 10, fontWeight:'bold'}}> TOP 10 </Text>
                    <ScrollView style={{backgroundColor:'#F6EEE0', flex:1, width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                        {topTen.map((book, index) => {
                            return (
                                <View key={'Book-' + index} style={[defaultHomeStyle.BookCard, defaultHomeStyle.shadowProp]}>
                                    <TouchableOpacity
                                    onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <View style={{alignItems:'center'}}>
                                            <Image
                                                style={defaultHomeStyle.Imagestyle}
                                                source={book.imageURI !==' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                            />
                                        </View>
                                        <View>
                                            <Text  adjustsFontSizeToFit style={defaultHomeStyle.Booktitle}>{book.title}</Text>
                                            <View style={{marginTop:25}}>
                                                <Rating
                                                    type='star'
                                                    ratingCount={5}
                                                    imageSize={30}
                                                    reviewSize={20}
                                                    readonly={true}
                                                    ratingTextColor={'rgba(0, 0, 0, 0)'}
                                                    startingValue={book.rating}
                                                    tintColor='#194a50'
                                                    fractions = {1}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity> 
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{ flex: 1, borderBottomWidth:1, backgroundColor: "#194a50", borderRightColor: 'black', alignItems: 'center' }}>
                    <Text style={{ fontSize: 34, marginTop: 10, fontWeight:'bold', color:'white'}}> NEWEST </Text>
                    <ScrollView style={{backgroundColor:'#194a50', flex:1, width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                        {newest.map((book, index) => {
                            return (
                                <View key={'Book-' + index} style={[defaultHomeStyle.BookCard, defaultHomeStyle.shadowProp, {backgroundColor:'#F6EEE0'}]}>
                                    <TouchableOpacity
                                    onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <View style={{alignItems:'center'}}>
                                            <Image
                                                style={defaultHomeStyle.Imagestyle}
                                                source={book.imageURI !==' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                            />
                                        </View>
                                        <View>
                                            <Text  adjustsFontSizeToFit style={[defaultHomeStyle.Booktitle, {color:'black'}]}>{book.title}</Text>
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
                                    </TouchableOpacity> 
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

