import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { profileStyle } from '../../styles/ProfileStyles';
import { AddUserList } from '../../api/firebaseAPI';
import { getAuth } from 'firebase/auth';

export const ProfileListModal = (props) => {
    const user = getAuth().currentUser;
    const [listName, setListName] = useState('');

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
                    <View style={{flex:8, width:'100%', height:'100%'}}>
                        <View>
                            <Text style={{color:'white', fontSize:60, marginTop:'17%', marginLeft:'17%'}}>Add List</Text>
                            <TextInput placeholder='List Name' style={{marginTop:'20%',marginLeft:50, width:'70%', height:50, fontSize:20, borderRadius:10, backgroundColor:'white'}} onChange={(e) => setListName(e.nativeEvent.text)}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', width:'100%', height:'100%', backgroundColor:'white'}}>
                        <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={async() => {await AddUserList(user, listName)}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Add</Text>
                        </Pressable>
                        <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={() => {props.setModalVisible(!props.modalVisible)}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}