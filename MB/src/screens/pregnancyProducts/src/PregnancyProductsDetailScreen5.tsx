import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyProductsDetailScreen5 = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sản phẩm cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.BeNgu} style={styles.headerImg} />
            <View style={styles.itemContentContainer}>
                <Text style={styles.contentHeader}>Đồ dùng chuẩn bị cho mẹ và bé</Text>
                <Text style={styles.contentDesc}>
                    Chuẩn bị cho mẹ và bé luôn là việc cần làm mỗi khi bước vào giai đoạn thai kỳ. Dưới đây là 1 số sản
                    phẩm thiết yếu mẹ bầu cùng tham khảo nhé.
                </Text>
                <Text style={styles.txtBold}>1. Tã dán sơ sinh</Text>
                <Text style={styles.desc}>
                    Hãy sử dụng tã dãn có chất liệu phù hợp với bé. Để đảm bảo sức khỏe làn da cho bé
                </Text>
                <Text style={styles.txtBold}>2. Bình sữa</Text>
                <Text style={styles.desc}>
                    Sau khi sinh, có vô vàn rủi ro khiến mẹ buộc phải vắt sữa bình, hoặc pha sữa công thức cho bé. Vì
                    thế, hãy chuẩn bị bình sữa dễ dàng sử dụng và an toàn cho bé.
                </Text>
                <Text style={styles.txtBold}>3. Máy hút sữa cho mẹ</Text>
                <Text style={styles.desc}>
                    Uống đủ nước sẽ vừa đảm bảo đủ ối cho bé, vừa hỗ trợ các cách làm trắng da toàn thân hiệu quả hơn.
                    Ngoài nước lọc, các loại nước ép rau củ quả cũng là lựa chọn tốt cho mẹ mang thai
                </Text>
                <Text style={styles.txtBold}>4.Nhộng nhũn mềm mại </Text>
                <Text style={styles.desc}>
                    Nhộng chũn cho bé đang được rất nhiều bố mẹ bỉm sữa sử dụng và mang lại những hiệu quả trong việc
                    nuôi & chăm con. Bởi sau 1,2 tuần trăng mật đầu tiên, bé của bạn sẽ hay giật mình, vặn mình. Đây là
                    những phản xạ sơ sinh thông thường thể hiện nỗ lực đầu tiên của bé để bảo vệ bản thân cũng như khám
                    phá thế giới của mình. Giai đoạn này, nhộng chũn chính là giải pháp số 1 giúp con ngủ ngon và sâu
                    giấc hơn.
                </Text>
                <Text style={styles.txtBold}>5. Dụng cụ vệ sinh bình sữa</Text>
                <Text style={styles.desc}>
                    Máy tiệt trùng bình sữa là loại máy dùng để khử vi khuẩn, làm sạch kể cả những bộ phận, dụng cụ của
                    bình sữa như núm ti còn tồn đọng trong bình sữa một cách hiệu quả và tối ưu hơn.
                </Text>
                <Text style={styles.txtBold}>Lời kết</Text>
                <Text style={styles.desc}>
                    Hy vọng với bài viết này sẽ giúp mẹ bầu có những lựa chọn hoàn toàn phù hợp với mẹ bầu và bé.
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

export default PregnancyProductsDetailScreen5;

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
