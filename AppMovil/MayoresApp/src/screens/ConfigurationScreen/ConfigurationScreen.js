import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleHospitalListPressed = () => {
        navigation.navigate("Hospital List");
    }
    
    const handleFarmacyListPressed = () => {
        navigation.navigate("Farmacy List");
    }
    
    const handleFamilyMembersListPressed = () => {
        navigation.navigate("Family Members List");
    }

    const handleReturnPressed = () => {
        navigation.goBack();
    }

    return (
        <View>
            <Text>Configuración</Text>

            <CustomButton
                onPress={handleHospitalListPressed}
                text="Consultorios"
                backgroundColor='#01579B'
                foregroundColor='#FFFFFF'
            />

            <CustomButton
                onPress={handleFarmacyListPressed}
                text="Farmacias"
                backgroundColor='#388E3C'
                foregroundColor='#FFFFFF'
            />

            <CustomButton
                onPress={handleFamilyMembersListPressed}
                text="Familiares"
            />

            <CustomButton
                onPress={handleReturnPressed}
                text="Volver"
                type="tertiary"
            />
        </View>
    )
}

export default HomeScreen;