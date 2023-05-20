import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { goToFetalHealthAnalysis } from './src/utils';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { hideLoading, showLoading } from 'components/Loading';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { createBabyCheckups, updateAddPrenatalCareCheckups } from 'states/user/fetchCheckups';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

interface IFetalHealthInfoScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FetalHealthInfo'>;
}

// eslint-disable-next-line complexity
const FetalHealthInfoScreen = (props: IFetalHealthInfoScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { action, child, momId } = route.params;
    const [weeksOfPregnancy, setWeeksOfPregnancy] = useState<string>(
        action === 'EDIT' ? `${child?.weeksOfPregnacy || 0}` : ''
    );
    const [babyLength, setBabyLength] = useState<string>(action === 'EDIT' ? `${child?.width || 0}` : '');
    const [babyBPD, setBabyBPD] = useState<string>(action === 'EDIT' ? `${child?.headPerimeter || 0}` : '');
    const [babyFL, setBabyFL] = useState<string>(action === 'EDIT' ? `${child?.femurLength || 0}` : '');
    const [babyHC, setBabyHC] = useState<string>(action === 'EDIT' ? `${child?.dualTopDiameter || 0}` : '');
    const [babyWeight, setBabyWeight] = useState<string>(action === 'EDIT' ? `${child?.weight || 0}` : '');

    const handleSubmit = async () => {
        if (validate()) {
            return;
        }
        const body = {
            momData: {
                weeksOfPregnacy: weeksOfPregnancy,
            },
            childData: {
                weeksOfPregnacy: weeksOfPregnancy,
                weight: parseFloat(babyWeight),
                dualTopDiameter: parseFloat(babyBPD),
                femurLength: parseFloat(babyFL),
                headPerimeter: parseFloat(babyHC),
                width: parseFloat(babyLength),
            },
        } as user.CheckupsScheduleRequest;
        showLoading();
        const response = action === 'EDIT' ? await updateAddPrenatalCareCheckups(child._id, momId._id, body) : await createBabyCheckups(body);
        hideLoading();
        if (response) {
            goToFetalHealthAnalysis('FETAL_HEALTH_INFO');
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

    const renderHeader = () => <Header title="Thông tin thai nhi" />;

    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Tuần</Text>
                <Input
                    value={weeksOfPregnancy}
                    onChangeText={setWeeksOfPregnancy}
                    placeholder="Vui lòng nhập tuần của thai nhi"
                    keyboardType="number-pad"
                />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Chiều dài (CRL)</Text>
                <Input value={babyLength} onChangeText={setBabyLength} placeholder="mm" keyboardType="number-pad" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Đường kính lưỡng đỉnh (BPD)</Text>
                <Input value={babyBPD} onChangeText={setBabyBPD} placeholder="mmHg" keyboardType="number-pad" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Chiều dài xương đùi (FL)</Text>
                <Input value={babyFL} onChangeText={setBabyFL} placeholder="mmol/L" keyboardType="number-pad" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Chu vi đầu (HC)</Text>
                <Input value={babyHC} onChangeText={setBabyHC} placeholder="mmol/L" keyboardType="number-pad" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Cân nặng ước tính *</Text>
                <Input value={babyWeight} onChangeText={setBabyWeight} placeholder="mg" keyboardType="number-pad" />
            </View>
            {renderButton()}
        </View>
    );

    const renderButton = () => (
        <Button
            title={action === 'CREATE' ? 'Phân tích' : 'Cập nhật'}
            onPress={handleSubmit}
            customStyles={styles.button}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FetalHealthInfoScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        itemContentContainer: {
            marginBottom: scales(15),
        },
        itemTitleContent: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(5),
        },
        button: {
            marginTop: scales(20),
        },
    });
};
