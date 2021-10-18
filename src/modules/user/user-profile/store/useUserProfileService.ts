import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { IUserProfile } from '@interfaces/user';

import * as actions from './userProfileSlice';

const selector = {
    getCurrentUser: (state: Record<string, any>): IUserProfile =>
        state.user.userProfile.data,
};

const useUserProfileService = (): Record<string, any> => {
    const dispatch = useDispatch();
    const router = useRouter();

    const updateCurrentUser = useCallback(
        (payload) => dispatch(actions.updateCurrentUser(payload)),
        [dispatch],
    );

    const removeCurrentUser = useCallback(
        (payload) => dispatch(actions.removeCurrentUser(payload)),
        [dispatch],
    );

    const signUp = useCallback(
        (payload) => dispatch(actions.signUp(payload)),
        [dispatch],
    );

    const login = useCallback(
        async (payload) => {
            await dispatch(actions.login(payload));
            router.push('/');
        },
        [dispatch],
    );

    const logout = useCallback(async () => {
        await dispatch(actions.logout());
        router.push('/login');
    }, [dispatch]);

    return {
        selector,
        updateCurrentUser,
        removeCurrentUser,
        signUp,
        login,
        logout,
    };
};

export default useUserProfileService;
