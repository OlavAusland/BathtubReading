import React, { View, Text, TextInput, StyleSheet, Button, Image, Pressable } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase-config.js';
import { ref, uploadBytes } from 'firebase/storage';
import { initUser } from '../API/FirebaseAPI';
import { registersStyles } from '../styles/RegisterStyle';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function RegisterPage({ navigation }) {
    const auth = getAuth();
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(false);


    useEffect(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status != 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        setImage(result);
    }

    const uploadImage = async (name) => {
        if (!image.cancelled) {
            const img = await fetch(image.uri);
            const bytes = await img.blob();
            await uploadBytes(ref(storage, name), bytes);
            navigation.navigate("Login")
        }
    }

    useEffect(async () => {
        if (register) {
            console.log(loading)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.photoURL = user.uid + '_pp';
                    user.displayName = username;
                    initUser(user.uid);
                    updateProfile(userCredential.user, { photoURL: user.photoURL, displayName: user.displayName })
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
        <View style={registersStyles.container}>
            {<Text style={{ color: '#FF0000' }}>{error}</Text>}
            {loading &&
                <Image
                    style={{ height: 150, width: 150 }}
                    source={require('../assets/Images/Loading.gif')}
                />
            }
            <TextInput
                style={registersStyles.input}
                onChangeText={updated => setUsername(updated)}
                placeholder="Username" />
            <TextInput
                style={registersStyles.input}
                onChangeText={updated => setEmail(updated)}
                placeholder="Email" />
            <TextInput
                style={registersStyles.input}
                secureTextEntry={true}
                onChangeText={updated => setPassword(updated)}
                placeholder="Password" />
            <View style={{ width: '80%' }}>
                <Pressable style={registersStyles.registerButtons} onPress={pickImage}>
                    <Text style={registersStyles.buttontext}>
                        Upload Image
                    </Text>
                </Pressable>
                <Pressable style={registersStyles.registerButtons} onPress={() => { setLoading(true); setRegister(true) }}>
                    <Text style={registersStyles.buttontext}>
                        Register
                    </Text>
                </Pressable>
                <Pressable style={registersStyles.registerButtons} title="Back" onPress={() => navigation.navigate("Login")} >
                    <Text style={registersStyles.buttontext}>
                        Back
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

