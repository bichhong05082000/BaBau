import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import Modal from 'react-native-modal';

export interface BottomSheetInputRefType {
    open: () => void;
    close: () => void;
}

interface BottomSheetInputProps {
    children?: ReactNode;
    onCustomBackdropPress?: () => void;
}

const BottomSheetInput = (props: BottomSheetInputProps, ref) => {
    const { children, onCustomBackdropPress } = props;
    const [visible, setVisible] = useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const keyboardDidShow = () => setKeyboardVisible(true);
    const keyboardDidHide = () => setKeyboardVisible(false);

    useImperativeHandle(ref, () => ({
        open,
        close,
    }), []);

    const open = () => {
        Keyboard.dismiss();
        setVisible(true);
        if (Platform.OS === 'android') {
            AvoidSoftInput.setAdjustResize();
        }
    }

    const close = () => {
        setVisible(false);
        if (Platform.OS === 'android') {
            AvoidSoftInput.setAdjustPan();
        }
    }

    const onBackdropPress = () => {
        if (isKeyboardVisible) {
            Keyboard.dismiss();
        } else {
            close();
            if (onCustomBackdropPress) {
                onCustomBackdropPress();
            }
        }
    };

    return (
        <Modal
            style={{ margin: 0, justifyContent: 'flex-end' }}
            isVisible={visible}
            onBackdropPress={onBackdropPress}
            coverScreen={false}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                {children}
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default forwardRef(BottomSheetInput);
