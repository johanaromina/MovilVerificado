import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';

import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AddMedicoScreen = () => {
    const [patologia, setPatologia] = useState('');
    const [consultorio, setConsultorio] = useState('');
    const [profesional, setProfesional] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [savedMedicos, setSavedMedicos] = useState([]);
    const navigation = useNavigation();

    const patologias = [
        'Cardiología',
        'Clínica',
        'Dermatología',
        'Diabetología',
        'Traumatología',
        'Inmunología',
        'Neurología',
        'Psiquiatría',
        'Psicología',
        'Laboratorio de Análisis Clínicos',
        'Imágenes Médicas',
    ];

    const handleSaveMedico = () => {
        if (patologia && consultorio && profesional && telefono && domicilio) {
            const nuevoMedico = {
                patologia: patologia,
                consultorio: consultorio,
                profesional: profesional,
                telefono: telefono,
                domicilio: domicilio,
            };
            const nuevosMedicos = [...savedMedicos, nuevoMedico];
            setSavedMedicos(nuevosMedicos); // Actualizar el estado con los nuevos médicos
            resetForm();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    const resetForm = () => {
        setPatologia('');
        setConsultorio('');
        setProfesional('');
        setTelefono('');
        setDomicilio('');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleCallMedico = (telefono) => {
        if (telefono) {
            Linking.openURL(`tel:${telefono}`);
        }
    };

    const handleEditMedico = (index) => {
        const medico = savedMedicos[index];
        setPatologia(medico.patologia);
        setConsultorio(medico.consultorio);
        setProfesional(medico.profesional);
        setTelefono(medico.telefono);
        setDomicilio(medico.domicilio);
        const nuevosMedicos = savedMedicos.filter((med, idx) => idx !== index);
        setSavedMedicos(nuevosMedicos);
    };

    const handleDeleteMedico = (index) => {
        const nuevosMedicos = savedMedicos.filter((med, idx) => idx !== index);
        setSavedMedicos(nuevosMedicos);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar Profesional Médico</Text>
            <View style={styles.inputContainer}>
                <Text>Seleccione la patología:</Text>
                <View style={styles.picker}>
                    {patologias.map((pat, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setPatologia(pat)}
                            style={[
                                styles.patologiaButton,
                                { backgroundColor: patologia === pat ? '#1976D2' : '#DDDDDD' },
                            ]}
                        >
                            <Text>{pat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Consultorio"
                value={consultorio}
                onChangeText={setConsultorio}
            />
            <TextInput
                style={styles.input}
                placeholder="Profesional Médico"
                value={profesional}
                onChangeText={setProfesional}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
            />
            <TextInput
                style={styles.input}
                placeholder="Domicilio"
                value={domicilio}
                onChangeText={setDomicilio}
            />
            <CustomButton
                onPress={handleSaveMedico}
                text="Guardar"
                backgroundColor="#1976D2"
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    onPress={handleGoBack}
                    text="Volver"
                    backgroundColor="#4CAF50"
                />
            </View>
            <View style={styles.savedMedicos}>
                <Text style={styles.savedMedicosTitle}>Profesionales Médicos Guardados:</Text>
                {savedMedicos.map((medico, index) => (
                    <TouchableOpacity key={index} style={styles.medicoItem}>
                        <Text style={styles.medicoText}>Patología: {medico.patologia}</Text>
                        <Text style={styles.medicoText}>Consultorio: {medico.consultorio}</Text>
                        <Text style={styles.medicoText}>Profesional: {medico.profesional}</Text>
                        <Text style={styles.medicoText}>Teléfono: {medico.telefono}</Text>
                        <Text style={styles.medicoText}>Domicilio: {medico.domicilio}</Text>
                        <View style={styles.buttonGroup}>
                            <CustomButton
                                onPress={() => handleCallMedico(medico.telefono)}
                                text="Llamar"
                                backgroundColor="#2196F3"
                            />
                            <CustomButton
                                onPress={() => handleEditMedico(index)}
                                text="Editar"
                                backgroundColor="#4CAF50"
                            />
                            <CustomButton
                                onPress={() => handleDeleteMedico(index)}
                                text="Eliminar"
                                backgroundColor="#F44336"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    picker: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    patologiaButton: {
        marginRight: 10,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
    },
    savedMedicos: {
        marginTop: 20,
    },
    savedMedicosTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    medicoItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F0F8FF',
        borderRadius: 10,
        elevation: 3,
    },
    medicoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default AddMedicoScreen;

