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
            // Aquí iba la lógica de conexión a la base de datos 
         
            navigation.navigate('Home');
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
                    style={[styles.button, styles.greenButton]} // Estilos combinados para el botón verde
                    foregroundColor="#FFFFFF" // Color del texto del botón en blanco
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
        backgroundColor: 'rgba(180, 238, 180, 0.5)', // Fondo de color degradado
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
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombreado del texto
        textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del sombreado
        textShadowRadius: 10, // Radio del sombreado
    },
    button: {
        marginVertical: 10, // Espacio vertical entre botones
    },
    greenButton: {
        backgroundColor: '#3CB371', // Nuevo tono de verde
    },
});

export default SignInScreen;



