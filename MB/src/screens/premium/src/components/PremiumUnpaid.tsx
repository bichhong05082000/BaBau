import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { fetchPayment } from 'states/premium/fetchPayment';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PremiumUnpaid = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const onPayment = async () => {
        const response: {
            href: string;
            method: string;
            rel: string;
        } = await fetchPayment();

        console.log('response', response)

        if(response?.href) {
            console.log('open')
            Linking.openURL(response?.href);
        }
    };

    return (
        <View>
            <Text style={styles.title}>
                Trải nghiệm những chức năng trên với gói dịch vụ <Text style={styles.txtPrimary}>Mẹ bầu Premium</Text>
            </Text>
            <View style={styles.paymentContainer}>
                <Text style={styles.paymentTitle}>Thanh toán ngay qua Paypal</Text>
                <TouchableOpacity style={styles.priceContainer} onPress={onPayment}>
                    <Text style={styles.price}>Chỉ với 10.000Đ</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.titleDesc}>Mua một lần dùng một đời trải nghiệm các chức năng:</Text>
                <View style={styles.itemDesc}>
                    <View style={styles.headerDesc}>
                        <Image source={Images.CheckCircle} style={styles.checkCircle} />
                        <Text style={styles.titleDesc}>Sức khỏe thai nhi</Text>
                    </View>
                    <Text style={styles.textDes}>
                        Lấy dữ liệu của bé để kiểm tra mức độ so với tiêu chuẩn rồi từ đó đưa cho mẹ bầu lời khuyên để
                        giúp bé yêu có sức khỏe ổn định nhất.
                    </Text>
                </View>

                <View style={styles.itemDesc}>
                    <View style={styles.headerDesc}>
                        <Image source={Images.CheckCircle} style={styles.checkCircle} />
                        <Text style={styles.titleDesc}>Thai giáo</Text>
                    </View>
                    <Text style={styles.textDes}>
                        Cung cấp kiến thức về thai kỳ, xem các câu chuyện, video, hình ảnh của các em bé giúp giảm
                        stress cho mẹ bầu trong quá trình mang thai.
                    </Text>
                </View>

                <View style={styles.itemDesc}>
                    <View style={styles.headerDesc}>
                        <Image source={Images.CheckCircle} style={styles.checkCircle} />
                        <Text style={styles.titleDesc}>Nhật ký thai nhi</Text>
                    </View>
                    <Text style={styles.textDes}>
                        Lưu lại những kỉ niệm đẹp với bé yêu trong quá trình mang thai với chức năng nhật ký thai nhi.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PremiumUnpaid;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        title: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        txtPrimary: {
            color: color.Color_Primary,
        },
        descContainer: {
            marginTop: scales(20),
            backgroundColor: color.Color_Bg,
            padding: scales(10),
            borderRadius: scales(6),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        titleDesc: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
        checkCircle: {
            width: scales(20),
            height: scales(20),
            marginRight: scales(10),
        },
        headerDesc: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemDesc: {
            marginTop: scales(10),
        },
        textDes: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
        paymentContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scales(15),
        },
        paymentTitle: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        price: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.white,
        },
        priceContainer: {
            backgroundColor: color.Color_Primary,
            paddingVertical: scales(12),
            paddingHorizontal: scales(15),
            borderRadius: scales(20),
            marginTop: scales(15),
        },
    });
};
