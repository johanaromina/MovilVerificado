import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AddFamiliarScreen = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [familiares, setFamiliares] = useState([]);
  const [familiarSeleccionado, setFamiliarSeleccionado] = useState(null);
  const navigation = useNavigation();

  const handleAddFamiliar = () => {
    const newFamiliar = {
      id: Date.now(), // Generar un ID único para el familiar
      nombre,
      telefono,
      email,
    };

    setFamiliares([...familiares, newFamiliar]);
    // Limpiar los campos del formulario después de agregar un familiar
    setNombre('');
    setTelefono('');
    setEmail('');
  };

  const handleSelectFamiliar = (familiar) => {
    setFamiliarSeleccionado(familiar);
  };

  const handleDeleteFamiliar = (id) => {
    const updatedFamiliares = familiares.filter((familiar) => familiar.id !== id);
    setFamiliares(updatedFamiliares);
    // Si el familiar seleccionado se elimina, deseleccionarlo
    if (familiarSeleccionado && familiarSeleccionado.id === id) {
      setFamiliarSeleccionado(null);
    }
  };

  const renderFamiliarItem = ({ item }) => (
    <View style={styles.familiarItem}>
      <TouchableOpacity onPress={() => handleSelectFamiliar(item)}>
        <Text style={[styles.familiarItemText, item.id === familiarSeleccionado?.id && styles.selectedItem]}>
          {item.nombre}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteFamiliar(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Agregar Familiar</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.addButtonContainer}>
          <CustomButton
            onPress={handleAddFamiliar}
            text="Agregar"
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Familiares Guardados:</Text>
        <FlatList
          data={familiares}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFamiliarItem}
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
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
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  familiarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  familiarItemText: {
    fontSize: 16,
  },
  selectedItem: {
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignSelf: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddFamiliarScreen;
