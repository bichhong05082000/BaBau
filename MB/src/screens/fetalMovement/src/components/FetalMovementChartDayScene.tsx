import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { useTheme } from 'hooks/useTheme';

import { useFetchMovementFromDateToDate, useMovementSelector } from 'states/fetal/hooks';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FetalMovementChartDayScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const first = moment().subtract(5, 'days').toDate();
    const second = moment().subtract(4, 'days').toDate();
    const third = moment().subtract(3, 'days').toDate();
    const fourth = moment().subtract(2, 'days').toDate();
    const fifth = moment().subtract(1, 'days').toDate();
    const sixth = moment().toDate();

    useFetchMovementFromDateToDate({ from: first, to: sixth });
    const movements = useMovementSelector();

    const getData = (currentDate: number) => {
        let count = 0;
        if (movements?.length) {
            movements?.map((element) => {
                const date = parseInt(element.date.split(':')[0]);
                if (currentDate === date) {
                    count += element.count;
                }
            });
        }
        return count;
    };

    const barData = [
        {
            value: getData(first.getDate()),
            label: `${first.getDate()}/${first.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(first.getDate())}
                </Text>
            ),
        },
        {
            value: getData(second.getDate()),
            label: `${second.getDate()}/${second.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(second.getDate())}
                </Text>
            ),
        },
        {
            value: getData(third.getDate()),
            label: `${third.getDate()}/${third.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(third.getDate())}
                </Text>
            ),
        },
        {
            value: getData(fourth.getDate()),
            label: `${fourth.getDate()}/${fourth.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(fourth.getDate())}
                </Text>
            ),
        },
        {
            value: getData(fifth.getDate()),
            label: `${fifth.getDate()}/${fifth.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(fifth.getDate())}
                </Text>
            ),
        },
        {
            value: getData(sixth.getDate()),
            label: `${sixth.getDate()}/${sixth.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(sixth.getDate())}
                </Text>
            ),
        },
    ];

    const renderChartView = () => (
        <BarChart
            noOfSections={3}
            frontColor={getThemeColor().Color_Primary2}
            roundedTop
            roundedBottom
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            backgroundColor={getThemeColor().Color_Bg}
            activeOpacity={1}
            width={Sizes.scrWidth}
            xAxisLabelTextStyle={{
                ...Fonts.inter600,
                color: getThemeColor().Text_Dark_1,
                fontSize: scales(12),
            }}
            rotateLabel
        />
    );

    const renderMovementHistory = () => {
        const historyData = movements?.length > 6 ? movements?.slice(0, 6) : movements;
        if (!historyData?.length) {
            return (
                <View style={styles.movementHistoryContainer}>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Ngày</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Giờ bắt đầu</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Thời gian đếm</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Số cử động</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.movementHistoryContainer}>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Ngày</Text>
                    {historyData?.map((element) => {
                        const value = element.date.split('/');
                        return (
                            <Text
                                style={styles.movementHistoryValue}
                                key={element._id}>{`${value[0]}/${value[1]}`}</Text>
                        );
                    })}
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Giờ bắt đầu</Text>
                    {historyData?.map((element) => (
                        <Text style={styles.movementHistoryValue} key={element._id}>
                            {element.timeStart}
                        </Text>
                    ))}
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Thời gian đếm</Text>
                    {historyData?.map((element) => (
                        <Text style={styles.movementHistoryValue} key={element._id}>
                            {element.timeCount}
                        </Text>
                    ))}
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Số cử động</Text>
                    {historyData?.map((element) => (
                        <Text style={styles.movementHistoryValue} key={element._id}>
                            {element.count}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {renderChartView()}
            {renderMovementHistory()}
        </View>
    );
};

export default FetalMovementChartDayScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            marginHorizontal: scales(15),
        },
        movementHistoryContainer: {
            marginTop: scales(80),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        itemMovementHistoryContainer: {
            alignItems: 'center',
        },
        movementHistoryTitle: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
        },
        movementHistoryValue: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(10),
        },
        filterDayContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: scales(30),
        },
        filterDayValue: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        itemFilterDayContainer: {
            borderRadius: scales(15),
            paddingVertical: scales(10),
            backgroundColor: color.Color_Primary2,
            paddingHorizontal: scales(10),
        },
    });
};
