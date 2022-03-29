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
                    <Text>HEI</Text>
                </View>
            </View>
        </Modal>
    );
}