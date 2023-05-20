import { EThemeColor } from 'constants/index';

import { ColorDarkTheme, ColorLightTheme } from 'themes';

// export const getThemeColor = (theme: string = EThemeColor.Light) => {
    // Todo: check dark mode
export const getThemeColor = () => {

    // if (theme === EThemeColor.Dark) {
    //     return ColorDarkTheme;
    // }
    return ColorLightTheme;
};
