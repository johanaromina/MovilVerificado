import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
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
      id: Date.now(),
      nombre,
      telefono,
      email,
    };

    setFamiliares([...familiares, newFamiliar]);
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
    if (familiarSeleccionado && familiarSeleccionado.id === id) {
      setFamiliarSeleccionado(null);
    }
  };

  const handleCallFamiliar = (telefono) => {
    const url = `tel:${telefono}`;
    Linking.openURL(url)
      .then(() => {
        console.log(`Llamando a ${telefono}`);
      })
      .catch((error) => {
        console.error('Error al intentar realizar la llamada:', error);
      });
  };
  
  const handleEditFamiliar = (familiar) => {
    // Implementa la lógica para editar el familiar seleccionado
    console.log('Editando familiar:', familiar);
    // Por ahora, esta función simplemente imprimirá en la consola el familiar seleccionado.
  };
  

  const renderFamiliarItem = ({ item }) => (
    <View style={styles.familiarItem}>
      <TouchableOpacity onPress={() => handleSelectFamiliar(item)}>
        <Text style={[styles.familiarItemText, item.id === familiarSeleccionado?.id && styles.selectedItem]}>
          {item.nombre}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleCallFamiliar(item.telefono)}>
          <Text style={[styles.actionButton, styles.callButton]}>Llamar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditFamiliar(item)}>
          <Text style={[styles.actionButton, styles.editButton]}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteFamiliar(item.id)}>
          <Text style={[styles.actionButton, styles.deleteButton]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  callButton: {
    backgroundColor: '#00bcd4',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
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
