import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { fetchVideos } from 'states/premium/fetchVideo';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import WebView from 'react-native-webview';

const TeachFetusVideoBabyScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [videos, setVideos] = useState<premium.VideoPremium[]>([]);

    const getVideos = async () => {
        const response = await fetchVideos();
        setVideos(response?.videos);
    };

    useEffect(() => {
        getVideos();
    }, []);

    const renderHeader = () => <Header title="Video bé đáng yêu" />;

    const renderContent = () => (
        <View style={{marginHorizontal: scales(15)}}>
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
            <Text style={styles.titleHeader}>Video bé đáng yêu</Text>
            <Text style={styles.desc}>Những video bé đáng yêu giúp cho mẹ bầu thoải mái</Text>
        </View>
    );

    const renderItem = (item: premium.VideoPremium) => (
        <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}
            source={{
                uri: `${item?.link}?controls=0&showinfo=0&wmode=transparent&rel=0&mode=opaque`,
            }}
            style={{
                height: scales(200),
                width: Dimensions.get('window').width - scales(30),
                marginBottom: scales(15),
            }}
            onError={(err) => {
                console.log(err, 'this is errr');
            }}
        />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.empImage} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
            <FlatList
                data={videos}
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                renderItem={(item) => renderItem(item.item)}
                ListEmptyComponent={renderEmptyComponent}
            />
        </View>
    );
};

export default TeachFetusVideoBabyScreen;

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
        empImage: {
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
