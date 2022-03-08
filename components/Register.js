import { View, Text, TextInput, StyleSheet, Button, Image} from 'react-native'
import { getAuth, createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../firebase-config.js';
import { ref, uploadBytes } from 'firebase/storage';

export default function RegisterPage({ navigation })
{
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [image, setImage] = useState();
    const [password, setPassword] = useState("");
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
            aspect: [4, 3],
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
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.photoURL = user.uid + '_pp';
                    updateProfile(userCredential.user, {photoURL: user.photoURL})
                    uploadImage(user.photoURL)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
            setRegister(false);
        }
    }, [register])

    return (

        <View style={styles.container}>
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
                <Button style={styles.button} title="Register" onPress={() => setRegister(true)}/>
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