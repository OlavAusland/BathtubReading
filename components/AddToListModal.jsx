import React, { Modal, View, Text, ScrollView, Pressable } from "react-native";
import Checkbox from "expo-checkbox";

export const AddToListModal = (props) => {
    if (props.lists === undefined || props.checkList === undefined) {
        return <div>Fakk off</div>
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => { props.setModalVisible(!props.modalVisible); }}
            StatusBarTranslucent={true}
        >
            <View>
                <View style={props.newStyles.modalView}>
                    <Text style={props.newStyles.modalText} numberOfLines={1} adjustsFontSizeToFit>Choose List</Text>
                    <ScrollView contentContainerStyle={props.styles.namelist}>
                        {props.lists.length > 0 &&
                            props.lists.map((name, id) => {
                                if (props.checkList[id] !== undefined) {
                                    return (
                                        <Checkbox key={"checkbox-" + props.checkList[id]} value={props.checkList[id]} onclick={(e) => props.handleCheckbox(e)}>
                                            <Text>{name}</Text> 
                                            </Checkbox>
                                    );
                                }
                            })

                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable

                            style={[props.newStyles.button, props.newStyles.buttonClose, { flex: 1 }]}
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                            <Text style={props.newStyles.textStyle}>Add</Text>
                        </Pressable>
                        <Pressable
                            style={[props.newStyles.button, props.newStyles.buttonClose, { flex: 1 }]}
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                            <Text style={props.newStyles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}