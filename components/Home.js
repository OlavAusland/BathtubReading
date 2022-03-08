import { useEffect, useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView} from 'react-native';
import { Card } from 'react-native-paper'
import { db } from "../firebase-config.js";
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs } from "firebase/firestore";
import { navigation, usenavigationParam} from '@react-navigation/native';

export default function HomePage({ navigation })
{
    const auth = getAuth();
    const user = auth.currentUser;
    const [library, setLibrary] = useState([]);
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        const getLibrary = async() => {
            const data = await getDocs(collection(db, "Books"));
            setLibrary(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getLibrary();
    }, []);

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
    }, [logout])

    let img = require('../assets/Images/Profile/Default.png')
    
    //try{img = require('/home/olav/Documents/Programming/IKT205/midterm-project/assets/Images/Profile/' + user.photoURL);}
    //catch(error){console.log(error);}
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.avatar}
                //'../assets/Images/Profile/Hoodie_V6.png'
                source={img}
            />
            <Button title="Sign Out" onPress={() => setLogout(true)}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:64
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