import React, { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, Modal, TextInput, Pressable, ModalDropdown } from 'react-native';
import { db, storage } from "../firebase-config.js";
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref} from 'firebase/storage';
import { getBook, setBook } from '../API/GoogleAPI'
import { getFirebaseBooks, getFirebaseBook, getUserLibrary, updateUser } from '../API/FirebaseAPI'
import { profileStyle } from './Styles.jsx'; 
import { map, stringify } from '@firebase/util';

function DisplayUserLists(library)
{
    return [...Array.from(library.keys())].map((key) => {
        if(key == 'favorites'){return;}
        return(
            <View key={ Math.random().toString(36).substr(2, 9)}>
                <Text style={{fontWeight:'bold', fontSize:30}}>{key.toUpperCase()}</Text>
                <ScrollView horizontal={true}>
                    {library.get(key).map((book, index) => {
                        return(
                            <View key={`${key}-${index}`}>
                                <Image
                                    style={profileStyle.image}
                                    source={{uri:book.imageURI}}
                                />
                                <Text style={{overflow:'hidden'}}>{book.title}</Text>
                            </View>
                            
                        );
                    })}
                </ScrollView>
            </View>
        )
    })
}

async function GetUserListsInformation(user)
{
    let userLibrary = [];
    let isbnArray = new Map();
    let keys = []
    const lists = await getUserLibrary(user.uid);
    console.log(lists)
    lists.map((list) => {
        return Object.keys(list).map((key) => {
            let temp = [];
            [...Array(list[key].length).keys()].map((i) => {
                temp.push(getFirebaseBook(list[key][i]))
            })
            keys.push(key)
            isbnArray.set(key, temp)
        })
    });
    
    const resolve = async() => {
        const test = new Map()
        for(let i = 0; i < keys.length;i++)
        {
            await Promise.all(isbnArray.get(keys[i])).then((res) => {test.set(keys[i], res);});
        }
        return test;
    }


    return resolve();
}   

export default function ProfilePage({ navigation })
{
    console.log("---------- PROFILE_PAGE ----------")
    const auth = getAuth();
    const [checked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState("");
    const [library, setLibrary] = useState(new Map());
    const [logout, setLogout] = useState(false);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState(user.displayName);
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    useEffect(async() => {
        await getDownloadURL(ref(storage, user.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
        const test = await GetUserListsInformation(user);
        setLibrary(test)
        
        console.log('\n\n\n\n\n')
    }, [user]);

    useEffect(async() => {
        const getMybooks = async () => {
            const firebaseData = await getFirebaseBooks();
            return firebaseData;
          }
          const books = await getMybooks();
          //setLibrary(books);
          //setBook('9783319195957')

    }, []); 

    useEffect(async() => {
        const getLibrary = async() => {
            const result = await getDocs(collection(db, "Books"));
            const data = result.docs.map((doc) => ({...doc.data(), id: doc.id}));
            //setLibrary(data)
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
                                        <TextInput
                                            onChangeText={updated => setUsername(updated)}
                                            style={profileStyle.input}>{user.displayName}
                                        </TextInput>
                                        <Pressable style={[profileStyle.checkAvailabilityButton, {flex:1}]}
                                        
                                        ><Text>Check Availabilty</Text></Pressable>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Email:</Text>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput
                                            editable={false}
                                            style={[profileStyle.input, {backgroundColor:'lightgrey'}]}>{user.email}
                                        </TextInput>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Password:</Text>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput onChangeText={updated => setPassword(updated)} 
                                        secureTextEntry={true} style={profileStyle.input}/>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <Text style={{flex:1}}>Retype Password:</Text>
                                    </View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        <TextInput 
                                            onChangeText={updated => setRetypedPassword(updated)} 
                                            secureTextEntry={true} style={profileStyle.input}/>
                                    </View>
                                </View>
                                <View>
                                    <View style={{flexDirection:'row', minWidth:'100%'}}>
                                        {password != retypedPassword &&
                                            <Text style={{color:'red', fontWeight:'bold'}}>Password Does Not Match!</Text>
                                        }
                                        {passwordError != "" &&
                                            <Text style={{color:'red', fontWeight:'bold'}}>{passwordError}</Text>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:6}}/>
                            <View style={{flex:2, flexDirection:'row', width:'100%', backgroundColor:'#F6EEE0'}}>
                                <Pressable
                                        style={profileStyle.modalButton}
                                        onPress={async() => {updateUser(username, password);
                                            if(password == retypedPassword && password != "")
                                            {
                                                await updatePassword(auth.currentUser, password).then(setPasswordError("")).catch((error) => 
                                                {console.log(error);setPasswordError(error.errorMessage)});
                                            }setModalVisible(false);}}
                                        >
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
                    <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
                        <Image style={profileStyle.avatar}
                                source={{uri: avatar}}
                        />
                    </View>
                    <View style={{flex:10, flexDirection:'column', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24}}>{user.displayName}</Text>
                        <Text style={{fontSize:18}}>{user.email}</Text>
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
                                library.get('favorites').map((obj) => {
                                    return(
                                        <View>
                                            <Image
                                                style={profileStyle.image}
                                                source={{uri:obj.imageURI}}
                                            />
                                            <Text>{obj.title}</Text>
                                        </View>
                                    )
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