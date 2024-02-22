import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Alert, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const AddPharmacyScreen = () => {
  const [farmaciasGuardadas, setFarmaciasGuardadas] = useState([]);
  const [nombreFarmacia, setNombreFarmacia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSaveContact = () => {
    if (modoEdicion && contactoSeleccionado) {
      const nuevosContactos = farmaciasGuardadas.map((contacto) =>
        contacto.id === contactoSeleccionado.id
          ? { ...contacto, nombreFarmacia, telefono, direccion }
          : contacto
      );
      setFarmaciasGuardadas(nuevosContactos);
      setModoEdicion(false);
    } else {
      const nuevoContacto = {
        id: farmaciasGuardadas.length + 1,
        nombreFarmacia,
        telefono,
        direccion,
      };
      setFarmaciasGuardadas([...farmaciasGuardadas, nuevoContacto]);
    }
    setNombreFarmacia('');
    setTelefono('');
    setDireccion('');
  };

  const handleViewContacts = () => {
    // Lógica para ver los contactos guardados
  };

  const handleEditContact = (contacto) => {
    setNombreFarmacia(contacto.nombreFarmacia);
    setTelefono(contacto.telefono);
    setDireccion(contacto.direccion);
    setModoEdicion(true);
    setContactoSeleccionado(contacto);
  };

  const handleDeleteContact = (contacto) => {
    Alert.alert(
      'Eliminar Contacto',
      'Si desea eliminar el contacto definitivamente presione Eliminar',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            const nuevosContactos = farmaciasGuardadas.filter((c) => c.id !== contacto.id);
            setFarmaciasGuardadas(nuevosContactos);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleCallContact = (telefono) => {
    if (telefono) {
      Linking.openURL(`tel:${telefono}`);
    } else {
      Alert.alert('Error', 'No se ha proporcionado un número de teléfono.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Farmacia</Text>
      <TextInput
        placeholder="Nombre de la farmacia"
        style={styles.input}
        value={nombreFarmacia}
        onChangeText={(text) => setNombreFarmacia(text)}
      />
      <TextInput
        placeholder="Teléfono"
        style={styles.input}
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
      />
      <TextInput
        placeholder="Dirección"
        style={styles.input}
        value={direccion}
        onChangeText={(text) => setDireccion(text)}
      />
      <FlatList
        data={farmaciasGuardadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <CheckBox
              checked={contactoSeleccionado && contactoSeleccionado.id === item.id}
              onPress={() => setContactoSeleccionado(item)}
            />
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{item.nombreFarmacia}</Text>
              <Text style={styles.contactText}>{item.telefono}</Text>
              <Text style={styles.contactText}>{item.direccion}</Text>
            </View>
            <View style={styles.contactActions}>
              <Button
                title="Editar"
                onPress={() => handleEditContact(item)}
                buttonStyle={styles.actionButton}
              />
              <Button
                title="Eliminar"
                onPress={() => handleDeleteContact(item)}
                buttonStyle={styles.actionButton}
              />
              <Button
                title="Llamar"
                onPress={() => handleCallContact(item.telefono)}
                buttonStyle={styles.callButton}
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Click</Text>
            <Text style={styles.columnHeader}>Farmacia</Text>
            <Text style={styles.columnHeader}>Teléfono</Text>
            <Text style={styles.columnHeader}>Dirección</Text>
            <Text style={styles.columnHeader}>Acciones</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Volver" onPress={handleGoBack} buttonStyle={styles.button} />
        <Button title="Guardar" onPress={handleSaveContact} buttonStyle={styles.button} />
        <Button title="Ver Contactos" onPress={handleViewContacts} buttonStyle={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 10,
  },
  contactText: {
    marginBottom: 3,
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: '#32CD32',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#228B22',
  },
});

export default AddPharmacyScreen;


