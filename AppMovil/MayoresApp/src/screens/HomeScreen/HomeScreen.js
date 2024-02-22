import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import Communications from 'react-native-communications';

const HomeScreen = () => {
  const username = 'Johana';
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const emergencyContactNumber = ' 2604618642'; // Número de contacto de emergencia

  useEffect(() => {
    Voice.onSpeechResults = handleVoiceResults;

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
      Alert.alert('Error', 'Hubo un problema al iniciar el reconocimiento de voz. Por favor, inténtalo de nuevo.');
      setIsListening(false); // Asegurarse de desactivar el estado de "escuchando" en caso de error
    }
  
  
  };

  const handleVoiceResults = (results) => {
    const command = results[0].toLowerCase();
    console.log('Voice command:', command);
    
    switch (command) {
      case 'consultorios':
        navigateToScreen('Hospital List');
        break;
      case 'farmacia':
        navigateToScreen('Farmacy List');
        break;
      case 'familiares':
        navigateToScreen('Family Members List');
        break;
      case 'llamar al 911':
        handleCall911AndAlertFamily('911');
        break;
      default:
        Alert.alert('Comando no reconocido', 'Por favor, intenta nuevamente.');
    }

    setIsListening(false); // Desactiva el reconocimiento de voz después de procesar el comando
  };

  const navigateToScreen = (routeName) => {
    navigation.navigate(routeName);
  };

  const handleCall911AndAlertFamily = () => {
    console.log('Llamando al 911 y alertando a la familia');
    Promise.all([callEmergencyNumber('911'), sendWhatsAppAlert(emergencyContactNumber)])
      .then(() => {
        console.log('Acciones completadas correctamente.');
      })
      .catch((error) => {
        console.error('Error al realizar las acciones:', error);
      });
  };

  const callEmergencyNumber = (number) => {
    return new Promise((resolve, reject) => {
      Communications.phonecall(number, true);
      // Esto llama al número de emergencia sin necesidad de confirmación del usuario
      // Nota: Es posible que necesites permisos especiales para realizar llamadas de emergencia
      // Esto es solo un ejemplo, asegúrate de manejar los casos de éxito y error adecuadamente
      resolve();
    });
  };

  const sendWhatsAppAlert = (phoneNumber) => {
    return new Promise((resolve, reject) => {
      const message = '¡Abuelo en peligro! Por favor, ayuda.';
      Communications.textWithoutEncoding(phoneNumber, message);
      // Esto envía un mensaje de texto a través de WhatsApp al número especificado
      // Nota: Asegúrate de tener permisos adecuados y que el número sea válido
      // Esto es solo un ejemplo, asegúrate de manejar los casos de éxito y error adecuadamente
      resolve();
    });
  };

  const handleReturnPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hola, bienvenido a MayoresApp</Text>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/foto2.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.recognitionButtonContainer}>
            <CustomButton
              onPress={startVoiceRecognition}
              text={isListening ? 'Escuchando...' : 'Iniciar reconocimiento de voz'}
              type="tertiary"
              style={styles.button}
              disabled={isListening}
            />
          </View>

          <CustomButton
            onPress={handleCall911AndAlertFamily}
            text="Llamar al 911"
            backgroundColor="#D50000"
            foregroundColor="#FFFFFF"
            iconSize={50}
            style={[styles.button, styles.smallButton]}
          />

          <CustomButton
            onPress={() => navigateToScreen('Hospital List')}
            text="Consultorios"
            backgroundColor="#01579B"
            foregroundColor="#FFFFFF"
            iconSize={50}
            style={[styles.button, styles.smallButton]}
          />

          <CustomButton
            onPress={() => navigateToScreen('Farmacy List')}
            text="Farmacia"
            backgroundColor="#388E3C"
            foregroundColor="#FFFFFF"
            iconSize={50}
            style={[styles.button, styles.smallButton]}
          />

          <CustomButton
            onPress={() => navigateToScreen('Family Members List')}
            text="Familiares"
            backgroundColor="#FFD600"
            foregroundColor="#000000"
            iconSize={50}
            style={[styles.button, styles.smallButton]}
          />
        </View>
      </View>

      <CustomButton
        onPress={handleReturnPressed}
        text="Volver"
        type="tertiary"
        foregroundColor="#000000"
        backgroundColor="#7fffd4"
        style={[styles.button, styles.largeButton]}
      />

      <CustomButton
        onPress={() => navigateToScreen('Configuration')}
        text="Configuración"
        type="tertiary"
        foregroundColor="#000000"
        backgroundColor="#7fffd4"
        style={[styles.button, styles.largeButton]}
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
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombreado del texto
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del sombreado
    textShadowRadius: 10, // Radio del sombreado
},
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 20, // Espacio a la derecha para centrar la imagen
  },
  image: {
    width: 100, // Tamaño ajustado de la imagen
    height: 150,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  smallButton: {
    width: '45%', // Ajuste del ancho del botón
  },
  largeButton: {
    width: '100%', // Ajuste del ancho del botón
  },
  recognitionButtonContainer: {
    borderWidth: 1, // Añadir un borde al botón de reconocimiento de voz
    borderRadius: 10, // Ajustar el radio del borde
    borderColor: '#01579B', // Color del borde
  },
});

export default HomeScreen;
