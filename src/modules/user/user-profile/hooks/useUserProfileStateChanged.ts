import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useUserProfileService } from '../store';

const useUserProfileStateChanged = (): void => {
    const { updateCurrentUser, removeCurrentUser } = useUserProfileService();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                updateCurrentUser({
                    displayName: user.displayName,
                    email: user.email,
                    refreshToken: user.refreshToken,
                });
            } else {
                removeCurrentUser();
            }
        });
    }, []);
};

export default useUserProfileStateChanged;
