import { Text, View,  Image,  StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
                            /*
                            return(
                                <View key={book + index} style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <Image
                                            style={{flex:1, height:100, width:100}}
                                            source={book.imageURI !== ' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                        />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={{flex:1, fontWeight:'bold'}} adjustsFontSizeToFit>{book.title}</Text>
                                        <Text style={{flex:1}} adjustsFontSizeToFit>{book.authors}</Text>
                                    </View>
                                </View>
                            );
                            */
                            return (
                                <View key={'Book-' + index} style={[styles.BookCard, styles.shadowProp]}>
                                    <TouchableOpacity
                                    onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <View style={{alignItems:'center'}}>
                                            <Image
                                                style={styles.Imagestyle}
                                                source={book.imageURI !==' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                            />
                                        </View>
                                        <View>
                                            <Text  adjustsFontSizeToFit style={styles.Booktitle}>{book.title}</Text>
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
                                <View key={'Book-' + index} style={[styles.BookCard, styles.shadowProp, {backgroundColor:'#F6EEE0'}]}>
                                    <TouchableOpacity
                                    onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                        <View style={{alignItems:'center'}}>
                                            <Image
                                                style={styles.Imagestyle}
                                                source={book.imageURI !==' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                            />
                                        </View>
                                        <View>
                                            <Text  adjustsFontSizeToFit style={[styles.Booktitle, {color:'black'}]}>{book.title}</Text>
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

const styles = StyleSheet.create({
    Container:{
        padding: 24,
        backgroundColor: "#F6EEE0"
    },
    Title:{
        alignSelf:"center",
        fontSize:45,
    },
    Booklisting:{
        alignContent: "flex-start",
    },
    BookContainer:{
        flex: 1,
        padding:24,
        backgroundColor: "#E4B7A0",
        alignItems: "baseline"
    },
    BookCard:{
        backgroundColor: "#194a50",
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal:25,
        width: "75%",
        marginVertical: 10,
        alignItems: 'center'
    },
    Booktitle:{
        fontSize: 15,
        fontWeight: 'normal',
        color:'white',
        alignContent: "center"
    },
    Imagestyle:{
        width: 200,
        height: 200,
        borderRadius:10

    },
    shadowProp:{
        shadowColor: '#100f0f',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5
    }
})