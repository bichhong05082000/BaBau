import BigNumber from 'bignumber.js';
import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { useTheme } from 'hooks/useTheme';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
interface TimeCountdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface FetalMovementCountdownRef {
    callback?: () => void;
    getTimeCountdown?: () => TimeCountdown;
}

interface FetalMovementCountdownProps {
    containerStyle?: StyleProp<ViewStyle>;
    countdownStyle?: StyleProp<TextStyle>;
    isPlay: boolean;
}

const FetalMovementCountdown = (props: FetalMovementCountdownProps, ref: Ref<FetalMovementCountdownRef>) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { containerStyle, countdownStyle, isPlay } = props;
    const [countdown, setCountdown] = useState<number>(0);
    const DAY_IN_MS = 1 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    const DATETIME_AFTER_DAY = NOW_IN_MS + DAY_IN_MS;

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(DATETIME_AFTER_DAY - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useImperativeHandle(ref, () => ({ getTimeCountdown, callback }));

    const getTimeCountdown = () => {
        // calculate time left
        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const callback = () => {
        setCountdown(0);
    };

    const { minutes, seconds } = getTimeCountdown();
    const time = minutes + seconds > 0 ? `${minutes}:${seconds}` : '00:00';
    const currentDateTime = minutes * 60 + seconds;
    const currentFill = new BigNumber(currentDateTime).div(3600).times(100).toNumber();

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.container}>
                <View style={styles.progressCircleContainer}>
                    <AnimatedCircularProgress
                        size={200}
                        width={6}
                        fill={currentFill}
                        rotation={0}
                        tintColor={getThemeColor().white}
                        backgroundColor={getThemeColor().Text_Dark_5}>
                        {(fill) => (
                            <View style={styles.fillContainer}>
                                <Text style={styles.textFill}>Thời gian còn lại</Text>
                                <Text style={styles.fill}>{time}</Text>
                            </View>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </View>
        </View>
    );
};

export default forwardRef(FetalMovementCountdown);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        countdown: {
            ...Fonts.inter600,
            fontSize: scales(24),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
        progressCircleContainer: {
            backgroundColor: getThemeColor().Color_Primary,
            padding: scales(10),
            borderRadius: scales(9999),
            marginTop: scales(40),
        },
        fillContainer: {
            alignItems: 'center',
        },
        fill: {
            ...Fonts.inter600,
            fontSize: scales(24),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
        textFill: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
    });
};
