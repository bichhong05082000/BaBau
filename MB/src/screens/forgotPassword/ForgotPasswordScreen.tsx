import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { hideLoading, showLoading } from 'components/Loading';

import { BASE_URL } from 'configs/api';

import { useTheme } from 'hooks/useTheme';

import { goToLogin } from 'screens/login/src/utils';
import { goToVerifyOTP } from 'screens/verifyOTP/src/utils';

import { fetchSendOtpForgotPassword } from 'states/user/fetchForgotPassword';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

const ForgotPasswordScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [email, setEmail] = useState<string>('');

    const handlePress = async () => {
        // TODO: call api
        showLoading();
        const { statusCode, message } = await fetchSendOtpForgotPassword(email);
        hideLoading();
        // TODO: go to confirm OTP
        if (statusCode === 200) {
            showCustomToast(message);
            goToVerifyOTP(email, 'ForgotPassword');
        }
    };

    const renderHeader = () => (
        <View style={styles.tileContainer}>
            <Text style={styles.title}>Quên mật khẩu</Text>
        </View>
    );

    const renderInputEmail = () => (
        <View>
            <View>
                <Text style={styles.titleInput}>Email</Text>
                <Input value={email} onChangeText={setEmail} placeholder="Vui lòng nhập email để lấy lại mật khẩu" />
            </View>
        </View>
    );

    const renderButton = () => (
        <Button title="Gửi" customStyles={{ marginTop: scales(20), marginBottom: scales(20) }} onPress={handlePress} />
    );

    const renderBackToLogin = () => (
        <View style={styles.backToLogin}>
            <Text style={styles.back}>Quay lại</Text>
            <Text onPress={goToLogin} style={styles.login}>
                Đăng nhập
            </Text>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderHeader()}
            {renderInputEmail()}
            {renderButton()}
            {renderBackToLogin()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="" />
            {renderContent()}
        </View>
    );
};

export default ForgotPasswordScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        tileContainer: {
            marginTop: scales(40),
            marginBottom: scales(40),
            alignItems: 'center',
        },
        title: {
            ...Fonts.inter700,
            fontSize: scales(24),
            color: color.Color_Primary,
        },
        titleInput: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        backToLogin: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        login: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(5),
            textDecorationLine: 'underline',
        },
        back: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
    });
};
