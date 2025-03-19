import React, {useMemo} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CoreModelsInterface } from '../interface/core-models-interface.tsx';
import {TypeTheme} from '../store/state/devise-system.tsx';
import {useTheme} from '../uril/hooks/useTheme.tsx';
import {getColorProperty} from '../uril/styles/stylesSystem.tsx';

export const ChatMessageComponent: React.FC<CoreModelsInterface.MessageChat> = (props) => {
    const isCurrentUser = props.id === 1;

    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);

    const formattedTime = new Date(props.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
            <Text style={[styles.messageText, isCurrentUser ? styles.currentUserText : styles.otherUserText]}>
                {props.message}
            </Text>
            <Text style={[styles.messageTime, isCurrentUser ? styles.currentUserTime : styles.otherUserTime]}>
                {formattedTime}
            </Text>
        </View>
    );
};

const createStyles = (key: TypeTheme) => {
    return StyleSheet.create({
        messageContainer: {
            maxWidth: 500,
            padding: 20,
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 10,
            position: 'relative',
        },
        currentUserMessage: {
            alignSelf: 'flex-end',
            backgroundColor: '#DCF8C6',
        },
        otherUserMessage: {
            alignSelf: 'flex-start',
            backgroundColor: getColorProperty(key, 'colorMessage'),
        },
        messageText: {
            fontSize: 16,
            lineHeight: 22,
            color: getColorProperty(key, 'colorMessageText'),
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
