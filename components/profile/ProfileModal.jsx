import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { profileStyle } from '../../styles/ProfileStyles';

export const ProfileModal = (props) => {
    const [username, setUsername] = useState(props.user ? props.user.displayName : "");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return(
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            props.setModalVisible(!props.modalVisible);
            }}
        >
            <View style={profileStyle.modal}>
                <View style={profileStyle.modalView}>
                    <View style={{flex:6, paddingTop:10}}>
                        <View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <Text style={{flex:1, color:"white",  marginLeft: 15}}>Username</Text>
                                <View style={{flex:1}}/>
                            </View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <TextInput
                                    onChangeText={updated => setUsername(updated)}
                                    style={profileStyle.input}>{props.user.displayName}
                                </TextInput>
                                <Pressable style={[profileStyle.checkAvailabilityButton, {flex:1}]}
                                
                                ><Text>Check Availabilty</Text></Pressable>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <Text style={{flex:1, color:"white", marginLeft: 15}}>Email:</Text>
                            </View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <TextInput
                                    editable={false}
                                    style={[profileStyle.input, {backgroundColor:'lightgrey'}]}>{props.user.email}
                                </TextInput>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <Text style={{flex:1, color:"white",  marginLeft: 15}}>Password:</Text>
                            </View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <TextInput onChangeText={updated => setPassword(updated)} 
                                secureTextEntry={true} style={profileStyle.input}/>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row', minWidth:'100%'}}>
                                <Text style={{flex:1, color:"white", marginLeft: 15}}>Retype Password:</Text>
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
                                    }props.setModalVisible(false);}}
                                >
                            <Text style={{fontSize:18, fontWeight:'bold'}}>Update</Text>
                        </Pressable>
                        <Pressable
                                style={profileStyle.modalButton}
                                onPress={() => {props.setModalVisible(false); }}
                            >
                            <Text style={{fontSize:18, fontWeight:'bold'}}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}