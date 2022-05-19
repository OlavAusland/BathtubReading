import React, { Modal, View, Text, ScrollView, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { bookStyles } from '../../styles/BookStyles.jsx';   

export const AddToListModal = (props) => {
    if (props.lists === undefined || props.checked === undefined) {
        return <Text>List nor found</Text>
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => { props.setModalVisible(!props.modalVisible); }}
            StatusBarTranslucent={true}
            
        >
            <View style={{ top:'15%'}}>
                <View style={bookStyles.modalView}>
                    <Text style={bookStyles.modalTitel} numberOfLines={1} adjustsFontSizeToFit>Choose List</Text>
                    <ScrollView >
                        {props.checked.size > 0 &&
                            Array.from(props.checked).map(([key, value], index) => {
                                return (
                                    <View key={'key' + index}style={bookStyles.checkboxView} >
                                        <Checkbox style={bookStyles.checkBoxStyle} key={"checkbox-" + key} value={value} onValueChange={(isChecked) => props.handleCheckbox(key, isChecked)} />
                                        <Text style={bookStyles.checkboxtext}>{key}</Text>
                                    </View>
                                );
                            })

                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable

                            style={[ bookStyles.modalButton, { flex: 1 }]}
                            onPress={() => {props.handleAddButton();props.setModalVisible(!props.setModalVisible)}}
                        >
                            <Text style={bookStyles.textStyle}>Add</Text>
                        </Pressable>
                        <Pressable
                            style={[ bookStyles.modalButton, { flex: 1 }]}
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                            <Text style={bookStyles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}