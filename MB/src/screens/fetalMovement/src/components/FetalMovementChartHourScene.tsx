import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { useFetchMovementByDateNow, useMovementSelector } from 'states/fetal/hooks';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FetalMovementChartHourScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [dateActive, setDateActive] = useState<Date>(moment().toDate());
    useFetchMovementByDateNow(dateActive);
    const movements = useMovementSelector();

    const getWeek = (numWeek: number) => {
        if (numWeek === 6) {
            return 'CN';
        }
        return `T${numWeek + 2}`
    }

    const getData = (start: number, end: number) => {
        let count = 0;
        if (movements?.length) {
            movements?.map(element => {
                const hours = parseInt(element.timeStart.split(':')[0]);
                if (hours >= start && hours <= end) {
                    count += element.count;
                }
            });
        }
        return count;
    }

    const barData = [
        {
            value: getData(0, 4),
            label: '0-4h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>{getData(0, 4)}</Text>
            ),
        },
        {
            value: getData(4, 8),
            label: '4-8h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>{getData(4, 8)}</Text>
            ),
        },
        {
            value: getData(8, 12),
            label: '8-12h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>{getData(8, 12)}</Text>
            ),
        },
        {
            value: getData(12, 16),
            label: '12-16h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>{getData(12, 16)}</Text>
            ),
        },
        {
            value: getData(16, 20),
            label: '16-20h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>{getData(16, 20)}</Text>
            ),
        },
        {
            value: getData(20, 0),
            label: '20-24h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>{getData(20, 0)}</Text>
            ),
        },
    ];

    const onSelectDate = (date: Date) => {
        setDateActive(date)
    };

    const renderFilterDay = () => {
        const first = moment().toDate();
        const second = moment().subtract(1, 'days').toDate();
        const third = moment().subtract(2, 'days').toDate();
        const fourth = moment().subtract(3, 'days').toDate();
        const fifth = moment().subtract(4, 'days').toDate();
        const sixth = moment().subtract(5, 'days').toDate();
        const seventh = moment().subtract(6, 'days').toDate();

        return (
            <View style={styles.filterDayContainer}>
                <TouchableOpacity
                    style={[styles.itemFilterDayContainer, dateActive.getDay() === seventh.getDay() ? {backgroundColor: getThemeColor().Color_Primary} : {}]}
                    onPress={() => onSelectDate(seventh)}
                >
                    <Text style={styles.filterDayValue}>{getWeek(moment().subtract(6, 'days').toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{seventh.getDate()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemFilterDayContainer, dateActive.getDay() === sixth.getDay() ? {backgroundColor: getThemeColor().Color_Primary} : {}]}
                    onPress={() => onSelectDate(sixth)}
                >
                    <Text style={styles.filterDayValue}>{getWeek(moment().subtract(5, 'days').toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{sixth.getDate()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemFilterDayContainer, dateActive.getDay() === fifth.getDay() ? {backgroundColor: getThemeColor().Color_Primary} : {}]}
                    onPress={() => onSelectDate(fifth)}
                >
                    <Text style={styles.filterDayValue}>{getWeek(moment().subtract(4, 'days').toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{fifth.getDate()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemFilterDayContainer,
                        dateActive.getDay() === fourth.getDay()
                            ? {backgroundColor: getThemeColor().Color_Primary}
                            : {},
                    ]}
                    onPress={() => onSelectDate(fourth)}
                >
                    <Text style={styles.filterDayValue}>{getWeek(moment().subtract(3, 'days').toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{fourth.getDate()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemFilterDayContainer, dateActive.getDay() === third.getDay() ? {backgroundColor: getThemeColor().Color_Primary} : {}]}
                    onPress={() => onSelectDate(third)}
                >
                    <Text style={styles.filterDayValue}>{getWeek(moment().subtract(2, 'days').toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{third.getDate()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemFilterDayContainer, dateActive.getDay() === second.getDay() ? {backgroundColor: getThemeColor().Color_Primary} : {}]}
                    onPress={() => onSelectDate(second)}
                >
                    <Text style={styles.filterDayValue}>{getWeek(moment().subtract(1, 'days').toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{second.getDate()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemFilterDayContainer, dateActive.getDay() === first.getDay() ? {backgroundColor: getThemeColor().Color_Primary} : {}]} onPress={() => onSelectDate(first)}>
                    <Text style={styles.filterDayValue}>{getWeek(moment().toDate().getDay())}</Text>
                    <Text style={styles.filterDayValue}>{first.getDate()}</Text>
                </TouchableOpacity>
            </View>
        )
    };

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
            )
        }
        return (
            <View style={styles.movementHistoryContainer}>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Ngày</Text>
                    {
                        historyData?.map(element => {
                            const value = element.date.split('/');
                            return <Text style={styles.movementHistoryValue} key={element._id}>{`${value[0]}/${value[1]}`}</Text>
                        })
                    }
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Giờ bắt đầu</Text>
                    {
                        historyData?.map(element => <Text style={styles.movementHistoryValue} key={element._id}>{element.timeStart}</Text>)
                    }
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Thời gian đếm</Text>
                    {
                        historyData?.map(element => <Text style={styles.movementHistoryValue} key={element._id}>{element.timeCount}</Text>)
                    }
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Số cử động</Text>
                    {
                        historyData?.map(element => <Text style={styles.movementHistoryValue} key={element._id}>{element.count}</Text>)
                    }
                </View>
            </View>
        )
    };
    return (
        <View style={styles.container}>
            {renderFilterDay()}
            {renderChartView()}
            {renderMovementHistory()}
        </View>
    );
};

export default FetalMovementChartHourScene;

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
