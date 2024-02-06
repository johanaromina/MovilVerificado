import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
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
    // Agrega la lógica para guardar o actualizar el contacto
    if (modoEdicion && contactoSeleccionado) {
      // Actualiza el contacto existente
      const nuevosContactos = farmaciasGuardadas.map((contacto) =>
        contacto.id === contactoSeleccionado.id
          ? { ...contacto, nombreFarmacia, telefono, direccion }
          : contacto
      );
      setFarmaciasGuardadas(nuevosContactos);
      // Sale del modo de edición
      setModoEdicion(false);
    } else {
      // Guarda un nuevo contacto
      const nuevoContacto = {
        id: farmaciasGuardadas.length + 1,
        nombreFarmacia,
        telefono,
        direccion,
      };
      setFarmaciasGuardadas([...farmaciasGuardadas, nuevoContacto]);
    }

    // Limpia los campos después de guardar o actualizar
    setNombreFarmacia('');
    setTelefono('');
    setDireccion('');
  };

  const handleViewContacts = () => {
    // Agrega la lógica para ver los contactos guardados
  };

  const handleEditContact = (contacto) => {
    // Pone los detalles del contacto en los campos de entrada para editar
    setNombreFarmacia(contacto.nombreFarmacia);
    setTelefono(contacto.telefono);
    setDireccion(contacto.direccion);
    // Establece el modo de edición y guarda el contacto seleccionado
    setModoEdicion(true);
    setContactoSeleccionado(contacto);
  };

  const handleDeleteContact = (contacto) => {
    // Muestra un mensaje de confirmación antes de eliminar el contacto
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
            console.log('contacto.id:', contacto.id);
            // Filtra los contactos para excluir el que se va a eliminar
            const nuevosContactos = farmaciasGuardadas.filter((c) => {
              console.log('c.id:', c.id);
              return c.id !== contacto.id;
            });
            console.log('nuevosContactos:', nuevosContactos);
            setFarmaciasGuardadas(nuevosContactos);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
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
      {/* Agrega más campos de formulario según sea necesario */}

      {/* Lista de farmacias guardadas */}
      <Text style={styles.title}> Farmacias </Text>
      <FlatList
        data={farmaciasGuardadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <CheckBox
              checked={contactoSeleccionado && contactoSeleccionado.id === item.id}
              onPress={() => setContactoSeleccionado(item)}
            />
            <Text style={styles.column}>{item.nombreFarmacia}</Text>
            <Text style={styles.column}>{item.telefono}</Text>
            <Text style={styles.column}>{item.direccion}</Text>
            <Button title="Editar" onPress={() => handleEditContact(item)} buttonStyle={styles.editButton} />
            <Button title="Eliminar" onPress={() => handleDeleteContact(item)} buttonStyle={styles.deleteButton} />

          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Seleccionar</Text>
            <Text style={styles.columnHeader}>Farmacia</Text>
            <Text style={styles.columnHeader}>Teléfono</Text>
            <Text style={styles.columnHeader}>Dirección</Text>
            <Text style={styles.columnHeader}>Acciones</Text>
          </View>
        )}
      />

      {/* Botones */}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#228B22',
  },
  editButton: {
    backgroundColor: '#1E90FF',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
});

export default AddPharmacyScreen;



