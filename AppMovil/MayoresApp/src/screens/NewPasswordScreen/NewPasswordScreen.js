import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const navigation = useNavigation();

    const handleConfirmationPressed = () => {
        navigation.navigate('Sign In');
    };
    
    const handleReturnPressed = () => {
        navigation.goBack();
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root} >
                <Text style={styles.title} > Reiniciar contraseña </Text>

                <CustomInput
                    placeholder='Codigo de confirmacion'
                    value={confirmationCode}
                    setValue={setConfirmationCode}
                />

                <CustomInput
                    placeholder='Nueva contraseña'
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <CustomInput
                    placeholder='Repita nueva contraseña'
                    value={newPasswordRepeat}
                    setValue={setNewPasswordRepeat}
                />

                <CustomButton
                    onPress={handleConfirmationPressed}
                    text="Confirmar"
                />

                <CustomButton
                    onPress={handleReturnPressed}
                    text="Volver"
                    type='tertiary'
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        root: {
            alignItems: 'center',
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#051C60',
            margin: 10,
        },
        text: {
            color: 'grey',
            marginVertical: 10,
        },
        link: {
            color: '#FDB075',
        }
    }
)

export default NewPasswordScreen;