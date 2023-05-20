import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lowerFirst, upperFirst } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { EThemeColor } from 'constants/index';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';
import { navigate } from 'navigation/utils';

import Fonts from 'themes/fonts';
import Sizes from 'themes/sizes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const Tab = createBottomTabNavigator<RootNavigatorParamList>();

const MyTabBar = (props: BottomTabBarProps) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = myStyles(theme);
    const { state } = props;

    return (
        <View style={styles.container}>
            {state?.routes?.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigate(route.name as keyof RootNavigatorParamList);
                    }
                };

                const IconTab = SvgIcons[`IcTab${upperFirst(route.name)}${isFocused ? 'Active' : ''}`];

                return (
                    <TouchableOpacity shouldHaptic key={index.toString()} style={styles.btnTab} onPress={onPress}>
                        <IconTab width={scales(27)} height={scales(27)} />
                        <Text
                            style={[
                                styles.title,
                                { color: isFocused ? getThemeColor().Color_Primary : getThemeColor().Text_Dark_1 },
                            ]}>
                            {t(`tabBar.${lowerFirst(route.name)}`)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default MyTabBar;

const myStyles = (theme: EThemeColor) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: Sizes.bottomSpace + scales(60),
            paddingBottom: Sizes.bottomSpace,
            backgroundColor: color.Color_Bg,
        },
        btnTab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: scales(5),
        },
        title: {
            ...Fonts.inter400,
            paddingTop: scales(5),
            fontSize: scales(11),
        },
    });
};
