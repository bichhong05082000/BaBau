import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { DishDetailScreenRouteProps } from 'screens/foods/DishDetailScreen';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IDishDetailIngredientSceneProps {
    route: DishDetailScreenRouteProps;
}

const DishDetailIngredientScene = (props: IDishDetailIngredientSceneProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodOfCategory } = route;

    return (
        <View style={styles.container}>
            {foodOfCategory?.ingredient?.split(', ').map(element => (
                <Text key={element} style={styles.txt}>- {element}</Text>
            )) }
        </View>
    );
};

export default DishDetailIngredientScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        txt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(10),
        },
    });
};
