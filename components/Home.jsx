import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'


export default function HomePage({ navigation }) {
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={{ flex: 3, backgroundColor: "#A45C40", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <View><Text style={{ fontSize: 50, marginLeft: 10, marginTop: 90 }}> Discovery </Text></View>
            </View>
            <View style={{flex:1}}>
                <TextInput style={{height:'100%', width:'100%'}}/>
            </View>
            <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        ['Action','Classic','Horror','Fantasy', 'Romance', 'Non-Fiction'].map((elem, index) => {
                            return (
                                <View key={elem} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.scrollButtons}>
                                        <Button title={elem.toUpperCase()} color="#A45C40" onPress={() => navigation.navigate('Book', {isbn:'9783319195957'})} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ flex: 7, backgroundColor: "#F6EEE0" }}>
                <View style={[styles.container, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderRightColor: 'black', borderRightWidth: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}> TOP 10 </Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderRightColor: 'black', borderRightWidth: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}> NEWEST </Text>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 2
    },

    scroller: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 6 }
    },

    scrollButtons: {
        borderRadius: 10,
        padding: 5,
        margin: 10
    },

    listButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 2
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 5,
        backgroundColor: 'black'
    }
})

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
