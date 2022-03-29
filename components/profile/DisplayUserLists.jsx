import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { profileStyle } from '../../styles/ProfileStyles';

export const DisplayUserLists = (library, navigation) => 
{
    
    return [...Array.from(library.keys())].map((key) => {
        return(
            <View key={ Math.random().toString(36).substr(2, 9)} style={{marginBottom: 20}}>
                <Text style={{fontWeight:'bold', fontSize:20, marginLeft: 8, marginTop: 20}}>{key.toUpperCase()}</Text>
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