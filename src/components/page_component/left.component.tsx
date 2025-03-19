import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import { InputComponent } from '../input.component.tsx';
import MenuSvg from './../../uril/svg/menuSvg.tsx';
import {RootState} from '../../store/store.tsx';
import {useSelector} from 'react-redux';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import ChatComponents from '../list-data/ChatComponents.tsx';

export const LeftComponent: React.FC = () => {
    const [getShowHeight, setShowHeight] = useState(Dimensions.get('window').height);
    const stateSelect: Array<CoreModelsInterface.Chat> = useSelector((state: RootState) => state.dataChats.dataChats);
    useEffect(() => {
        setShowHeight(Dimensions.get('window').height);
    }, []);

    const renderItem = ({item}: { item: CoreModelsInterface.Chat }) => (
        <ChatComponents item={item} />
    );

    return (
      <View style={styles.container}>
        <View style={styles.container_head}>
          <View style={styles.container_head_menu}>
            <MenuSvg width={30} height={30} color="#ccc" />
          </View>
          <View style={styles.container_head_search}>
            <InputComponent />
          </View>
          <View />
        </View>
        <View>{stateSelect.length ? (
            <FlatList
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                data={stateSelect}
                renderItem={renderItem}
                style={{ maxHeight: getShowHeight - 100 }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{flexGrow: 1}}
            />) : (<View><Text>Перейдіть в пошук щоб додати бот і почати спілкуватися</Text></View>)}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
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

