import { navigate } from 'navigation/utils';

export const goToFetalHealth = () => navigate('FetalHealth');

export const goToFetalHealthAnalysis = (fromScreen: 'FETAL_HEALTH_INFO' | 'FETAL_HEALTH') => navigate('FetalHealthAnalysis', { fromScreen });

export const goToFetalHealthInfo = (action: 'CREATE' | 'EDIT', child?: user.CheckupsScheduleChildResponse, momId?: user.CheckupsScheduleMomResponse) => navigate('FetalHealthInfo', { action, child, momId });

export const goToFetalHealthChart = (child?: user.CheckupsScheduleChildResponse, momId?: user.CheckupsScheduleMomResponse) => navigate('FetalHealthChart', { child, momId });
