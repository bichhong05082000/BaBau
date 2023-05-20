import Button from 'components/Button/Button';
import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import PregnancyDueDateCalculatorConfirmPopup, { IPregnancyDueDateCalculatorConfirmPopupRef } from 'screens/pregnancyDueDateCalculator/src/PregnancyDueDateCalculatorConfirmPopup';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Storages, { KeyStorage } from 'utils/storages';

const PregnancyDueDateCalculatorScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [date, setDate] = useState(new Date());
    const refPregnancyDueDateCalculatorConfirmPopup = useRef<IPregnancyDueDateCalculatorConfirmPopupRef>()
    const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState<string>(moment().format('YYYY-MM-DD'));

    const getDueDateFromStore = async () => {
        const dueDate = await Storages.get(KeyStorage.DueDate);
        setLastMenstrualPeriod(dueDate);
    };

    useEffect(() => {
        getDueDateFromStore();
    }, [lastMenstrualPeriod]);


    const dueDate = moment(lastMenstrualPeriod).add(9, 'months').add(10, 'days').format('DD/MM/YYYY');
    const handleOpenPopup = () => {
        refPregnancyDueDateCalculatorConfirmPopup?.current?.showModal();
    };

    const handleConfirm = () => {
        // save to async storage
        const currentDate = moment(date).format('YYYY-MM-DD');
        setLastMenstrualPeriod(currentDate);
        Storages.set(KeyStorage.DueDate, currentDate);
        refPregnancyDueDateCalculatorConfirmPopup?.current?.hideModal();
    };

    const renderHeader = () => <Header title="Dự tính ngày sinh" />;

    const renderPregnancyDueDateCalculator = () => (
        <View style={styles.pregnancyDueDateCalculatorContainer}>
            <Text style={styles.titlePregnancyDueDateCalculator}>Ngày dự sinh: </Text>
            <Text style={styles.datePregnancyDueDateCalculator}>{dueDate}</Text>
        </View>
    );

    const renderSelectDate = () => (
        <View style={styles.selectDateContainer}>
            <Text style={styles.titleSelectDate}>Chọn ngày đầu tiên của kỳ kinh cuối cùng</Text>
            <DatePicker
                mode="calendar"
                onSelectedChange={setDate}
                selected={lastMenstrualPeriod}
                current={lastMenstrualPeriod}
            />
        </View>
    );

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title="Cập nhật" customStyles={styles.button} onPress={handleOpenPopup} />
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderHeader()}
            {renderPregnancyDueDateCalculator()}
            {renderSelectDate()}
            {renderButton()}
            <PregnancyDueDateCalculatorConfirmPopup ref={refPregnancyDueDateCalculatorConfirmPopup} onConfirm={handleConfirm} dueDate={moment(date).add(9, 'months').add(10, 'days').format('DD/MM/YYYY')}/>
        </View>
    );

    return <View style={styles.container}>{renderContent()}</View>;
};

export default PregnancyDueDateCalculatorScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            flex: 1,
        },
        pregnancyDueDateCalculatorContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.Color_Primary2,
            paddingVertical: scales(25),
        },
        titlePregnancyDueDateCalculator: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        datePregnancyDueDateCalculator: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginHorizontal: scales(15),
        },
        selectDateContainer: {
            marginTop: scales(30),
        },
        titleSelectDate: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            alignSelf: 'center',
            marginBottom: scales(20),
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: Sizes.bottomSpace + scales(15),
        },
        button: {
            marginHorizontal: scales(15),
        },
    });
};
