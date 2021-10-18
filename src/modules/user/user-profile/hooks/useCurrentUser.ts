import { useSelector, shallowEqual } from 'react-redux';
import { IUserProfile } from '@interfaces/user/user-profile';

import { useUserProfileService } from '../store';

const useCurrentUser = (): IUserProfile => {
    const { selector } = useUserProfileService();
    const currentUser: IUserProfile = useSelector(
        selector.getCurrentUser,
        shallowEqual,
    );

    return currentUser;
};

export default useCurrentUser;
