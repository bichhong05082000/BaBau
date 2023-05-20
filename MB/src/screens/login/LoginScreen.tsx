import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import Input from 'components/Input';
import { hideLoading, showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { goToForgotPassword } from 'screens/forgotPassword/src/utils';
import { goToRegister } from 'screens/register/src/utils';
import { useAppDispatch } from 'states';
import { fetchLogin } from 'states/user';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LoginScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();

    const onLogin = async () => {
        showLoading();
        dispatch(fetchLogin({ email, password }));
        hideLoading();
    };

    const renderHeader = useCallback(() => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.textHeader}>Đăng nhập</Text>
                <View style={styles.iconHeaderContainer}>
                    <SvgIcons.IcLogoLaunch width={scales(150)} height={scales(150)} />
                </View>
            </View>
        );
    }, []);

    const renderInputEmail = () => (
        <View>
            <Text style={styles.title}>Email</Text>
            <Input value={email} onChangeText={setEmail} placeholder="Vui lòng nhập email" />
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

    const renderForgotPasswordAndRegister = () => (
        <View style={styles.forgotAndRegisterContainer}>
            <TouchableOpacity onPress={goToForgotPassword}>
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToRegister}>
                <Text style={styles.register}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );

    const renderButton = () => (
        <Button
            title="Đăng nhập"
            onPress={onLogin}
            customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
        />
    );

    const renderContent = () => (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            extraHeight={scales(125)}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            enableOnAndroid>
            {renderHeader()}
            {renderInputEmail()}
            {renderInputPassword()}
            {renderForgotPasswordAndRegister()}
            {renderButton()}
        </KeyboardAwareScrollView>
    );

    return <View style={styles.container}>{renderContent()}</View>;
};

export default LoginScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        headerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scales(40),
        },
        textHeader: {
            ...Fonts.inter700,
            color: color.Color_Primary,
            fontSize: scales(24),
        },
        iconHeaderContainer: {
            marginTop: scales(20),
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
        forgotAndRegisterContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scales(20),
        },
        forgotPassword: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            textDecorationLine: 'underline',
        },
        register: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
    });
};
