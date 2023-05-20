import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

import { RootNavigatorParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootNavigatorParamList>();

const SCREENS_NEED_LOGIN: (keyof RootNavigatorParamList)[] = [];

export function navigate(
    name: keyof RootNavigatorParamList,
    params?: RootNavigatorParamList[keyof RootNavigatorParamList]
) {
    // const isLogin = store.getState()?.user?.isLogin;
    if (navigationRef.isReady()) {
        // if (!isLogin && SCREENS_NEED_LOGIN.includes(name)) {
        //     navigate('Login', {
        //         loginSuccess: () => {
        //             popToTop();
        //             navigate(name, params);
        //         },
        //     });
        // } else {
        // @ts-ignore
        navigationRef.navigate(name, params);
        // }
    }
}

export function replace(
    name: keyof RootNavigatorParamList,
    params?: RootNavigatorParamList[keyof RootNavigatorParamList]
) {
    navigationRef.dispatch(StackActions.replace(name, params));
}

export function popToTop() {
    navigationRef.dispatch(StackActions.popToTop());
}

export function pop(position: number = 1) {
    navigationRef.dispatch(StackActions.pop(position));
}

export function goBack() {
    navigationRef.goBack();
}

export function resetStack(name: keyof RootNavigatorParamList, params = {}) {
    navigationRef.reset({
        index: 0,
        routes: [
            {
                name,
                params,
            },
        ],
    });
}

export function getCurrentRoute() {
    return navigationRef.getCurrentRoute()?.name;
}

export function pushToPage(name: string, params?: RootNavigatorParamList[keyof RootNavigatorParamList]): void {
    navigationRef.dispatch(StackActions.push(name, params));
}

export function setRoot() {
    resetStack('Main');
};
