import { RouteProp } from '@react-navigation/native';
import SvgIcons from 'assets/svgs';
import { indexOf } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import FoodDetailDishScene from './src/components/FoodDetailDishScene';
import FoodDetailInformationScene from './src/components/FoodDetailInformationScene';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { fetchFoodsOfCategory, saveFood } from 'states/foods/fetchFoods';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface FoodDetailScreenRouteProps {
    key: string;
    title?: string;
    foodCategory?: food.FoodCategory;
}

interface IFoodDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FoodDetail'>;
}

const renderScene = SceneMap({
    foodDetailInformationScene: FoodDetailInformationScene,
    foodDetailDishScene: FoodDetailDishScene,
});

const FoodDetailScreen = (props: IFoodDetailScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodCategory } = route.params;
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [foodDetail, setFoodDetail] = useState<food.FoodOfCategory[]>([]);
    const [routes] = React.useState([
        { key: 'foodDetailInformationScene', title: 'Thông tin', foodCategory },
        { key: 'foodDetailDishScene', title: 'Món ngon', foodCategory },
    ]);

    const getFoodDetail = async () => {
        const response = await fetchFoodsOfCategory(foodCategory?._id);

        console.log('response', response);
        setFoodDetail(response);
    };

    useEffect(() => {
        getFoodDetail();
    }, []);

    const renderHeader = () => <Header title={foodCategory?.name} />;

    const renderTabItem = (tabProps: TabBarItemProps<FoodDetailScreenRouteProps>) => {
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
            <FastImage
                source={foodCategory?.image ? { uri: foodCategory?.image } : Images.Beef}
                style={styles.headerImg}
                resizeMode="contain"
            />
            <Text style={styles.titleHeader}>{foodCategory?.name}</Text>
            <Text style={styles.desc}>{foodDetail?.[0]?.description}</Text>
            <Text style={styles.tag}># Thuộc nhóm {foodCategory?.idRoot?.name}</Text>

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

export default FoodDetailScreen;

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
