import { navigate } from 'navigation/utils';

export const goToPrenatalCareCheckups = () => navigate('PrenatalCareCheckups');

export const goToRoutineCheckups = () => navigate('RoutineCheckups');

export const goToPrenatalCareCheckupsChartMom = () => navigate('PrenatalCareCheckupsChartMom');

export const goToAddPrenatalCareCheckupsStep1 = (
    action: 'CREATE' | 'EDIT',
    child?: user.CheckupsScheduleChildResponse,
    momId?: user.CheckupsScheduleMomResponse
) => navigate('AddPrenatalCareCheckupsStep1', { action, child, momId });

export const goToAddPrenatalCareCheckupsStep2 = (
    momCheckups: user.MomCheckupsRequest,
    action: 'CREATE' | 'EDIT',
    child?: user.CheckupsScheduleChildResponse,
    momId?: user.CheckupsScheduleMomResponse
) => navigate('AddPrenatalCareCheckupsStep2', { momCheckups, action, child, momId });

export const goToPrenatalCareCheckupsItemHistory = (
    child: user.CheckupsScheduleChildResponse,
    momId: user.CheckupsScheduleMomResponse,
    fromScreen: 'PRENATAL_CARE_CHECKUPS' | 'FETAL_HEALTH'
) => navigate('PrenatalCareCheckupsItemHistory', { child, momId, fromScreen });
