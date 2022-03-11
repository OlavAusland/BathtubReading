import { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet} from 'react-native'

export default function HomePage()
{
    return (
        <View style={[styles.container, {flexDirection:'row'}]}>
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <Image
                    source={require('../assets/Images/Loading.gif')}
                />
            </View>
            <View style={{ flex: 1, backgroundColor: "darkorange" }} />
        </View> 
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1
    }
})