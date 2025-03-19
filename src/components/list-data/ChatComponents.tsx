import React, { useMemo, useState} from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Pressable } from 'react-native';
import { CoreModelsInterface } from '../../interface/core-models-interface.tsx';
import {getColorProperty} from '../../uril/styles/stylesSystem.tsx';
import { FormatTime } from '../../service/helper.service.tsx';
import {useTheme} from '../../uril/hooks/useTheme.tsx';
import {TypeTheme} from '../../store/state/devise-system.tsx';
import {useDispatch} from 'react-redux';
import {selectChat} from '../../store/state/state.reducer.tsx';


export const ChatComponent: React.FC<{ item: CoreModelsInterface.Chat }> = ({ item }) => {

    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const getInitial = (name: string) => name.charAt(0).toUpperCase();
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);
    const WrapperComponent = Platform.OS === 'web' ? Pressable : TouchableOpacity;

    const handleSelectedChat = () => {
        dispatch(selectChat(item));
    };
    return (
        <WrapperComponent
            onPress={() => handleSelectedChat()}
            style={[
                styles.container,
                isHovered && Platform.OS === 'web' ? styles.containerHovered : {},
            ]}
            onHoverIn={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
            onHoverOut={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
            activeOpacity={Platform.OS === 'web' ? 1 : 0.7}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitial(item.name)}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.time}>{FormatTime(item.data)}</Text>
                {item.countMessage > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.countMessage}</Text>
                    </View>
                )}
            </View>
        </WrapperComponent>
    );
};


const createStyles = (key: TypeTheme) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: getColorProperty(key, 'backgroundColor'),
            backgroundColor: getColorProperty(key, 'backgroundColor'),
        },
        containerHovered: {
            backgroundColor:  getColorProperty(key, 'backgroundColorHover'),
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#FFA500',
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarText: {
            color: '#FFF',
            fontSize: 18,
            fontWeight: 'bold',
        },
        content: {
            flex: 1,
            marginLeft: 10,
        },
        name: {
            color: '#FFF',
            fontSize: 16,
            fontWeight: 'bold',
        },
        lastMessage: {
            color: '#AAA',
            fontSize: 14,
        },
        rightContainer: {
        },
        time: {
            color: '#AAA',
            fontSize: 12,
            marginBottom: 5,
        },
        badge: {
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#3b55b1',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 6,
        },
        badgeText: {
            color: '#FFF',
            fontSize: 12,
            fontWeight: 'bold',
        },
    });
};

export default ChatComponent;
