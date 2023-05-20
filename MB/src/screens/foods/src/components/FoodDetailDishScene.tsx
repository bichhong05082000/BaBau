import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { goToDishDetail } from '../utils';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { FoodDetailScreenRouteProps } from 'screens/foods/FoodDetailScreen';

import { fetchFoodCategoryByFoodCategoryRootId, fetchFoodsOfCategory } from 'states/foods/fetchFoods';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IFoodDetailDishSceneSceneProps {
    route: FoodDetailScreenRouteProps;
}

const FoodDetailDishScene = (props: IFoodDetailDishSceneSceneProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodCategory } = route;
    const [foodFavorites, setFoodFavorites] = useState<food.FoodOfCategory[]>([]);

    const getFoodFavorites = async () => {
        const response = await fetchFoodsOfCategory(foodCategory?._id);
        setFoodFavorites(response);
    };

    useEffect(() => {
        getFoodFavorites();
    }, []);

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    const renderContent = () => (
        <View>
            {foodFavorites.length > 0 ? foodFavorites?.map((food) => (
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={() => goToDishDetail(food)}>
                    <FastImage
                        source={food?.image ? { uri: food?.image } : Images.Beef}
                        style={styles.image}
                    />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>{food?.name}</Text>
                        <Text style={styles.itemContentDesc} numberOfLines={1}>
                            {food?.making}
                        </Text>
                    </View>
                </TouchableOpacity>
            )) : renderEmptyComponent()}
        </View>
    );

    return (
        <ScrollView
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {renderContent()}
        </ScrollView>
    );
};

export default FoodDetailDishScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            marginBottom: Sizes.bottomSpace + scales(5),
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        headerTitle: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        month: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(5),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: 20,
            marginVertical: scales(10),
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
        emptyImage: {
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
