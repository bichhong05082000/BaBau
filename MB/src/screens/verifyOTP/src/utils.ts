import { RootNavigatorParamList } from 'navigation/types';
import { navigate } from 'navigation/utils';

export const goToVerifyOTP = (email: string, fromScreen?: 'ForgotPassword' | 'Register') => navigate('VerifyOTP', { email, fromScreen });
