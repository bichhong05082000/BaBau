import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { BASE_URL } from 'configs/api';
import axiosInstance from 'services/api-requests';
import { ICreateFetalMovementRequest } from 'states/types';
import { showCustomToast } from 'utils/toast';

const initialState: fetal.State = {
    data: {
        count: 0,
        current_page: 1,
        fetalMove: [],
        total_page: 1,
    },
    isLoading: false,
};

export const createFetalMovement = createAsyncThunk('fetal/createFetalMovement', async (body: ICreateFetalMovementRequest) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/fetal-movements`, body);
        showCustomToast('Thành công');
        return response;
    } catch (error) {
        showCustomToast('Đếm cử động thất bại')
        console.log(error);
    }
});

export const fetchMovementByDateNow = createAsyncThunk<fetal.FetalResponse>('fetal/fetchMovementByDateNow', async (date: Date) => {
   try {
       const response = await axiosInstance.get(`${BASE_URL}/fetal-movements?date=${moment(date).format('DD/MM/YYYY')}`);
       return response;
   } catch (error) {
       showCustomToast('Lấy dữ liệu thất bại')
       console.log(error);
   }
});

export const fetchMovementFromDateToDate = createAsyncThunk<fetal.FetalResponse>('fetal/fetchMovementFromDateToDate', async (params: { from: Date, to: Date}) => {
    try {
        const fromDate = moment(params.from).format('DD/MM/YYYY');
        const toDate = moment(params.to).format('DD/MM/YYYY')
        const response = await axiosInstance.get(`${BASE_URL}/fetal-movements?startDate=${fromDate}&endDate=${toDate}`);
        return response;
    } catch (error) {
        showCustomToast('Lấy dữ liệu thất bại')
        console.log(error);
    }
});

export const fetalSlice = createSlice({
    name: 'Fetal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createFetalMovement.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createFetalMovement.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createFetalMovement.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchMovementByDateNow.pending, (state, action) => {
                state.data.fetalMove = [];
                state.isLoading = true;
            })
            .addCase(fetchMovementByDateNow.rejected, (state, action) => {
                state.data.fetalMove = [];
                state.isLoading = false;
            })
            .addCase(fetchMovementByDateNow.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMovementFromDateToDate.pending, (state, action) => {
                state.data.fetalMove = [];
                state.isLoading = true;
            })
            .addCase(fetchMovementFromDateToDate.rejected, (state, action) => {
                state.data.fetalMove = [];
                state.isLoading = false;
            })
            .addCase(fetchMovementFromDateToDate.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })

    },
});

export default fetalSlice.reducer;
