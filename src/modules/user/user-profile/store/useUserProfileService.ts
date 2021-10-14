import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from './userProfileSlice';

const selector = {
    getCurrentUser: (state: Record<string, any>) => state.user.userProfile.data,
};

const useUserProfileService = (): Record<string, any> => {
    const dispatch = useDispatch();

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
        (payload) => dispatch(actions.login(payload)),
        [dispatch],
    );

    const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);

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
