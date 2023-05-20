import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchLogin } from '.';

import { useAppDispatch } from 'states';
import { selectUserInfo } from './selector';

export const useFetchLogin = (user: user.UserLoginRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLogin(user));
    }, [dispatch]);
};

export const useSelectUserInfo = () => {
    return useSelector(selectUserInfo);
};
