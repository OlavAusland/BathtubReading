import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TextInput, Image, Pressable} from 'react-native';
import { db } from '../firebase-config.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { loginStyle } from '../styles/LoginStyle'

export default function LoginPage({ navigation })
{
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(login)
        {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigation.navigate('BathubReading')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage);
                });

            setLogin(false);
        }
    }, [login])

    return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor:'#194a50'}}>
            <TextInput
                style={loginStyle.input}
                placeholder = "Email"
                onChangeText={updated => setEmail(updated)}/>
            <TextInput 
                style={loginStyle.input}
                secureTextEntry={true} 
                placeholder = "Password"
                onChangeText={updated => setPassword(updated)}/>
            
            <View style={{width: '80%'}}>
                {error && <Text style={{color:'rgb(255, 0, 0)', fontSize:18 , alignSelf:'center'}}>{error}</Text>}
                <Pressable
                    style={loginStyle.loginButtons}
                    onPress={() => setLogin(true)}>
                        <Text style={loginStyle.buttontext}>Login</Text>
                </Pressable>
                <Pressable
                    style={loginStyle.loginButtons}
                    onPress={() => navigation.navigate("Register")}>
                       <Text style={loginStyle.buttontext}> Register</Text>
                </Pressable>
                    
            </View>
        </View>
    );
}