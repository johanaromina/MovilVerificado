import React, { useState } from 'react';
import { View, Text, Modal, Image, StyleSheet, useWindowDimensions } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/native';

import logo from '../../../assets/foto1.png';

const FamilyMembersListScreen = () => {
  const username = '...';
  const { height, width } = useWindowDimensions(); // Obtén dimensiones de la pantalla
  const [modalVisible, setModalVisible] = useState(false);
  const [alarmType, setAlarmType] = useState('');

  const navigation = useNavigation(); 
  
  const handleAddFamiliar = () => {
    navigation.navigate('AddFamiliarScreen');
  };



  const callPolice = () => {
    console.warn('Llamando a la policía');
  };

  const callFamilyMember = () => {
    console.warn('Llamando a Martín');
  };

  const handleConfigurationPressed = () => {
    // Navegar a la pantalla de configuración.
  };

  const openAlarmModal = (type) => {
    setAlarmType(type);
    setModalVisible(true);
  };

  const closeAlarmModal = () => {
    setModalVisible(false);
  };

  const sendAlarm = () => {
    // Implementar la lógica para enviar una alarma por WhatsApp al familiar seleccionado.
    // usar librerías como 'react-native-communications' para abrir WhatsApp.
    closeAlarmModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenida/o {username}</Text>
      <Image
        source={logo}
        style={[styles.logo, { height: height * 0.3, width: width * 0.7 }]}
        resizeMode="contain"
      />
      <Text style={styles.emergencyText}>Si tienes una emergencia, llama a {username}</Text>

      
      <CustomButton
        onPress={handleAddFamiliar}
        text="Agregar Familiar" 
        backgroundColor="#008B8B"
        foregroundColor="#FFFFFF"
      />
      

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={callPolice}
          text="Llamar a la policía"
          backgroundColor="#7cfc00"
          foregroundColor="#FFFFFF"
        />
        <Text style={styles.sendAlarmText}>Envía una alarma:</Text>
        <CustomButton
          onPress={() => openAlarmModal('red')}
          text="Alarma Roja"
          backgroundColor="#D50000"
          foregroundColor="#FFFFFF"
        />
        <CustomButton
          onPress={() => openAlarmModal('yellow')}
          text="Alarma Amarilla"
          backgroundColor="#FFD600"
          foregroundColor="#000000"
        />
        <CustomButton
          onPress={() => openAlarmModal('green')}
          text="Alarma Verde"
          backgroundColor="#388E3C"
          foregroundColor="#FFFFFF"
        />
        <CustomButton
          onPress={callFamilyMember}
          text="Llamar a familiar"
          backgroundColor="#ff6347"
          foregroundColor="#FFFFFF"
        />
        <CustomButton
          onPress={handleConfigurationPressed}
          text="Configuración"
          type="tertiary"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeAlarmModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enviar Alarma {alarmType}</Text>
          <CustomInput placeholder="Mensaje" />
          <CustomButton onPress={sendAlarm} text="Enviar" />
          <CustomButton onPress={closeAlarmModal} text="Cancelar" type="tertiary" />
        </View>
      </Modal>

      <CustomButton
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
        text="Volver a la pantalla principal"
        backgroundColor="#483d8b"
        foregroundColor="#FFFFFF"  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  sendAlarmText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    alignItems: 'flex-start', // Cambia de 'center' a 'flex-start'
    marginLeft: 20, // Agrega un margen a la izquierda
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    maxHeight: 200,
  },
});

export default FamilyMembersListScreen;
