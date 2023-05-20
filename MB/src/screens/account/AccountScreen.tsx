import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { resetStack } from 'navigation/utils';
import { goToAccountInfo } from 'screens/accountInfo/src/utils';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Storages, { KeyStorage } from 'utils/storages';
import { goToRegisterUpdateInfo } from '../registerUpdateInfo/src/utils';

const AccountScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const onLogOut = () => {
        Storages.remove(KeyStorage.Token);
        resetStack('Login');
    };

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <Image source={Images.GirlHome} style={styles.girlHome} />
        </View>
    );

    const renderUsername = () => <Text style={styles.username}>Saka</Text>;

    const renderItems = () => (
        <View style={styles.itemsContainer}>
            <TouchableOpacity style={styles.itemContainer} onPress={goToRegisterUpdateInfo}>
                <View style={styles.itemLeftContainer}>
                    <Image source={Images.UserInfo} style={styles.itemIconLeft} resizeMode="contain" />
                    <Text style={styles.title}>Thông tin tài khoản</Text>
                </View>
                <SvgIcons.IcForward width={scales(15)} height={scales(15)} color={getThemeColor().Text_Dark_1} />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.itemLeftContainer}>
                    <Image source={Images.ChangePassword} style={styles.itemIconLeft} resizeMode="contain" />
                    <Text style={styles.title}>Đổi mật khẩu</Text>
                </View>
                <SvgIcons.IcForward width={scales(15)} height={scales(15)} color={getThemeColor().Text_Dark_1} />
            </TouchableOpacity>
            <View style={styles.line} />
            {/*<TouchableOpacity style={styles.itemContainer}>*/}
            {/*    <View style={styles.itemLeftContainer}>*/}
            {/*        <Image source={Images.StartGroup} style={styles.itemIconLeft} resizeMode="contain" />*/}
            {/*        <Text style={styles.title}>Đánh giá</Text>*/}
            {/*    </View>*/}
            {/*    <SvgIcons.IcForward width={scales(15)} height={scales(15)} color={getThemeColor().Text_Dark_1} />*/}
            {/*</TouchableOpacity>*/}
            {/*<View style={styles.line} />*/}
            <TouchableOpacity style={styles.itemContainer} onPress={onLogOut}>
                <View style={styles.itemLeftContainer}>
                    <Image source={Images.LogOut} style={styles.itemIconLeft} resizeMode="contain" />
                    <Text style={styles.title}>Đăng xuất</Text>
                </View>
                <SvgIcons.IcForward width={scales(15)} height={scales(15)} color={getThemeColor().Text_Dark_1} />
            </TouchableOpacity>
            <View style={styles.line} />
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
                {renderUsername()}
                {renderItems()}
            </ScrollView>
        </View>
    );
};

const myStyles = (themeCurrent: string) => {
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
        contentHeaderContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.scrWidth / 4,
        },
        girlHome: {
            marginTop: scales(10),
            width: scales(120),
            height: scales(120),
            backgroundColor: color.Color_Primary,
            borderRadius: scales(120),
            borderWidth: 1.5,
            borderColor: color.white,
        },
        itemsContainer: {
            marginTop: scales(30),
        },
        username: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            alignSelf: 'center',
            marginTop: scales(12),
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scales(15),
        },
        itemIconLeft: {
            width: scales(30),
            height: scales(30),
        },
        itemLeftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(15),
        },
        line: {
            borderWidth: 0.5,
            borderColor: color.Text_Dark_5,
            marginBottom: scales(15),
        },
    });
};
export default AccountScreen;
