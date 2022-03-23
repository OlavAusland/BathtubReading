import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Pressable, ScrollView} from 'react-native';
import { getBook } from '../API/GoogleAPI.js';
import { getFirebaseBook, getUserLibrary } from '../API/FirebaseAPI.js';
import { AddToListModal } from './AddToListModal.jsx';
import { setDoc, updateDoc, doc, deleteField, arrayRemove} from 'firebase/firestore';
import { db } from '../firebase-config'
//import { getAuth } from 'firebase/auth';

function BookPage({route, navigation}) {

    const { isbn } = route.params;
    const [mybook, setMybook] = useState(null);
    const [lists, setLists] = useState([]);
    const [addList, setAddList] = useState([]);
    const [checked, setChecked] = useState(new Map());
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        const getMybook = async() => {
            const data = await getBook(isbn).then(setLoading(false));
            const firebaseData = await getFirebaseBook(isbn);
            const image = data.items[0].volumeInfo.imageLinks ?
                <Image source={{ uri: data.items[0].volumeInfo.imageLinks.thumbnail }} style={[styles.bookimage]} />
                : <Image
                    style={[styles.bookimage]}
                    source={require('../assets/Images/NoImage.jpg')}
                />;


            setMybook({
                title: data.items[0].volumeInfo.title,
                author: data.items[0].volumeInfo.authors.join(', '),
                genres: data.items[0].volumeInfo.categories,
                date: data.items[0].volumeInfo.publishedDate,
                image,
                description: data.items[0].volumeInfo.description,
                publisher: data.items[0].volumeInfo.publisher,
                language: data.items[0].volumeInfo.language,
                pages: data.items[0].volumeInfo.pageCount,
                printtype: data.items[0].volumeInfo.printType,
                Isbn: data.items[0].volumeInfo.industryIdentifiers[0].identifier,
                rating: firebaseData.rating,

            });

        }
        const getLists = async (uid = 'j3THQoRMNIYvXmi4CVeCZPjRwUn2') => {
            const library = await getUserLibrary(uid);
            const categories = library.map((item) => { 
                return Object.getOwnPropertyNames(item)[0];
            });

            setLists(categories);
        
        }
        getMybook();
        getLists();
    }, []);

    useEffect(() => {
        lists.forEach((elem) =>{
            setChecked(prevState => prevState.set(elem, false))});
    }, 
  
    [lists]);


    const handleCheckbox = (key, isChecked) => {
        setChecked(new Map(checked.set(key, isChecked)));        
    }

    const handleAddButton = () =>{
        setAddList([])
        checked.forEach((val, key) => {if(Boolean(val)){setAddList(prev => Array.from(new Set([...prev, key])))}})
        addList.forEach((val) => {
            setDoc(doc(db, 'Users', 'fLjdxpX56kXIrnxRRfBbUTOhR3J3'), {'libraries':{[val]:[mybook.Isbn]}}, {merge:true})
        })
        lists.filter(val => !addList.includes(val)).forEach((key) => {
            setDoc(doc(db, 'Users', 'fLjdxpX56kXIrnxRRfBbUTOhR3J3'), {'libraries':{[key]:arrayRemove(mybook.Isbn)}}, {merge:true})
        })
    }
    
    if (mybook != null && !loading) {
        return (
            <ScrollView>
                <View style={[newStyles.pageView]}>
                    <View style={styles.imageBox}>
                        {mybook.image}

                    </View>
                    <View style={styles.Booktext}>
                        <Text style={styles.booktitle} numberOfLines={2} adjustsFontSizeToFit>{mybook.title} </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>{'\n'}Author(s): </Text>
                            <Text>{mybook.author} </Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Publisher: </Text>
                            <Text>{mybook.publisher} </Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Published: </Text>
                            <Text>{mybook.date}</Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Language: </Text>
                            <Text>{mybook.language}</Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Pages: </Text>
                            <Text>{mybook.pages}</Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Genre: </Text>
                            <Text>{mybook.genres}</Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Printtype: </Text>
                            <Text>{mybook.printtype}</Text>
                        </Text>
                        <Text style={styles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>ISBN: </Text>
                            <Text>{mybook.Isbn}{'\n'}</Text>
                        </Text>
                        <Text style={styles.bookDescription}>
                            <Text style={{ fontWeight: "bold" }}>Description:{'\n'}</Text>
                            <Text>{mybook.description}</Text>
                        </Text>
                        <Text style={styles.bookRating}>{'\n'}{'\n'}
                            <Text style={{ fontWeight: "bold" }}>Rating: </Text>
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
                   <ScrollView>
                        <AddToListModal 
                            newStyles={newStyles}
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            styles={styles}
                            lists={lists}
                            checked={checked}
                            setChecked={setChecked}
                            handleCheckbox={handleCheckbox}
                            handleAddButton={handleAddButton}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
    else {
        return (
            <View style={{ justifyContent:"center", alignItems: 'center', flex: 1 }}>
                <Image
                    style={{ height: 250, width: 250 }}
                    source={require('../assets/Images/Loading.gif')}
                />
                <Text style={{ fontSize: 40 }}>Loading...</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Booktext: {
        marginTop: '9%',
        padding: '3%',
        backgroundColor: "#E4B7A0",
        fontSize: 80
    },
    booktitle: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'black'
    },
    bookAuthor: {
        fontSize: 19
    },
    bookRating: {
        fontSize: 19,
        marginBottom: "10%"
    },
    bookDescription: {
        fontSize: 19,
        backgroundColor: "#F6EEE0",
        padding: '5%',
    },
    bookimage: {
        width: 200,
        height: 250,
        marginTop: "10%",
    },
    imageBox: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { height: 2, width: 2 },
    },
    namelist: {
        justifyContent: "flex-start",
        fontSize: 25
    },
    section: {
        flex:1,
        width:'100%',
        flexDirection: 'row',
        margin: '1%'
      },

});

const newStyles = StyleSheet.create({
    pageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A45C40',
        height: '100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#F6EEE0',
        borderRadius: 20,
        padding: 70,
        alignItems: 'center',
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
        backgroundColor: '#FFFFFF',
        color: '#000000',
        marginBottom: 20,
        width: '90%',
        height: '5%',
        justifyContent:'center'
    },
    buttonClose: {
        backgroundColor: '#A45C40',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 40,
    }
});

export default BookPage
