import { IUserProfile } from '../user';

export interface IPageHeaderProps {
    onLogout: () => void;
    currentUser: IUserProfile;
}
