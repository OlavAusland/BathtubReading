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
                                return (
                                    <View key={'Samma det' + index}style={props.styles.section} >
                                        <Checkbox style={props.checkBoxStyle} key={"checkbox-" + key} value={value} onValueChange={(isChecked) => props.handleCheckbox(key, isChecked)} />
                                        <Text style={props.checkboxtext}>{key}</Text>
                                       
                                    </View>
                                );
                            })

                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable

                            style={[ props.newStyles.buttonClose, { flex: 1 }]}
                            onPress={() => props.handleAddButton()}
                        >
                            <Text style={props.newStyles.textStyle}>Add</Text>
                        </Pressable>
                        <Pressable
                            style={[ props.newStyles.buttonClose, { flex: 1 }]}
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