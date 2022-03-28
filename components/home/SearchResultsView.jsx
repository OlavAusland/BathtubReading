import { Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native'

export const SearchResultsView = (props) => {

    if(props.books !== undefined && props.books.length > 0)
    {
        return (
            <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'#E4B7A0'}}>
                {props.books.map((book, index) => {
                    return(
                        <View key={book + index} style={{flex:1, backgroundColor:'#F6EEE0', flexDirection:'row', marginTop:10, alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Book', {isbn:`${book.id}`})}}>
                                <Image
                                    style={{width:125, height:125, margin:10}}
                                    source={book.imageURI ? {uri:book.imageURI} : '../assets/Images/NoImage.jpg'}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text>Title: {book.title}</Text>
                                <Text>ISBN: {book.isbn}</Text>
                                <Text>Genre: {book.genres.join(',')}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        );
    }else{
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Pressable style={{backgroundColor:'#FAB232', width:'50%', borderRadius:10, marginTop:25, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:30}}>Add Book</Text>
                </Pressable>
            </View>
        );
    }
}