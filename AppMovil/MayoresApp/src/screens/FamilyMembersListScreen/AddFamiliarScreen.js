import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AddFamiliarScreen = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleAddFamiliar = () => {
    const newFamiliar = {
      nombre,
      telefono,
      email,
    };

    const apiUrl = 'http://192.168.0.120:3300/agregar-familiar';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFamiliar),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        navigation.navigate('FamilyMembersListScreen');
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // Manejo de errores
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Familiar</Text>
      <CustomInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <CustomInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomButton
        onPress={() => {
          handleAddFamiliar();
        }}
        text="Agregar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AddFamiliarScreen;
