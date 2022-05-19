import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginStyle } from '../styles/LoginStyle';


export default function LoginPage({ navigation }) {

    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (login) {
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
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#194a50' }}>
            <View style={{ marginBottom: 60 }}>
                <Icon name="user-circle-o" size={200} color="#FFFFFF" />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ height: '85%', marginRight: 10 }}>
                    <Icon name="envelope" size={30} color="#FFFFFF" />
                </View>
                <TextInput
                    style={loginStyle.input}
                    placeholder="Email"
                    onChangeText={updated => setEmail(updated)}
                />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ height: '85%', marginRight: 10 }}>
                    <Icon name="key" size={30} color="#FFFFFF" />
                </View>
                <TextInput
                    style={loginStyle.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={updated => setPassword(updated)} />
            </View>

            {error && <Text style={{ color: 'rgb(255, 0, 0)', fontSize: 18, alignSelf: 'center' }}>{error}</Text>}
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ height: '60%', marginRight: 10 }}>
                    <Icon name="user-o" size={30} color="#FFFFFF" />
                </View>
                <Pressable
                    style={loginStyle.loginButtons}
                    onPress={() => setLogin(true)}>
                    <Text style={loginStyle.buttontext}>Login</Text>
                </Pressable>
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ height: '60%', marginRight: 3 }}>
                    <Icon name="user-plus" size={30} color="#FFFFFF" />
                </View>
                <Pressable
                    style={loginStyle.loginButtons}
                    onPress={() => navigation.navigate("Register")}>
                    <Text style={loginStyle.buttontext}> Register</Text>
                </Pressable>
            </View>
        </View>
    );
}