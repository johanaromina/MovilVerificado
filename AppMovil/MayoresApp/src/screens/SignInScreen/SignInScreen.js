import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignInPressed = async () => {
        try {
            const response = await axios.post('http://localhost:3300/login', {
                username,
                password,
            });
            
            if (response.data) {
                // Si la respuesta del servidor es exitosa, navega a la pantalla de inicio
                navigation.navigate('Home');
            } else {
                // Si las credenciales son incorrectas, muestra un mensaje de error
                Alert.alert('Error', 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error', 'Hubo un error en la solicitud');
        }
    };

    const handleForgotPasswordPressed = () => {
        // Lógica para la pantalla de "Olvidé mi contraseña"
        navigation.navigate('Forgot Password');
    };

    const handleRegisterPressed = () => {
        // Lógica para la pantalla de "Registro"
        navigation.navigate('Register');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.root}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../assets/foto3.png')}
                        style={styles.image}
                    />
                    <Text style={styles.appName}>MayoresApp</Text>
                </View>

                <CustomInput
                    placeholder='Nombre de usuario'
                    value={username}
                    setValue={setUsername}
                />

                <CustomInput
                    placeholder='Contraseña'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomButton
                    onPress={handleSignInPressed}
                    text="Ingresar"
                    style={[styles.button, styles.greenButton]}
                    foregroundColor="#FFFFFF"
                />

                <CustomButton
                    onPress={handleForgotPasswordPressed}
                    text="Olvidé mi contraseña"
                    type='tertiary'
                    style={styles.button}
                />

                <SocialSignInButtons />

                <CustomButton
                    onPress={handleRegisterPressed}
                    text="No tengo cuenta"
                    type='tertiary'
                    style={styles.button}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(180, 238, 180, 0.5)',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        padding: 10,
        marginTop: 20,
        fontFamily: 'Arial',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    button: {
        marginVertical: 10,
    },
    greenButton: {
        backgroundColor: '#3CB371',
    },
});

export default SignInScreen;




