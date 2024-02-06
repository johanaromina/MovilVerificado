import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);
    const navigation = useNavigation();

    const handleCreateAccountPressed = async () => {
        try {
            // Validaciones de campos
            if (!username || !email || !password || password !== passwordRepeat) {
                Alert.alert('Error', 'Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan');
                return;
            }
    
            console.log('Solicitud de registro enviada:', { username, email, password });

    
            const response = await axios.post('http://192.168.0.120:3300/Register', {
                username,
                email,
                password,
            });
    
            if (response.status === 200) {
                setAccountCreated(true);
                Alert.alert('Éxito', 'La cuenta se creó exitosamente');
                // Puedes navegar a la pantalla de inicio de sesión u otra pantalla después de crear la cuenta
                navigation.navigate('Sign In');
            } else {
                const data = await response.data;
                Alert.alert('Error', `Hubo un error en la solicitud: ${data.error}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error', 'Hubo un error en la solicitud');
        }
    };
    
    const handleSignInPressed = () => {
        navigation.navigate('Sign In');
    };

    const handleTermsPressed = () => {
        console.warn('términos');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}> Crear Cuenta </Text>

                <CustomInput
                    placeholder='Usuario'
                    value={username}
                    setValue={setUsername}
                />

                <CustomInput
                    placeholder='Correo Electrónico'
                    value={email}
                    setValue={setEmail}
                />

                <CustomInput
                    placeholder='Contraseña'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomInput
                    placeholder='Repetir contraseña'
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />

                <CustomButton
                    onPress={handleCreateAccountPressed}
                    text="Crear cuenta"
                />

                <Text style={styles.text}>
                    Al registrar declaro que acepto los{' '}
                    <Text style={styles.link} onPress={handleTermsPressed}>
                        términos y condiciones
                    </Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    onPress={handleSignInPressed}
                    text="Ya tengo cuenta"
                    type='tertiary'
                />
            </View>
        </ScrollView>
    );
};

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
);

export default RegisterScreen;
