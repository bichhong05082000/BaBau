import Images from 'assets/images';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Subscription } from 'rxjs';
import { goToFoodDetailSaved } from 'screens/foods/src/utils';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';
import { fetchFoodSaved } from 'states/foods/fetchFoods';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FoodSaveScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [foodsSaved, setFoodsSave] = useState<food.FoodSave[]>([]);
    const subScription = new Subscription();

    const getFoodSaved = async () => {
        const response = await fetchFoodSaved();
        setFoodsSave(response);
    };

    useEffect(() => {
        getFoodSaved();
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
                if (res?.type === EventBusName.REMOVE_FOOD_SAVE_SUCCESS) {
                    getFoodSaved();
                }
            })
        );
    };

    const renderHeader = () => (
        <Header title='Đã lưu' />
    );

    const renderItem = (item: food.FoodSave) => (
        <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={() => goToFoodDetailSaved(item)}>
            <FastImage
                source={item?.idFood?.image ? { uri: item?.idFood?.image } : Images.Beef}
                style={styles.image}
            />
            <View style={styles.itemContent}>
                <Text style={styles.itemContentHeader}>{item?.idFood?.name}</Text>
                <Text style={styles.itemContentDesc} numberOfLines={1}>
                    {item?.idFood?.making}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.imageEmp} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    const renderContent = () => (
        <FlatList
            data={foodsSaved}
            renderItem={(item) => renderItem(item.item)}
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
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

export default FoodSaveScreen;

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
        itemContentContainer: {
            flexDirection: 'row',
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
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        imageEmp: {
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
