import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from 'assets/images';
import { useTheme } from 'hooks/useTheme';
import { fetchPhotoPremium } from 'states/premium/fetchPhoto';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TeachFetusPhotoGirlScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [photos, setPhotos] = useState<premium.PhotoPremium[]>([]);

    const getPhotoMale = async () => {
        const response = await fetchPhotoPremium('female');
        setPhotos(response?.images);
    };

    useEffect(() => {
        getPhotoMale();
    }, []);

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.empImage} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                    <FastImage
                        source={item?.item?.image ? { uri: item?.item?.image } : Images.Babe2}
                        style={styles.headerImg}
                    />
                )}
                ListEmptyComponent={renderEmptyComponent}
            />
        </View>
    );
};

export default TeachFetusPhotoGirlScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
            // paddingHorizontal: scales(15),
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
            borderRadius: scales(5),
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
