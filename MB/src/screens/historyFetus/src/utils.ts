import { navigate } from 'navigation/utils';

export const goToHistoryFetus = () => navigate('HistoryFetus');

export const goToAddHistoryFetus = (action: 'CREATE' | 'EDIT', history?: fetal.FetalHistory) => navigate('AddHistoryFetus', { action, history });

export const formatImageToFile = image => {
    const imagePath = image.split('/');
    const imageName = imagePath[imagePath.length - 1];
    const imageFormat = {
        uri: image,
        name: imageName,
        type: 'image/jpeg',
    };
    return imageFormat;
};
