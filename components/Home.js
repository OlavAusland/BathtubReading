import { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default function HomePage()
{
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent:'center'}}>  
                <Image style={{height:200, width:200}}
                    source={require('../assets/Images/Loading.gif')}
                />
                <View style={{flexDirection:'column', justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold'}}>Olav Ausland Onstad</Text>
                    <Text>olavausland@hotmail.com</Text>
                </View>

            </View>
            <ScrollView horizontal={true} style={[styles.scroller, {flex:1}]} showsVerticalScrollIndicator={false}>
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
            </ScrollView>
            <View style={{ flex: 2, backgroundColor: "darkorange" }}/>
            <View style={{ flex: 1, backgroundColor: "black" }} />
        </View> 
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1
    }
})