import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const RoutineCheckupsScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderContent = () => (
        <ScrollView
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Text style={styles.desc}>
                Khám thai và siêu âm định kỳ đúng giai đoạn sẽ giúp các bác sĩ đánh giá được sức khỏe của mẹ và kịp thời
                phát hiện các yếu tố bất thường của bé
            </Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemHeader}>5 - 6 tuần</Text>
                <Text style={styles.itemTxt}>Xem tình trạng vào tử cung của phôi thai, xác định tuổi thai</Text>
                <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
                <Text style={styles.itemTxt}>Siêu âm đầu dò hoặc siêu âm ổ bụng, tính chỉ số BMI, đo huyết áp</Text>
                <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
                <Text style={styles.itemTxt}>Xét nghiệm máu để phát hiện một số bệnh truyền nhiễm</Text>
                <Text style={styles.itemTitle}>Ghi chú::</Text>
                <Text style={styles.itemTxt}>Bổ sung Acid Folic</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemHeader}>7 - 8 tuần</Text>
                <Text style={styles.itemTxt}>
                    Kiểm tra xem có tim thai hay chưa, kích thước túi ối, chiều dài phôi phát triển có tương ứng với
                    tuổi thai
                </Text>
                <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
                <Text style={styles.itemTxt}>Siêu âm, đo huyết áp, xét nghiệm nước tiểu</Text>
                <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
                <Text style={styles.itemTxt}>Xét nghiệm máu để phát hiện có thiếu máu, thiếu canxi hay sắt không</Text>
                <Text style={styles.itemTitle}>Ghi chú::</Text>
                <Text style={styles.itemTxt}>Tham khảo ý kiến của bác sĩ trước khi bổ sung Sắt</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemHeader}>11 - 13 tuần</Text>
                <Text style={styles.itemTxt}>
                    Mốc khám thai quan trọng giúp sàng lọc dị tật bẩm sinh và đo độ mờ da gáy ở thai nhi
                </Text>
                <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
                <Text style={styles.itemTxt}>
                    Siêu âm: vị trí thai, tim thai, tử cung mẹ. Đo độ mờ da gáy, làm Double Test, kiểm tra dị dạng thai
                    nhi, thoát vị cơ hoành nếu có.
                </Text>
                <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
                <Text style={styles.itemTitle}>Ghi chú:</Text>
                <Text style={styles.itemTxt}>
                    Nếu thai nhi có nguy cơ mắc dị tật bẩm sinh, bác sĩ sẽ chỉ định chọc ối
                </Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemHeader}>16 - 18 tuần</Text>
                <Text style={styles.itemTxt}>
                    Phát hiện các bất thường về hình thái của thai nhi, dự đoán nguy cơ dị tật bẩm sinh
                </Text>
                <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
                <Text style={styles.itemTxt}>
                    Siêu âm hình thái phát hiện: dị dạng cơ quan, hở hàm ếch, sứt môi,... Làm Tripple Test. Đo huyết áp,
                    theo dõi cân nặng
                </Text>
                <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
                <Text style={styles.itemTitle}>Ghi chú:</Text>
                <Text style={styles.itemTxt}>Bổ sung Canxi, tham khảo ý kiến bác sĩ</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemHeader}>28 - 32 tuần</Text>
                <Text style={styles.itemTxt}>
                    Theo dõi sự phát triển của thai nhi, kiểm tra bệnh lý.Tiểu đường thai kỳ
                </Text>
                <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
                <Text style={styles.itemTxt}>
                    Siêu âm, đo huyết áp. Thực hiện kiểm tra dung nạp glucoze. Đo độ dài tử cung, xác định độ trưởng
                    thành bánh nhau.
                </Text>
                <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
                <Text style={styles.itemTxt}>Xét nghiệm nước tiểu xác định nhiễm trùng đường tiết niệu.</Text>
                <Text style={styles.itemTitle}>Ghi chú:</Text>
                <Text style={styles.itemTxt}>Tiêm vắc xin phòng ngừa uốn ván cho thai nhi.</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemHeader}>36 - 39 tuần</Text>
                <Text style={styles.itemTxt}>Kiểm tra cơn gò, kiểm soát hiện tượng sinh non</Text>
                <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
                <Text style={styles.itemTxt}>
                    Đo monitor, siêu âm: các chỉ số thai nhi(chiều dài xương đùi, chu vi vòng bụng, chu vi đầu, cân
                    nặng..), đo huyết áp, cân nặng của me
                </Text>
                <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
                <Text style={styles.itemTitle}>Ghi chú:</Text>
                <Text style={styles.itemTxt}>Nên đi khám 1 tuần 1 lần và chuẩn bị hồ sơ sinh vào tuần thứ 36.</Text>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <Header title="Lịch khám định kỳ" />
            {renderContent()}
        </View>
    );
};

export default RoutineCheckupsScreen;

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
            textAlign: 'center',
            marginBottom: scales(20),
        },
        itemContainer: {
            backgroundColor: color.white,
            marginBottom: scales(20),
            paddingHorizontal: scales(20),
            paddingVertical: scales(20),
            borderRadius: scales(8),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        itemHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Color_Primary,
            lineHeight: scales(23),
        },
        itemTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemTitle: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(16),
        },
    });
};
