import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { InputComponent } from './input.component.tsx';
import MenuSvg from '../uril/svg/menuSvg.tsx';

export const LeftComponent: React.FC = () => {
    const { height } = useWindowDimensions();
    const iconSize = height * 0.04;

    return (
        <View style={styles.container}>
            <View style={styles.container_head}>
                <View style={styles.container_head_menu}>
                    <MenuSvg width={iconSize} height={iconSize} color="#ccc" />
                </View>
                <View style={styles.container_head_search}>
                    <InputComponent />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        flex: 1,

    },
    container_head: {
        flexDirection: 'row',
        gap: 10,
        height: 90,
        alignItems: 'center',
    },
    container_head_menu: {
        flex: 1,
        height: '100%',
        paddingTop: 18,
        alignItems: 'center',
        cursor: 'pointer',
    },
    container_head_search: {
        flex: 6,
        paddingTop: 10,
        height: '100%',
        justifyContent: 'center',
    },
});
