import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goBack } from 'navigation/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';


interface Props {
    showLineBottom?: boolean;
    title?: string;
    iconLeft?: ReactElement;
    hideLeft?: boolean;
    onPressLeft?: () => void;
    iconRight?: ReactElement;
    onPressRight?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
}

const Header = (props: Props) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { showLineBottom, title, iconLeft, hideLeft, onPressLeft, iconRight, onPressRight, containerStyle } = props;

    const renderLeft = () =>
        !hideLeft ? (
            <TouchableOpacity
                style={styles.leftView}
                onPress={onPressLeft || goBack}
                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
                {iconLeft ? (
                    iconLeft
                ) : (
                    <SvgIcons.IcBack color={getThemeColor().Text_Dark_1} width={scales(20)} height={scales(15)} />
                )}
            </TouchableOpacity>
        ) : (
            <View style={styles.leftView} />
        );

    const renderCenter = () => (
        <View style={styles.viewTitle}>
            <Text style={styles.textTitle} numberOfLines={1}>
                {title?.trim()}
            </Text>
        </View>
    );

    const renderRight = () =>
        iconRight ? (
            <TouchableOpacity
                style={styles.rightView}
                disabled={!onPressRight}
                onPress={onPressRight ? onPressRight : () => {}}>
                {iconRight}
            </TouchableOpacity>
        ) : (
            <View style={styles.rightView} />
        );

    return (
        <>
            <View style={[styles.container, containerStyle]}>
                {renderLeft()}
                {renderCenter()}
                {renderRight()}
            </View>
            {showLineBottom ? <View style={styles.line} /> : null}
        </>
    );
};

export default Header;

const getStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingTop: Sizes.statusBarHeight,
            height: Sizes.statusBarHeight + scales(45),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.Color_Bg,
        },
        line: {
            height: scales(1),
            width: '100%',
            backgroundColor: color.Text_Dark_1,
            marginTop: scales(10),
        },
        leftView: {
            justifyContent: 'center',
            position: 'absolute',
            top: Sizes.statusBarHeight,
            left: scales(15),
            bottom: 0,
        },
        viewTitle: {
            flex: 1,
            marginHorizontal: scales(45),
            height: scales(45),
            alignItems: 'center',
            justifyContent: 'center',
        },
        textTitle: {
            ...Fonts.inter600,
            color: color.Text_Dark_1,
            fontSize: scales(18),
        },
        rightView: {
            justifyContent: 'center',
            position: 'absolute',
            top: Sizes.statusBarHeight,
            right: scales(15),
            bottom: 0,
        },
    });
};
