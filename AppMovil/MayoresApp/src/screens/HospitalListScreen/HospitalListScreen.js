import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';

const HospitalListScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedPathology, setSelectedPathology] = useState(null);
    const [savedContacts, setSavedContacts] = useState([]);
    const [newContact, setNewContact] = useState({
        consultorio: '',
        medico: '',
        telefono: '',
        direccion: '',
    });
    const navigation = useNavigation();

    const handleSavePressed = () => {
        if (newContact.consultorio && newContact.medico) {
            setSavedContacts([...savedContacts, { ...newContact, selected: false }]);
            setNewContact({
                consultorio: '',
                medico: '',
                telefono: '',
                direccion: '',
            });
        }
    }

    const handleReturnPressed = () => {
        navigation.goBack();
    }

    const handleCallContact = (index) => {
        // Implementa la lógica para realizar una llamada al número de teléfono del contacto aquí.
        // Utiliza una librería como 'react-native-communications' para gestionar llamadas.
    }

    const handleToggleContact = (index) => {
        const updatedContacts = [...savedContacts];
        updatedContacts[index].selected = !updatedContacts[index].selected;
        setSavedContacts(updatedContacts);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Lista de consultorios</Text>

            <CustomInput
                placeholder="Ingrese número de teléfono"
                value={phoneNumber}
                setValue={setPhoneNumber}
            />

            <CustomButton
                onPress={handleSavePressed}
                text="Buscar"
                style={styles.button}
            />

            <View style={styles.pathologyButtons}>
                <Text>Seleccione una patología:</Text>
                <CustomButton
                    onPress={() => setSelectedPathology('Diabetes')}
                    text="Diabetes"
                    style={styles.pathologyButton}
                />
                <CustomButton
                    onPress={() => setSelectedPathology('Cardiología')}
                    text="Cardiología"
                    style={styles.pathologyButton}
                />
                <CustomButton
                    onPress={() => setSelectedPathology('Psiquiatría')}
                    text="Psiquiatría"
                    style={styles.pathologyButton}
                />
                <CustomButton
                    onPress={() => setSelectedPathology('Neurología')}
                    text="Neurología"
                    style={styles.pathologyButton}
                />
                <CustomButton
                    onPress={() => setSelectedPathology('Acompañante Terapéutico')}
                    text="Acompañante Terapéutico"
                    style={styles.pathologyButton}
                />
                {/* Agrega más patologías aquí */}
            </View>

            {selectedPathology && (
                <View style={styles.contactForm}>
                    <Text>Agregar nuevo contacto para {selectedPathology}:</Text>
                    <CustomInput
                        placeholder="Nombre del consultorio"
                        value={newContact.consultorio}
                        setValue={(value) => setNewContact({ ...newContact, consultorio: value })}
                    />
                    <CustomInput
                        placeholder="Nombre del médico"
                        value={newContact.medico}
                        setValue={(value) => setNewContact({ ...newContact, medico: value })}
                    />
                    <CustomInput
                        placeholder="Número de teléfono"
                        value={newContact.telefono}
                        setValue={(value) => setNewContact({ ...newContact, telefono: value })}
                    />
                    <CustomInput
                        placeholder="Dirección"
                        value={newContact.direccion}
                        setValue={(value) => setNewContact({ ...newContact, direccion: value })}
                    />
                    <CustomButton
                        onPress={handleSavePressed}
                        text="Guardar"
                        style={styles.button}
                    />
                </View>
            )}

            {savedContacts.map((contact, index) => (
                <View key={index} style={styles.contactItem}>
                    <View style={styles.contactTextContainer}>
                        <Text style={styles.contactText}>{contact.medico} - {contact.consultorio}</Text>
                        {contact.selected ? (
                            <Text style={styles.selectedText}>✓</Text>
                        ) : null}
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonRow}>
                            <CustomButton
                                onPress={() => handleToggleContact(index)}
                                text={contact.selected ? "Deseleccionar" : "Seleccionar"}
                                style={styles.toggleButton}
                            />
                            <CustomButton
                                onPress={() => handleCallContact(index)}
                                text="Llamar"
                                style={styles.callButton}
                        />
            </View>
        </View>
    </View>
))}


       

            <CustomButton
                onPress={handleReturnPressed}
                text="Volver"
                type="tertiary"
                style={styles.button}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#7FFFD4', // Fondo verde claro
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#b0c4de', 
    },
    pathologyButtons: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: '#7FFFD4',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
    },
    pathologyButton: {
        backgroundColor: '#7fff00', 
        margin: 5,
    },
    contactForm: {
        marginTop: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#b0c4de', 
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'space-between',
    },
    contactTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedContact: {
        backgroundColor: '#7FFFD4', 
    },
    contactText: {
        fontSize: 16,
    },
    selectedText: {
        fontSize: 24,
    },
    toggleButton: {
        backgroundColor: '#90ee90', // Botón "Seleccionar" en verde
        marginBottom: 10, // Espacio entre los botones
    },
    callButton: {
        backgroundColor: '#7fff00', 
        marginBottom: 10, 
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default HospitalListScreen;

