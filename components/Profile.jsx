import React, { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, Modal, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { db, storage } from "../firebase-config.js";
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref} from 'firebase/storage';
//import { getBook } from '../api/googleAPI'
import { getBooks, updateUser } from '../api/firebaseAPI'
import { profileStyle } from '../styles/ProfileStyles' 
import BookPage from './Book.jsx';
import { DisplayUserLists } from './profile/DisplayUserLists.jsx';
import { GetUserListsInformation } from './profile/GetUserListsInformation.jsx';
import { ProfileModal } from './profile/ProfileModal.jsx';


export default function ProfilePage({ navigation })
{
    const auth = getAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState("");
    const [library, setLibrary] = useState(new Map());
    const [logout, setLogout] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(async() => {
        await getDownloadURL(ref(storage, user.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
        const userBooks = await GetUserListsInformation(user);
        setLibrary(userBooks)
    }, [user]);

    useEffect(async() => {
        const getMybooks = async () => {
            const firebaseData = await getBooks();
            return firebaseData;
          }
          const books = await getMybooks();

    }, []); 

    useEffect(async() => {
        const getLibrary = async() => {
            const result = await getDocs(collection(db, "Books"));
            const data = result.docs.map((doc) => ({...doc.data(), id: doc.id}));
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
            <View style={[profileStyle.container, {flexDirection:'column'}]}>
                <ProfileModal modalVisible={modalVisible} user={user} setModalVisible={setModalVisible}/>
                <View style={profileStyle.header}>
                    <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
                        <Image style={profileStyle.avatar}
                                source={avatar ? {uri: avatar} : require('../assets/Images/NoImage.jpg')} // HANDLING FOR NO IMAGE
                        />
                    </View>
                    <View style={{flex:10, flexDirection:'column', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24, color:'white'}}>{user.displayName}</Text>
                        <Text style={{fontSize:18, color:'white'}}>{user.email}</Text>
                    </View>
                </View>
                 <View style={profileStyle.settings}>
                    <Pressable onPress={() => setModalVisible(true)} style={profileStyle.settingsButton}>
                        <Text style={{flex:1, fontSize:20, fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Settings</Text>
                    </Pressable>
                </View>
                <View style={profileStyle.content}>
                    <View style={{flex:3, width:'90%'}}>
                        <Text style={{fontWeight:'bold', fontSize:30}}>FAVORITES</Text>
                        <ScrollView style={profileStyle.list} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {library.size > 0 && 
                                library.get('favorites').map((obj, index) => {
                                    if(obj != undefined)
                                    {
                                        return(
                                            <View key={'book-' + index}>
                                                <Image
                                                    style={profileStyle.image}
                                                    source={obj.image ? {uri: obj.image} : '../assets/Images/NoImage.jpg'}
                                                />
                                                <Text>{obj.title ? obj.title: 'Unknown'}</Text>
                                            </View>
                                        )
                                    }
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={{flex:1}}></View>
                    <View style={{flex:3,width:'90%'}}>
                        <ScrollView style={{borderWidth:2}}horizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {DisplayUserLists(library)}
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