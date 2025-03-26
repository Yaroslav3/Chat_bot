import React, { useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { CoreModelsInterface } from '../interface/core-models-interface.tsx';
import {TypeMessageEnum, TypeMessageTextEnum} from '../enum/type-message.enum.tsx';
import { getColorProperty } from '../uril/styles/stylesSystem.tsx';
import { TypeTheme } from '../store/state/devise-system.tsx';
import { useTheme } from '../uril/hooks/useTheme.tsx';

export const ChatMessage: React.FC<CoreModelsInterface.MessageChat> = (props) => {
    const isCurrentUser = props.send === TypeMessageEnum.CLIENT;
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);

    const formattedTime = new Date(props.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleLinkPress = async () => {
        const supported = await Linking.canOpenURL(props.message);
        if (supported) {
            await Linking.openURL(props.message);
        }
    };

    return (
        <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
            {props.typeMessage === TypeMessageTextEnum.URL ? (
                <TouchableOpacity onPress={handleLinkPress} style={styles.linkContainer}>
                    <Text style={[styles.messageText, styles.linkText]}>
                        {props.message}
                    </Text>
                </TouchableOpacity>
            ) : (
                <Text style={[styles.messageText, isCurrentUser ? styles.currentUserText : styles.otherUserText]}>
                    {props.message}
                </Text>
            )}
            <Text style={[styles.messageTime, isCurrentUser ? styles.currentUserTime : styles.otherUserTime]}>
                {formattedTime}
            </Text>
        </View>
    );
};

const createStyles = (key: TypeTheme) => {
    return StyleSheet.create({
        messageContainer: {
            padding: 15,
            minWidth: 50,
            paddingBottom: 20,
            marginTop: 30,
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 10,
            position: 'relative',
            maxWidth: 500,
        },
        currentUserMessage: {
            alignSelf: 'flex-end',
            backgroundColor: getColorProperty(key, 'colorMessageSend'),
        },
        otherUserMessage: {
            alignSelf: 'flex-start',
            backgroundColor: getColorProperty(key, 'colorMessage'),
            borderColor: getColorProperty(key, 'colorMessage'),
            borderWidth: 1,
        },
        messageText: {
            fontSize: 16,
            lineHeight: 22,
            color: getColorProperty(key, 'colorMessageText'),
        },
        linkText: {
            color: '#1E90FF', // Яскравий синій колір
            textDecorationLine: 'underline',
            fontWeight: '600',
            paddingVertical: 5,
        },
        linkContainer: {
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 6,
            backgroundColor: 'rgba(30, 144, 255, 0.1)',
            alignSelf: 'flex-start',
        },
        currentUserText: {
            color: getColorProperty(key, 'colorMessageText'),
        },
        otherUserText: {
            color: getColorProperty(key, 'colorMessageText'),
        },
        messageTime: {
            fontSize: 12,
            color: getColorProperty(key, 'colorMessageText'),
            marginTop: 10,
            position: 'absolute',
            bottom: 5,
            right: 10,
        },
        currentUserTime: {
            textAlign: 'right',
        },
        otherUserTime: {
            textAlign: 'left',
        },
    });
};
