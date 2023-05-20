import React, { useEffect, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { navigate } from 'navigation/utils';

import { goToFetalMovement } from 'screens/fetalMovement/src/utils';
import { goToNutritionalRegimen } from 'screens/nutritionalRegimen/src/utils';
import { goToPregnancyDueDateCalculator } from 'screens/pregnancyDueDateCalculator/src/utils';
import { goToPregnancyProducts } from 'screens/pregnancyProducts/src/utils';
import { goToPregnancyWeekByWeek } from 'screens/pregnancyWeekByWeek/src/utils';
import PaymentFailedPopup, { IPaymentFailedPopupRef } from 'screens/premium/src/components/PaymentFailedPopup';
import PaymentSuccessPopup, { IPaymentSuccessPopupRef } from 'screens/premium/src/components/PaymentSuccessPopup';
import { goToPrenatalCareCheckups } from 'screens/prenatalCareCheckups/src/utils';

import { fetchBalance } from 'states/premium/fetchPayment';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const HomeScreen = (props) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const stateFromPath = route.params?.stateFromPath;
    const refPaymentSuccess = useRef<IPaymentSuccessPopupRef>(null);
    const refPaymentFailedPopup = useRef<IPaymentFailedPopupRef>(null);

    useEffect(() => {
        if (stateFromPath?.includes('payment-success')) {
            refPaymentSuccess?.current?.showModal();
        }
        if (stateFromPath?.includes('payment-failed')) {
            refPaymentFailedPopup?.current?.showModal();
        }
    }, [stateFromPath]);

    const handleFetchBalance = async () => {
        if (stateFromPath) {
            const stateFromPathSplit = stateFromPath?.split('?')[1].split('&');
            const money = stateFromPathSplit[0];
            const accountId = stateFromPathSplit[1];
            await fetchBalance(`${money}&${accountId}`);
        }
    };

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <View style={styles.fetusInfo}>
                <Text style={styles.titleFetus}>Lich khám</Text>
                <Text style={styles.valueFetus}>24/12</Text>
            </View>
            <View>
                <Image source={Images.GirlHome} style={styles.girlHome} />
            </View>
            <View style={styles.fetusInfo}>
                <Text style={styles.titleFetus}>Tuần thai</Text>
                <Text style={styles.valueFetus}>20</Text>
            </View>
        </View>
    );

    const renderContentItems = () => (
        <View style={styles.contentItemContainer}>
            <View style={styles.rowItems}>
                <TouchableOpacity style={styles.itemContainer} onPress={goToFetalMovement}>
                    <Image source={Images.HomeMove} style={styles.imgItem} />
                    <Text style={styles.itemText}>Điểm cử động thai nhi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={goToPregnancyDueDateCalculator}>
                    <Image source={Images.HomeClock} style={styles.imgItem} />
                    <Text style={styles.itemText}>Dự tính ngày sinh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={goToPrenatalCareCheckups}>
                    <Image source={Images.HomeCalendar} style={styles.imgItem} />
                    <Text style={styles.itemText}>Lich khám</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowItems, styles.rowBottom]}>
                <TouchableOpacity style={styles.itemContainer} onPress={goToPregnancyWeekByWeek}>
                    <Image source={Images.HomePregnantMother} style={styles.imgItem} />
                    <Text style={styles.itemText}>Thai kỳ theo tuần</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={goToNutritionalRegimen}>
                    <Image source={Images.HomeCategory} style={styles.imgItem} />
                    <Text style={styles.itemText}>Chế độ dinh dưỡng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={goToPregnancyProducts}>
                    <Image source={Images.HomeLike} style={styles.imgItem} />
                    <Text style={styles.itemText}>Sản phẩm cho mẹ bầu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderContentBottom = () => (
        <View>
            <Text style={styles.bottomDes}>Sử dụng nhiều tiện ích hơn với dịch vụ</Text>
            <View style={styles.premiumContainer}>
                <TouchableOpacity style={styles.premium} onPress={() => navigate('Premium')}>
                    <SvgIcons.IcStar color={getThemeColor().white} width={scales(20)} height={scales(20)} />
                    <Text style={styles.premiumText}>Mẹ bầu Premium</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.imageHome} />
                {renderContentHeader()}
                {renderContentItems()}
                {renderContentBottom()}
            </ScrollView>
            <PaymentSuccessPopup ref={refPaymentSuccess} onConfirm={handleFetchBalance} />
            <PaymentFailedPopup ref={refPaymentFailedPopup} />
        </View>
    );
};

export default HomeScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        imageHome: {
            backgroundColor: color.Color_Primary2,
            width: Sizes.scrWidth * 2,
            borderRadius: Sizes.scrWidth,
            height: Sizes.scrWidth * 2,
            position: 'absolute',
            top: -Sizes.scrWidth / 2 - Sizes.scrWidth,
            left: -Sizes.scrWidth / 2,
        },
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        girlHome: {
            top: scales(10),
            width: scales(120),
            height: scales(120),
            backgroundColor: color.Color_Primary,
            borderRadius: scales(120),
        },
        contentHeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.scrWidth / 4,
        },
        fetusInfo: {
            backgroundColor: color.Color_Primary,
            width: scales(100),
            height: scales(100),
            borderRadius: scales(100),
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleFetus: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.white,

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        valueFetus: {
            ...Fonts.inter700,
            fontSize: scales(20),
            color: color.white,
            marginTop: scales(8),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        contentItemContainer: {
            marginTop: scales(60),
        },
        imgItem: {
            width: scales(65),
            height: scales(65),
        },
        itemContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: (Sizes.scrWidth - scales(30)) / 3,
        },
        itemText: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(15),
            textAlign: 'center',
            width: (Sizes.scrWidth - scales(30)) / 4,
        },
        rowItems: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        rowBottom: {
            marginTop: scales(30),
        },
        bottomDes: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginVertical: scales(30),
            alignSelf: 'center',
        },
        premiumContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        premium: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.Color_Primary,
            paddingVertical: scales(15),
            paddingHorizontal: scales(24),
            borderRadius: scales(30),
        },
        premiumText: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.white,
            marginLeft: scales(12),
        },
    });
};
