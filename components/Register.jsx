import React, { View, Text, TextInput, StyleSheet, Button, Image} from 'react-native'
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../firebase-config.js';
import { ref, uploadBytes } from 'firebase/storage';
import { initFirebaseUser } from '../API/FirebaseAPI.js';

export default function RegisterPage({ navigation })
{
    const auth = getAuth();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(false);

    
    useEffect(async() => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status != 'granted'){
                alert('Sorry, we need camera roll permissions to make this work!');
            }
    }, []);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        setImage(result);
    }

    const uploadImage = async(name) => {
        if(!image.cancelled){
            const img = await fetch(image.uri);
            const bytes = await img.blob();
            await uploadBytes(ref(storage, name), bytes);
            navigation.navigate("Login")
        }
    }
    
    useEffect(async() => {
        if(register){
            console.log(loading)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.photoURL = user.uid + '_pp';
                    user.displayName = "Olav Ausland Onstad";
                    initFirebaseUser(user.uid);
                    updateProfile(userCredential.user, {photoURL: user.photoURL, displayName: user.displayName})
                    uploadImage(user.photoURL)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage);
                    setLoading(false);
                });
            setRegister(false);
        }
    }, [register])

    return (
        <View style={styles.container}>
            {<Text style={{color:'#FF0000'}}>{error}</Text>}
            {loading && 
                <Image
                    style={{height: 150, width: 150}}
                    source={require('../assets/Images/Loading.gif')}
                />
            }
            <TextInput
                style={styles.input}
                placeHolder="Email"
                onChangeText={updated => setEmail(updated)}/>
            <TextInput 
                style={styles.input}
                secureTextEntry={true} 
                placeHolder="Password"
                onChangeText={updated => setPassword(updated)}/>
            <View style={{width:'80%'}}>
                <Button title="Upload Image" onPress={pickImage}/>
                <Button style={styles.button} title="Register" onPress={() => {setLoading(true); setRegister(true)}}/>
                <Button style={styles.button} title="Back" onPress={() => navigation.navigate("Login")}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex:1,
        alignItems:'center'
    },
    input: {
        width: '80%',
        color: "#FFFFFF",
        fontSize: 18,
        backgroundColor: "#AFAAFA",
        borderRadius:8,
        padding:5,
        marginBottom:20,
        height:40,
        shadowColor: '#171717',
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    button:{
        width:'450px'
    }
})