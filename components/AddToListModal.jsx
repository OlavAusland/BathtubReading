import React, { Modal, View, Text, ScrollView, Pressable } from "react-native";
import Checkbox from "expo-checkbox";

export const AddToListModal = (props) => {
    if (props.lists === undefined || props.checked === undefined) {
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
                        {props.checked.size > 0 &&
                            Array.from(props.checked).map(([key, value], index) => {
                                //console.log("Key " + key + " Value " + value);
                                return (
                                    <View key={'Samma det' + index}style={props.styles.section} >
                                        <Checkbox key={"checkbox-" + key} value={value} onValueChange={(isChecked) => props.handleCheckbox(key, isChecked)} />
                                        <View style={props.styles.namelist}>
                                        <Text>{key}</Text>
                                        </View>
                                    </View>
                                );
                            })

                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable

                            style={[props.newStyles.button, props.newStyles.buttonClose, { flex: 1 }]}
                            onPress={() => {props.handleAddButton();props.setModalVisible(!props.modalVisible)}}
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