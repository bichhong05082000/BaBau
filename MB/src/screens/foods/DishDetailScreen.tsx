import { RouteProp } from '@react-navigation/native';
import SvgIcons from 'assets/svgs';
import { indexOf } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';
import { fetchFoodById, removeSaveFood, saveFood } from 'states/foods/fetchFoods';

import DishDetailIngredientScene from './src/components/DishDetailIngredientScene';
import DishDetailMakingScene from './src/components/DishDetailMakingScene';
import DishDetailVideoScene from './src/components/DishDetailVideoScene';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface DishDetailScreenRouteProps {
    key: string;
    title?: string;
    foodOfCategory: food.FoodOfCategory;
}

const renderScene = SceneMap({
    dishDetailIngredientScene: DishDetailIngredientScene,
    dishDetailMakingScene: DishDetailMakingScene,
    dishDetailVideoScene: DishDetailVideoScene,
});

interface IDishDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'DishDetail'>;
}

const DishDetailScreen = (props: IDishDetailScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const layout = useWindowDimensions();
    const { route } = props;
    const { foodOfCategory } = route.params;
    const [foodDetail, setFoodDetail] = useState<food.FoodOfCategory>(null);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dishDetailIngredientScene', title: 'Nguyên liệu', foodOfCategory },
        { key: 'dishDetailMakingScene', title: 'Cách làm', foodOfCategory },
        { key: 'dishDetailVideoScene', title: 'Video', foodOfCategory },
    ]);

    const getFoodDetail = async () => {
        const response = await fetchFoodById(foodOfCategory?._id);
        setFoodDetail(response);
    };

    useEffect(() => {
        getFoodDetail();
    }, [])

    const renderHeader = () => <Header title={foodOfCategory?.name} iconRight={foodDetail && foodDetail?.isSave ? <SvgIcons.IcSave1 color={getThemeColor().Color_Primary} /> : <SvgIcons.IcSave color={getThemeColor().Text_Dark_1}/>} onPressRight={onSaveFood} />;

    const onSaveFood = async () => {
        if (foodDetail && !foodDetail?.isSave) {
            await saveFood(foodOfCategory?._id);
        } else {
            await removeSaveFood(foodOfCategory?._id);
        }
        getFoodDetail();
    };

    const renderTabItem = (tabProps: TabBarItemProps<DishDetailScreenRouteProps>) => {
        const { title } = tabProps.route;
        const active = indexOf(routes, tabProps.route) === tabProps.navigationState.index;
        return (
            <TouchableOpacity
                style={{
                    marginRight: scales(20),
                    paddingVertical: scales(16),
                }}
                onPress={() => {
                    setIndex(indexOf(routes, tabProps.route));
                }}>
                <Text
                    style={[
                        styles.labelTabText,
                        active ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
                    ]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderTabBar = (tabbarProps) => (
        <TabBar {...tabbarProps} style={styles.tabview} renderIndicator={() => null} renderTabBarItem={renderTabItem} />
    );

    const renderTabview = () => (
        <TabView
            lazy
            navigationState={{ index, routes }}
            style={{ backgroundColor: getThemeColor().Color_Bg }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );

    const renderContent = () => (
        <View style={styles.content}>
            <FastImage source={foodOfCategory?.image ? { uri: foodOfCategory?.image } : Images.Beef} style={styles.headerImg} />
            <Text style={styles.titleHeader}>{foodOfCategory?.name}</Text>
            <Text style={styles.tag}>#duachua #thitbo</Text>

            <View style={styles.line} />
            {renderTabview()}
            <View />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default DishDetailScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
            flex: 1,
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(20),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        tag: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Color_Blue,
            marginBottom: scales(15),
        },
        tabview: {
            backgroundColor: color.Color_Bg,
            shadowColor: 'transparent',
        },
        labelTabText: {
            ...Fonts.inter700,
            fontSize: scales(17),
            color: color.Text_Dark_1,
        },
        line: {
            borderBottomColor: getThemeColor().Color_Gray6,
            borderBottomWidth: 5,
        },
    });
};
