import { Platform } from 'react-native';

const formatImage = (image) => {
    const imagePath = image.path.split('/');
    const imageName = Platform.OS === 'ios' && image?.filename ? image.filename : imagePath[imagePath.length - 1];
    const imageFormat = {
        uri: image.path,
        name: imageName,
        type: image.mime,
    }
    return imageFormat
};

export {
    formatImage,
};
