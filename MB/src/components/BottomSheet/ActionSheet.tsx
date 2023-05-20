import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BottomSheet, { BottomSheetProps } from 'components/BottomSheet/BottomSheet';
import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface ActionSheetProps extends BottomSheetProps {
    actions?: string[];
    selected: string;
    onSelect: (item: string) => void;
    hideCancel?: boolean;
}

const ActionSheet = React.forwardRef((props: ActionSheetProps, ref: { current }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = myStyles(theme);
    const { children, selected, actions, onSelect, hideCancel = false } = props;

    const handleClose = () => ref.current?.dismiss();

    return (
        <BottomSheet {...props} isDynamicSnapPoints ref={ref}>
            {children || (
                <View style={styles.container}>
                    <View style={styles.list}>
                        {actions.map((item, key) => (
                            <TouchableOpacity style={styles.button} key={key} onPress={() => onSelect(item)}>
                                <Text style={[styles.text, item === selected && styles.mainColor]}>{t(item)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {!hideCancel && (
                        <TouchableOpacity style={styles.button} onPress={handleClose}>
                            <Text style={styles.text}>Huỷ</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </BottomSheet>
    );
});

export default ActionSheet;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: Sizes.bottomSpace + scales(20),
            backgroundColor: color.white,
            borderTopLeftRadius: scales(20),
            borderTopRightRadius: scales(20),
        },
        list: {
            flex: 1,
        },
        button: {
            paddingVertical: scales(15),
            borderBottomWidth: scales(1),
            borderBottomColor: color.Color_Bg_Separator,
            alignItems: 'center',
        },
        cancel: {
            borderBottomWidth: 0,
        },
        text: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        mainColor: {
            color: color.Color_Primary,
        },
    });
};
