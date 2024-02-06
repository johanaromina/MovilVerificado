import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const MailConfirmationScreen = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const navigation = useNavigation();

    const handleConfirmationPressed = () => {
        navigation.navigate('Sign In');
    }

    const handleResendPressed = () => {
        console.info('Enviado');
    }

    const handleReturnPressed = () => {
        navigation.goBack();
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root} >
                <Text style={styles.title} > Confirmar correo electronico </Text>

                <CustomInput
                    placeholder='Ingrese el codigo que te llegó al correo electronico'
                    value={confirmationCode}
                    setValue={setConfirmationCode}
                />

                <CustomButton
                    onPress={handleConfirmationPressed}
                    text="Confirmar"
                />

                <CustomButton
                    onPress={handleResendPressed}
                    text="No me llegó nada, reenviar"
                    type='secondary'
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

export default MailConfirmationScreen;