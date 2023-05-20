import { navigate } from 'navigation/utils';

export const goToTeachFetus = () => navigate('TeachFetus');

export const goToTeachFetusPhotoBaby = () => navigate('TeachFetusPhotoBaby');

export const goToTeachFetusMusicForMom = () => navigate('TeachFetusMusicForMom');

export const goToTeachFetusVideoBaby = () => navigate('TeachFetusVideoBaby');

export const goToTeachFetusMomRead = () => navigate('TeachFetusMomRead');

export const goToTeachFetusMomReadDetail = (story: premium.Story) => navigate('TeachFetusMomReadDetail', { story });
