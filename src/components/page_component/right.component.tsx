import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { getColorProperty } from '../../uril/styles/stylesSystem.tsx';
import { useTheme } from '../../uril/hooks/useTheme.tsx';
import { TypeTheme } from '../../store/state/devise-system.tsx';
import { useDispatch, useSelector } from 'react-redux';
import ArrowLeftSvg from '../../uril/svg/arrowLeftSvg.tsx';
import {clearChat, countMessage, setLastMessage, setMessageInput} from '../../store/state/state.reducer.tsx';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import { RootState } from '../../store/store.tsx';
import { screenMob, useScreenLayout } from '../../service/helper.service.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormData from './../formScreen.tsx';
import { fieldsMessage, schemaMessage } from '../../uril/form-data/form-data.tsx';
import SendSvg from '../../uril/svg/sendSvg.tsx';
import { ChatMessage } from '../chatMessage.tsx';
import {
    addedMessageDB,
    getAllMessageByIDChatDB,
    removeAllMessageByIDChatDB,
} from '../../database/repository/message.tsx';
import {MenuKeyboard} from '../btn-keyboard/menu-keyboard.tsx';
import {getBtnMenuDB} from '../../database/repository/btnMenu.tsx';
import {InlineKeyboard} from '../btn-keyboard/inline-keyboard.tsx';
import {sendMessageApi} from '../../service/api/https/api-send-message.service.tsx';
import {TypeApiMessageEnum} from '../../enum/type-api-message.enum.tsx';
import DeleteBtnSvg from '../../uril/svg/deleteBtnSvg.tsx';
import {TypeMessageEnum, TypeMessageTextEnum} from '../../enum/type-message.enum.tsx';

export const RightComponent: React.FC<any> = () => {
    const dispatch = useDispatch();
    const {height} = useWindowDimensions();
    const iconSize = height * 0.03;
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);
    const [messages, setMessages] = useState<Array<CoreModelsInterface.MessageChat>>([]);
    const selectChat: CoreModelsInterface.Bot | null = useSelector((state: RootState) => state.dataChats.selectChat);
    const newMessage: CoreModelsInterface.MessageChat | undefined = useSelector((state: RootState) => state.dataChats.selectChat?.newMessage);
    const [dataBtn, setDataBtn] = useState<Array<CoreModelsInterface.BtnDataMenu[]>>([]);
    const { width } = useScreenLayout();
    const handleBack = () => {
        dispatch(clearChat(true));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectChat?.id) {
                dispatch(countMessage({chatId: selectChat.id}));
                const data = await getBtnMenuDB(selectChat.id);
                setDataBtn(data);
                if (data[0]?.keyboardMenu) {
                    setDataBtn(JSON.parse(data[0]?.keyboardMenu));
                }
            }
        };
        fetchData();
    }, [dispatch, newMessage, selectChat?.id]);

    const { control: control, handleSubmit: handleMessage, watch, setValue } = useForm<CoreModelsInterface.IFormMessage>({
        resolver: yupResolver<any>(schemaMessage),
        defaultValues: { message: '' },
    });
    const messageValue = watch('message');

    useEffect(() => {
        if (selectChat) {
            setValue('message', selectChat.message.messageText || '');
        }
    }, [selectChat, setValue]);

    useEffect(() => {
        if (selectChat) {
            dispatch(setMessageInput({ chat: selectChat, message: messageValue }));
        }
    }, [messageValue, dispatch, selectChat]);

    useEffect(() => {
        const loadMessages = async () => {
          if (selectChat) {
            const data = await getAllMessageByIDChatDB(selectChat.id);
            setMessages(data);
          }
        };
        loadMessages();
    }, [dispatch, selectChat]);
    useEffect(() => {
    }, [dataBtn]);

    const handelDataBtn = async () => {
      if (selectChat) {
        const dataMessage: CoreModelsInterface.MessageApi = {
          nameBot: selectChat.username,
          idChat: selectChat.id,
          type: TypeApiMessageEnum.COMMAND,
          targetText: 'Menu',
        };
        await sendMessageApi(selectChat.id.toString(), dataMessage);
        dispatch(setLastMessage({chat: selectChat, message: 'Menu'}));
      }
    };

    const handleAllDeleteMessage = async (chatId: string) => {
      const res = await removeAllMessageByIDChatDB(chatId);
      if (res) {
        setMessages([]);
      }
    };

    const addedMessage: SubmitHandler<CoreModelsInterface.IFormMessage> = async (data) => {
        try {
            if(selectChat){
                await addedMessageDB(selectChat?.id, data.message.toString(), [],new Date().toISOString(),
                    TypeMessageEnum.CLIENT, TypeMessageTextEnum.TEXT);
                const dataMessage :CoreModelsInterface.MessageApi = {
                    nameBot: selectChat.username,
                    idChat: selectChat.id,
                    type: TypeApiMessageEnum.TEXT,
                    targetText: data.message,
                };
                await sendMessageApi(selectChat.id.toString(), dataMessage);
                dispatch(setLastMessage({ chat: selectChat, message: data.message }));
                setValue('message', '');
                dispatch(setMessageInput({ chat: selectChat, message: '' }));
                setMessages(await getAllMessageByIDChatDB(selectChat.id));
            }
        } catch (error) {
            console.error('Error inserting message:', error);
        }
    };

    const renderItem = ({ item }: { item: CoreModelsInterface.DataFiled }) => (
        <FormData control={control}
                  name={item.name} type={item.type}
                  label={item.label} placeholder={item.placeholder}
                  pattern={item.pattern} optionsSelect={item.optionsSelect} />
    );

    const renderItemMessage = ({ item }: { item: CoreModelsInterface.MessageChat }) => (
        <View style={styles.messageContainer}>
            <ChatMessage {...item} />
            <InlineKeyboard chat={selectChat!} dataBtn={item.keyboardInline}/>
        </View>
    );

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    if (!selectChat) {
        return (
            <View style={styles.container}>
                <Text style={styles.selectChatText}>Виберіть чат, щоб почати спілкуватися</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header_left}>
                    {width < screenMob && (
                        <View style={styles.header_left_back}>
                            <TouchableOpacity style={styles.header_left_back_btn} onPress={() => handleBack()}>
                                <ArrowLeftSvg width={iconSize} height={iconSize} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.header_bl}>
                        <Text style={styles.header_bl_name}>{selectChat.name}</Text>
                        <Text style={styles.header_bl_count}>1 учасник</Text>
                    </View>
                </View>
                <View style={styles.header_right}>
                    <View style={styles.header_right_btn}>
                        <TouchableOpacity onPress={() => {handleAllDeleteMessage(selectChat?.id);}}>
                            <DeleteBtnSvg width={30} height={30} color="#ccc" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.chat}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemMessage}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottom_bl}>
                    <View style={styles.bottom_bl_left}>
                        <TouchableOpacity style={styles.bottom_bl_left_btn} onPress={() => {handelDataBtn();}}>
                            <Text style={styles.bottom_bl_left_btn_text}>Menu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom_bl_message}>
                        <FlatList
                            data={fieldsMessage}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.name}
                            contentContainerStyle={{ gap: 10 }}
                        />
                    </View>
                    <View style={styles.bottom_bl_right}>
                        {messageValue.length > 0 ? (
                            <TouchableOpacity style={styles.bottom_bl_right_btn} onPress={handleMessage(addedMessage)}>
                                <View style={styles.bottom_bl_right_btn_icon}>
                                    <SendSvg width={40} height={24} color="#ccc" />
                                </View>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
                {dataBtn.length > 0 && ( <View style={styles.bottom_btn_menu_container}>
                    <View style={[styles.bottom_btn_menu]}>
                        <MenuKeyboard dataBtn={dataBtn} chat={selectChat}/>
                    </View>
                </View>)}
            </View>
        </View>
    );
};

const createStyles = (key: TypeTheme) => {
    return StyleSheet.create({
        container: {
            backgroundColor: getColorProperty(key, 'backgroundColorChats'),
            padding: 2,
            paddingTop: 1,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        header: {
            paddingLeft: 10,
            flexDirection: 'row',
            height: 60,
            backgroundColor: getColorProperty(key, 'backgroundColor'),
        },
        header_left:{
            flexDirection: 'row',
        },
        header_left_back: {
        },
        header_left_back_btn: {
            height: 50,
            justifyContent: 'center',
        },
        header_bl: {
            padding: 10,
            paddingLeft: 35,
            flex: 1,
            justifyContent: 'center',
        },
        header_right:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 50,
        },
        header_right_btn: {
            paddingRight: 10,
            justifyContent: 'center',
        },
        header_bl_name: {
            color: getColorProperty(key, 'textColor'),
            fontSize: 14,
            fontWeight: 'bold',
        },
        header_bl_count: {
            paddingTop: 5,
            fontSize: 13,
            color: getColorProperty(key, 'textColorSimple'),
        },
        chat: {
            flex: 1,
            padding: 10,
        },
        bottom: {
            backgroundColor: getColorProperty(key, 'backgroundColor'),
            maxHeight: 400,
            minHeight: 80,
        },
        bottom_bl: {
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottom_bl_left: {
            paddingLeft: 15,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: 5,
        },
        bottom_bl_left_btn: {
            width: 70,
            height: 35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: getColorProperty(key, 'colorMenu'),
            borderRadius: 20,
        },
        bottom_bl_left_btn_text: {
            color: getColorProperty(key, 'textColor'),
            fontWeight: 'bold',
            fontSize: 13,
        },
        bottom_bl_message: {
            flex: 3,
        },
        bottom_bl_right: {
            paddingRight: 15,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
        },
        bottom_bl_right_btn: {
            width: 45,
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: getColorProperty(key, 'colorMenu'),
            borderRadius: 30,
        },
        bottom_bl_right_btn_icon: {
            top: -2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        selectChatText: {
            color: getColorProperty(key, 'textColor'),
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },

        bottom_btn_menu_container: {
            padding: 10,
            flexShrink: 1,
            maxHeight: 500,
            minHeight: 70,
        },

        bottom_btn_menu: {
            maxHeight: '100%',
        },
        messageContainer: {
            // maxWidth: 700,
            minWidth: 100,
            position: 'relative',
        },
    });
};
