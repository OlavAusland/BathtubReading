import { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet} from 'react-native'

export default function GenrePage(){

    return(
        <View style={styles.container}>
            <Text>
                HELLO
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})