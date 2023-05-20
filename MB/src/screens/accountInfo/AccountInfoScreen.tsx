import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

function AccountInfoScreen(props) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [disable, setDisable] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [dob, setDob] = useState<Date>(moment().toDate());

    const renderHeader = () => (
        <Header title='Thông tin tài khoản' />
    );

    const renderContent = () => (
        <View style={{ marginHorizontal: scales(15) }}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Email</Text>
                <Input value={email} onChangeText={setEmail} placeholder="Vui lòng nhập email" editable={false}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Họ và tên</Text>
                <Input value={name} onChangeText={setName} placeholder="Vui lòng nhập họ và tên" />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Số điện thoại</Text>
                <Input value={email} onChangeText={setEmail} placeholder="Vui lòng nhập số điện thoại" />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Ngày sinh</Text>
                <TouchableOpacity style={styles.dobContainer} onPress={() => setSelectDateVisible(true)}>
                    <Text style={styles.dobTxt}>{moment(dob).format('DD-MM-YYYY')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Địa chỉ</Text>
                <Input value={email} onChangeText={setEmail} placeholder="Vui lòng nhập địa chỉ" />
            </View>
        </View>
    );

    const onConfirmDate = (value: Date) => {
        setDob(value);
        setSelectDateVisible(false);
    };

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={dob}
            onConfirm={onConfirmDate}
            onCancel={() => setSelectDateVisible(false)}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
            {renderDatePicker()}
        </View>
    );
}

export default AccountInfoScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputContainer: {
            marginBottom: scales(15),
        },
        dobContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scales(46),
            backgroundColor: color.Light_2,
            borderRadius: scales(6),
            paddingRight: scales(15),
            borderColor: color.transparent,
            borderWidth: scales(1),
        },
        dobTxt: {
            ...Fonts.inter600,
            fontSize: scales(13),
            color: color.Text_Dark_1,
            paddingHorizontal: scales(15),
        },
    });
};
