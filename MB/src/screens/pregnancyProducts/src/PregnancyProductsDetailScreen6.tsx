import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyProductsDetailScreen6 = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sản phẩm cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.Product1} style={styles.headerImg} resizeMode="contain" />
            <View style={styles.itemContentContainer}>
                <Text style={styles.contentHeader}>Vitamin cho mẹ bầu dễ hấp thụ, tăng cường đề kháng</Text>
                <Text style={styles.contentDesc}>
                    Trong quá trình mang thai , mẹ bầu cần lưu ý bổ sung sắt đầy đủ để tránh tình trạng thiếu máu, mệt
                    mỏi hay ảnh hưởng đến sự phát triển của thai nhi trong bụng. Sau đây là gợi ý các loại thuốc sắt cho
                    bà bầu tốt nhất hiện nay.
                </Text>
                <Text style={styles.txtBold}>1. Thuốc sắt dạng nước cho bà bầu Fogyma</Text>
                <Text style={styles.desc}>
                    Thuốc sắt dạng nước Fogyma được tin dùng tại nhiều bệnh viện uy tín như Từ Dũ , bệnh viện Phụ sản
                    Trung ương, ... Với thành phần chính là Sắt III Hydroxide Polymaltose dễ hấp thu, thời gian dùng
                    thuốc trở nên linh hoạt hơn. Mẹ bầu có thể uống trước hoặc sau bữa ăn đều được .
                </Text>
                <Text style={styles.desc}>
                    <Text style={{ ...Fonts.inter600 }}>Giá tham khảo:</Text> Khoảng từ 150.000 ₫ 170.000 ₫ cho một hộp
                    4 vỉ, mỗi vỉ 5 ống 10ml .{' '}
                </Text>
                <Text style={styles.txtBold}>2. Thuốc sắt cho bà bầu Chela Ferr Forte</Text>
                <Text style={styles.desc}>
                    Được sản xuất từ đất nước Ba lan, Chela Ferr Forte luôn được đánh giá là sản phẩm cung cấp sắt và
                    các loại vitamin cần thiết để làm giảm triệu chứng thiếu máu ở bà bầu hiệu quả . Với thiết kế dạng
                    viên bao nén và đóng gói theo dạng vỉ tiện lợi , mẹ bầu có thể kiểm soát được liều lượng thuốc dễ
                    dàng hơn . Mẹ bầu có thể uống 1 viên sau khi ăn sáng 1 2 tiếng .
                </Text>
                <Text style={styles.desc}>
                    <Text style={{ ...Fonts.inter600 }}>Giá tham khảo:</Text> Khoảng 250.000 đồng/hộp 30 viên .
                </Text>
                <Text style={styles.txtBold}>3. Sắt nước cho bà bầu Hemopoly</Text>
                <Text style={styles.desc}>
                    Là nhãn hiệu đến từ Hàn Quốc với thành phần chính là Ferric hydroxid polymaltose complex , Hemopoly
                    bổ sung lượng sắt vừa đủ giúp cải thiện tình trạng thiếu máu cho mẹ bầu . Đồng thời cung cấp các
                    chất thiết yếu cho sự tăng trưởng và phát triển của thai nhi . Bên cạnh những công dụng tuyệt vời ,
                    Hemopoly cũng có thể gây ra nhiều tác dụng phụ với những mẹ bầu bị dị ứng với các thành phần của
                    thuốc như: nổi mề đay, ngứa , da nhạy cảm ánh sáng,... Vì thế , mẹ bầu hãy tham khảo ý kiến bác sĩ
                    trước khi sử dụng.
                </Text>
                <Text style={styles.desc}>
                    <Text style={{ ...Fonts.inter600 }}>Giá tham khảo:</Text> 360.000đ/hộp 20 ống.
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

export default PregnancyProductsDetailScreen6;

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
