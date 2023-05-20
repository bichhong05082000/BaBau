import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goToFetalHealth } from 'screens/fetalHealth/src/utils';
import { goToHistoryFetus } from 'screens/historyFetus/src/utils';
import { goToTeachFetus } from 'screens/teachFetus/src/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PremiumPaid = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <View style={styles.rowItems}>
            <TouchableOpacity style={styles.itemContainer} onPress={goToFetalHealth}>
                <Image source={Images.HeartStar} style={styles.imgItem} resizeMode="contain" />
                <Text style={styles.itemText}>Sức khỏe thai nhi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={goToTeachFetus}>
                <Image source={Images.BookStar} style={styles.imgItem} resizeMode="contain" />
                <Text style={styles.itemText}>Thai giáo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={goToHistoryFetus}>
                <Image source={Images.NewspaperStar} style={styles.imgItem} resizeMode="contain" />
                <Text style={styles.itemText}>Nhật ký thai nhi</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PremiumPaid;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        rowItems: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
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
    });
};
