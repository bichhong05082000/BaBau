import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Spinner, { SpinnerType } from 'react-native-spinkit';

import { getThemeColor } from 'utils/getThemeColor';

export interface LoadingProps {
    spinnerSize?: number;
    spinnerType?: SpinnerType;
    spinnerColor?: string;
}

export type LoadingModalRef = {
    show: () => void;
    hide: () => void;
};

const LoadingModal = (props: LoadingProps, ref: Ref<LoadingModalRef>) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { spinnerSize, spinnerType, spinnerColor } = props;

    const show = () => {
        Keyboard.dismiss();
        setVisible(true);
    };

    const hide = () => setVisible(false);

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    return (
        <Modal isVisible={visible}>
            <View style={styles.modal}>
                <Spinner
                    size={spinnerSize}
                    type={spinnerType || 'Wave'}
                    color={spinnerColor || getThemeColor().Color_Primary}
                />
            </View>
        </Modal>
    );
};

export default forwardRef(LoadingModal);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
    },
});

