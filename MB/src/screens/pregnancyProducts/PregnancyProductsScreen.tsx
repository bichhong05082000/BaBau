import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
    goToPregnancyProductsDetail1,
    goToPregnancyProductsDetail2,
    goToPregnancyProductsDetail3,
    goToPregnancyProductsDetail4,
    goToPregnancyProductsDetail5,
    goToPregnancyProductsDetail6,
} from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyProductsScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sản phẩm cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.Product1} style={styles.headerImg} />
            <Text style={styles.titleHeader}>Thực phẩm cho mẹ</Text>
            <Text style={styles.desc}>Thực phẩm chức năng khuyên dùng dành riêng cho mẹ bầu</Text>
            <View>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToPregnancyProductsDetail1}>
                    <Image source={Images.Product2} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>7 thuốc sắt cho mẹ bầu dễ hấp thu, không bị nóng</Text>
                        <Text style={styles.itemContentDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToPregnancyProductsDetail2}>
                    <Image source={Images.Product4} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Bí quyết làm trắng da hiệu quả cho mẹ mang thai</Text>
                        <Text style={styles.itemContentDesc}>Để quá trình làm sáng da, trắng da an ...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToPregnancyProductsDetail3}>
                    <Image source={Images.Product5} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>
                            Mẹo giúp mẹ bầu ngủ ngon hơn (Sức khỏe y tế - Giấc ngủ)
                        </Text>
                        <Text style={styles.itemContentDesc}>Khi mang thai , mẹ bầu cần được nghỉ...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToPregnancyProductsDetail4}
                >
                    <Image source={Images.Product6} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>
                            9 gối bà bầu giảm đau lưng, cho mẹ bầu tư thế thoải mái
                        </Text>
                        <Text style={styles.itemContentDesc}>Từ tuần thứ 13 trở đi của thai kỳ ...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToPregnancyProductsDetail5}>
                    <Image source={Images.Product7} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Đồ dùng chuẩn bị cho mẹ và bé</Text>
                        <Text style={styles.itemContentDesc}>
                            Chuẩn bị cho mẹ và bé luôn là việc cần làm mỗi khi bước vào giai đoạn thai kỳ...
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContentContainer}
                    activeOpacity={0.9}
                    onPress={goToPregnancyProductsDetail6}>
                    <Image source={Images.Product2} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Vitamin cho mẹ bầu dễ hấp thụ, tăng cường đề kháng</Text>
                        <Text style={styles.itemContentDesc}>Trong quá trình mang thai , mẹ bầu cần ...</Text>
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

export default PregnancyProductsScreen;

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
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
            flexDirection: 'row',
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
    });
};
