import { Text, View,  Image,  ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, Dimensions} from 'react';
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
            <ScrollView horizontal={true} snapToAlignment={'center'} snapToInterval={400} decelerationRate={0} contentContainerStyle={{width:'200%'}}>
                <View style={{ flex: 1, backgroundColor: "#F6EEE0", borderRightColor: 'black', borderRightWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 34, marginTop: 10, fontWeight:'bold'}}> TOP 10 </Text>
                    <ScrollView style={{backgroundColor:'#F6EEE0', flex:1, width:'100%'}}>
                        {newest.map((book, index) => {
                            return(
                                <View key={book + index} style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <Image
                                            style={{flex:1, height:100, width:100}}
                                            source={book.imageURI !== ' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{flex:1}} adjustsFontSizeToFit>{book.title}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{ flex: 1, borderBottomWidth:1, backgroundColor: "#F6EEE0", borderRightColor: 'black', alignItems: 'center' }}>
                    <Text style={{ fontSize: 34, marginTop: 10, fontWeight:'bold'}}> NEWEST </Text>
                    <ScrollView style={{backgroundColor:'#F6EEE0', flex:1, width:'100%'}}>
                        {newest.map((book, index) => {
                            return(
                                <View key={book + index} style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <Image
                                            style={{flex:1, height:100, width:100}}
                                            source={book.imageURI !== ' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{flex:1}} adjustsFontSizeToFit>{book.title}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}