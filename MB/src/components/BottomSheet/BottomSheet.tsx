import {
    BottomSheetBackdropProps,
    BottomSheetHandleProps,
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetView,
    useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, { ReactNode, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import {
    BackHandler,
    Keyboard,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
    ViewStyle,
} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface CustomBottomSheetRefType {
    open: () => void;
    dismiss: () => void;
}

export interface BottomSheetProps {
    onOpen?: () => void;
    name?: string;
    isVisible?: boolean;
    children?: ReactNode;
    handleCloseModal?: () => void;
    style?: StyleProp<ViewStyle>;
    snapPoints?: (string | number)[];
    detached?: boolean;
    bottomInset?: number;
    backgroundTransparent?: boolean;
    handleComponent?: React.FC<BottomSheetHandleProps> | null;
    keyboardBlurBehavior?: 'none' | 'restore';
    enablePanDownToClose?: boolean;
    isDynamicSnapPoints?: boolean;
    scrollable?: boolean;
    headerTitle?: string;
    withoutHideKB?: boolean;
}

const BottomSheet = (props: BottomSheetProps, ref: { current }) => {
    const theme = useColorScheme() || 'light';
    const styles = myStyles(theme);
    const {
        onOpen,
        children,
        isVisible = false,
        handleCloseModal,
        style = {},
        snapPoints = ['50%'],
        name = 'MainBottomSheet',
        detached = false,
        bottomInset = 0,
        backgroundTransparent = false,
        handleComponent = () => <View />,
        keyboardBlurBehavior = 'none',
        enablePanDownToClose = false,
        isDynamicSnapPoints = false,
        scrollable = false,
        headerTitle,
        withoutHideKB = false,
    } = props;

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
        useBottomSheetDynamicSnapPoints(initialSnapPoints);

    useEffect(() => {
        if (isVisible) {
            openBottomSheet();
        }
    }, [isVisible]);

    const openBottomSheet = useCallback(() => {
        if (onOpen) {
            onOpen();
        }
        if (!withoutHideKB) {
            Keyboard.dismiss();
        }
        bottomSheetModalRef.current?.present();
    }, []);

    const closeBottomSheet = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    const renderHeader = () =>
        headerTitle ? (
            <View style={styles.header}>
                <Text style={styles.textHeader}>{headerTitle}</Text>
                <TouchableOpacity onPress={handleCloseModal}>
                    <Text style={styles.textClose}>Close</Text>
                </TouchableOpacity>
            </View>
        ) : null;

    useImperativeHandle(
        ref,
        (): CustomBottomSheetRefType => ({
            dismiss: closeBottomSheet,
            open: openBottomSheet,
        })
    );

    return isDynamicSnapPoints ? (
        <BottomSheetModal
            keyboardBlurBehavior={keyboardBlurBehavior}
            handleComponent={() => <View />}
            detached={detached}
            bottomInset={bottomInset}
            name={name}
            ref={bottomSheetModalRef}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            enablePanDownToClose={enablePanDownToClose}
            backgroundStyle={[styles.container, backgroundTransparent && styles.backgroundTransparent]}
            backdropComponent={(backdropComponentProps) => (
                <CustomBackdrop {...backdropComponentProps} onBackdropPress={closeBottomSheet} />
            )}
            onDismiss={handleCloseModal}
            style={style}
            backgroundComponent={() => <View />}>
            {renderHeader()}
            {scrollable ? (
                <BottomSheetScrollView onLayout={handleContentLayout}>{children}</BottomSheetScrollView>
            ) : (
                <BottomSheetView onLayout={handleContentLayout}>{children}</BottomSheetView>
            )}
        </BottomSheetModal>
    ) : (
        <BottomSheetModal
            keyboardBlurBehavior={keyboardBlurBehavior}
            handleComponent={handleComponent}
            detached={detached}
            bottomInset={bottomInset}
            name={name}
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            enablePanDownToClose={enablePanDownToClose}
            backgroundStyle={[styles.container, backgroundTransparent && styles.backgroundTransparent]}
            backdropComponent={(backdropComponentProps) => (
                <CustomBackdrop {...backdropComponentProps} onBackdropPress={closeBottomSheet} />
            )}
            onDismiss={handleCloseModal}
            style={style}
            backgroundComponent={() => <View />}>
            {renderHeader()}
            {scrollable ? (
                <BottomSheetScrollView onLayout={handleContentLayout}>{children}</BottomSheetScrollView>
            ) : (
                children
            )}
        </BottomSheetModal>
    );
};

export default React.forwardRef(BottomSheet);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            backgroundColor: color.Color_Bg,
        },
        backgroundTransparent: {
            backgroundColor: 'transparent',
        },
        header: {
            flexDirection: 'row',
            padding: scales(15),
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: scales(0.5),
            borderColor: '#F0F0F0',
        },
        textHeader: {
            ...Fonts.inter400,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        textClose: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
    });
};

export interface CustomBackdropProps extends BottomSheetBackdropProps {
    onBackdropPress: () => void;
}

const CustomBackdrop = ({ animatedIndex, style, onBackdropPress }: CustomBackdropProps) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.7], Extrapolate.CLAMP),
    }));

    useEffect(() => {
        const backAction = () => {
            onBackdropPress();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: '#000000',
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return (
        <TouchableWithoutFeedback onPress={onBackdropPress}>
            <Animated.View style={containerStyle} />
        </TouchableWithoutFeedback>
    );
};
