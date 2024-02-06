import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MailConfirmationScreen from '../screens/MailConfirmationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import HospitalListScreen from '../screens/HospitalListScreen';
import FarmacyListScreen from '../screens/FarmacyListScreen/FarmacyListScreen';
import FamilyMembersListScreen from '../screens/FamilyMembersListScreen';
import AddPharmacyScreen from '../screens/FarmacyListScreen/AddPharmacyScreen'; // Agrega la importación de la nueva pantalla
import AddFamiliarScreen from '../screens/FamilyMembersListScreen/AddFamiliarScreen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Sign In" component={SignInScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="Mail Confirmation" component={MailConfirmationScreen}/>
                <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen}/>
                <Stack.Screen name="New Password" component={NewPasswordScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Configuration" component={ConfigurationScreen}/>
                <Stack.Screen name="Hospital List" component={HospitalListScreen}/>
                <Stack.Screen name="Farmacy List" component={FarmacyListScreen}/>
                <Stack.Screen name="Family Members List" component={FamilyMembersListScreen}/>
                <Stack.Screen name="AddFamiliar" component={AddFamiliarScreen} />
                <Stack.Screen name="AddPharmacy" component={AddPharmacyScreen} /> 
            
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation