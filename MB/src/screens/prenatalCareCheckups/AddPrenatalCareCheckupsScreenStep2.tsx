import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from 'components/Button/Button';
import Input from 'components/Input';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';
import { pop } from 'navigation/utils';

import { createBabyCheckups, updateAddPrenatalCareCheckups } from 'states/user/fetchCheckups';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import { EventBusName, onPushEventBus } from 'services/event-bus';

interface IAddPrenatalCareCheckupsScreenStep2Props {
    route: RouteProp<RootNavigatorParamList, 'AddPrenatalCareCheckupsStep2'>;
}

// eslint-disable-next-line complexity
const AddPrenatalCareCheckupsScreenStep2 = (props: IAddPrenatalCareCheckupsScreenStep2Props) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { momCheckups, action, child, momId } = props.route.params;
    const [babyFL, setBabyFL] = useState<string>(action === 'EDIT' ? `${child?.femurLength || 0}` : '');
    const [babyHC, setBabyHC] = useState<string>(action === 'EDIT' ? `${child?.dualTopDiameter || 0}` : '');
    const [babyWeight, setBabyWeight] = useState<string>(action === 'EDIT' ? `${child?.weight || 0}` : '');
    const [babyNote, setBabyNote] = useState<string>(action === 'EDIT' ? child?.note : '');
    const [babyBPD, setBabyBPD] = useState<string>(action === 'EDIT' ? `${child?.headPerimeter || 0}` : '');
    const [babyLength, setBabyLength] = useState<string>(action === 'EDIT' ? `${child?.width || 0}` : '');

    const onUpdate = async () => {
        if (validate()) {
            return;
        }
        const body = {
            momData: momCheckups,
            childData: {
                weeksOfPregnacy: momCheckups.weeksOfPregnacy,
                weight: parseFloat(babyWeight),
                note: babyNote,
                dualTopDiameter: parseFloat(babyBPD),
                femurLength: parseFloat(babyFL),
                headPerimeter: parseFloat(babyHC),
            },
        } as user.CheckupsScheduleRequest;
        const response = action === 'EDIT' ? await updateAddPrenatalCareCheckups(child._id, momId._id, body) : await createBabyCheckups(body);
        if (response) {
            onPushEventBus(EventBusName.CREATE_FETAL_HISTORY_SUCCESS);
            pop(2);
        }
    };

    const validate = () => {
        if (!babyLength) {
            showCustomToast('Vui lòng nhập chiều dài của bé');
            return true;
        } else if (!babyBPD) {
            showCustomToast('Vui lòng nhập đường kính lưỡng đỉnh của bé');
            return true;
        } else if (!babyFL) {
            showCustomToast('Vui lòng nhập chiều dài xương đùi của bé');
            return true;
        } else if (!babyHC) {
            showCustomToast('Vui lòng nhập chu vi đầu của bé');
            return true;
        } else if (!babyWeight) {
            showCustomToast('Vui lòng nhập cân nặng ước tính của bé');
            return true;
        }
        return false;
    };

    const renderInputBabyCRL = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Chiều dài (CRL)</Text>
            <Input value={babyLength} onChangeText={setBabyLength} placeholder="mm" keyboardType="number-pad" />
        </View>
    );

    const renderInputBabyBPD = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Đường kính lưỡng đỉnh (BPD)</Text>
            <Input value={babyBPD} onChangeText={setBabyBPD} placeholder="mmHg" keyboardType="number-pad" />
        </View>
    );

    const renderInputBabyHL = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Chiều dài xương đùi (FL)</Text>
            <Input value={babyFL} onChangeText={setBabyFL} placeholder="mmol/L" keyboardType="number-pad" />
        </View>
    );

    const renderInputBabyHC = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Chu vi đầu (HC)</Text>
            <Input value={babyHC} onChangeText={setBabyHC} placeholder="mmol/L" keyboardType="number-pad" />
        </View>
    );

    const renderInputBabyWeight = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>
                Cân nặng ước tính <Text style={styles.txtBold}>*</Text>
            </Text>
            <Input value={babyWeight} onChangeText={setBabyWeight} placeholder="mg" keyboardType="number-pad" />
        </View>
    );

    const renderBabyNote = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.subTitleInfo}>Ghi chú</Text>
            <Input value={babyNote} onChangeText={setBabyNote} placeholder="Nhập ghi chú thai nhi" multiline />
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.titleInfo}>Thông tin của bé</Text>
            {renderInputBabyCRL()}
            {renderInputBabyBPD()}
            {renderInputBabyHL()}
            {renderInputBabyHC()}
            {renderInputBabyWeight()}
            {renderBabyNote()}
        </View>
    );

    const renderButton = () => <Button title="Lưu" customStyles={styles.button} onPress={onUpdate} />;

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderButton()}
        </View>
    );
};

export default AddPrenatalCareCheckupsScreenStep2;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingBottom: scales(30),
        },
        imageHome: {
            backgroundColor: color.Color_Primary2,
            width: Sizes.scrWidth * 2,
            borderRadius: Sizes.scrWidth,
            height: Sizes.scrWidth * 2,
            position: 'absolute',
            top: -Sizes.scrWidth / 2 - Sizes.scrWidth,
            left: -Sizes.scrWidth / 2,
        },
        content: {
            paddingHorizontal: scales(15),
            paddingTop: Sizes.statusBarHeight,
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        contentHeaderContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.scrWidth / 4,
        },
        girlHome: {
            marginTop: scales(10),
            width: scales(120),
            height: scales(120),
            backgroundColor: color.Color_Primary,
            borderRadius: scales(120),
            borderWidth: 1.5,
            borderColor: color.white,
        },
        icBack: {
            justifyContent: 'center',
            position: 'absolute',
            top: Sizes.statusBarHeight,
            backgroundColor: color.Color_Gray6,
            paddingVertical: scales(12),
            paddingHorizontal: scales(10),
            borderRadius: scales(100),
        },
        icPencil: {
            position: 'absolute',
            top: scales(100),
            right: scales(120),
            backgroundColor: color.Color_Gray6,
            padding: scales(5),
            borderRadius: scales(100),
        },
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputContainer: {
            marginBottom: scales(15),
        },
        dobContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scales(46),
            backgroundColor: color.Light_2,
            borderRadius: scales(6),
            paddingRight: scales(15),
            borderColor: color.transparent,
            borderWidth: scales(1),
        },
        dobTxt: {
            ...Fonts.inter600,
            fontSize: scales(13),
            color: color.Text_Dark_1,
            paddingHorizontal: scales(15),
        },
        titleInfo: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
            marginTop: scales(10),
        },
        subTitleInfo: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
            marginTop: scales(10),
        },
        button: {
            marginHorizontal: scales(15),
        },
        dateCheckupContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        checkBox: {
            marginRight: scales(8),
            marginBottom: scales(12),
        },
        txtBold: {
            ...Fonts.inter700,
        },
    });
};
