import React from 'react';
import { LoginForm, ILoginFormValues } from '../components';
import { useUserProfileService } from '../store';

const LoginFormContainer: React.FC = () => {
    const { login } = useUserProfileService();

    const handleLogin = (values: ILoginFormValues) => {
        console.log('values', values);
        login(values);
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginFormContainer;
