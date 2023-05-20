import { StyleSheet } from 'react-native';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export const customToast = (message: string) => {
    /*
    Custom toast
    */
    toast.show(message, {
        placement: 'top',
        textStyle: customStyles.textCustomToast,
        style: customStyles.viewToast,
    });
};

const customStyles = StyleSheet.create({
    viewToast: {
        flex: 1,
        backgroundColor: getThemeColor().customToast,
        alignSelf: 'center',
        borderRadius: scales(5),
        paddingHorizontal: scales(30),
        paddingVertical: scales(15),
        opacity: 0.85,
    },
    textCustomToast: {
        fontSize: scales(14),
        ...Fonts.inter400,
        color: getThemeColor().white,
        fontWeight: '400',
    },
});
