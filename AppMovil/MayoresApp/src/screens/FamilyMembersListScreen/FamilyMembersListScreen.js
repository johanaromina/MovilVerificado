import React, { useState } from 'react';
import { View, Text, Modal, Image, StyleSheet, useWindowDimensions, Linking, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/native';

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
    let message = '';

    switch (alarmType) {
      case 'verde':
        message = 'Me encuentro bien';
        break;
      case 'amarilla':
        message = 'Hoy no es un buen día';
        break;
      case 'roja':
        message = 'Por favor ven a verme, no me siento bien';
        break;
      default:
        message = '';
    }

    const phoneNumber = '2604618942';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .then(() => {
        console.log('Mensaje enviado exitosamente');
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      });

    closeAlarmModal();
  };

  const handleSendWhatsapp = () => {
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
        source={require('../../../assets/foto1.png')}
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
        <TouchableOpacity onPress={() => openAlarmModal('roja')}>
          <View style={[styles.alarmButton, { backgroundColor: '#D50000' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openAlarmModal('amarilla')}>
          <View style={[styles.alarmButton, { backgroundColor: '#FFD600' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openAlarmModal('verde')}>
          <View style={[styles.alarmButton, { backgroundColor: '#388E3C' }]} />
        </TouchableOpacity>
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
});

export default FamilyMembersListScreen;
