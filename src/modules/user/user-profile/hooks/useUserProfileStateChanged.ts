import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { useUserProfileService } from '../store';

const useUserProfileStateChanged = (): void => {
    const router = useRouter();
    const { updateCurrentUser, removeCurrentUser } = useUserProfileService();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                updateCurrentUser({
                    displayName: user.displayName,
                    email: user.email,
                    refreshToken: user.refreshToken,
                });
            } else {
                removeCurrentUser();
                if (!router.pathname.includes('/login')) {
                    router.push('/login');
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [router.pathname]);
};

export default useUserProfileStateChanged;
