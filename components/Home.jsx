import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput, ScrollView} from 'react-native'


export default function HomePage({navigation})
{
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>
            <View style={{ flex: 1.5, backgroundColor: "#A45C40", borderBottomColor: 'black', borderBottomWidth:1}}>
                <View><Text style={{fontSize:50, marginLeft: 10, marginTop: 90}}> Discovery </Text></View>
            </View>
            <View style={{ flex: 0.7, backgroundColor: "#E4B7A0", borderBottomColor: 'black', borderBottomWidth:1}}>
                    <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={styles.scrollButtons}>
                        <Button title="Action" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={styles.scrollButtons}>
                        <Button title="Classics" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={styles.scrollButtons}>
                        <Button title="Horror" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={styles.scrollButtons}>
                        <Button title="Fantasy" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={styles.scrollButtons}>
                        <Button title="Fiction" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={styles.scrollButtons}>
                        <Button title="Other" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                    </ScrollView>
            </View>
            <View style={{ flex: 5, backgroundColor: "#F6EEE0" }}>
                <View style={[styles.container, {flexDirection:'row'}]}>
                <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderRightColor: 'black', borderRightWidth:1, alignItems: 'center'}}>
                <Text style={{fontSize:20, marginTop: 10}}> TOP 10 </Text>
                    <View style={styles.listButtons}>
                    <Button title="Number 1" color="#A45C40" onPress={() => {navigation.navigate('Book', {isbn:'9780439023481'})}}/>
                    </View>               
                    <View style={styles.listButtons}>
                    <Button title="Number 2" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 3" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 4" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 5" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 6" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 7" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 8" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 9" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Number 10" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                </View>
                <View style={{ flex: 1, backgroundColor: "#E4B7A0", borderRightColor: 'black', borderRightWidth:1, alignItems: 'center'}}>
                    <Text style={{fontSize:20, marginTop: 10}}> NEWEST </Text>
                    <View style={styles.listButtons}>
                    <Button title="The Circle" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="The Fifth Season" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>  
                    <View style={styles.listButtons}>
                    <Button title="Between Shades" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="The Reckoning" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="12 Rules for Life" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Under the Dome" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="To Paradise" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="Klara and the Suns" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="The Sellout" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={styles.listButtons}>
                    <Button title="The Swerve" color="#A45C40" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                </View>
            </View>
            <View style={{flex: 0.15, backgroundColor: "#A45C40", borderTopColor:'black', borderTopWidth:1, justifyContent:'center', alignItems:'center'}}>
                <View style={{height:75, width: 150, justifyContent:'center', alignItems:'center', borderRadius:20}}>
                <TouchableOpacity onPress={() => navigation.navigate('ADD BOOK')}> <Image style={styles.image} source={{}}/></TouchableOpacity>
                </View>
            </View>
        </View>
        
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1
    },

    scroller:{
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowRadius: 6,
        shadowOffset: {width:0, height:6}
    },

    scrollButtons:{
        borderRadius:10,
        padding: 5,
        margin:10
    },

    listButtons: {
        alignItems: 'center', 
        justifyContent:'center', 
        padding:2, 
        margin:2
    }, 
    image:{
        width:150,
        height:150,
        borderRadius:5,
        backgroundColor:'black'
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
