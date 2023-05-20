import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, ScrollViewBase, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { goToFoods, goToFoodSave } from 'screens/foods/src/utils';
import { fetchFoodCategoryRoot } from 'states/foods/fetchFoods';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const NutritionalRegimenScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [foodCategoryRoot, setFoodCategoryRoot] = useState<food.FoodCategoryRoot[]>([]);

    const getFoodCategoryRoot = async () => {
        const response: food.FoodCategoryRoot[] = await fetchFoodCategoryRoot();
        setFoodCategoryRoot(response);
    };

    useEffect(() => {
        getFoodCategoryRoot();
    }, []);

    const renderHeader = () => (
        <Header
            title="Chế độ dinh dưỡng"
            iconRight={<SvgIcons.IcSave width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />}
            onPressRight={goToFoodSave}
        />
    );

    const renderInputSearch = () => (
        <View style={styles.searchContainer}>
            <Input placeholder="Tên thực phẩm, thành phần chính" />
        </View>
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.image} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    const renderContentFoods = (item: food.FoodCategoryRoot) => (
        <View style={styles.contentFoodContainer}>
            <TouchableOpacity style={styles.itemContentFoodContainer} onPress={() => goToFoods(item)}>
                <View style={styles.imgContentFoodItemContainer}>
                    <FastImage
                        source={item?.image ? { uri: item?.image } : Images.Meat}
                        style={styles.imgContentFoodItem}
                    />
                </View>
                <Text style={styles.itemContentFoodText}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => (
        <FlatList
            data={foodCategoryRoot}
            scrollEnabled={false}
            style={styles.wrapperContent}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => renderContentFoods(item.item)}
            ListEmptyComponent={renderEmptyComponent}
            keyExtractor={(item) => item._id}
            numColumns={3}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderInputSearch()}
            {renderContent()}
        </View>
    );
};

export default NutritionalRegimenScreen;

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
            marginTop: scales(20),
        },
        imageItemSuitable: {
            width: scales(50),
            height: scales(50),
            borderRadius: scales(8),
        },
        itemSuitableContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: scales(15),
        },
        titleItemSuitable: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(10),
        },
        titleContent: {
            ...Fonts.inter700,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginVertical: scales(10),
        },
        contentFoodContainer: {
            marginVertical: scales(10),
            width: Sizes.scrWidth / 3,
            flexGrow: 3,
            flexWrap: 'wrap',
        },
        imgContentFoodItemContainer: {
            backgroundColor: color.Color_Bg,
            padding: scales(10),
            borderRadius: 999,

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        imgContentFoodItem: {
            width: scales(40),
            height: scales(40),
        },
        itemContentFoodContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            // width: (Sizes.scrWidth - scales(30)) / 3,
        },
        itemContentFoodText: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(15),
            textAlign: 'center',
            width: (Sizes.scrWidth - scales(30)) / 4,
        },
        rowItems: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        rowBottom: {
            marginTop: scales(30),
        },
        searchContainer: {
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
    });
};
