import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface ButtonProps {
    title: string;
    width?: number;
    height?: number;
    disabled?: boolean;
    disableGradient?: boolean;
    customStyles?: StyleProp<ViewStyle>;
    customTextStyles?: StyleProp<TextStyle>;
    loadingColor?: string;
    onPress?: () => void;
    loading?: boolean;
    icon?: React.ReactNode;
}

// eslint-disable-next-line complexity
const Button = (props: ButtonProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const {
        title,
        width,
        height,
        disabled = false,
        disableGradient = false,
        customStyles,
        customTextStyles,
        loading,
        loadingColor,
        icon,
    } = props;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                width ? { width } : {},
                height ? { height } : {},
                disabled ? { backgroundColor: getThemeColor().Text_Color_Opacity_30 } : {},
                customStyles,
            ]}
            onPress={props.onPress}
            disabled={disabled || loading}>
            {disabled || disableGradient ? null : (
                <LinearGradient
                    useAngle
                    angle={90}
                    start={{ x: 0, y: 1 }}
                    colors={[getThemeColor().Color_Primary, getThemeColor().Color_Primary]}
                    style={styles.linearGradient}
                />
            )}
            {loading ? (
                <ActivityIndicator color={loadingColor || getThemeColor().Text_Dark_1} />
            ) : (
                <Text
                    style={[
                        styles.title,
                        customTextStyles,
                        disabled ? { color: getThemeColor().Text_Color_Opacity_30 } : {},
                    ]}>
                    {title}
                </Text>
            )}
            {icon && icon}
        </TouchableOpacity>
    );
};

export default Button;

const myStyles = (_theme: string) =>
    StyleSheet.create({
        container: {
            height: scales(40),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scales(5),
        },
        linearGradient: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: scales(5),
        },
        title: {
            ...Fonts.inter600,
            color: getThemeColor().white,
            fontSize: scales(14),
            paddingBottom: scales(1),
        },
    });
