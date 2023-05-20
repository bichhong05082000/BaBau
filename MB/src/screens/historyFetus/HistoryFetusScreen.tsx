import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Subscription } from 'rxjs';

import { goToAddHistoryFetus } from './src/utils';

import Images from 'assets/images';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import { hideLoading, showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';
import { fetchFetalHistory } from 'states/fetal/fetchFetalHistory';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const HistoryFetusScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [history, setHistory] = useState<fetal.FetalHistory[]>([]);
    const subScription = new Subscription();

    useEffect(() => {
        onRegisterEventBus();
        return () => {
            subScription?.unsubscribe?.();
        };
    }, []);

    const onRegisterEventBus = () => {
        subScription.add(
            EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
                if (res?.type === EventBusName.CREATE_FETAL_HISTORY_SUCCESS) {
                    getHistory();
                } else if (res?.type === EventBusName.REMOVE_FETAL_HEALTHY_SUCCESS) {
                    getHistory();
                }
            })
        );
    };

    const getHistory = async () => {
        showLoading();
        const response = await fetchFetalHistory();
        hideLoading();
        setHistory(response?.babyDiaries);
    };

    useEffect(() => {
        getHistory();
    }, []);

    const renderHeader = () => <Header title="Nhật ký thai nhi" />;

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.imageEmpty} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    const renderItem = (item: fetal.FetalHistory) => {
        return (
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={() => goToAddHistoryFetus('EDIT', item)}>
                <FastImage source={item?.image ? { uri: item?.image } : Images.Babe3} style={styles.image} />
                <View style={styles.itemContent}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.week}>Tuần {item?.weeksOfPregnancy}</Text>
                    </View>
                    <Text style={styles.itemContentDesc}>{item?.note}</Text>
                    <Text style={styles.itemContentDesc}>
                        Ngày chụp: {moment(item?.createdAt).format('DD/MM/YYYY')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderButton = () => (
        <Button title="Thêm nhật ký" customStyles={styles.button} onPress={() => goToAddHistoryFetus('CREATE')} />
    );

    return (
        <>
            <View style={styles.container}>
                {renderHeader()}
                <Text style={styles.desc}>Hãy lưu lại những khoảnh khắc đẹp với bé yêu nào mẹ bầu !</Text>
                <FlatList
                    renderItem={(item) => renderItem(item.item)}
                    data={history}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={renderEmptyComponent()}
                    style={styles.wrapperContent}
                    contentContainerStyle={styles.contentContainer}
                />
                {renderButton()}
            </View>
        </>
    );
};

export default HistoryFetusScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
            marginHorizontal: scales(15),
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(15),
            paddingHorizontal: scales(12),
            marginBottom: scales(15),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        itemContent: {
            flex: 1,
            marginLeft: scales(10),
        },
        itemContentHeader: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(5),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        button: {
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
        itemHeader: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        week: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Color_Primary,
            lineHeight: scales(25),
        },
        imageEmpty: {
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
    });
};
