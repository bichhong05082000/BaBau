import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface InputProps extends TextInputProps {
    title?: string;
    rightIconTitle?: ReactElement;
    rightTitle?: string;
    onPressRightTitle?: () => void;
    errorMessage?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    bottomMessage?: string;
    icon?: ReactElement;
    onPressIcon?: () => void;
    leftIcon?: ReactElement;
    onPressLeftIcon?: () => void;
    leftIconStyle?: StyleProp<ViewStyle>;
    rightIconStyle?: StyleProp<ViewStyle>;
}

const Input = (props: InputProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const {
        title,
        rightTitle,
        rightIconTitle,
        onPressRightTitle,
        icon,
        onPressIcon,
        errorMessage,
        bottomMessage,
        leftIcon,
        onPressLeftIcon,
        containerStyle,
        inputContainerStyle,
        inputStyle,
        leftIconStyle,
        rightIconStyle,
    } = props;

    const renderHeader = () =>
        title || rightTitle ? (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
                {rightTitle || rightIconTitle ? (
                    <TouchableOpacity onPress={onPressRightTitle} style={styles.headerRight}>
                        {rightIconTitle ? rightIconTitle : null}
                        {rightTitle ? (
                            <Text style={[styles.headerText, { paddingLeft: scales(5) }]}>{rightTitle}</Text>
                        ) : null}
                    </TouchableOpacity>
                ) : null}
            </View>
        ) : null;

    return (
        <View style={[styles.container, containerStyle]}>
            {renderHeader()}
            <View
                style={[
                    styles.inputContainer,
                    inputContainerStyle,
                    errorMessage ? { borderColor: getThemeColor().Color_Red_1 } : {},
                ]}>
                {leftIcon ? (
                    <TouchableOpacity onPress={onPressLeftIcon} hitSlop={styles.hitSlopIcon} style={leftIconStyle}>
                        {leftIcon}
                    </TouchableOpacity>
                ) : null}
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholderTextColor={getThemeColor().Text_Dark_4}
                    {...props}
                />
                {icon ? (
                    <TouchableOpacity onPress={onPressIcon} hitSlop={styles.hitSlopIcon} style={rightIconStyle}>
                        {icon}
                    </TouchableOpacity>
                ) : null}
            </View>
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : bottomMessage ? (
                <Text style={styles.bottomText}>{bottomMessage}</Text>
            ) : null}
        </View>
    );
};

export default Input;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {},
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: scales(10),
        },
        headerText: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        headerRight: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scales(46),
            backgroundColor: color.Light_2,
            borderRadius: scales(6),
            paddingRight: scales(15),
            borderColor: color.transparent,
            borderWidth: scales(1),
        },
        input: {
            flex: 1,
            ...Fonts.inter600,
            fontSize: scales(13),
            color: color.Text_Dark_1,
            height: scales(46),
            paddingHorizontal: scales(15),
        },
        hitSlopIcon: {
            top: 15,
            bottom: 15,
            left: 15,
            right: 15,
        },
        errorText: {
            ...Fonts.inter400,
            paddingTop: scales(5),
            color: color.Color_Red_1,
            fontSize: scales(13),
        },
        bottomText: {
            ...Fonts.inter400,
            paddingTop: scales(10),
            color: color.Text_Dark_3,
            fontSize: scales(13),
        },
    });
};
