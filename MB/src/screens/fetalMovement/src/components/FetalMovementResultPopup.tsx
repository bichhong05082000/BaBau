import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNModal from 'react-native-modal';

import Button from 'components/Button/Button';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IFetalMovementResultPopupProps {
    onConfirm?: () => void;
    count: number;
    timeStart: string;
    timeCount: string;
}

export interface IFetalMovementResultPopupRef {
    showModal?: () => void;
    hideModal?: () => void;
}

const FetalMovementResultPopup = (
    props: IFetalMovementResultPopupProps,
    ref: React.Ref<IFetalMovementResultPopupRef>
) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { onConfirm, count, timeStart, timeCount } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
    }));

    const showModal = () => {
        setIsVisible(true);
    };

    const hideModal = () => {
        setIsVisible(false);
    };

    return (
        <RNModal
            isVisible={isVisible}
            onBackdropPress={hideModal}
            onBackButtonPress={hideModal}
            backdropTransitionInTiming={0}
            hideModalContentWhileAnimating
            backdropTransitionOutTiming={0}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriverForBackdrop
            style={styles.modal}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Kết quả đếm cử động thai</Text>
                <View style={styles.content}>
                    <View style={styles.itemContainer}>
                        <View style={styles.valueContainer}>
                            <Text style={styles.value}>{timeStart}</Text>
                        </View>
                        <Text style={styles.text}>Thời gian bắt đầu</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.valueContainer}>
                            <Text style={styles.value}>{timeCount}</Text>
                        </View>
                        <Text style={styles.text}>Thời gian đếm</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.valueContainer}>
                            <Text style={styles.value}>{count}</Text>
                        </View>
                        <Text style={styles.text}>Số lần cử động</Text>
                    </View>
                </View>
                <Button title="Hoàn thành" customStyles={styles.buttonConfirm} onPress={onConfirm} />
            </View>
        </RNModal>
    );
};

export default forwardRef(FetalMovementResultPopup);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        modal: {
            marginHorizontal: scales(15),
        },
        container: {
            paddingHorizontal: scales(15),
            paddingVertical: scales(30),
            backgroundColor: color.white,
            borderRadius: scales(8),
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scales(20),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            textAlign: 'center',
        },
        text: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(12),
            width: scales(80),
            textAlign: 'center',
        },
        valueContainer: {
            backgroundColor: color.Color_Primary2,
            paddingVertical: scales(10),
            width: scales(80),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scales(8),
        },
        value: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        itemContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonConfirm: {
            marginTop: scales(20),
        },
    });
};
