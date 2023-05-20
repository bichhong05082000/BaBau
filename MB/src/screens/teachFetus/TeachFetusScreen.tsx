import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
    goToTeachFetusMomRead,
    goToTeachFetusMusicForMom,
    goToTeachFetusPhotoBaby,
    goToTeachFetusVideoBaby,
} from './src/utils';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TeachFetusScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Thai giáo" />;

    const renderContent = () => (
        <View>
            <Text style={styles.desc}>
                Tạo ra môi trường trong và ngoài cơ thể mẹ tốt nhất cho sự phát triển của thai nhi
            </Text>
            <View>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToTeachFetusMusicForMom}>
                    <Image source={Images.Mom1} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Âm nhạc cho mẹ bầu</Text>
                        <Text style={styles.itemContentDesc}>
                            Giai điệu du dương sẽ kích thích sự phát triển của bé
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToTeachFetusMomRead}>
                    <Image source={Images.MomRead} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Truyện kể cho con</Text>
                        <Text style={styles.itemContentDesc}>Những câu chuyện thú vị mẹ kể cho con mỗi ngày</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToTeachFetusPhotoBaby}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Hình ảnh bé đáng yêu</Text>
                        <Text style={styles.itemContentDesc}>Những hình ảnh bé đáng yêu giúp cho mẹ bầu thoải mái</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToTeachFetusVideoBaby}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Video bé đáng yêu</Text>
                        <Text style={styles.itemContentDesc}>Những video bé đáng yêu giúp cho mẹ bầu thoải mái</Text>
                    </View>
                </TouchableOpacity>
            </View>
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

export default TeachFetusScreen;

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
            paddingTop: scales(15),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
        },
        image: {
            width: scales(100),
            height: scales(100),
        },
        itemContentContainer: {
            flexDirection: 'row',
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(18),
            paddingHorizontal: scales(15),
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
            marginTop: scales(12),
        },
    });
};
