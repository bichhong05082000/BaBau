import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

import { goToFoodDetail } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { fetchFoodCategoryByFoodCategoryRootId } from 'states/foods/fetchFoods';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IFoodsScreenProps {
    route: RouteProp<RootNavigatorParamList, 'Foods'>;
}

const FoodsScreen = (props: IFoodsScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodCategoryRoot } = route.params;
    const [foodCategory, setFoodCategory] = useState<food.FoodCategory[]>([]);

    const getFoodCategory = async () => {
        const response = await fetchFoodCategoryByFoodCategoryRootId(foodCategoryRoot?._id);
        setFoodCategory(response);
    };

    useEffect(() => {
        getFoodCategory();
    }, []);

    const renderHeader = () => <Header title="Thực phẩm" />;

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    const renderIconMonthly = (status: string) => {
        if (status === 'ERR') {
            return <SvgIcons.IcCloseRed />;
        } else if (status === 'WARNING') {
            return <SvgIcons.IcWarning />;
        } else if (status === 'OK') {
            return <SvgIcons.IcTickGreen />;
        }
    };

    const renderContent = () => (
        <View>
            {foodCategory?.length > 0 ? (
                <Text style={styles.desc}>
                   {foodCategoryRoot?.description}
                </Text>
            ) : null}

            {foodCategory?.length > 0
                ? foodCategory?.map((item) => (
                      <TouchableOpacity
                          key={item._id}
                          style={styles.itemContentContainer}
                          activeOpacity={0.9}
                          onPress={() => goToFoodDetail(item)}>
                          <View style={styles.row}>
                              <FastImage
                                  source={item?.image ? { uri: item?.image } : Images.Beef}
                                  style={styles.image}
                              />
                              <View style={styles.itemContent}>
                                  <Text style={styles.itemContentHeader}>{item.name}</Text>
                                  <Text style={styles.itemContentDesc}>
                                      Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                                  </Text>
                              </View>
                          </View>
                          <View style={styles.itemFooter}>
                              {item?.monthlyData?.map((monthly) => (
                                  <View style={styles.monthContainer}>
                                      {renderIconMonthly(monthly.status)}
                                      <Text style={styles.month}>{monthly.month}</Text>
                                  </View>
                              ))}
                          </View>
                      </TouchableOpacity>
                  ))
                : renderEmptyComponent()}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

export default FoodsScreen;

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
            lineHeight: scales(17),
            marginBottom: scales(15),
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
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
        row: {
            flexDirection: 'row',
        },
        monthContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        month: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(5),
        },
        itemFooter: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scales(10),
            paddingTop: scales(10),
            borderTopWidth: 0.2,
            borderTopColor: color.Text_Dark_5,
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
