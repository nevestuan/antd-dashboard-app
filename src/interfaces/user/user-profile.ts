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
    email: string;
    password: string;
}

export interface ILoginFormProps {
    onSubmit: (values: ILoginFormValues) => void;
    loading?: boolean;
    error?: string;
}

export interface ISignupFormProps {
    onSubmit: (values: ILoginFormValues) => void;
    loading?: boolean;
    error?: string;
}
