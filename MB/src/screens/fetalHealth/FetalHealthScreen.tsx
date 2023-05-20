import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Subscription } from 'rxjs';

import Images from 'assets/images';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import {
    goToAddPrenatalCareCheckupsStep1,
    goToPrenatalCareCheckupsItemHistory,
} from 'screens/prenatalCareCheckups/src/utils';

import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';

import { fetchBabyCheckupsHistory } from 'states/user/fetchCheckups';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { goToFetalHealthChart } from './src/utils';

const FetalHealthScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [history, setHistory] = useState<user.CheckupsScheduleHistoryResponse>(null);
    const subScription = new Subscription();

    const getDataHistory = async () => {
        const response = await fetchBabyCheckupsHistory();
        if (response) {
            setHistory(response);
        }
    };

    useEffect(() => {
        getDataHistory();
    }, []);

    useEffect(() => {
        onRegisterEventBus();
        return () => {
            subScription?.unsubscribe?.();
        };
    }, []);

    const onRegisterEventBus = () => {
        subScription.add(
            EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
                if (res?.type === EventBusName.REMOVE_FETAL_HISTORY_SUCCESS) {
                    getDataHistory();
                } else if (res?.type === EventBusName.CREATE_FETAL_HISTORY_SUCCESS) {
                    getDataHistory();
                }
            })
        );
    };

    const renderHeaderRight = () => (
        <View style={styles.rightContainer}>
            <Text style={styles.plus}>+</Text>
        </View>
    );

    const renderHeader = () => (
        <Header
            title="Sức khỏe thai nhi"
            iconRight={renderHeaderRight()}
            onPressRight={() => goToAddPrenatalCareCheckupsStep1('CREATE')}
        />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.image} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
            <Button title="Nhập dữ liệu" customStyles={styles.buttonEnterData} />
            <Text style={styles.fetchData}>Lấy dữ liệu khám định kỳ</Text>
        </View>
    );

    const renderItem = (element: {
        child: user.CheckupsScheduleChildResponse;
        momId: user.CheckupsScheduleMomResponse;
    }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.titleItem}>Ngày khám {moment(element.child.createdAt).format('DD/MM/YYYY')}</Text>
            <View style={styles.row}>
                <Text style={styles.titleLeft}>
                    Tuần thai: <Text style={styles.textBold}>{element.child.weeksOfPregnacy} tuần</Text>
                </Text>
                <Text style={styles.valueRight}>
                    Chiều dài: <Text style={styles.textBold}>{element.child.femurLength} mm</Text>
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.valueRight}>
                    Cân nặng của bé: <Text style={styles.textBold}>{element.child.weight} gr</Text>
                </Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => goToPrenatalCareCheckupsItemHistory(element.child, element.momId, 'FETAL_HEALTH')}>
                    <Text style={[styles.titleLeft,  { textDecorationLine: 'underline' }]}>Xem chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToFetalHealthChart(element.child, element.momId)}>
                    <Text style={[styles.valueRight, { textDecorationLine: 'underline' }]}>Hiển thị biểu đồ</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
        </View>
    );

    const renderContent = () => (
        <FlatList
            data={history?.data?.reverse()}
            keyExtractor={(item) => item.momId._id.toString()}
            renderItem={(item) => renderItem(item.item)}
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent()}
        />
    );
    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FetalHealthScreen;

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
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        line: {
            borderWidth: 0.5,
            borderColor: color.Text_Dark_4,
            marginVertical: scales(10),
        },
        titleHistory: {
            ...Fonts.inter700,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        itemContainer: {
            marginBottom: scales(10),
        },
        titleItem: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(5),
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: scales(5),
        },
        titleLeft: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        valueRight: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        itemDate: {
            flexDirection: 'row',
            marginBottom: scales(10),
            marginTop: scales(5),
        },
        dateText: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(8),
        },
        textBold: {
            ...Fonts.inter600,
        },
    });
};
