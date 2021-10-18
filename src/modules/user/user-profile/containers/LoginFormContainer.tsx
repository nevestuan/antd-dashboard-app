import React from 'react';
import { Card, Typography, Space } from 'antd';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';

import { ILoginFormValues } from '@interfaces/user';

import { LoginForm } from '../components';
import { useUserProfileService } from '../store';

const { Title, Link, Text } = Typography;

const StyledWrapper = styled(Card)`
    width: 500px;
    max-width: 100%;

    .ant-card-body {
        padding: 40px 56px;
    }

    .login-form {
        margin-top: 16px;
    }
`;

const LoginFormContainer: React.FC = () => {
    const { login, selector } = useUserProfileService();
    const { loading, error }: any = useSelector(
        selector.getStatus,
        shallowEqual,
    );

    const handleLogin = async (values: ILoginFormValues) => {
        return login(values);
    };

    return (
        <StyledWrapper>
            <Title level={2}>Sign in</Title>
            <Text>
                New User? <Link>Create an account</Link>
            </Text>
            <div className="login-form">
                <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />
            </div>
        </StyledWrapper>
    );
};

export default LoginFormContainer;
