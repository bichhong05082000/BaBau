import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNModal from 'react-native-modal';

import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface IFetalMovementUserManualPopupRef {
    showModal?: () => void;
    hideModal?: () => void;
}

const FetalMovementUserManualPopup = (props, ref: React.Ref<IFetalMovementUserManualPopupRef>) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
    }));

    const showModal = () => {
        setIsVisible(true);
    };

    const hideModal = () => {
        setIsVisible(false);
    };

    return (
        <RNModal
            isVisible={isVisible}
            onBackdropPress={hideModal}
            onBackButtonPress={hideModal}
            backdropTransitionInTiming={0}
            hideModalContentWhileAnimating
            backdropTransitionOutTiming={0}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriverForBackdrop
            style={styles.modal}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Hướng dẫn</Text>
                    <TouchableOpacity style={styles.iconClose} onPress={hideModal}>
                        <SvgIcons.IcClose width={scales(17)} height={scales(15)} color={getThemeColor().Text_Dark_1} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>
                    Thời điểm bắt đầu đếm cử động thai ở mỗi mẹ là khác nhau. Đối với mẹ mang thai lần đầu, có thể bắt
                    đầu đếm vào khoảng 18-20 tuần, còn mẹ mang thai từ lần 2 thì có thể sớm hơn vài tuần.
                </Text>
                <Text style={styles.text}>
                    Mẹ cảm nhận rõ nhất cử động thai nhi ở tuần thứ 28. Mỗi ngày mẹ hãy chọn cùng một thời điểm và vào
                    lúc con thức để đếm số lần cử động của bé.
                </Text>
                <Text style={styles.text}>
                    Thai nhi khỏe mạnh khi có ít nhất 4 đợt cử động trong 1 giờ. Nếu có ít hơn 4 đợt cử động thai, mẹ
                    hãy nằm nghỉ và đếm cử động thai trong 2 giờ tiếp theo, có ít hơn 10 cử động thai, cần đến ngay cơ
                    sở y tế để theo dõi tình trạng thai bằng những phương pháp khác.
                </Text>
                <Text style={[styles.text, styles.textBold]}>
                    Lưu ý: Mẹ bầu nên đếm số lần cử động trong ít nhất 1 giờ để có kết quả chính xác nhất.
                </Text>
            </View>
        </RNModal>
    );
};

export default forwardRef(FetalMovementUserManualPopup);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        modal: {
            margin: 0,
        },
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight + scales(5),
            paddingHorizontal: scales(15),
            backgroundColor: color.white,
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(20),
            color: color.Text_Dark_1,
            textAlign: 'center',
        },
        text: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(20),
            lineHeight: scales(25),
        },
        textBold: {
            ...Fonts.inter600,
        },
        iconClose: {
            position: 'absolute',
            right: scales(15),
            top: scales(5),
        },
    });
};
