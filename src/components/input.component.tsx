import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {fieldsChats, schemaFieldSearch} from '../uril/form-data/form-data.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {CoreModelsInterface} from '../interface/core-models-interface.tsx';
import FormData from './formScreen.tsx';

export const InputComponent: React.FC<any> = () => {

    const { control: control } = useForm<CoreModelsInterface.IFormFoundName>({
        resolver: yupResolver<any>(schemaFieldSearch),
    });
    const renderItemDelivery = ({ item }: { item: CoreModelsInterface.DataFiled }) => (
        <FormData control={control} name={item.name} type={item.type} label={item.label}
                  placeholder={item.placeholder} pattern={item.pattern} optionsSelect={item.optionsSelect} />
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={fieldsChats}
                renderItem={renderItemDelivery}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
