import React, { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, Modal, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { db, storage } from "../firebase-config.js";
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { collection, getDocs, onSnapshot, doc} from "firebase/firestore";
import { getDownloadURL, ref} from 'firebase/storage';
//import { getBook } from '../api/googleAPI'
import { getBooks, updateUser } from '../api/firebaseAPI'
import { profileStyle } from '../styles/ProfileStyles' 
import { DisplayUserLists } from './profile/DisplayUserLists.jsx';
import { GetUserListsInformation } from './profile/GetUserListsInformation.js';
import { ProfileModal} from './profile/ProfileModal.jsx';
import { ProfileListModal } from './profile/ProfileListModal.jsx';
import { getAllGenres, addGenre, AddUserList, RemoveUserList, getUserLibrary} from '../api/firebaseAPI';
import { async } from '@firebase/util';


export default function ProfilePage({ navigation })
{
    const auth = getAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [listModalVisible, setListModalVisible] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState("");
    const [library, setLibrary] = useState(new Map());
    const [logout, setLogout] = useState(false);    
    const [loading, setLoading] = useState(false);

    useEffect(() => {getAllGenres()}, [])

    
    useEffect(async()=> {
     
        const unsub = onSnapshot(doc(db, "Users", user.uid), async(doc) => {
            if(doc.data()) {
                console.log("UPDATED")
                const lib = []
                Object.keys(doc.data()['libraries']).forEach((key) => {lib.push({[key]: Array.from(new Set(doc.data()['libraries'][key]))})})
                await GetUserListsInformation(user, lib).then((res) => {setLibrary(res)});
            }
        }); 
    
    },[])

    useEffect(async() => {
        await getDownloadURL(ref(storage, user.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
        await getUserLibrary(user.uid).then(
            async(res) => {
                //console.log(res);
                await GetUserListsInformation(user, res).then((lists) => {setLibrary(lists)});
            }
        );
    }, [user]);

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
                <ProfileListModal modalVisible={listModalVisible} user={user} setModalVisible={setListModalVisible}/>
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
                <View style={{ flex:1, flexDirection:'row', width:'100%', alignItems:'center', backgroundColor: "#FFFFFF", borderBottomColor: 'black'}}>
                    <Pressable onPress={() => setModalVisible(true)} style={{flex:1, alignSelf:'center'}}>
                        <Text style={{flex:1, fontSize:20, fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Settings</Text>
                    </Pressable>
                    <Pressable onPress={() => setListModalVisible(true)} style={{flex:1, alignSelf:'center'}}>
                        <Text style={{flex:1, fontSize:20, fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>Add List</Text>
                    </Pressable>
                </View>
                <View style={profileStyle.content}>
                <Text style={{fontSize:30, marginTop:10, marginBottom: 10}}>My Lists:</Text>
                    <View style={{flex:4,width:'90%'}}>
                        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {DisplayUserLists(library, navigation, user)}
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