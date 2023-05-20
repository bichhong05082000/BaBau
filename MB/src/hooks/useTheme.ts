import { useColorScheme } from 'react-native';

import { EThemeColor, GlobalVariables } from 'constants/index';

export const useTheme = () => {
    const colorScheme = useColorScheme();

    // Todo
    const theme = EThemeColor.Light;

    if (colorScheme === 'dark') {
        // Todo
        // theme = EThemeColor.Dark;
    }

    GlobalVariables.theme = theme;

    return {
        theme,
    };
};
