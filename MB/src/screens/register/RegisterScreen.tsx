import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { hideLoading, showLoading } from 'components/Loading';
import { useTheme } from 'hooks/useTheme';
import { goToVerifyOTP } from 'screens/verifyOTP/src/utils';
import fetchRegister from 'states/user/fetchRegister';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

const RegisterScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const onRegister = async () => {
        try {
            if (validateInputPassword()) {
                return;
            }
            showLoading();
            const response = await fetchRegister({ email, password, phone });
            hideLoading();
            // success
            if (response && response?.statusCode === 201) {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setPhone('');
                goToVerifyOTP(email);
            }
        } catch (error) {
            hideLoading();
            console.log('error: ', error);
            if (error?.message) {
                showCustomToast(error.message);
                return;
            }
        }
    };

    const validateInputPassword = () => {
        if (password !== confirmPassword) {
            showCustomToast('Password is incorrect');
            return true;
        }
    };

    const renderHeader = () => (
        <View style={styles.tileContainer}>
            <Text style={styles.titleHeader}>Đăng ký</Text>
        </View>
    );

    const renderInputEmail = () => (
        <View>
            <Text style={styles.title}>Email</Text>
            <Input
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Vui lòng nhập email"
            />
        </View>
    );

    const renderInputPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Mật khẩu</Text>
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Vui lòng nhập mật khẩu"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderInputConfirmPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Nhập lại mật khẩu</Text>
                <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Vui lòng nhập lại mật khẩu"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderInputPhone = () => (
        <View style={styles.inputPasswordContainer}>
            <Text style={styles.title}>Số điện thoại</Text>
            <Input
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                placeholder="Vui lòng nhập số điện thoại"
            />
        </View>
    );

    const renderButton = () => (
        <Button
            title="Đăng ký"
            onPress={onRegister}
            customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
        />
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderInputEmail()}
            {renderInputPassword()}
            {renderInputConfirmPassword()}
            {renderInputPhone()}
            {renderButton()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                {renderHeader()}
                {renderContent()}
            </KeyboardAwareScrollView>
        </View>
    );
};

export default RegisterScreen;

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
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputPasswordContainer: {
            marginTop: scales(20),
        },
        tileContainer: {
            marginTop: scales(40),
            marginBottom: scales(40),
            alignItems: 'center',
        },
        titleHeader: {
            ...Fonts.inter700,
            fontSize: scales(24),
            color: color.Color_Primary,
        },
    });
};
