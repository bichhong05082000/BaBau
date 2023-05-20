export enum EThemeColor {
    Light = 'Light',
    Dark = 'Dark',
}

export interface IToken {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
}

interface GlobalVariableParams {
    tokenInfo?: IToken;
    activeRouteKey?: string;
    theme: EThemeColor;
}

export const GlobalVariables: GlobalVariableParams = {
    theme: EThemeColor.Light,
};

export const clearGlobal = () => {
    delete GlobalVariables.tokenInfo;
};
