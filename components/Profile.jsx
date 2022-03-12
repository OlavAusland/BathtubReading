import React, { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView} from 'react-native';
import { Card } from 'react-native-paper'
import { db, storage } from "../firebase-config.js";
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { navigation, usenavigationParam} from '@react-navigation/native';
import { getBook } from '../API/GoogleAPI'
import { getFirebaseBooks } from '../API/FirebaseAPI'
export default function ProfilePage({ navigation })
{
    
    const auth = getAuth();
    
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState("");
    const [library, setLibrary] = useState([]);
    const [logout, setLogout] = useState(false);
    const [image, setImage] = useState("");
    const [book, setBook] = useState();

    useEffect(async () => {
        await getDownloadURL(ref(storage, user.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
    }, [user]);

    useEffect(async() => {
        const getMybooks = async () => {
            const firebaseData = await getFirebaseBooks();
            return firebaseData;
          }
          const books = await getMybooks();
          setLibrary(books);
    }, []); 

    useEffect(async() => {
        const getLibrary = async() => {
            const result = await getDocs(collection(db, "Books"));
            const data = result.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setLibrary(data)
        };
        getLibrary();
        const book = await getBook("9780132856201");
        setBook(book)
    }, [])
    
    useEffect(() => {
        if(logout)
        {
            signOut(auth).then(() => {
                console.log("Logged Out")
                navigation.navigate('Login')
            }).catch((error) => {
                console.log(error);
            })
            setLogout(false);
        }
    }, [logout]);

    if(user != null)
    {
        return (
            <View style={[styles.container, {flexDirection:'column'}]}>
                <View style={{ flex: 1, flexDirection:'row', justifyContent:'center', paddingTop:25}}>
                    <View style={{justifyContent:'center', paddingRight:25}}>
                        <Image style={styles.avatar}
                                source={{uri: avatar}}
                        />
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Olav Ausland Onstad</Text>
                        <Text>olavausland@hotmail.com</Text>
                    </View>
                </View>
                <View style={{flex: 2, alignItems:'center'}}>
                    <View style={{flex:1}}> 
                        <Text style={{fontWeight:'bold', fontSize:30}}>Favorites</Text>
                        <ScrollView style={styles.list} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {library.length > 0 &&
                            library.map((book) => {
                                return (
                                    <View>
                                        <Image style={{width:150, height:150}} source={{uri: book.imageURI}}/>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={{flex:1}}>

                    </View>
                    <Button title="Sign Out" onPress={() => setLogout(true)}/>
                </View>
            </View> 
        );
    }
    else{
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{fontSize:64}}>Loading...</Text>
                <Image
                    source={require('../assets/Images/Loading.gif')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems: 'center',
    },
    card:{
        width:'75%',
        height:'20%',
        shadowOffset: {width:0, height:6},
        shadowColor: '#000000'
    },
    avatar:{
        width:150,
        height:150,
        borderRadius:150,
        overlayColor:'rgba(0, 0, 0, 0)'
    },
    scroller:{
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowRadius: 6,
        shadowOffset: {width:0, height:6}
    },
    list:{
        width:'80%',
        maxHeight:170,
        padding:5,
        shadowColor:'rgba(0, 0, 0, 0.5)',
        shadowOffset: {height:10, width:10},
        shadowRadius:10,
        borderWidth:2,
        borderRadius:15
    }
})