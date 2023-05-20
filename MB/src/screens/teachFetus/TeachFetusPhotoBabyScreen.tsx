import { indexOf } from 'lodash';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import TeachFetusPhotoBoyScene from './src/components/TeachFetusPhotoBoyScene';
import TeachFetusPhotoGirlScene from './src/components/TeachFetusPhotoGirlScene';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface RouteProps {
    key: string;
    title?: string;
}

const renderScene = SceneMap({
    teachFetusPhotoBoyScene: TeachFetusPhotoBoyScene,
    teachFetusPhotoGirlScene: TeachFetusPhotoGirlScene,
});

const TeachFetusPhotoBabyScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'teachFetusPhotoBoyScene', title: 'Bé trai' },
        { key: 'teachFetusPhotoGirlScene', title: 'Bé gái' },
    ]);

    const renderHeader = () => <Header title="Hình ảnh bé đáng yêu" />;

    const renderTabItem = (tabProps: TabBarItemProps<RouteProps>) => {
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
            <Image source={Images.Mom2} style={styles.headerImg} resizeMode="contain" />
            <Text style={styles.titleHeader}>Hình ảnh bé đáng yêu</Text>
            <Text style={styles.desc}>Những hình ảnh bé đáng yêu giúp cho mẹ bầu thoải mái</Text>

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

export default TeachFetusPhotoBabyScreen;

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
