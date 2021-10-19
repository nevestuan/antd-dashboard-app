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
import { IUserProfileState } from '@interfaces/user';

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
        clearError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: {
        [signUp.pending]: (state, { payload }) => {
            state.loading = true;
            state.error = undefined;
        },
        [signUp.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.loading = false;
        },
        [signUp.rejected]: (state, { payload }) => {
            state.error = payload.code;
            state.loading = false;
        },

        [login.pending]: (state, { payload }) => {
            state.loading = true;
            state.error = undefined;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.data = payload._tokenResponse;
            state.loading = false;
        },
        [login.rejected]: (state, { payload }) => {
            state.error = payload.code;
            state.loading = false;
        },

        [logout.fulfilled]: (state, { payload }) => {
            state.data = undefined;
        },
    },
});

const { updateCurrentUser, removeCurrentUser, clearError } = slice.actions;
export { updateCurrentUser, removeCurrentUser, clearError };

export default slice.reducer;
