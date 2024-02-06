import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
};

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: '#FFF',
            width: '100%',
            borderColor: '#8e8e8e',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginVertical: 5,
        },
        input: {
        },
    }
)

export default CustomInput;