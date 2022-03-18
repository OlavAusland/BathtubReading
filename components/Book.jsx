import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,  Image, Pressable, ScrollView, Modal} from 'react-native';
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getFirebaseBooks } from '../API/FirebaseAPI.js';


const BookPage = props => {
    
const [mybook, setMybook] = useState('');
const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
    const getMybook = async (isbn) => {
        const data = await getBook('9780132856201');
        const firebaseData = await getFirebaseBook('9780132856201');
        const firebaseDatas = await getFirebaseBooks();
        setMybook({
            title: data.items[0].volumeInfo.title,
            author: data.items[0].volumeInfo.authors,
            genres: data.items[0].volumeInfo.categories,
            date: data.items[0].volumeInfo.publishedDate,
            imageURI: data.items[0].volumeInfo.imageLinks.thumbnail,
            description: data.items[0].volumeInfo.description,
            publisher: data.items[0].volumeInfo.publisher,
            language: data.items[0].volumeInfo.language,
            pages: data.items[0].volumeInfo.pageCount,
            printtype: data.items[0].volumeInfo.printType,
            rating: firebaseData.rating
            
        });
            
      }
      //console.log(mybook)
      getMybook();
}, []); 


    return (   
        <ScrollView>
            <View style={[newStyles.pageView]}>
            <View style={styles.imageBox}>
                    <Image
                        style={[styles.bookimage]}
                        source={{ uri: mybook.imageURI }}
                        />
            </View>
                <View style={styles.Booktext}>
                    <Text style={styles.booktitle}>{mybook.title} </Text>
                    <Text style={styles.bookAuthor}> 
                        <Text style={{fontWeight: "bold"}}>{'\n'}Author(s): </Text>
                        <Text>{mybook.author} </Text>
                    </Text>
                    <Text style={styles.bookAuthor}>
                        <Text style={{fontWeight: "bold"}}>Publisher: </Text>
                        <Text>{mybook.publisher} </Text>
                    </Text>
                    <Text style={styles.bookAuthor}>
                        <Text style={{fontWeight: "bold"}}>Published: </Text>
                        <Text>{mybook.date}</Text>
                    </Text>
                    <Text style={styles.bookAuthor}>
                        <Text style={{fontWeight: "bold"}}>Language: </Text>
                        <Text>{mybook.language}</Text>
                    </Text>
                    <Text style={styles.bookAuthor}>
                        <Text style={{fontWeight: "bold"}}>Pages: </Text>
                        <Text>{mybook.pages}</Text>
                    </Text>
                    <Text style={styles.bookAuthor}>
                        <Text style={{fontWeight: "bold"}}>Genre: </Text>
                        <Text>{mybook.genres}</Text>
                    </Text>
                    <Text style={styles.bookAuthor}>
                        <Text style={{fontWeight: "bold"}}>Printtype: </Text>
                        <Text>{mybook.printtype}{'\n'}</Text>
                    </Text>
                    <Text style={styles.bookDescription}>
                        <Text style={{fontWeight: "bold"}}>Description:{'\n'}</Text>
                        <Text>{mybook.description}</Text>
                    </Text>
                    <Text style={styles.bookAuthor}>{'\n'}{'\n'}
                        <Text style={{fontWeight: "bold"}}> Rating: </Text>
                        <Text>{mybook.rating}</Text>
                    </Text>                
                </View>
                {!modalVisible && 
                    
                <Pressable
                    style={[newStyles.button, newStyles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={newStyles.textStyle}>Add to list</Text>
                </Pressable>
                }
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
            <View>
                <View style={newStyles.modalView}>
                <Text style={newStyles.modalText}>Choose List</Text>
                <Pressable
                    style={[newStyles.button, newStyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={newStyles.textStyle}>Add</Text>
                </Pressable>
                <Pressable
                    style={[newStyles.button, newStyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={newStyles.textStyle}>Cancel</Text>
                </Pressable>
                </View>
            </View>
            </Modal>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    Booktext: {
        margin: '9%',
        padding: '3%',
        backgroundColor: "#E4B7A0",
        fontSize: 60
    },
    booktitle:{
        fontSize: 50,
        fontWeight: 'bold',
        color:'black'
    },
    bookAuthor:{
        fontSize: 16
    },
    bookDescription:{
        fontSize: 16,
        backgroundColor: "#F6EEE0",
        padding: '5%',
    },
    bookimage:{
        width: 200,
        height: 250,
    },
    imageBox:{
        justifyContent: "center",
        alignItems: "center",
        shadowColor:"black",
        shadowOpacity:0.2,
        shadowOffset: {height:2, width:2},

    }

});

const newStyles = StyleSheet.create({
    pageView: {
        marginTop: "20%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6EEE0",
        height: '100%' 
    },
    modalView: {
        margin: 20,
        backgroundColor: "#F6EEE0",
        borderRadius: 20,
        padding: 70,
        alignItems: "center",
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    buttonOpen: {
        backgroundColor: "#A45C40",
        marginBottom: 20,
    },
    buttonClose: {
        backgroundColor: "#A45C40",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center"
    }
    });

export default BookPage
