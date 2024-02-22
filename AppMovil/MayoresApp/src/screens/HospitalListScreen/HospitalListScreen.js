import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const HospitalListScreen = () => {
    const [savedContacts, setSavedContacts] = useState([]);
    const navigation = useNavigation();

    // Función para agregar un médico
    const handleAddMedico = () => {
        navigation.navigate('AddMedicoScreen');
    };

    // Función para buscar consultorios en Google Maps
    const handleSearchConsultorios = () => {
        // Implementa la lógica para buscar consultorios en Google Maps aquí
    };

    // Función para llamar a un médico
    const handleCallMedico = (telefono) => {
        if (telefono) {
            Linking.openURL(`tel:${telefono}`);
        }
    };

    // Función para volver a la pantalla principal
    const handleReturnHome = () => {
        navigation.navigate('Home'); // Navega a la pantalla principal
    };

    return (
        <ImageBackground source={require('../../../assets/background.jpg')} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Lista de consultorios</Text>

                {/* Botón para agregar un médico */}
                <CustomButton
                    onPress={handleAddMedico}
                    text="Agregar Profesional Médico"
                    backgroundColor="#4682B4"
                    fontSize={18}
                    fontWeight="bold"
                />

                {/* Botón para buscar consultorios en Google Maps */}
                <CustomButton
                    onPress={handleSearchConsultorios}
                    text="Buscar Consultorios en Google Maps"
                    backgroundColor="#87CEFA"
                    fontSize={18}
                    fontWeight="bold"
                />

                {/* Listado de médicos guardados */}
                {savedContacts.map((contact, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCallMedico(contact.telefono)}>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactText}>Médico: {contact.nombreMedico}</Text>
                            <Text style={styles.contactText}>Teléfono: {contact.telefono}</Text>
                            {/* Agrega más información sobre el médico si es necesario */}
                            <CustomButton
                                onPress={() => handleCallMedico(contact.telefono)}
                                text="Llamar"
                                backgroundColor="#87CEFA"
                                fontSize={16}
                                fontWeight="bold"
                            />
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Botón para volver a la pantalla principal */}
                <CustomButton
                    onPress={handleReturnHome}
                    text="Volver a Home"
                    type="tertiary"
                    backgroundColor="#32CD32"
                    fontSize={16}
                    fontWeight="bold"
                />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    contactItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F0F8FF',
        borderRadius: 10,
        elevation: 3,
    },
    contactText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default HospitalListScreen;
