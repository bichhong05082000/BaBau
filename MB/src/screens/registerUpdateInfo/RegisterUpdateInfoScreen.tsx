import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { goBack, resetStack } from 'navigation/utils';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import BottomSheet, { CustomBottomSheetRefType } from '../../components/BottomSheet/BottomSheet';
import { EventBusName, onPushEventBus } from '../../services/event-bus';
import { useAppDispatch } from '../../states';
import { fetchUpdate } from '../../states/user';
import { updateProfile } from '../../states/user/fetchProfile';
import { useSelectUserInfo } from '../../states/user/hooks';
import { formatImage } from '../../utils/image';
import { showCustomToast } from '../../utils/toast';

interface ImageChoose {
    uri: string,
    name: string,
    type: string,
}

const RegisterUpdateInfoScreen = () => {
    const userInfo = useSelectUserInfo();

    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [email, setEmail] = useState<string>(userInfo?.email || '');
    const [momName, setMomName] = useState<string>(userInfo?.fullname || '');
    const [momAddress, setMomAddress] = useState<string>(userInfo?.address || '');
    const [phone, setPhone] = useState<string>(userInfo?.phone || '');
    const [babyName, setBabyName] = useState<string>(userInfo?.childName || '');
    const [momDOB, setMomDOB] = useState<Date>(moment(userInfo?.birthday, 'DD-MM-YYYY').toDate() || moment().toDate());
    const [dueDate, setDueDate] = useState<Date>(moment(userInfo?.childBirthday, 'DD-MM-YYYY').toDate() || moment().toDate());
    const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState<Date>(moment(userInfo?.lastMenstrualPeriod, 'DD-MM-YYYY').toDate() || moment().toDate());
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [selectDateType, setSelectDateType] = useState<'momDOB' | 'lastMenstrualPeriod' | 'dueDate'>('momDOB');
    const [imageChoose, setImageChoose] = useState<ImageChoose>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const bottomSheetRef = useRef<CustomBottomSheetRefType>(null);

    const dispatch = useAppDispatch();

    const showBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.open();
        }
    };

    const dismissBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.dismiss();
        }
    };

    const onImageLibraryPress = async () => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: 'photo',
            });
            if (image.size > 1024 * 1024 * 2.5) {
                showCustomToast('Kích cỡ ảnh không vượt quá 2.5MB');
                return;
            }
            const imageCrop = await ImagePicker.openCropper({
                path: image.path,
                cropping: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                height: 200,
                width: 200,
                cropperCircleOverlay: true,
            });
            if (imageCrop) {
                setImageChoose(formatImage(imageCrop));
                dismissBottomSheet();
            }
        } catch (err) {
            if (err?.message?.includes?.('not grant library permission')) {
                showCustomToast('User did not grant library permission');
            }
        }
    };

    const onCameraPress = async () => {
        try {
            const image = await ImagePicker.openCamera({
                cropping: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                height: 200,
                width: 200,
                cropperCircleOverlay: true,
            });
            if (image) {
                setImageChoose(formatImage(image));
                dismissBottomSheet();
            }
        } catch (err) {
            if (err?.message?.includes?.('not grant camera permission')) {
                showCustomToast('User did not grant library permission');
            }
        }
    };

    const renderChooseImage = () => (
        <BottomSheet
            isDynamicSnapPoints
            ref={bottomSheetRef}
            handleCloseModal={dismissBottomSheet}
            enablePanDownToClose>
            <View style={styles.popupView}>
                <Text style={styles.chooseImg}>Chọn ảnh</Text>

                <TouchableOpacity onPress={onImageLibraryPress}>
                    <View style={styles.chooseOption1}>
                        <Text style={styles.textOption}>Chọn ảnh từ thư viện</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCameraPress}>
                    <View style={styles.chooseOption}>
                        <Text style={styles.textOption}>Chụp ảnh</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={dismissBottomSheet}>
                    <View style={styles.buttonClose}>
                        <Text style={styles.textClose}>Đóng</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );

    const getImageUrl = () => {
        if (userInfo?.avatar) {
            return { uri: userInfo?.avatar };
        } else if (imageChoose?.uri) {
            return { uri: imageChoose?.uri };
        } else {
            return Images.GirlHome;
        }
    };

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <FastImage source={getImageUrl()} style={styles.girlHome} />
            {
                isEdit ? (
                    <TouchableOpacity
                        style={styles.icPencil}
                        activeOpacity={1}
                        hitSlop={{ top: 10, bottom: 0, left: 0, right: 0 }}
                        onPress={showBottomSheet}
                    >
                        <SvgIcons.IcPencil width={scales(15)} height={scales(15)} color={getThemeColor().Color_Primary} />
                    </TouchableOpacity>
                ) : null
            }
        </View>
    );

    const onShowSelectDate = (dateType: 'momDOB' | 'lastMenstrualPeriod' | 'dueDate') => {
        setSelectDateType(dateType);
        setSelectDateVisible(true);
    };

    const onConfirmDate = (value: Date) => {
        if (selectDateType === 'momDOB') {
            setMomDOB(value);
        } else if (selectDateType === 'dueDate') {
            setDueDate(value);
        } else {
            setLastMenstrualPeriod(value);
        }

        setSelectDateVisible(false);
        setSelectDateType('momDOB');
    };

    const onCancel = () => {
        setSelectDateVisible(false);
        setSelectDateType('momDOB');
    };

    const onUpdate = () => {
        let body = {
            avatar: {},
            birthday: moment(momDOB).format('DD-MM-YYYY'),
            fullname: momName,
            phone: momName,
            address: momAddress,
            childName: babyName,
            childBirthday: moment(dueDate).format('DD-MM-YYYY'),
            lastMenstrualPeriod: moment(lastMenstrualPeriod).format('DD-MM-YYYY'),
        };
        if (!imageChoose) {
            dispatch(fetchUpdate(body));
        } else {
            body = { ...body, avatar: imageChoose };
            dispatch(fetchUpdate(body));
        }
        goBack();
    };

    const renderInputMomAddress = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Địa chỉ</Text>
            <Input value={momAddress} onChangeText={setMomAddress} placeholder='Vui lòng nhập địa chỉ' editable={isEdit}/>
        </View>
    );

    const renderInputMomName = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Họ và tên</Text>
            <Input value={momName} onChangeText={setMomName} placeholder='Vui lòng nhập họ và tên' editable={isEdit} />
        </View>
    );

    const renderInputMomEmail = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Email</Text>
            <Input value={email} onChangeText={setEmail} placeholder='Vui lòng nhập email' editable={false} />
        </View>
    );

    const renderInputMomDOB = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Ngày sinh</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => onShowSelectDate('momDOB')} disabled={!isEdit}>
                <Text style={styles.dobTxt}>{moment(momDOB).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderInputMomPhone = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Số điện thoại</Text>
            <Input value={phone} onChangeText={setPhone} placeholder='Vui lòng nhập họ và tên' editable={isEdit}/>
        </View>
    );

    const renderInputBabyName = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Họ và tên của bé</Text>
            <Input value={babyName} onChangeText={setBabyName} placeholder='Vui lòng nhập họ và tên của bé' editable={isEdit}/>
        </View>
    );

    const renderInputDueDate = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Ngày dự sinh</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => onShowSelectDate('dueDate')} disabled={!isEdit}>
                <Text style={styles.dobTxt}>{moment(dueDate).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderInputLastMenstrualPeriod = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Ngày đầu tiên của kỳ kinh nguyệt cuối cùng</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => onShowSelectDate('lastMenstrualPeriod')} disabled={!isEdit}>
                <Text style={styles.dobTxt}>{moment(lastMenstrualPeriod).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBabyInfo = () => (
        <View>
            <Text style={styles.titleInfo}>Thông tin của bé</Text>
            {renderInputBabyName()}
            {renderInputDueDate()}
            {renderInputLastMenstrualPeriod()}
        </View>
    );

    const renderMomInfo = () => (
        <View>
            <Text style={styles.titleInfo}>Thông tin của mẹ</Text>
            {renderInputMomEmail()}
            {renderInputMomName()}
            {renderInputMomDOB()}
            {renderInputMomPhone()}
            {renderInputMomAddress()}
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderMomInfo()}
            {renderBabyInfo()}
        </View>
    );

    const setDateDatePicker = () => {
        if (selectDateType === 'momDOB') {
            return momDOB;
        } else if (selectDateType === 'dueDate') {
            return dueDate;
        } else {
            return lastMenstrualPeriod;
        }
    };

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode='date'
            open={selectDateVisible}
            theme={'light'}
            date={setDateDatePicker()}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderButton = () => <Button title='Cập nhật' customStyles={styles.button} onPress={onUpdate} />;

    const renderRightHeader = () => (
        <>
            {
                !isEdit ? (
                    <View style={{
                        padding: scales(5),
                        borderRadius: 100,
                        backgroundColor: getThemeColor().Color_Bg,
                    }}>
                        <SvgIcons.IcPencil width={scales(15)} height={scales(15)} color={getThemeColor().Color_Primary} />
                    </View>
                ) : null
            }
        </>
    );

    return (
        <View style={styles.container}>
            <Header containerStyle={{ backgroundColor: getThemeColor().Color_Primary2 }} iconRight={renderRightHeader()} onPressRight={() => setIsEdit(true)} />
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                enableOnAndroid
            >
                <View style={styles.imageHome} />
                {renderContentHeader()}
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderDatePicker()}
            {renderButton()}
            {renderChooseImage()}
        </View>
    );
};

export default RegisterUpdateInfoScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingBottom: scales(30),
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
        content: {
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
        icBack: {
            justifyContent: 'center',
            position: 'absolute',
            top: Sizes.statusBarHeight,
            backgroundColor: color.Color_Gray6,
            paddingVertical: scales(12),
            paddingHorizontal: scales(10),
            borderRadius: scales(100),
        },
        icPencil: {
            position: 'absolute',
            top: scales(100),
            right: scales(120),
            backgroundColor: color.Color_Gray6,
            padding: scales(5),
            borderRadius: scales(100),
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
        titleInfo: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
            marginTop: scales(10),
        },
        button: {
            marginHorizontal: scales(15),
        },
        popupView: {
            backgroundColor: color.white,
            borderTopRightRadius: scales(20),
            borderTopLeftRadius: scales(20),
            bottom: scales(0),
            paddingTop: scales(40),
        },
        chooseImg: {
            //    color: Colors[theme].white
            ...Fonts.inter600,
            fontWeight: 'bold',
            fontSize: scales(24),
            marginLeft: scales(20),
        },
        chooseOption1: {
            borderBottomWidth: scales(0.5),
            borderColor: color.Text_Dark_5,
            paddingTop: scales(30),
            paddingBottom: scales(20),
            paddingHorizontal: scales(20),
            marginHorizontal: scales(15),
        },
        chooseOption: {
            borderBottomWidth: scales(0.5),
            borderColor: color.Text_Dark_5,
            paddingVertical: scales(20),
            paddingHorizontal: scales(20),
            marginHorizontal: scales(15),
        },
        textOption: {
            //    color: Colors[theme].white
            ...Fonts.inter600,
            fontSize: scales(14),
        },
        buttonClose: {
            borderRadius: scales(50),
            backgroundColor: color.Color_Primary,
            marginVertical: scales(20),
            paddingVertical: scales(15),
            marginHorizontal: scales(20),
        },
        textClose: {
            ...Fonts.inter700,
            color: color.white,
            textAlign: 'center',
        },
    });
};
