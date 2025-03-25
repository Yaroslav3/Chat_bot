import React, {useMemo} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {useTheme} from '../../uril/hooks/useTheme.tsx';
import {TypeTheme} from '../../store/state/devise-system.tsx';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import {TypeApiMessageEnum} from '../../enum/type-api-message.enum.tsx';
import {sendMessageService} from '../../service/messages/send-message.service.ts';
import {getColorProperty} from '../../uril/styles/stylesSystem.tsx';
import {addedMessageDB} from '../../database/repository/message.tsx';
import {setLastMessage, updateChat} from '../../store/state/state.reducer.tsx';
import {useDispatch} from 'react-redux';
import {TypeMessageEnum} from '../../enum/type-message.enum.tsx';

export const InlineKeyboard: React.FC<{ dataBtn: Array<CoreModelsInterface.BtnDataInlineBtn[]>, chat: CoreModelsInterface.Bot }> = ({ dataBtn, chat }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);

    const handelPressBtn = async (button: CoreModelsInterface.BtnDataMenu) => {
        await addedMessageDB(chat?.id, button.text, [], new Date().toISOString(), TypeMessageEnum.CLIENT);
        dispatch(updateChat({chatId: chat.id}));
        dispatch(setLastMessage({chat: chat, message: button.text}));
        const value: CoreModelsInterface.MessageApi = {
            nameBot: chat.username,
            idChat: chat.id,
            type: TypeApiMessageEnum.INLINE_KEYBOARD,
            targetText: button.text,
        };
        await sendMessageService(value);
    };

    const renderKeyboardInline = ({ item }: { item: CoreModelsInterface.BtnDataMenu[] }) => (
        <View style={styles.row}>
            {item.map((button, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handelPressBtn(button)}>
                    <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
                        {button.text}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dataBtn}
                renderItem={renderKeyboardInline}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const createStyles = (key: TypeTheme) => {
    return StyleSheet.create({
        container: {
            margin: 5,
        },
        gridContainer: {},
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        },
        button: {
            flex: 1,
            paddingVertical: 10,
            marginVertical: 5,
            backgroundColor: getColorProperty(key, 'colorBtn'),
            margin: 4,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            padding: 5,
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });
};
