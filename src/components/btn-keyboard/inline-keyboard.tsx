import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const InlineKeyboard: React.FC<any> = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ваше замовлення</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
