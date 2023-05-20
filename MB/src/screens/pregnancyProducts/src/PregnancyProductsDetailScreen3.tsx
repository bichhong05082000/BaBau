import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyProductsDetailScreen3 = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sản phẩm cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.MeBauNgu} style={styles.headerImg} />
            <View style={styles.itemContentContainer}>
                <Text style={styles.contentHeader}>Mẹo giúp mẹ bầu ngủ ngon hơn (Sức khỏe y tế - Giấc ngủ)</Text>
                <Text style={styles.contentDesc}>
                    Khi mang thai , mẹ bầu cần được nghỉ ngơi đầy đủ để em bé phát triển khỏe mạnh. Nhưng những thay đổi
                    về thể chất và tinh thần khiến mẹ thường xuyên mất ngủ, uể oải, mệt mỏi. Vậy làm sao để khắc phục
                    tình trạng này? Mẹ bầu hãy tham khảo bên dưới nhé!
                </Text>
                <Text style={styles.txtBold}>1. Điều chỉnh đồng hồ sinh học và thời gian ngủ</Text>
                <Text style={styles.desc}>
                    Đây là một yếu tố quan trọng giúp mẹ bầu hầy hết tình trạng rối loạn giấc ngủ. Mỗi ngày mẹ nên đi
                    ngủ và thức dậy cùng 1 thời điểm. Buổi trưa, mẹ không nên ngủ quá 1 tiếng để tránh gây khó ngủ vào
                    ban đêm. Quan trọng nhất nhớ nhắc nhở bản thân cố gắng tuân thủ thời gian đã đặt ra.
                </Text>
                <Text style={styles.txtBold}>2. Tạo môi trường ngủ thích hợp</Text>
                <Text style={styles.desc}>
                    Mẹ cần một căn phòng sạch sẽ, gọn gàng, thoáng mát. Điều chỉnh nhiệt độ phù hợp với thời tiết và sử
                    dụng các vật hỗ trợ loại bỏ ánh sáng và âm thanh làm ảnh hưởng tới giấc ngủ.
                </Text>
                <Text style={styles.txtBold}>3. Mặc đồ ngủ thoải mái</Text>
                <Text style={styles.txtBold}>4. Thư giãn trước khi ngủ</Text>
                <Text style={styles.desc}>
                    Có rất nhiều hoạt động thư giãn trước khi ngủ như: đọc một cuốn sách, nghe một điệu nhạc , trò
                    chuyện cùng bạn bè...
                </Text>
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

export default PregnancyProductsDetailScreen3;

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
