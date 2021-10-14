import { createSlice, Slice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { createAsyncThunk } from '@core/misc/utils';
// import { USER_ACCESS_TOKEN_KEY } from '@core/misc/constants';
import { IUserCredential } from '@user/misc/api';

export interface IUserProfile {
    displayName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export interface IUserProfileState {
    data?: IUserProfile;
    loading: boolean;
    error?: any;
}

const sliceName = 'USER_PROFILE';

export const signUp = createAsyncThunk(
    `${sliceName}/signUp`,
    ({ email, password }: IUserCredential) => {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password);
    },
);

export const login = createAsyncThunk(
    `${sliceName}/login`,
    ({ email, password }: IUserCredential) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    },
);

export const logout = createAsyncThunk(`${sliceName}/logout`, () => {
    const auth = getAuth();
    return signOut(auth);
});

const initialState: IUserProfileState = {
    data: undefined,
    loading: false,
    error: undefined,
};

const slice: Slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        updateCurrentUser: (state, { payload }) => {
            state.data = { ...state.data, ...payload };
        },
        removeCurrentUser: (state) => {
            state.data = undefined;
        },
    },
    extraReducers: {
        [signUp.fulfilled]: (state, { payload }) => {
            console.log('signUp payload', payload);
            state.data = payload;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.data = payload._tokenResponse;
        },
        [logout.fulfilled]: (state, { payload }) => {
            console.log('logout payload', payload);
            state.data = undefined;
        },
    },
});

const { updateCurrentUser, removeCurrentUser } = slice.actions;
export { updateCurrentUser, removeCurrentUser };

export default slice.reducer;
