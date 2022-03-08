import { View, Text, TextInput, StyleSheet, Button} from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function RegisterPage({ navigation })
{
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    
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
            navigation.navigate("Home")
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