import { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView} from 'react-native';
import { Card } from 'react-native-paper'
import { db, storage } from "../firebase-config.js";
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { navigation, usenavigationParam} from '@react-navigation/native';

export default function HomePage({ navigation })
{
    
    const auth = getAuth();
    
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState("");
    const [library, setLibrary] = useState([]);
    const [logout, setLogout] = useState(false);
    const [image, setImage] = useState("");

    useEffect(async () => {
        await getDownloadURL(ref(storage, user.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
        console.log(user.photoURL)
        const getLibrary = async() => {
            const data = await getDocs(collection(db, "Books"));
            setLibrary(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            console.log(library);
        };

        const getBook = async() => {
            const result = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:0735619670');
            const json = await result.json()
            const link = json.items[0].volumeInfo.imageLinks.thumbnail
            setImage(link);
            console.log(link)
        }
        getLibrary();
        getBook();
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

    if(user != null)
    {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={{borderRadius:250, width:250, height:250}}
                    //'../assets/Images/Profile/Hoodie_V6.png'
                    source={{uri: avatar}}
                />
                {image !== "" && 
                    <Image style={{width:'250px', height: '250px'}}
                        source={{uri: image}}
                    />
                }
                <Button title="Sign Out" onPress={() => setLogout(true)}/>
            </ScrollView>
        );
    }
    else{
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{fontSize:64}}>Loading...</Text>
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
        height:150
    }
})