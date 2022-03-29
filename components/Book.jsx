import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import * as firebaseApi from "../api/firebaseAPI";
import * as googleApi from "../api/googleAPI";
import { AddToListModal } from './book/AddToListModal';
import { bookStyles } from '../styles/BookStyles';
import { getAuth } from 'firebase/auth';
import { Rating } from "react-native-ratings";
import ProfilePage from './Profile';

export default function BookPage({ route }) {

    const user = getAuth().currentUser;
    const [existst, setExsists] = useState(false);
    const { isbn, book } = route.params;
    const [mybook, setMybook] = useState(null);
    const [lists, setLists] = useState([]);
    const [checked, setChecked] = useState(new Map());
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [library, setLibrary] = useState(new Map());
    const [userRating, setUserRating] = useState(0);

    useEffect(async() => {
        await firebaseApi.getBook(isbn).then((getRes) => {
            if(getRes == undefined)
            {
                firebaseApi.addBookByObject(isbn, book).then((addRes) => {
                    console.log(addRes)
                }).catch((e) => console.log(e))
            }
        });
    }, [])

    useEffect(() => {
        const getMybook = async () => {         
            const data = await googleApi.getBook(isbn).then(setLoading(false));
            const firebaseData = await firebaseApi.getBook(isbn);
            const image = data.items[0].volumeInfo.imageLinks ?
                <Image source={{ uri: data.items[0].volumeInfo.imageLinks.thumbnail }} style={[bookStyles.bookimage]} />
                : <Image
                    style={[bookStyles.bookimage]}
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

        const getLists = async (uid = user.uid) => {
            const fetchedLibrary = await firebaseApi.getUserLibrary(user.uid);
            setLibrary(fetchedLibrary)

            const categories = fetchedLibrary.map((item) => {
                return Object.getOwnPropertyNames(item)[0];
            });

            setLists(categories);

        }

        const getUserRating = async () => {
            const rating = await firebaseApi.getUserRating(isbn, user);
            setUserRating(rating);
        }

        getMybook();
        getLists();
        getUserRating();
    }, []);

    useEffect(() => {
        const updateChecked = () => {
            library.forEach((elem) => {
                const name = Object.getOwnPropertyNames(elem)[0];
                const values = elem[name]
                let existsInCategory = false;

                if (values.includes(isbn)) {
                    existsInCategory = true;
                }
                setChecked(prevState => prevState.set(name, existsInCategory))
            });
        }

        if (library !== undefined && library.length !== 0) {
            updateChecked();
        }
    }, [library, lists]);


    const handleCheckbox = (key, isChecked) => {
        setChecked(new Map(checked.set(key, isChecked)));
    }


    const handleAddButton = () => {
        checked.forEach((val, key) => {
            if (val === true) {
                firebaseApi.addBookToUserLibrary(user, key, isbn);
            } else {
                firebaseApi.removeBookFromUserLibrary(user, key, isbn);
            }
        });
    }

    const handleRating = (val) => {
        firebaseApi.addRating(user, isbn, val)
    }

    if (mybook != null && !loading) {
        return (
            <ScrollView>
                <View style={[bookStyles.pageView]}>
                    <View style={bookStyles.imageBox}>
                        {mybook.image}

                    </View>
                    <View style={bookStyles.Booktext}>
                        <Text style={bookStyles.booktitle} numberOfLines={2} adjustsFontSizeToFit>{mybook.title} </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>{'\n'}Author(s): </Text>
                            <Text>{mybook.author} </Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Publisher: </Text>
                            <Text>{mybook.publisher} </Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Published: </Text>
                            <Text>{mybook.date}</Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Language: </Text>
                            <Text>{mybook.language}</Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Pages: </Text>
                            <Text>{mybook.pages}</Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Genre: </Text>
                            <Text>{mybook.genres}</Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>Printtype: </Text>
                            <Text>{mybook.printtype}</Text>
                        </Text>
                        <Text style={bookStyles.bookAuthor}>
                            <Text style={{ fontWeight: "bold" }}>ISBN: </Text>
                            <Text>{mybook.Isbn}{'\n'}</Text>
                        </Text>
                        <Text style={bookStyles.bookDescription}>
                            <Text style={{ fontWeight: "bold" }}>Description:{'\n'}</Text>
                            <Text>{mybook.description}</Text>
                        </Text>
                        <Text style={bookStyles.bookRating}>{'\n'}{'\n'}
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={60}
                                showRating
                                startingValue={userRating}
                                onFinishRating={handleRating}
                                tintColor ='#F6EEE0'
                                ratingTextColor = '#000000'
                                fractions = {1}
                            />
                        </Text>

                    </View>
                    {!modalVisible &&

                        <Pressable
                            style={[bookStyles.button, bookStyles.openModalButton]}
                            onPress={() => setModalVisible(true)}>
                            <Text style={bookStyles.textStyle}>Add to list</Text>
                        </Pressable>
                    }
                    <ScrollView>
                        <AddToListModal
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            styles={bookStyles}
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
            <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                <Image
                    style={{ height: 250, width: 250 }}
                    source={require('../assets/Images/Loading.gif')}
                />
                <Text style={{ fontSize: 40 }}>Loading...</Text>
            </View>
        );
    }
}
