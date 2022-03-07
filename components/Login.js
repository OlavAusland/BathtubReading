import { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TextInput } from 'react-native';
import { db } from '../firebase-config.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


export default function LoginPage({ navigation })
{
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    
    const [user, setUser] = useState({});

    useEffect(() => {
        if(register){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setUser(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
            setRegister(false);
        }
    }, [register])

    useEffect(() => {
        if(login)
        {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    setUser(userCredential.user.metadata)
                    console.log(user)
                    console.log(user)
                    navigation.navigate('Home')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });

            setLogin(false);
        }
    }, [login])

    return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flex:0.75}}>
            <TextInput
                style={styles.input}
                placeHolder="Email"
                onChangeText={updated => setEmail(updated)}/>
            <TextInput 
                style={styles.input}
                secureTextEntry={true} 
                placeHolder="Password"
                onChangeText={updated => setPassword(updated)}/>
            
            <View style={{width: '80%'}}>
                <Button
                    title="Login"
                    onPress={() => setLogin(true)}/>
                <Button
                    title="Register"
                    onPress={() => setRegister(true)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
});