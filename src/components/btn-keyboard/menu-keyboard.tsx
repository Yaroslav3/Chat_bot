import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TypeTheme } from '../../store/state/devise-system.tsx';
import { useTheme } from '../../uril/hooks/useTheme.tsx';
import { getColorProperty } from '../../uril/styles/stylesSystem.tsx';
import { CoreModelsInterface } from '../../interface/core-models-interface.tsx';

export const MenuKeyboard: React.FC<{ dataBtn: Array<CoreModelsInterface.BtnDataMenu[]> }> = ({ dataBtn }) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);

    const renderRow = ({ item }: { item: CoreModelsInterface.BtnDataMenu[] }) => (
        <View style={styles.row}>
            {item.map((button, index) => (
                <TouchableOpacity key={index} style={styles.button}>
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
                renderItem={renderRow}
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
        container: {},
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

// import React, {useMemo} from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import {TypeTheme} from '../../store/state/devise-system.tsx';
// import {useTheme} from '../../uril/hooks/useTheme.tsx';
// import {getColorProperty} from '../../uril/styles/stylesSystem.tsx';
// import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
//
// // const textTelegram = {
// //     btn: {
// //         vacation: '🏝 Створити відпустку',
// //         reference: '📄 Довідки_Мотивація',
// //         businessTrip: '🛫 Відрядження',
// //         lifeSafety: 'Life Safety',
// //         apMerchant: 'AP Merchant',
// //         edo: 'EDO',
// //         taskbar: 'Taskbar',
// //         apDonate: 'AP Donate',
// //         englishPay: 'English Pay',
// //         btn_waiting_for_approve: 'Waiting for Approval',
// //     },
// // };
//
// // const buttonData = [
// //     [{text: textTelegram.btn.vacation}, {text: textTelegram.btn.reference}, {text: textTelegram.btn.businessTrip}],
// //     [{text: textTelegram.btn.lifeSafety}, {text: textTelegram.btn.apMerchant}],
// //     [{text: textTelegram.btn.edo}, {text: textTelegram.btn.taskbar}, {text: textTelegram.btn.apDonate}],
// //     [{text: textTelegram.btn.englishPay}, {text: textTelegram.btn.btn_waiting_for_approve}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// //     [{text: textTelegram.btn.englishPay}],
// // ];
// // const buttonData = [];
//
// export const MenuKeyboard: React.FC<{dataBtn: Array<CoreModelsInterface.BtnDataMenu>}> = ( {dataBtn}) => {
//     const theme = useTheme();
//     const styles = useMemo(() => createStyles(theme as TypeTheme), [theme]);
//     if(!dataBtn.length){
//         return (<></>);
//     }
//     const renderButton = ({ item }: { item: CoreModelsInterface.BtnDataMenu }) => (
//         <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
//         </TouchableOpacity>
//     );
//
//     const renderRow = ({ dataBtn }: { dataBtn: Array<CoreModelsInterface.BtnDataMenu> }) => (
//         <View style={styles.row}>
//             {dataBtn.map((button, index) => (
//                 <View key={index} style={styles.buttonContainer}>
//                     {renderButton({ item: button })}
//                 </View>
//             ))}
//         </View>
//     );
//
//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={dataBtn}
//                 renderItem={renderRow}
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={styles.gridContainer}
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}
//             />
//         </View>
//     );
// };
//
//
// const createStyles = (key: TypeTheme) => {
//     return StyleSheet.create({
//         container: {},
//         gridContainer: {},
//         row: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//         },
//         buttonContainer: {
//             flex: 1,
//             margin: 5,
//             marginBottom: -2,
//         },
//         button: {
//             paddingVertical: 10,
//             marginVertical: 5,
//             backgroundColor:  getColorProperty(key, 'colorBtn'),
//             borderRadius: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         buttonText: {
//             padding: 5,
//             color: 'white',
//             fontSize: 14,
//             fontWeight: 'bold',
//             textAlign: 'center',
//         },
//     });
// };
