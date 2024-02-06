import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

const HomeScreen = () => {
  const username = 'Johana';
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = (results) => {
      handleVoiceCommand(results[0]);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoiceRecognition = async () => {
    try {
      setIsListening(true);
      await Voice.start('es-ES');
    } catch (error) {
      console.error('Error al iniciar el reconocimiento de voz:', error);
    }
  };

  const handleVoiceCommand = (command) => {
    if (command.toLowerCase() === 'llamar al 911') {
      handleCall911AndAlertFamily();
    }
  };

  const handleCall911AndAlertFamily = () => {
    console.log('Llamando al 911 y alertando a la familia');
    // Agrega aquí la lógica para llamar al 911 y alertar a la familia
  };

  const handleHospitalListPressed = () => {
    navigation.navigate('Hospital List');
  };

  const handleFarmacyListPressed = () => {
    navigation.navigate('Farmacy List');
  };

  const handleFamilyMembersListPressed = () => {
    navigation.navigate('Family Members List');
  };

  const handleConfigurationPressed = () => {
    navigation.navigate('Configuration');
  };

  const handleReturnPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/foto2.png')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>¡Bienvenido, {username}!</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={startVoiceRecognition}
          text={isListening ? 'Escuchando...' : 'Iniciar reconocimiento de voz'}
          type="tertiary"
          style={styles.button}
          disabled={isListening}
        />

        <CustomButton
          onPress={handleCall911AndAlertFamily}
          text="Llamar al 911"
          backgroundColor="#D50000"
          foregroundColor="#FFFFFF"
          iconSize={50}
          style={styles.button}
        />

        <CustomButton
          onPress={handleHospitalListPressed}
          text="Consultorios"
          backgroundColor="#01579B"
          foregroundColor="#FFFFFF"
          iconSize={50}
          style={styles.button}
        />

        <CustomButton
          onPress={handleFarmacyListPressed}
          text="Farmacia"
          backgroundColor="#388E3C"
          foregroundColor="#FFFFFF"
          iconSize={50}
          style={styles.button}
        />

        <CustomButton
          onPress={handleFamilyMembersListPressed}
          text="Familiares"
          backgroundColor="#FFD600"
          foregroundColor="#000000"
          iconSize={50}
          style={styles.button}
        />
      </View>

      <CustomButton
        onPress={handleReturnPressed}
        text="Volver"
        type="tertiary"
        style={styles.button}
      />

      <CustomButton
        onPress={handleConfigurationPressed}
        text="Configuración"
        type="tertiary"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FBFC',
  },
  image: {
    width: '5%',
    height: '15%',
    marginBottom: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '40%',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default HomeScreen;

