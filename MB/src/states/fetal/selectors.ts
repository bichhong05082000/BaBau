import { GlobalState } from 'states/types';

export const selectIsLoading = (state: GlobalState) => {
    return state.fetal.isLoading;
};

export const selectFetalMovements = (state: GlobalState) => {
    return state.fetal?.data?.fetalMove;
};

