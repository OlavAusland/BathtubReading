import React, { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, Modal, TextInput, Pressable, ModalDropdown } from 'react-native';
import { db, storage } from "../firebase-config.js";
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref} from 'firebase/storage';
import { getBook, setBook } from '../API/GoogleAPI'
import { getFirebaseBooks, getUserLibrary } from '../API/FirebaseAPI'
import { profileStyle } from './Styles.jsx'; 

export default function ProfilePage({ navigation })
{
    
    const auth = getAuth();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState("");
    const [library, setLibrary] = useState([]);
    const [logout, setLogout] = useState(false);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(async () => {
        await getDownloadURL(ref(storage, user.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
        const library = await getUserLibrary(user.uid).then(setLoading(false));
        console.log(library)
    }, [user]);

    useEffect(async() => {
        const getMybooks = async () => {
            const firebaseData = await getFirebaseBooks();
            return firebaseData;
          }
          const books = await getMybooks();
          setLibrary(books);
          setBook('9783319195957')

    }, []); 

    useEffect(async() => {
        const getLibrary = async() => {
            const result = await getDocs(collection(db, "Books"));
            const data = result.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setLibrary(data)
        };
        getLibrary();
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
    
    if(user != null && !loading)
    {
        return (
            <View style={[styles.container, {flexDirection:'column'}]}>
                <Modal
                    animationType="slide"
                    statusBarTranslucent={true}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={profileStyle.modal}>
                        <View style={profileStyle.modalView}>
                            <View style={{flex:6, paddingTop:10}}>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Username</Text>
                                        <View style={{flex:1}}/>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput style={profileStyle.input}>{user.displayName}</TextInput>
                                        <Pressable style={[profileStyle.checkAvailabilityButton, {flex:1}]}
                                        
                                        ><Text>Check Availabilty</Text></Pressable>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Email:</Text>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput style={profileStyle.input}>{user.email}</TextInput>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Password:</Text>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput secureTextEntry={true} style={profileStyle.input}/>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Retype Password:</Text>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput secureTextEntry={true} style={profileStyle.input}/>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:6}}/>
                            <View style={{flex:2, flexDirection:'row', width:'100%', backgroundColor:'#F6EEE0'}}>
                                <Pressable
                                        style={profileStyle.modalButton}
                                        title={'Close'}
                                        onPress={() => {setModalVisible(false); }}>
                                    <Text style={{fontSize:18, fontWeight:'bold'}}>Update</Text>
                                </Pressable>
                                <Pressable
                                        style={profileStyle.modalButton}
                                        onPress={() => {setModalVisible(false); }}
                                    >
                                    <Text style={{fontSize:18, fontWeight:'bold'}}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={profileStyle.header}>
                    <View style={{justifyContent:'center', paddingRight:25}}>
                        <Image style={styles.avatar}
                                source={{uri: avatar}}
                        />
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24}}>{user.displayName}</Text>
                        <Text style={{fontSize:18}}>{user.email}</Text>
                    </View>
                </View>
                <View style={profileStyle.settings}>
                    <Pressable onPress={() => setModalVisible(true)} style={profileStyle.settingsButton}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Settings</Text>
                    </Pressable>
                </View>
                <View style={profileStyle.content}>
                    <View style={{flex:2}}>
                        <Text style={{fontWeight:'bold', fontSize:30}}>Favorites</Text>
                        <ScrollView style={profileStyle.list} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {library.length > 0 &&
                            library.map((book) => {
                                return (
                                    <View>
                                        <Image style={profileStyle.image} onPress={() => {navigation.navigate('Book')}} source={{uri: book.imageURI}}/>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={{flex:1}}></View>
                    <View style={{flex:3,width:'90%'}}>
                        <ScrollView style={{borderWidth:2}}horizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {library.length > 0 &&
                                [0,1,2].map((num) => {
                                   return (
                                    <View>
                                        <Text style={{fontWeight:'bold', fontSize:30}}>This</Text>
                                        <ScrollView horizontal={true}>
                                            {library.length > 0 &&
                                            library.map((book) => {
                                                return (
                                                    <View>
                                                        <Image style={profileStyle.image} onPress={() => {navigation.navigate('Book')}} source={{uri: book.imageURI}}/>
                                                    </View>
                                                );
                                            })}
                                        </ScrollView>
                                    </View>
                                   );
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </View> 
        );
    }
    else{
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image
                    style={{height:250, width:250}}
                    source={require('../assets/Images/Loading.gif')}
                />
                <Text style={{fontSize:40}}>Loading...</Text>
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
        maxWidth:'90%',
        maxHeight:170,
        padding:5,
        shadowColor:'rgba(0, 0, 0, 0.5)',
        shadowOffset: {height:10, width:10},
        shadowRadius:10,
        borderWidth:2,
        borderRadius:15,
        overlayColor:'rgba(0, 0, 0, 0)' 
    }
})