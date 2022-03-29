import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { RemoveUserList } from '../../api/firebaseAPI';
import { profileStyle } from '../../styles/ProfileStyles';
import { getAuth } from '../../firebase-config.js';

export const DeleteListView = (user, key) => {
    const staticLists = ['favorites', 'reading', 'finished'];
    if(staticLists.includes(key)){return;}
    return(
        <View style={{flex:2}}>
            <Pressable style={{backgroundColor:'red', borderRadius:10, paddingLeft:10}} onPress={() => {RemoveUserList(user, key)}}>
                <Text style={{color:'white'}}>Delete</Text>
            </Pressable>
        </View>
    );
};


export const DisplayUserLists = (library, navigation, user) => 
{
    



    return [...Array.from(library.keys())].map((key) => {
        return(
            <View key={ Math.random().toString(36).substr(2, 9)}>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text style={{fontWeight:'bold', fontSize:20, marginLeft: 8, marginTop: 20}}>{key.toUpperCase()}</Text>
                    </View>
                    {DeleteListView(user, key)}
                    
                </View>
                <ScrollView horizontal={true}>
                    {library && library.get(key).map((book, index) => {
                    
                        if(book === undefined){return;}
                        return(
                            <View key={`${key}-${index}`}>
                                <TouchableOpacity onPress={() => navigation.navigate('Book', {isbn:book.id, book})}>
                                    <Image
                                        style={profileStyle.image}
                                        source={book.imageURI !==' '? {uri: book.imageURI} : require('../../assets/Images/NoImage.jpg')}
                                    />
                                </TouchableOpacity>
                                <Text style={{marginLeft: 10, marginTop: 2, width:100 }}>{book.title ? book.title : ''}</Text>
                            </View>
                            
                        );
                    })}
                </ScrollView>
            </View>
        )
    })
}