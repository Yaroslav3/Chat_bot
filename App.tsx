import React, {useEffect, useMemo, useState, useRef} from 'react';
import {store} from './src/store/store.tsx';
import {View, StyleSheet, Linking} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {StartScreen} from './src/page/start.tsx';
import {getColorProperty} from './src/uril/styles/stylesSystem.tsx';
import {setTheme, TypeTheme} from './src/store/state/devise-system.tsx';
import {useTheme} from './src/uril/hooks/useTheme.tsx';
import {
  addChats,
  newMessageInSocket,
} from './src/store/state/state.reducer.tsx';
import {initializeDatabase} from './src/database/initializeDatabase.tsx';
import {
  initSocket,
  subscribeToChat,
} from './src/service/api/socket/socketApi.tsx';
import {getAllChats} from './src/service/api/https/api-send-message.service.tsx';
import {addedBtnMenuDB} from './src/database/repository/btnMenu.tsx';
import {CoreModelsInterface} from './src/interface/core-models-interface.tsx';
import {addedMessageDB} from './src/database/repository/message.tsx';
import {TypeMessageEnum, TypeMessageTextEnum} from './src/enum/type-message.enum.tsx';

const App: React.FC = () => {
  initSocket();
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

const MainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [platformDb, setPlatformDb] = useState<string | null>(null);
  const subscriptionsRef = useRef<{[key: string]: () => void}>({});

  useEffect(() => {
    console.log('_MainComponent__')
    const fetchBots = async () => {
      try {
        const data = await getAllChats();
        dispatch(addChats(data));

        for (const v of data) {
          if (!subscriptionsRef.current[v.id]) {
            const unsubscribe = subscribeToChat(
              v.id,
              async (newMessage: CoreModelsInterface.MessageApiUI) => {
                if (newMessage.isBot) {
                  if (newMessage.keyboardMenu) {
                    await addedBtnMenuDB(
                      newMessage.idChat,
                      newMessage.keyboardMenu,
                      new Date().toISOString(),
                    );
                  }

                  if (newMessage.typeMessage === TypeMessageTextEnum.URL) {
                    Linking.openURL(newMessage.targetText);
                  } else {
                    let result = await addedMessageDB(
                      newMessage.idChat,
                      newMessage.targetText,
                      newMessage.keyboardInline,
                      new Date().toISOString(),
                      newMessage.typeMessage,
                      newMessage.typeMessage,
                      TypeMessageEnum.SERVER,
                    );
                    dispatch(
                      newMessageInSocket({
                        chatId: newMessage.idChat,
                        key: true,
                        newMessage: result,
                      }),
                    );
                  }
                }
              },
            );
            subscriptionsRef.current[v.id] = unsubscribe;
          }
        }
      } catch (error) {
        console.error('❌ Помилка отримання чатів:', error);
      }
    };

    fetchBots();
    dispatch(setTheme('BLACK'));
    initializeDatabase(setPlatformDb);

    return () => {
      Object.values(subscriptionsRef.current).forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
      subscriptionsRef.current = {};
    };
  }, [dispatch]);

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);

  return (
    <View style={styles.container}>
      <StartScreen />
    </View>
  );
};

const createStyles = (key: TypeTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColorProperty(key, 'backgroundColor'),
      paddingTop: 0,
      flex: 1,
    },
  });

export default App;
