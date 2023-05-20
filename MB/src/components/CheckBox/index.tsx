import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import SvgIcon from 'assets/svgs';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface CheckboxProps {
    active: boolean;
    setActive: (e: boolean) => void;
    containerStyle?: ViewStyle;
    title?: string;
    textStyle?: TextStyle;
    isRadioType?: boolean;
    icCheckColor?: string;
}

const CheckBox = (props: CheckboxProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { active, setActive, containerStyle, title, textStyle, isRadioType, icCheckColor } = props;

    const renderBoxStyle = () => {
        if (isRadioType) {
            return (
                <View style={[styles.boxStyle]}>
                    {active ? (
                        <View
                            style={[
                                styles.boxRadio,
                                { backgroundColor: icCheckColor ? icCheckColor : getThemeColor().Text_Dark_1 },
                            ]}
                        />
                    ) : null}
                </View>
            );
        }
        return (
            <View
                style={[
                    styles.boxStyle,
                    active
                        ? { backgroundColor: getThemeColor().Color_Primary, borderColor: getThemeColor().Color_Primary }
                        : {backgroundColor: getThemeColor().white, borderColor: getThemeColor().Text_Dark_5},
                ]}>
                {active && (
                    <SvgIcon.IcCheck color={getThemeColor().white} width={scales(8)} height={scales(6)} />
                )}
            </View>
        );
    };

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={() => setActive(!active)}>
            {renderBoxStyle()}
            {title && <Text style={[styles.title, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    );
};

export default React.memo(CheckBox);

const myStyles = (theme: string) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        boxStyle: {
            width: scales(18),
            height: scales(18),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scales(3),
            borderWidth: scales(1),
            borderColor: getThemeColor().Text_Color_Opacity_30,
            marginTop: scales(1),
        },
        title: {
            marginLeft: scales(9),
            fontSize: scales(13),
            ...Fonts.inter400,
            color: getThemeColor().Text_Dark_1,
        },
        boxRadio: {
            width: scales(10),
            height: scales(10),
            borderRadius: scales(1),
        },
    });
