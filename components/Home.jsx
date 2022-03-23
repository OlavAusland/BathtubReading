import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView} from 'react-native'
import { Searchbar } from 'react-native-paper';


export default function HomePage()
{
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>
            <View style={{ flex: 1.5, backgroundColor: "#F6EEE0", borderBottomColor: 'black', borderBottomWidth:1}}>
                <View style={{marginTop:30, padding:30, width: 190, alignSelf: 'flex-end'}}>{MySearchBar()}</View>
                <View><Text style={{fontSize:50, marginLeft: 10, marginTop: -10}}> Discovery </Text></View>
            </View>
            <View style={{ flex: 0.7, backgroundColor: "#F6EEE0", borderBottomColor: 'black', borderBottomWidth:1, backgroundColor:'#F6EEE0'}}>
                    <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'#A45C40', borderRadius:10, padding:5, margin:10}}>
                        <Button title="Action" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'#A45C40', borderRadius:10, padding:5, margin:10}}>
                        <Button title="Classics" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'#A45C40', borderRadius:10, padding:5, margin:10}}>
                        <Button title="Horror" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'#A45C40', borderRadius:10, padding:5, margin:10}}>
                        <Button title="Fantasy" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'#A45C40', borderRadius:10, padding:5, margin:10}}>
                        <Button title="Fiction" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'#A45C40', borderRadius:10, padding:5, margin:10}}>
                        <Button title="Other" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                        </View>
                        </View>
                    </ScrollView>
            </View>
            <View style={{ flex: 5, backgroundColor: "#F6EEE0" }}>
                <View style={[styles.container, {flexDirection:'row'}]}>
                <View style={{ flex: 1, backgroundColor: "#F6EEE0", borderRightColor: 'black', borderRightWidth:1, alignItems: 'center'}}>
                <Text style={{fontSize:30, marginTop: 10}}> TOP 10 </Text>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 1" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>               
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 2" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 3" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 4" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 5" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 6" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 7" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 8" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 9" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Number 10" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                </View>
                <View style={{ flex: 1, backgroundColor: "#F6EEE0", borderRightColor: 'black', borderRightWidth:1, alignItems: 'center'}}>
                    <Text style={{fontSize:30, marginTop: 10}}> NEWEST </Text>
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="The Circle" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="The Fifth Season" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>  
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Between Shades" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="The Reckoning" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="12 Rules for Life" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Under the Dome" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="To Paradise" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="Klara and the Suns" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="The Sellout" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                    <Button title="The Swerve" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
                    </View>   
                </View>
            </View>
            <View style={{flex: 0.3, backgroundColor: "#F6EEE0", borderTopColor:'black', borderTopWidth:1, justifyContent:'center', alignItems:'center'}}>
                <View style={{backgroundColor:"#A45C40", height:75, width: 150, justifyContent:'center', alignItems:'center', borderRadius:20}}>
                <Button title="ADD BOOK" color="#F6EEE0" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
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
    }
})

const MySearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="..."
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    );
  };