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

export interface ILoginFormValues {
    username: string;
    password: string;
}
