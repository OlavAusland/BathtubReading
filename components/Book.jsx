import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,  Image, Pressable, ScrollView} from 'react-native';
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getFirebaseBooks } from '../API/FirebaseAPI.js';
import { Button, Portal, Modal, Provider } from 'react-native-paper';

const BookPage = props => {
    
const [mybook, setMybook] = useState('');
const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
    const getMybook = async (isbn = '9780132856201') => {
        const data = await getBook(isbn);
        const firebaseData = await getFirebaseBook('9780132856201');
        const firebaseDatas = await getFirebaseBooks();
        setMybook({
            title: data.items[0].volumeInfo.title,
            author: data.items[0].volumeInfo.authors.join(', '),
            genres: data.items[0].volumeInfo.categories,
            date: data.items[0].volumeInfo.publishedDate,
            imageURI: data.items[0].volumeInfo.imageLinks.thumbnail,
            description: data.items[0].volumeInfo.description,
            publisher: data.items[0].volumeInfo.publisher,
            language: data.items[0].volumeInfo.language,
            pages: data.items[0].volumeInfo.pageCount,
            printtype: data.items[0].volumeInfo.printType,
            Isbn: data.items[0].volumeInfo.industryIdentifiers[0].identifier,
            rating: firebaseData.rating
            
        });
            
      }
      console.log(mybook)
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
                <Text style={styles.booktitle} numberOfLines={9} adjustsFontSizeToFit>{mybook.title} </Text>
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
                    <Text>{mybook.printtype}</Text>
                </Text>
                <Text style={styles.bookAuthor}>
                    <Text style={{fontWeight: "bold"}}>ISBN: </Text>
                    <Text>{mybook.Isbn}{'\n'}</Text>
                </Text>
                <Text style={styles.bookDescription}>
                    <Text style={{fontWeight: "bold"}}>Description:{'\n'}</Text>
                    <Text>{mybook.description}</Text>
                </Text>
                <Text style={styles.bookRating}>{'\n'}{'\n'}
                    <Text style={{fontWeight: "bold"}}>Rating: </Text>
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
          StatusBarTranslucent={true}
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
        marginTop: '9%',
        padding: '3%',
        backgroundColor: "#E4B7A0",
        fontSize: 80
    },
    booktitle:{
        fontSize: 60,
        fontWeight: 'bold',
        color:'black'
    },
    bookAuthor:{
        fontSize: 19
    },
    bookRating:{
        fontSize: 19,
        marginBottom: "10%"
    },
    bookDescription:{
        fontSize: 19,
        backgroundColor: "#F6EEE0",
        padding: '5%',
    },
    bookimage:{
        width: 200,
        height: 250,
        marginTop: "10%",
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
        backgroundColor: "#A45C40",
        height: '100%' 
    },
    modalView: {
        margin: 20,
        backgroundColor: "#F6EEE0",
        borderRadius: 20,
        padding: 70,
        alignItems: "center",
        elevation: 5,
        fontSize: 20
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    buttonOpen: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        marginBottom: 20,
        width:'90%',
        height: '5%',
        justifyContent: "center"
    },
    buttonClose: {
        backgroundColor: "#A45C40",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 20
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 40,
    }
    });

export default BookPage
