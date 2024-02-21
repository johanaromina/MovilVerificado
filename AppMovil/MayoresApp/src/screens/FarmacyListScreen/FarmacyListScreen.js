import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const FarmacyListScreen = () => {
    const username = '';
    
    const navigation = useNavigation();

    const handleAddFarmacy = () => {
        navigation.navigate('AddPharmacy'); 
    }
    
    const handleCallPolice = () => {
        console.warn('Llamando a la policía');
    }

    const handleOpenMaps = () => {
        // Abre Google Maps para localizar farmacias cercanas.
        Linking.openURL('https://www.google.com/maps/search/farmacias');
    }

    const handleOpenCalendar = () => {
        // Agrega aquí la lógica para abrir la pantalla de calendario.
        navigation.navigate('Calendar');
    }

    const handleReturnPressed = () => {
        navigation.goBack(); // Esto llevará al usuario de regreso a la pantalla anterior.
    }

    const handleConfigurationPressed = () => {
        navigation.navigate('Configuration'); // Reemplaza 'Configuration' con el nombre de tu pantalla de configuración.
    }

    const handleExitPressed = () => {
        // Agrega aquí la lógica para salir de la aplicación.
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/foto4.png')}
                style={styles.image}
            />
            <Text style={styles.welcomeText}>¡Bienvenido {username}!</Text>

            <CustomButton
                onPress={handleCallPolice}
                text="Llamar al 911"
                backgroundColor="#D50000"
                foregroundColor="#FFFFFF"
                iconSize={50}
            />

            <CustomButton
                onPress={handleOpenMaps}
                text="Localizar Farmacias"
                backgroundColor="#1976D2"
                foregroundColor="#FFFFFF"
                iconSize={50}
            />

            <CustomButton
                onPress={handleAddFarmacy}
                text="Agregar Farmacias"
                backgroundColor="#388E3C"
                foregroundColor="#FFFFFF"
                iconSize={50}
            />

            <CustomButton
                onPress={handleOpenCalendar}
                text="Calendario"
                backgroundColor="#FFD600"
                foregroundColor="#000000"
                iconSize={50}
            />

            <CustomButton
                onPress={handleReturnPressed}
                text="Volver"
                type="tertiary"
            />

            <CustomButton
                onPress={handleConfigurationPressed}
                text="Configuración"
                type="tertiary"
            />

            <CustomButton
                onPress={handleExitPressed}
                text="Salir"
                type="tertiary"
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
        width: '13%', // Ajusta el ancho de la imagen según tus necesidades.
        height: '25%', // Ajusta la altura de la imagen según tus necesidades.
        marginBottom: 2,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default FarmacyListScreen;
