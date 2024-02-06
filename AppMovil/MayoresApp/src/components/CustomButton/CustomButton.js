import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type = 'primary', backgroundColor, foregroundColor }) => {
    return (
        <Pressable
            onPress={onPress}
            style={
                [
                    styles.container,
                    styles[`container_${type}`],
                    backgroundColor ? { backgroundColor } : {}
                ]
            }
        >
            <Text
                style={
                    [
                        styles.text,
                        styles[`text_${type}`],
                        foregroundColor ? { color: foregroundColor } : {}
                    ]
                }
            >
                {text}
            </Text>
        </Pressable>
    )
};

const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            padding: 15,
            marginVertical: 5,
            alignItems: 'center',
            borderRadius: 5,
        },
        container_primary: {
            backgroundColor: '#3B71F3',
        },
        container_secondary: {
            borderColor: '#3B71F3',
            borderWidth: 2,
        },
        container_tertiary: {
        },
        text: {
            fontWeight: 'bold',
            color: '#FFF',
        },
        text_primary: {
            
        },
        text_secondary: {
            color: '#3B71F3'
        },
        text_tertiary: {
            color: 'grey',
        }
    }
)

export default CustomButton