import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Sound from 'react-native-sound';

import PlayAudio from './PlayAudio';

import Images from 'assets/images';

import { useTheme } from 'hooks/useTheme';

import { fetchMusicForMonths } from 'states/premium/fetchMusic';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

Sound.setCategory('Playback');

const TeachFetusMusicForMomStartScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [music, setMusic] = useState<premium.MusicPremium[]>([]);

    const getMusicForFirst3Months = async () => {
        const response = await fetchMusicForMonths('first');
        setMusic(response?.musices);
    };

    useEffect(() => {
        getMusicForFirst3Months();
    }, []);


    const renderItem = (item: premium.MusicPremium) => <PlayAudio music={item} />;

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.imageEmpty} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={music}
                renderItem={(item) => renderItem(item.item)}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={renderEmptyComponent}
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default TeachFetusMusicForMomStartScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
        },
        imageEmpty: {
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
