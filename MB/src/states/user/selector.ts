import { GlobalState } from 'states/types';

export const selectUserInfo = (state: GlobalState) => {
    return state.user?.profile;
};
