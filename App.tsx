import React, {useEffect, useMemo, useState} from 'react';
import {store} from './src/store/store.tsx';
import { View, StyleSheet } from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import { StartScreen } from './src/page/start.tsx';
import {getColorProperty} from './src/uril/styles/stylesSystem.tsx';
import {setTheme, TypeTheme} from './src/store/state/devise-system.tsx';
import { useTheme } from './src/uril/hooks/useTheme.tsx';
import {addChats} from './src/store/state/state.reducer.tsx';
import {chatsList} from './src/uril/form-data/form-data.tsx';
import {initializeDatabase} from './src/database/initializeDatabase.tsx';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <MainComponent/>
        </Provider>
    );
};

const MainComponent: React.FC = () => {
    const dispatch = useDispatch();
    dispatch(addChats(chatsList));
    dispatch(setTheme('BLACK'));
    const [platformDb, setPlatformDb] = useState<string | null>(null);
    useEffect(() => {
        initializeDatabase(setPlatformDb);
        console.log('platformDb', platformDb);
    }, []);
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
