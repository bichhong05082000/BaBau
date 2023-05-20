import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from 'configs/api';
import { GlobalVariables } from 'constants/index';
import { resetStack } from 'navigation/utils';
import axiosInstance from 'services/api-requests';
import { setMessage } from 'states/message';
import Storages, { KeyStorage } from 'utils/storages';
import { showCustomToast } from 'utils/toast';
import { updateProfile } from './fetchProfile';

const initialState: user.State = {
    profile: null,
    jwt: null,
    isLogin: false,
};

export const fetchLogin = createAsyncThunk('user/login', async (user: user.UserLoginRequest, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/login`, user);
        if (response?.data?.jwt) {
            GlobalVariables.tokenInfo = {
                accessToken: response?.data?.jwt,
            };
            Storages.saveObject(KeyStorage.Token, GlobalVariables.tokenInfo);
            resetStack('Main');
            showCustomToast('Đăng nhập thành công');
            return response?.data?.jwt;
        }
    } catch (error) {
        showCustomToast('Đăng nhập thất bại');
        const message =
            (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchProfile = createAsyncThunk<user.Profile>('user/profile', async () => {
    try {
        const response = await axiosInstance.get('/accounts/profile');
        return response;
    } catch (error) {
        showCustomToast('Thất bại');
        const message =
            (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        showCustomToast(message);
    }
});

export const fetchUpdate = (body: { avatar?: object, birthday: string, fullname: string, phone: string, address: string, childBirthday: string, lastMenstrualPeriod: string, childName: string }) => {
    return async function fetchUpdateProfile(dispatch, getState) {
        const response = await updateProfile(body);
        if (response) {
            dispatch(fetchProfile())
        }
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLogin.fulfilled, (state, action) => {
            state.isLogin = true;
            state.jwt = action.payload;
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.isLogin = false;
            state.jwt = null;
        })
        .addCase(fetchProfile.rejected, (state) => {
            state.isLogin = false;
            state.profile = null;
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.isLogin = true;
            state.profile = action.payload;
        })
    },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
