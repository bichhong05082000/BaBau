import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyProductsDetailScreen4 = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sản phẩm cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.GoiBaBau} style={styles.headerImg} resizeMode="contain" />
            <View style={styles.itemContentContainer}>
                <Text style={styles.contentHeader}>9 gối bà bầu giảm đau lưng, cho mẹ bầu tư thế thoải mái</Text>
                <Text style={styles.contentDesc}>
                    Từ tuần thứ 13 trở đi của thai kỳ, việc tìm kiếm một tư thế thoải mái cũng trở nên khó khăn với mẹ
                    bầu. Nên việc sử dụng một chiếc gối ngủ sẽ là một lựa chọn tuyệt vời giúp mẹ bầu ngủ ngon hơn. Hãy
                    tham khảo 9 loại gối hỗ trợ này.
                </Text>
                <Text style={styles.txtBold}>1. Gối bà bầu toàn thân Comfysure</Text>
                <Text style={styles.desc}>
                    Dáng gối chữ U, gối toàn thân hỗ trợ nâng đỡ vùng thắt lưng , giảm sức nặng của vùng bụng, cánh tay
                    và cổ. Đặc biệt , loại gối này sẽ thích hợp cho bà bầu cao.
                </Text>
                <Text style={styles.txtBold}>2. Gối toàn thân Boppy</Text>
                <Text style={styles.desc}>
                    Chiếc gối có thể điều chỉnh kiểu dáng khi bụng càng lớn, phù hợp với nhiều giai đoạn trong thai kì.
                </Text>
                <Text style={styles.txtBold}>3. Gối bà bầu Frida Mom</Text>
                <Text style={styles.desc}>Chiếc gối có thể vặn dáng U, I, YC, I,J...</Text>
                <Text style={styles.txtBold}>4. Gối bà bầu hình nhữ U Meiz</Text>
                <Text style={styles.desc}>
                    Dáng gối chữ U, gối toàn thân hỗ trợ nâng đỡ vùng thắt lưng , giảm sức nặng của vùng bụng, cánh tay
                    và cổ. Đặc biệt , loại gối này sẽ thích hợp cho bà bầu cao.
                </Text>
                <Text style={styles.txtBold}>5. Gối toàn thân Queen Rose</Text>
                <Text style={styles.desc}>
                    Chiếc gối có thể điều chỉnh kiểu dáng khi bụng càng lớn, phù hợp với nhiều giai đoạn trong thai kì.
                </Text>
                <Text style={styles.txtBold}>6. Gối ngủ nghiêng Belly</Text>
                <Text style={styles.desc}>
                    Dáng gối chữ U, gối toàn thân hỗ trợ nâng đỡ vùng thắt lưng , giảm sức nặng của vùng bụng, cánh tay
                    và cổ. Đặc biệt , loại gối này sẽ thích hợp cho bà bầu cao.
                </Text>
                <Text style={styles.txtBold}>7. Gối cho bà bầu Hicappop</Text>
                <Text style={styles.desc}>
                    Chiếc gối có thể điều chỉnh kiểu dáng khi bụng càng lớn, phù hợp với nhiều giai đoạn trong thai kì.
                </Text>
                <Text style={styles.txtBold}>8. Gối cho bà bầu PharMedoc</Text>
                <Text style={styles.desc}>
                    Chiếc gối có thể điều chỉnh kiểu dáng khi bụng càng lớn, phù hợp với nhiều giai đoạn trong thai kì.
                </Text>
                <Text style={styles.txtBold}>9. Gối đầu gối Cushy From</Text>
                <Text style={styles.desc}>Phù hợp mẹ bầu đau dây thần kinh tọa.</Text>
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

export default PregnancyProductsDetailScreen4;

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
        txtBold: {
            ...Fonts.inter600,
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
        contentHeader: {
            ...Fonts.inter600,
            fontSize: scales(18),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            textAlign: 'center',
            marginBottom: scales(15),
        },
        contentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
    });
};
