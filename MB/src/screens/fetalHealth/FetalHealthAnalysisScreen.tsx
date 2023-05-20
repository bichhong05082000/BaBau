import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { goBack, pop } from 'navigation/utils';
import { goToPregnancyProductsDetail1 } from 'screens/pregnancyProducts/src/utils';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IFetalHealthAnalysisScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FetalHealthAnalysis'>;
}

const FetalHealthAnalysisScreen = (props: IFetalHealthAnalysisScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { fromScreen } = route.params;

    const onPressLeft = () => {
        if (fromScreen === 'FETAL_HEALTH_INFO') {
            pop(2);
        }
        goBack();
    };

    const renderHeader = () => <Header title="Kết quả phân tích" onPressLeft={onPressLeft} />;

    const renderAnalysis = () => (
        <View style={styles.analysisContainer}>
            <Text style={styles.txt}>
                <Text style={styles.textBold}>Chiều dài (CRL) :</Text> Thấp hơn so với tiêu chuẩn
            </Text>
            <Text style={styles.txt}>
                <Text style={styles.textBold}>Đường kính lưỡng đỉnh (BPD): </Text>Bình thường
            </Text>
            <Text style={styles.txt}>
                <Text style={styles.textBold}>Chiều dài xương đùi (FL): </Text>Cao hơn so với bình thường
            </Text>
            <Text style={styles.txt}>
                <Text style={styles.textBold}>Chu vi đầu (HC): </Text>Cao hơn so với bình thường
            </Text>
            <Text style={styles.txt}>
                <Text style={styles.textBold}>Cân nặng: </Text>Cao hơn so với bình thường
            </Text>
            <Text style={styles.txt}>
                <Text style={styles.textBold}>Khuyến nghị của app: </Text>Nên bổ sung thêm các thực phẩm giàu sắt,
                canxi,...
            </Text>
        </View>
    );

    const renderItem = () => (
        <View>
            <TouchableOpacity
                style={styles.itemContentContainer}
                activeOpacity={0.9}
                onPress={goToPregnancyProductsDetail1}>
                <Image source={Images.Beef} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>7 thuốc sắt cho mẹ bầu dễ hấp thu, không bị nóng</Text>
                    <Text style={styles.itemContentDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.itemContentContainer}
                activeOpacity={0.9}
                onPress={goToPregnancyProductsDetail1}>
                <Image source={Images.FE} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>Hấp thụ canxi cho mẹ và bé</Text>
                    <Text style={styles.itemContentDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.itemContentContainer}
                activeOpacity={0.9}
                onPress={goToPregnancyProductsDetail1}>
                <Image source={Images.FE2} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>Kẽm cho mẹ bầu dễ hấp thu và sự phát triển của con</Text>
                    <Text style={styles.itemContentDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.itemContentContainer}
                activeOpacity={0.9}
                onPress={goToPregnancyProductsDetail1}>
                <Image source={Images.FE3} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>Bổ sung các vitamin cần thiết</Text>
                    <Text style={styles.itemContentDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.itemContentContainer}
                activeOpacity={0.9}
                onPress={goToPregnancyProductsDetail1}>
                <Image source={Images.FE4} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>Các thực phẩm chứa Acid Folic</Text>
                    <Text style={styles.itemContentDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderPosts = () => (
        <View style={styles.postContainer}>
            <Text style={styles.titleList}>Thực phẩm khuyên dùng</Text>
            <FlatList
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                data={[1]}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
            />
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderAnalysis()}
            {renderPosts()}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FetalHealthAnalysisScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            flex: 1,
            marginHorizontal: scales(15),
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        textBold: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: 20,
        },
        txt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: 20,
        },
        analysisContainer: {
            borderRadius: scales(8),
            padding: scales(10),
            backgroundColor: color.Color_Bg,

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        postContainer: {
            marginTop: scales(10),
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
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        titleList: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
    });
};
