import { Dimensions, Platform, StatusBar } from 'react-native';

import { ifIphoneX, isIphoneX } from 'utils/dimensions';

const Sizes = {
    scrWidth: Dimensions.get('window').width,

    scrHeight: Dimensions.get('window').height,

    statusBarHeight: Platform.select({
        ios: ifIphoneX(47, 20),
        android: StatusBar.currentHeight,
        default: 0,
    }),

    bottomSpace: isIphoneX() ? 34 : 0,
};

export default Sizes;
