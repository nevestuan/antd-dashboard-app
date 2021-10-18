import React from 'react';
import { useRouter } from 'next/router';
import { ILoginFormValues } from '@interfaces/user';
import { LoginForm } from '../components';
import { useUserProfileService } from '../store';

const LoginFormContainer: React.FC = () => {
    const { login } = useUserProfileService();
    const router = useRouter();

    const handleLogin = async (values: ILoginFormValues) => {
        console.log('values', values);
        login(values);
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginFormContainer;
