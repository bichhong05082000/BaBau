import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { goToAddPrenatalCareCheckupsStep2 } from './src/utils';

import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import CheckBox from 'components/CheckBox';
import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { removePrenatalCareCheckups } from 'states/user/fetchCheckups';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import { pop } from 'navigation/utils';
import { EventBusName, onPushEventBus } from 'services/event-bus';

interface IAddPrenatalCareCheckupsScreenStep1Props {
    route: RouteProp<RootNavigatorParamList, 'AddPrenatalCareCheckupsStep1'>;
}

// eslint-disable-next-line complexity
const AddPrenatalCareCheckupsScreenStep1 = (props: IAddPrenatalCareCheckupsScreenStep1Props) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { action, child, momId } = route.params;
    const [momWeight, setMomWeight] = useState<string>(action === 'EDIT' ? `${momId?.weight || 0}` : '');
    const [weeksOfPregnancy, setWeeksOfPregnancy] = useState<string>(
        action === 'EDIT' ? `${momId?.weeksOfPregnacy || child?.weeksOfPregnacy || 0}` : ''
    );
    const [momBloodPressure, setMomBloodPressure] = useState<string>(
        action === 'EDIT' ? `${momId?.bloodPressure || 0}` : ''
    );
    const [momBloodPressureHungry, setMomBloodPressureHungry] = useState<string>(
        action === 'EDIT' ? `${momId?.fastingGlycemicIndex || 0}` : ''
    );
    const [momBloodPressureAfter1Hour, setMomBloodPressureAfter1Hour] = useState<string>(
        action === 'EDIT' ? `${momId?.eating1hGlycemicIndex || 0}` : ''
    );
    const [momBloodPressureAfter2Hour, setMomBloodPressureAfter2Hour] = useState<string>(
        action === 'EDIT' ? `${momId?.eating2hGlycemicIndex || 0}` : ''
    );
    const [dateCheckups, setDateCheckups] = useState<Date>(moment().toDate());
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [checkBox1, setCheckBox1] = useState<boolean>(false);
    const [checkBox2, setCheckBox2] = useState<boolean>(false);
    const [checkBox3, setCheckBox3] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');

    const setDefaultData = () => {
        setMomWeight('');
        setWeeksOfPregnancy('');
        setMomBloodPressure('');
        setMomBloodPressureHungry('');
        setMomBloodPressureAfter1Hour('');
        setMomBloodPressureAfter2Hour('');
        setDateCheckups(moment().toDate());
        setSelectDateVisible(false);
        setCheckBox1(false);
        setCheckBox2(false);
        setCheckBox3(false);
        setResult('');
    };

    const onConfirmDate = (value: Date) => {
        setSelectDateVisible(false);
        setDateCheckups(value);
    };

    const onCancel = () => {
        setSelectDateVisible(false);
    };

    const getCommonDiseases = () => {
        if (checkBox1) {
            return 'Có vấn đề về nhau thai';
        } else if (checkBox2) {
            return 'Có vấn đề đề nước ối';
        } else if (checkBox3) {
            return 'Phù chân, tay';
        } else {
            return 'Không có bệnh lý';
        }
    };

    const validate = () => {
        if (!weeksOfPregnancy) {
            showCustomToast('Vui lòng nhập số tuần');
            return true;
        } else if (!momWeight) {
            showCustomToast('Vui lòng nhập cân nặng');
            return true;
        } else if (!momBloodPressure) {
            showCustomToast('Vui lòng nhập chỉ số huyết áp');
            return true;
        } else if (!momBloodPressureHungry) {
            showCustomToast('Vui lòng nhập chỉ số chỉ số đường huyết lúc đói');
            return true;
        } else if (!momBloodPressureAfter1Hour) {
            showCustomToast('Vui lòng nhập chỉ số chỉ số đường huyết sau ăn 1 giờ');
            return true;
        } else if (!momBloodPressureAfter2Hour) {
            showCustomToast('Vui lòng nhập chỉ số chỉ số đường huyết sau ăn 2 giờ');
            return true;
        }
        return false;
    };

    const onUpdate = async () => {
        // call api
        const body = {
            weight: parseFloat(momWeight),
            bloodPressure: parseFloat(momBloodPressure),
            commonDiseases: getCommonDiseases(),
            fastingGlycemicIndex: parseFloat(momBloodPressureHungry),
            eating1hGlycemicIndex: parseFloat(momBloodPressureAfter1Hour),
            eating2hGlycemicIndex: parseFloat(momBloodPressureAfter2Hour),
            note: result,
            weeksOfPregnacy: weeksOfPregnancy,
        } as user.MomCheckupsRequest;

        if (validate()) {
            return;
        }
        // go to step 2
        goToAddPrenatalCareCheckupsStep2(body, action, child, momId);
        setDefaultData();
    };

    const renderInputMomWeight = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Cân nặng *</Text>
            <Input value={momWeight} onChangeText={setMomWeight} placeholder="Kg" keyboardType="number-pad" />
        </View>
    );

    const renderInputMomBloodPressure = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Huyết áp</Text>
            <Input
                value={momBloodPressure}
                onChangeText={setMomBloodPressure}
                placeholder="mmHg"
                keyboardType="number-pad"
            />
        </View>
    );

    const renderInputMomWeeksOfPregnancy = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Tuần</Text>
            <Input
                value={weeksOfPregnancy}
                onChangeText={setWeeksOfPregnancy}
                placeholder="Vui lòng nhập tuần của thai nhi"
                keyboardType="number-pad"
            />
        </View>
    );

    const renderInputMomBloodPressureHungry = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Lúc đói</Text>
            <Input
                value={momBloodPressureHungry}
                onChangeText={setMomBloodPressureHungry}
                placeholder="mmHg"
                keyboardType="number-pad"
            />
        </View>
    );

    const renderInputMomBloodPressureAfter1Hour = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Sau ăn 1h</Text>
            <Input
                value={momBloodPressureAfter1Hour}
                onChangeText={setMomBloodPressureAfter1Hour}
                placeholder="mmHg"
                keyboardType="number-pad"
            />
        </View>
    );

    const renderInputMomBloodPressureAfter2Hour = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Sau ăn 2h</Text>
            <Input
                value={momBloodPressureAfter2Hour}
                onChangeText={setMomBloodPressureAfter2Hour}
                placeholder="mmHg"
                keyboardType="number-pad"
            />
        </View>
    );

    const renderInputDateCheckups = () => (
        <View style={styles.dateCheckupContainer}>
            <Text style={styles.title}>Ngày khám</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => setSelectDateVisible(true)}>
                <Text style={styles.dobTxt}>{moment(dateCheckups).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderInputDateCheckups()}
            <Text style={styles.titleInfo}>Thông tin của mẹ</Text>
            {renderInputMomWeight()}
            {renderInputMomWeeksOfPregnancy()}
            {renderInputMomBloodPressure()}
            <Text style={styles.subTitleInfo}>Chỉ số đường huyết (mmol/L)</Text>
            {renderInputMomBloodPressureHungry()}
            {renderInputMomBloodPressureAfter1Hour()}
            {renderInputMomBloodPressureAfter2Hour()}
            <Text style={styles.subTitleInfo}>Các bệnh lý thường gặp</Text>
            <CheckBox
                active={checkBox1}
                setActive={setCheckBox1}
                containerStyle={styles.checkBox}
                title="Có vấn đề về nhau thai"
            />
            <CheckBox
                active={checkBox2}
                setActive={setCheckBox2}
                containerStyle={styles.checkBox}
                title="Có vấn đề đề nước ối"
            />
            <CheckBox
                active={checkBox3}
                setActive={setCheckBox3}
                containerStyle={styles.checkBox}
                title="Phù chân, tay"
            />
            <Text style={styles.subTitleInfo}>Kết quả khám</Text>
            <Input value={result} onChangeText={setResult} placeholder="Kết quả" multiline />
        </View>
    );

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={dateCheckups}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderButton = () => <Button title="Tiếp" customStyles={styles.button} onPress={onUpdate} />;

    const renderRightIcon = () => {
        if (action === 'EDIT') {
            return (
                <View style={styles.iconRight}>
                    <SvgIcons.IcRemove width={scales(17)} height={scales(17)} color={getThemeColor().white} />
                </View>
            );
        }
        return null;
    };

    const onPressRight = async () => {
        if (action === 'EDIT') {
            await removePrenatalCareCheckups(child?._id, momId?._id);
            onPushEventBus(EventBusName.REMOVE_FETAL_HISTORY_SUCCESS);
            pop(2);
            return;
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="Thêm kết quả khám"
                iconRight={renderRightIcon()}
                onPressRight={onPressRight}
            />
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderDatePicker()}
            {renderButton()}
        </View>
    );
};

export default AddPrenatalCareCheckupsScreenStep1;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingBottom: scales(30),
        },
        content: {
            paddingHorizontal: scales(15),
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
        iconRight: {
            backgroundColor: color.Color_Primary,
            borderRadius: 100,
            padding: scales(5),
        },
    });
};
