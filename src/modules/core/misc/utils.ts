import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk as reduxCreateAsyncThunk } from '@reduxjs/toolkit';

import { USER_ACCESS_TOKEN_KEY } from './constants';

/**
 * Get a custom axios instance which has Authorization header with access token
 * @param {string} [accessTokenKey] - name of the token in cookie
 * @param {string} [baseURL] - base url for the request
 * @returns {AxiosInstance} a custom axios instance
 */
export const getAxiosInstance = (
    accessTokenKey: string = USER_ACCESS_TOKEN_KEY,
    baseURL = `${process.env.API_URL}`,
): AxiosInstance => {
    const instance = axios.create({ baseURL });

    if (accessTokenKey) {
        instance.interceptors.request.use((config) => {
            const instanceConfig = { ...config };

            instanceConfig.headers.common.Authorization =
                Cookies.get(accessTokenKey);

            return instanceConfig;
        });
    }

    return instance;
};

/**
 * Customized createAsyncThunk to include response on error
 */
type RequestFunc = (
    arg: any,
    thunkAPI?: Record<string, unknown>,
) => Promise<any>;
export const createAsyncThunk = (
    actionType: string,
    requestFunc: RequestFunc,
): any =>
    reduxCreateAsyncThunk(actionType, async (payload, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await requestFunc(payload, thunkAPI);
            return response;
        } catch (err: any) {
            if (!err) {
                throw err;
            }
            return rejectWithValue(err);
        }
    });
