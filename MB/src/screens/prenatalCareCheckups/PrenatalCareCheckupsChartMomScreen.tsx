/* eslint-disable complexity */
import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import PrenatalCareCheckupsHealthyIndex from './src/components/PrenatalCareCheckupsHealthyIndex';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { fetchMomCheckupsHistory } from 'states/user/fetchCheckups';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPrenatalCareCheckupsChartMomScreenProps {
    route: RouteProp<RootNavigatorParamList, 'PrenatalCareCheckupsChartMom'>;
}

const PrenatalCareCheckupsChartMomScreen = (props: IPrenatalCareCheckupsChartMomScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const [data, setData] = useState<user.MomCheckupsResponse[]>([]);
    const [healthyIndex, setHealthyIndex] = useState<string>(moment().format('YYYY-MM-DD'));

    const first = moment().subtract(5, 'days').toDate();
    const second = moment().subtract(4, 'days').toDate();
    const third = moment().subtract(3, 'days').toDate();
    const fourth = moment().subtract(2, 'days').toDate();
    const fifth = moment().subtract(1, 'days').toDate();
    const sixth = moment().toDate();

    const getData = async () => {
        const res = await fetchMomCheckupsHistory();
        console.log(res)
        if (res) {
            setData(res);
        }
    };

    const getValueChart = (currentDate: number) => {
        let count = 0;
        if (data?.length) {
            data?.map((element) => {
                const date = parseInt(element.createdAt.split('-')[2]);
                if (currentDate === date) {
                    count += element.weight;
                }
            });
        }
        return count;
    };

    const getOnlyElementChart = () => {
        let bloodPressure = 0;
        let commonDiseases = '';
        let createdAt = '';
        let eating1hGlycemicIndex = 0;
        let eating2hGlycemicIndex = 0;
        let fastingGlycemicIndex = 0;
        let idAccount = '';
        let note = '';
        let updatedAt = '';
        let weeksOfPregnacy = '';
        let weight = 0;
        let _id = '';
        if (data?.length) {
            data?.map((element, index) => {
                if (element.createdAt.includes(healthyIndex)) {
                    _id = element._id;
                    updatedAt = element.updatedAt;
                    commonDiseases = element.commonDiseases;
                    idAccount = element.idAccount;
                    createdAt = element.createdAt;
                    note = element.note;
                    weeksOfPregnacy = element.weeksOfPregnacy;
                    weight += element.weight;
                    bloodPressure += element.bloodPressure;
                    eating1hGlycemicIndex += element.eating1hGlycemicIndex;
                    eating2hGlycemicIndex += element.eating2hGlycemicIndex;
                    fastingGlycemicIndex += element.fastingGlycemicIndex;
                }
            });
        }
        return {
            bloodPressure,
            commonDiseases,
            createdAt,
            eating1hGlycemicIndex,
            eating2hGlycemicIndex,
            fastingGlycemicIndex,
            idAccount,
            note,
            updatedAt,
            weeksOfPregnacy,
            weight,
            _id,
        };
    };

    useEffect(() => {
        getData();
    }, []);

    const barData = [
        {
            value: getValueChart(first.getDate()) || 0,
            label: `${first.getDate()}/${first.getMonth() + 1 || '0'}`  || '0',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(first.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(second.getDate()) || 0,
            label: `${second.getDate()}/${second.getMonth() + 1 || '0'}` || '0',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(second.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(third.getDate()) || 0,
            label: `${third.getDate()}/${third.getMonth() + 1 || '0'}` || '0',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(third.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(fourth.getDate()) || 0,
            label: `${fourth.getDate()}/${fourth.getMonth() + 1 || '0'}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(fourth.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(fifth.getDate()) || 0,
            label: `${fifth.getDate()}/${fifth.getMonth() + 1 || '0'}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(fifth.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(sixth.getDate()) || 0,
            label: `${sixth.getDate()}/${sixth.getMonth() + 1 || '0'}` ,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(sixth.getDate())}
                </Text>
            ),
        },
    ];

    const renderChart = () => (
        <View style={styles.chartContainer}>
            <Text style={styles.headerTitle}>Cân nặng</Text>
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
                onPress={(element) => {
                    barData.map((el) => {
                        if (el.label.includes(element.label)) {
                            const splitDay = el.label.split('/');
                            const elementDate = moment()
                                .set('days', parseInt(splitDay[0]))
                                .set('months', parseInt(splitDay[1]) - 1)
                                .format('YYYY-MM-DD');
                            setHealthyIndex(elementDate);
                        }
                    });
                }}
            />
        </View>
    );

    const renderPregnancyWeekByWeek = () => (
        <View style={styles.pregnancyWeekContainer}>
            {/* <View style={styles.weekContainer}>
                <Text style={styles.headerTitle}>Tuần thai: </Text>
                <Text style={styles.week}>{} tuần</Text>
            </View> */}
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderChart()}
            {renderPregnancyWeekByWeek()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Biểu đồ của mẹ" />
            <ScrollView>
                {renderContent()}
                <PrenatalCareCheckupsHealthyIndex data={getOnlyElementChart()} />
            </ScrollView>
        </View>
    );
};

export default PrenatalCareCheckupsChartMomScreen;

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
        chartContainer: {
            marginTop: scales(10),
        },
        headerTitle: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        week: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        pregnancyWeekContainer: {
            marginTop: scales(50),
        },
        weekContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
};
