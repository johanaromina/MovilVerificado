import React, { useState } from 'react';
import { View, Text, Modal, Image, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { sendWhatsapp } from 'react-native-send-intent'; // Importa sendWhatsapp
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/native';

import logo from '../../../assets/foto1.png';

const FamilyMembersListScreen = () => {
  const username = '...';
  const { height, width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [alarmType, setAlarmType] = useState('');

  const navigation = useNavigation(); 

  const handleAddFamiliar = () => {
    navigation.navigate('AddFamiliar');
  };

  const callFamilyMember = () => {
    const phoneNumber = '2604618942'; // Reemplaza esto con el número de teléfono del familiar
    Linking.openURL(`tel:${phoneNumber}`);
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
    closeAlarmModal();
  };

  const handleSendWhatsapp = () => {
    // Reemplaza '+5492604618942' con el número de teléfono al que deseas enviar el mensaje
    // y 'Mensaje de prueba' con el mensaje que deseas enviar.
    const phoneNumber = '+5492604618942';
    const message = 'Mensaje de prueba';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url).then((data) => {
      console.log('WhatsApp abierto');
    }).catch(() => {
      console.log('Error al abrir WhatsApp');
    });
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenida/o {username}</Text>
      <Image
        source={logo}
        style={[styles.logo, { height: height * 0.3, width: width * 0.7 }]}
        resizeMode="contain"
      />
      
      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleAddFamiliar}
          text="Agregar Familiar" 
          backgroundColor="#008B8B"
          foregroundColor="#FFFFFF"
        />
      </View>

      <Text style={styles.alarmTitle}>Alarmas</Text>
      <View style={styles.alarmContainer}>
        <View style={styles.semaphore}>
          <View style={[styles.alarmButton, { backgroundColor: '#D50000' }]} />
          <View style={[styles.alarmButton, { backgroundColor: '#FFD600' }]} />
          <View style={[styles.alarmButton, { backgroundColor: '#388E3C' }]} />
        </View>
      </View>
      
      <Text style={styles.emergencyText}>Si tienes una emergencia, llama a {username}</Text>
      <CustomButton
        onPress={callFamilyMember}
        text="Llamar a familiar"
        backgroundColor="#ff6347"
        foregroundColor="#FFFFFF"
        style={styles.bottomButton}
      />
      <CustomButton
        onPress={handleSendWhatsapp}
        text="Enviar mensaje por WhatsApp"
        backgroundColor="#25D366"
        foregroundColor="#FFFFFF"
        style={styles.bottomButton}
      />

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
          navigation.goBack();
        }}
        text="Volver"
        backgroundColor="#6ebf6e"
        foregroundColor="#FFFFFF"  
        style={[styles.bottomButton, { marginBottom: 20 }]}
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
  alarmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bottomButton: {
    width: '45%',
    marginHorizontal: '2.5%',
    marginBottom: 10,
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
    maxHeight: 100,
  },
  alarmContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinea los botones a la derecha
    marginBottom: 20,
  },
  alarmButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  semaphore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FamilyMembersListScreen;
