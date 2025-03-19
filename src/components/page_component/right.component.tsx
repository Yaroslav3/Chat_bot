import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RightComponent: React.FC<any> = () => {

    return (
        <View style={styles.container}>
            <Text>Messages</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
    },
});
