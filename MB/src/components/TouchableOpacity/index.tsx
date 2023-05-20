import React, { memo } from 'react';
import { Keyboard, TouchableOpacity as OriginalTouchableOpacity, TouchableOpacityProps } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface Props extends TouchableOpacityProps {
    shouldHaptic?: boolean;
    shouldHideKB?: boolean;
    onPress?: () => void;
}
const TouchableOpacity = (props: Props) => {
    const handlePress = () => {
        if (props?.shouldHideKB) {
            Keyboard.dismiss();
        }
        if (props?.shouldHaptic) {
            ReactNativeHapticFeedback.trigger('impactLight');
        }
        if (props.onPress) {
            props.onPress();
        }
    }

    return (
        <OriginalTouchableOpacity {...props} onPress={handlePress} />
    )
};

export default memo(TouchableOpacity);
