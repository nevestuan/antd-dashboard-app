import React, { useState } from 'react';
import { Card, Typography, message } from 'antd';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';

import { ILoginFormValues } from '@interfaces/user';

import { LoginForm, SignupForm } from '../components';
import { useUserProfileService } from '../store';

const { Title, Link, Text } = Typography;

const StyledWrapper = styled(Card)`
    width: 500px;
    max-width: 90%;

    .ant-card-body {
        padding: 40px 56px;
    }

    .login-form {
        margin-top: 16px;
    }
`;

const LoginFormContainer: React.FC = () => {
    const [step, setStep] = useState('signin');
    const { login, signUp, selector } = useUserProfileService();
    const { loading, error }: any = useSelector(
        selector.getStatus,
        shallowEqual,
    );

    const handleLogin = async (values: ILoginFormValues) => {
        return login(values);
    };

    const handleSignUp = (values: ILoginFormValues) => {
        signUp(values).then((res: any) => {
            if (!res.error) {
                message.success('Your account has been created successfully.');
                setStep('signin');
            }
        });
    };

    return (
        <StyledWrapper>
            {step === 'signin' && (
                <>
                    <Title level={2}>Sign in</Title>
                    <Text>
                        New User?{' '}
                        <Link onClick={() => setStep('signup')}>
                            Create an account
                        </Link>
                    </Text>
                    <div className="login-form">
                        <LoginForm
                            onSubmit={handleLogin}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </>
            )}
            {step === 'signup' && (
                <>
                    <Title level={2}>Sign up</Title>
                    <Text>
                        Already have account?{' '}
                        <Link onClick={() => setStep('signin')}>Sign in</Link>
                    </Text>
                    <div className="login-form">
                        <SignupForm
                            onSubmit={handleSignUp}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </>
            )}
        </StyledWrapper>
    );
};

export default LoginFormContainer;
