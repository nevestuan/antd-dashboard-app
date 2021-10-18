import React from 'react';
import { PageHeader } from '../components';
import { useUserProfileService } from '@user/user-profile';
import { useSelector, shallowEqual } from 'react-redux';
import { IUserProfile } from '@interfaces/user';

const PageHeaderContainer: React.FC = () => {
    const { logout, selector } = useUserProfileService();
    const currentUser: IUserProfile = useSelector(
        selector.getCurrentUser,
        shallowEqual,
    );

    const handleLogOut = () => logout();

    return (
        <PageHeader onLogout={handleLogOut} currentUser={currentUser}>
            AntD Dashboard
        </PageHeader>
    );
};

export default PageHeaderContainer;
