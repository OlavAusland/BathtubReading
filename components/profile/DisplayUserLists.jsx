import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { profileStyle } from '../../styles/ProfileStyles';

export const DisplayUserLists = (library) => 
{
    return [...Array.from(library.keys())].map((key) => {
        if(key == 'favorites'){return;}
        return(
            <View key={ Math.random().toString(36).substr(2, 9)}>
                <Text style={{fontWeight:'bold', fontSize:30}}>{key.toUpperCase()}</Text>
                <ScrollView horizontal={true}>
                    {library.get(key).map((book, index) => {
                        if(book == undefined){return;}
                        return(
                            <View key={`${key}-${index}`}>
                                <TouchableOpacity onPress={() => navigation.navigate('Book')}>
                                    <Image
                                        style={profileStyle.image}
                                        source={obj.image ? {uri: obj.image} : '../assets/Images/NoImage.jpg'}
                                    />
                                </TouchableOpacity>
                                <Text style={{overflow:'hidden'}}>{book.title ? book.title : ''}</Text>
                            </View>
                            
                        );
                    })}
                </ScrollView>
            </View>
        )
    })
}