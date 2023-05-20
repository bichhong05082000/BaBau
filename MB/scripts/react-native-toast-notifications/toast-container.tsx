import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, ViewStyle } from 'react-native';

import Toast, { ToastOptions, ToastProps } from './toast';


// eslint-disable-next-line complexity
export const isIphoneX = (): boolean => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTV &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926 ||
            dimen.height === 932 ||
            dimen.width === 932 ||
            dimen.height === 852 ||
            dimen.width === 852)
    );
};

export const ifIphoneX = (iPhoneXHeight: number, iPhoneNormalHeight: number): number => {
    return isIphoneX() ? iPhoneXHeight : iPhoneNormalHeight;
}

export const isNotchAndroid = Platform.OS === 'android' && StatusBar.currentHeight > 24;

const { height, width } = Dimensions.get('window');

export interface Props extends ToastOptions {
    renderToast?(toast: ToastProps): JSX.Element;
    renderType?: { [type: string]: (toast: ToastProps) => JSX.Element };
    offset?: number;
    offsetTop?: number;
    offsetBottom?: number;
    swipeEnabled?: boolean;
}

interface State {
    toasts: Array<ToastProps>;
}

class ToastContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            toasts: [],
        };
    }

    static defaultProps: Props = {
        placement: 'bottom',
        offset: 10,
        swipeEnabled: true,
    };

    /**
     * Shows a new toast. Returns id
     */
    show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
        const id = toastOptions?.id || Math.random().toString();
        const onDestroy = () => {
            toastOptions?.onClose && toastOptions?.onClose();
            this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
        };

        requestAnimationFrame(() => {
            this.setState({
                toasts: [
                    {
                        id,
                        onDestroy,
                        message,
                        open: true,
                        onHide: () => this.hide(id),
                        ...this.props,
                        ...toastOptions,
                    },
                    ...this.state.toasts.filter((t) => t.open),
                ],
            });
        });

        return id;
    };

    /**
     * Updates a toast, To use this create you must pass an id to show method first, then pass it here to update the toast.
     */
    update = (
        id: string,
        message: string | JSX.Element,
        toastOptions?: ToastOptions
    ) => {
        this.setState({
            toasts: this.state.toasts.map((toast) =>
                toast.id === id ? { ...toast, message, ...toastOptions } : toast
            ),
        });
    };

    /**
     * Removes a toast from stack
     */
    hide = (id: string) => {
        this.setState({
            toasts: this.state.toasts.map((t) =>
                t.id === id ? { ...t, open: false } : t
            ),
        });
    };

    /**
     * Removes all toasts in stack
     */
    hideAll = () => {
        this.setState({
            toasts: this.state.toasts.map((t) => ({ ...t, open: false })),
        });
    };

    /**
     * Check if a toast is currently open
     */
    isOpen = (id: string) => {
        return this.state.toasts.some((t) => t.id === id && t.open);
    }

    renderBottomToasts() {
        const { toasts } = this.state;
        const { offset, offsetBottom } = this.props;
        const style: ViewStyle = {
            bottom: offsetBottom || offset,
            width,
            justifyContent: 'flex-end',
            flexDirection: 'column',
        };
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : undefined}
                style={[styles.container, style]}
                pointerEvents="box-none"
            >
                {toasts
                    .filter((t) => !t.placement || t.placement === 'bottom')
                    .map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
            </KeyboardAvoidingView>
        );
    }

    renderTopToasts() {
        const { toasts } = this.state;
        const { offset, offsetTop } = this.props;
        const style: ViewStyle = {
            top: offsetTop || offset,
            width,
            justifyContent: 'flex-start',
            flexDirection: 'column-reverse',
        };
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : undefined}
                style={[styles.container, style, {
                    top: Platform.select({
                        ios: ifIphoneX(47, 20),
                        android: StatusBar.currentHeight,
                        default: 0,
                    }),
                }]}
                pointerEvents="box-none"
            >
                {toasts
                    .filter((t) => t.placement === 'top')
                    .map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
            </KeyboardAvoidingView>
        );
    }

    renderCenterToasts() {
        const { toasts } = this.state;
        const { offset, offsetTop } = this.props;
        const style: ViewStyle = {
            top: offsetTop || offset,
            height,
            width,
            justifyContent: 'center',
            flexDirection: 'column-reverse',
        };

        const data = toasts.filter((t) => t.placement === 'center');
        const foundToast = data.length > 0;

        if (!foundToast) {return null;}

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : undefined}
                style={[styles.container, style]}
                pointerEvents="box-none"
            >
                {toasts
                    .filter((t) => t.placement === 'center')
                    .map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
            </KeyboardAvoidingView>
        );
    }

    render() {
        return (
            <>
                {this.renderTopToasts()}
                {this.renderBottomToasts()}
                {this.renderCenterToasts()}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        position: 'absolute',
        maxWidth: '100%',
        zIndex: 999999,
        elevation: 999999,
        alignSelf: 'center',
        ...(Platform.OS === 'web' ? { overflow: 'hidden' } : null),
    },
    message: {
        color: '#333',
    },
});

export default ToastContainer;
