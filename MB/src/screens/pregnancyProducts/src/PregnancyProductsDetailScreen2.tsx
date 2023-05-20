import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyProductsDetailScreen2 = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sản phẩm cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.Product4} style={styles.headerImg} resizeMode="contain" />
            <View style={styles.itemContentContainer}>
                <Text style={styles.contentHeader}>Bí quyết làm trắng da hiệu quả cho mẹ mang thai</Text>
                <Text style={styles.contentDesc}>
                    Để quá trình làm sáng da, trắng da an toàn và hiệu quả thì ngoài áp dựng đúng công thức , các mẹ
                    cũng nên lưu ý một số lưu ý mẹo dưỡng trắng dưới đây.
                </Text>
                <Text style={styles.txtBold}>1. Chế độ ăn uống</Text>
                <Text style={styles.desc}>
                    Phương pháp làm trắng da toàn thân cho mẹ bầu sẽ càng hiệu quả nếu được chăm sóc từ bên trong. Mẹ
                    nên ăn nhiều rau củ, hoa quả để giúp làn da sáng mịn, chỗng lại lão hóa theo thời gian và bổ sung
                    vitamin cho thai nhi phát triển. Việc cung cấp các chất dinh dưỡng từ sâu bên trong sẽ đảm bảo an
                    toàn về sức khỏe và giúp làn da chăm sóc lâu dài thay vì những sản phẩm tác động bên ngoài
                </Text>
                <Text style={styles.txtBold}>2. Vận động</Text>
                <Text style={styles.desc}>
                    Mẹ cần một cơ thể khỏe mạnh , tinh thần rạng rỡ để vừa chuẩn bị cho việc chuyển dạ , vừa cải thiện
                    làn da mỗi ngày. Mẹ có thể tập luyện nhẹ nhàng, tham gia các khóa học yoga bầu vừa đơn giản vừa dễ
                    dàng.
                </Text>
                <Text style={styles.txtBold}>3. Uống đủ nước</Text>
                <Text style={styles.desc}>
                    Uống đủ nước sẽ vừa đảm bảo đủ ối cho bé, vừa hỗ trợ các cách làm trắng da toàn thân hiệu quả hơn.
                    Ngoài nước lọc, các loại nước ép rau củ quả cũng là lựa chọn tốt cho mẹ mang thai
                </Text>
                <Text style={styles.txtBold}>4. Cấp ẩm cho da</Text>
                <Text style={styles.desc}>
                    Muốn dưỡng trắng da toàn thân thì các mẹ bầu không nên bỏ qua cấp ẩm cho làn da thêm tươi tắn căng
                    mọng. Nếu không dưỡng ẩm đủ thì các mặt nạ thiên nhiên hay các công dụng khác cũng không phát huy
                    hiệu quả công dụng. Mẹ có thể sử dụng kem dưỡng thành phần từ thiên nhiên hoặc xịt khoáng để cấp đủ
                    nước cho da.
                </Text>
                <Text style={styles.txtBold}>5. Chống nắng cho da</Text>
                <Text style={styles.desc}>
                    Trong quá trình dưỡng trắng, làn da cần được bảo vệ tối đa, tránh những tác động, tiếp xúc với ánh
                    nắng mặt trời, tia UV. Nếu không làn da mẹ bầu sẽ trở nên ngăm sạm , nám xuất hiện nhiều hơn. Vì thế
                    hãy thoa kem chống nắng cho da mặt và da body trước khi ra ngoài mẹ nhé!
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

export default PregnancyProductsDetailScreen2;

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
