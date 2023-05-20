import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Images from 'assets/images';

import Button from 'components/Button/Button';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPrenatalCareCheckupsHealthyIndexProps {
    data: user.MomCheckupsResponse;
}

const PrenatalCareCheckupsHealthyIndex = (props: IPrenatalCareCheckupsHealthyIndexProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { data } = props;

    const getStatus = (value: number, min: number, max: number) => {
        if (BigNumber(value).lt(min)) {
            return (
                <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Blue }]}>
                    <Text style={styles.statusTxt}>Thấp</Text>
                </View>
            )
        } else if (BigNumber(value).gt(max)) {
           return (
               <View style={[styles.statusContainer, { backgroundColor: getThemeColor().red }]}>
                   <Text style={styles.statusTxt}>Cao</Text>
               </View>
           )
        } else if (BigNumber(value).lt(max) && BigNumber(value).gt(min)) {
            return  (
                <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Yellow_1 }]}>
                    <Text style={styles.statusTxt}>Trung bình</Text>
                </View>
            )
        }
    }

    const getDotPosition = (min: number, max: number, value: number) => {
        const baseValue = BigNumber(max).minus(min);
        const value1 = BigNumber(max).minus(value);
        if (value < min) {
            return 0;
        }
        if (value > max) {
            return Sizes.scrWidth - scales(40);
        }
        return BigNumber(1)
            .minus(BigNumber(value1).div(baseValue))
            .times(Sizes.scrWidth - scales(40))
            .toNumber();
    };

    const renderPregnancyWeekByWeek = () => (
        <View style={styles.weekContainer}>
            <Text style={styles.pointTxt}>Tuần thai: </Text>
            <Text style={styles.week}>{data.weeksOfPregnacy} tuần</Text>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderPregnancyWeekByWeek()}
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Huyết áp</Text>
                    {getStatus(data.bloodPressure, 70, 130)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={[styles.dotValue, { left: getDotPosition(70, 130, data.bloodPressure) }]}>
                        {data.bloodPressure} mm
                    </Text>
                    <View style={[styles.dot, { left: getDotPosition(70, 130, data.bloodPressure) }]} />
                </View>
            </View>
            <View>
                <View style={styles.pointContainer} />
            </View>
            <View>
                <Text style={styles.pointTxt}>Chỉ số đường huyết (mmol/L)</Text>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Lúc đói</Text>
                    {getStatus(data.fastingGlycemicIndex, 70, 130)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={[styles.dotValue, { left: getDotPosition(70, 130, data.fastingGlycemicIndex) }]}>
                        {data.fastingGlycemicIndex} mm
                    </Text>
                    <View style={[styles.dot, { left: getDotPosition(70, 130, data.fastingGlycemicIndex) }]} />
                </View>
            </View>

            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Sau ăn 1h</Text>
                    {getStatus(data.eating1hGlycemicIndex, 70, 130)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={[styles.dotValue, { left: getDotPosition(70, 130, data.eating1hGlycemicIndex) }]}>
                        {data.eating1hGlycemicIndex} mm
                    </Text>
                    <View style={[styles.dot, { left: getDotPosition(70, 130, data.eating1hGlycemicIndex) }]} />
                </View>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Sau ăn 2h</Text>
                    {getStatus(data.eating2hGlycemicIndex, 70, 130)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={[styles.dotValue, { left: getDotPosition(70, 130, data.eating2hGlycemicIndex) }]}>
                        {data.eating2hGlycemicIndex} mm
                    </Text>
                    <View style={[styles.dot, { left: getDotPosition(70, 130, data.eating2hGlycemicIndex) }]} />
                </View>
            </View>
        </View>
    );

    return <View style={styles.container}>{renderContent()}</View>;
};

export default PrenatalCareCheckupsHealthyIndex;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        image: {
            width: scales(200),
            height: scales(200),
        },
        emptyContainer: {
            alignItems: 'center',
        },
        noData: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_2,
        },
        buttonEnterData: {
            paddingHorizontal: scales(40),
            marginVertical: scales(30),
        },
        fetchData: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Color_Primary,
        },
        rightContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(25),
            height: scales(25),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
        },
        leftHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        midHeader: {
            ...Fonts.inter700,
            fontSize: scales(18),
            color: color.Text_Dark_1,
        },
        statusContainer: {
            backgroundColor: color.Color_Blue2,
            borderRadius: scales(8),
            paddingVertical: scales(5),
            paddingHorizontal: scales(8),
        },
        statusTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.white,
        },
        pointContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: scales(15),
        },
        pointTxt: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        txtWeek: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        week: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        plus: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.white,
        },
        contentHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scales(15),
        },
        weekContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scales(20),
        },
        button: {
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
        linearGradient: {
            borderRadius: 5,
            height: scales(5),
        },
        dot: {
            position: 'absolute',
            bottom: 0,
            top: -scales(2),
            left: 0,
            width: scales(10),
            height: scales(10),
            backgroundColor: color.red,
            borderRadius: scales(10),
        },
        dotValue: {
            position: 'absolute',
            bottom: scales(10),
            left: 0,
        },
        progress: {
            marginTop: scales(20),
        },
    });
};
