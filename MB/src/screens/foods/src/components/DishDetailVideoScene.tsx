import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Images from 'assets/images';

import { useTheme } from 'hooks/useTheme';

import { DishDetailScreenRouteProps } from 'screens/foods/DishDetailScreen';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IDishDetailVideoSceneProps {
    route: DishDetailScreenRouteProps;
}

const DishDetailVideoScene = (props: IDishDetailVideoSceneProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodOfCategory } = route;

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    return (
        <ScrollView>
            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scrollEnabled={false}
                source={{
                    uri: `${foodOfCategory?.video}?controls=0&showinfo=0&wmode=transparent&rel=0&mode=opaque`,
                }}
                style={{
                    height: scales(200),
                    width: Dimensions.get('window').width - scales(30),
                }}
                onError={(err) => {
                    console.log(err, 'this is errr');
                }}
            />
        </ScrollView>
    );
};

export default DishDetailVideoScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
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
