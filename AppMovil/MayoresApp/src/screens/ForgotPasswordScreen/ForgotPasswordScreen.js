import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleConfirmationPressed = () => {
        navigation.navigate('New Password');
    }

    const handleReturnPressed = () => {
        navigation.goBack();
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root} >
                <Text style={styles.title} > Reiniciar contraseña </Text>

                <CustomInput
                    placeholder='Correo electronico'
                    value={email}
                    setValue={setEmail}
                />

                <CustomButton
                    onPress={handleConfirmationPressed}
                    text="Enviar"
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

export default ForgotPasswordScreen;