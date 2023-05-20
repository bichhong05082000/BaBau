import React, { forwardRef, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import RNModal from 'react-native-modal';

import Button from 'components/Button/Button';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IGlobalModalProps {
    onConfirm?: () => void;
    content: React.ReactElement;
    containerStyle: StyleProp<ViewStyle>;
    buttonContainerStyle: StyleProp<ViewStyle>;
}

export interface IGlobalModalRef {
    showModal?: () => void;
    hideModal?: () => void;
}

const GlobalModal = (props: IGlobalModalProps, ref: React.Ref<IGlobalModalRef>) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { onConfirm, content, containerStyle, buttonContainerStyle } = props;
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

    const handleConfirm = () => {
        hideModal();
        onConfirm?.();
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
            {...props}
        >
            <View style={[styles.container, containerStyle]}>
                {content}
                <View style={[styles.groupButton, buttonContainerStyle]}>
                    <Button
                        title="Huỷ"
                        customStyles={styles.buttonCancel}
                        disableGradient
                        customTextStyles={styles.buttonCancelText}
                        onPress={hideModal}
                    />
                    <Button title="Đồng ý" customStyles={styles.buttonConfirm} onPress={handleConfirm} />
                </View>
            </View>
        </RNModal>
    );
};

export default forwardRef(GlobalModal);

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
        groupButton: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scales(32),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            textAlign: 'center',
        },
        text: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
        buttonCancel: {
            flex: 1,
            backgroundColor: color.Color_Gray2,
        },
        buttonCancelText: {
            color: color.Text_Dark_1,
        },
        buttonConfirm: {
            flex: 1,
            marginLeft: scales(20),
        },
    });
};
