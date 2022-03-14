import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,  Image, Pressable, ScrollView} from 'react-native';
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getFirebaseBooks } from '../API/FirebaseAPI.js';
import { Button, Portal, Modal, Provider } from 'react-native-paper';


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
      console.log(mybook)
      getMybook();
}, []); 


    return (
      <ScrollView>
        <View style={newStyles.centeredView}>
             <View style={styles.Bookcontainer}>
                <Image
                    source={{ uri: mybook.imageURI }}
                    style={{ width: 160, height: 170 }}
                    />
                <Text style={styles.booktitle}>{mybook.title}</Text>
                <Text>Author(s): {mybook.author} </Text>
                <Text>Publisher: {mybook.publisher} </Text>
                <Text>Published: {mybook.date}</Text>
                <Text>Language: {mybook.language}</Text>
                <Text>Pages: {mybook.pages}</Text>
                <Text>Description: {mybook.description} </Text>
                <Text>Genre: {mybook.genres}</Text>
                <Text>Printtype: {mybook.printtype}</Text>
                <Text>rating: {mybook.rating}</Text>
            </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {setModalVisible(!modalVisible);}}
          onBackdropPress={() => {setModalVisible(false);}}
          onSwipeComplete={() => {setModalVisible(false);}}
          swipeDirection="left"
        >
          <View>
            <View style={newStyles.modalView}>
              <Text style={newStyles.modalText}>Choose List</Text>
              <Pressable
                style={[newStyles.button, newStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[newStyles.button, newStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {!modalVisible && 
            
            <Pressable
            style={[newStyles.button, newStyles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={newStyles.textStyle}>Add to list</Text>
          </Pressable>
          
        }
        
        </View>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
    Bookcontainer: {
        marginTop: 50,
        marginLeft: 50,
    },
    booktitle:{
        fontSize: 60,
        fontWeight: 'bold',
        color:'grey'
    }});

const newStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#2196F3",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
    });

export default BookPage
