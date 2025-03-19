import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import { Controller } from 'react-hook-form';
import { CoreModelsInterface } from '../interface/core-models-interface.tsx';
import DropDownPicker from 'react-native-dropdown-picker';
import {TypeTheme} from '../store/state/devise-system.tsx';
import {useTheme} from '../uril/hooks/useTheme.tsx';
import {getColorProperty} from '../uril/styles/stylesSystem.tsx';
import SearchSvgSVG from '../uril/svg/searchSvg.tsx';

const FormScreen: React.FC<CoreModelsInterface.DataFiled> = ({ control, name, type, label, placeholder, optionsSelect }) => {
    const [open, setOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);
    useEffect(() => {});

    return (
        <View style={styles.inputContainer}>
            {label ? <Text style={styles.label}>{label}</Text> : <></>}
            <Controller
                control={control}
                name={name}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                    <>
                        {type === 'text' && (
                            <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                                <SearchSvgSVG width={20} height={20} color={getColorProperty(theme as TypeTheme, 'textColorSimple')} />
                                <TextInput
                                    style={[
                                        styles.input,
                                        isFocused ? styles.inputFocused : null,
                                    ]}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={placeholder}
                                    placeholderTextColor={getColorProperty(theme as TypeTheme, 'textColorSimple')}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />
                            </View>
                        )}

                        {type === 'textarea' && (
                            <View style={[styles.textareaWrapper, error ? styles.inputError : null]}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.textarea,
                                        error ? styles.inputError : null,
                                    ]}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder={placeholder}
                                    placeholderTextColor={getColorProperty(theme as TypeTheme, 'textColorSimple')}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                        )}
                        {type === 'select' && optionsSelect && (
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={optionsSelect}
                                setOpen={setOpen}
                                setValue={onChange}
                                onChangeValue={onChange}
                                placeholder={placeholder}
                                listItemLabelStyle={styles.item}
                                style={styles.dropDown}
                                dropDownContainerStyle={styles.dropDownContainer}
                                textStyle={styles.textStyle}
                                arrowIconStyle={styles.arrowIcon}
                                showArrowIcon={true}
                            />
                        )}

                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />
        </View>
    );
};

const createStyles = (key: TypeTheme) => {
    return StyleSheet.create({
        inputContainer: {
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: getColorProperty(key, 'backgroundColorHover'),
            borderRadius: 20,
            paddingHorizontal: 10,
            height: 40,
            marginBottom: 18,
        },
        icon: {
            marginRight: 10,
        },
        input: {
            flex: 1,
            borderWidth: 0,
            borderColor: 'transparent',
            ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
            color: getColorProperty(key, 'textColor'),
            fontSize: 16,
            paddingLeft: 10,
        },
        inputFocused: {
            color: getColorProperty(key, 'textColor'),
        },
        inputError: {
            borderColor: 'yellow',
            borderWidth: 2,
        },
        errorText: {
            color: 'red',
            fontSize: 12,
            marginTop: 5,
            position: 'absolute',
            bottom: -20,
            zIndex: 100,
        },
        textareaWrapper:{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
        },
        textarea: {
            paddingTop: 10,
            textAlignVertical: 'center',
            fontSize: 12,
        },
        dropDown: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: '#f9f9f9',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            zIndex: 9999,
        },
        dropDownContainer: {
            backgroundColor: '#f9f9f9',
            shadowOffset: { width: 0, height: 2 },
            borderColor: '#ddd',
            borderTopWidth: 1,
            borderRadius: 8,
            marginTop: 5,
            zIndex: 9999,
        },
        textStyle: {
            fontSize: 14,
            color: '#3c7c22',
            fontWeight: 'bold',
        },
        item: {
            fontSize: 14,
            color: '#333',
            fontWeight: 'bold',
        },
        arrowIcon: {
            width: 18,
            height: 18,
            tintColor: '#888',
        },
    });
};

export default FormScreen;
