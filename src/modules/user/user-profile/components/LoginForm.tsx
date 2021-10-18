import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import styled from 'styled-components';
import { ILoginFormProps } from '@interfaces/user';
import { Map } from '@definitions/core';

const { Text } = Typography;

const StyledWrapper = styled.div`
    .actions {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }
`;

const ERROR_MESSAGES: Map = {
    'auth/user-not-found': 'Email not found',
    'auth/wrong-password': 'Invalid password',
};

const LoginForm: React.FC<ILoginFormProps> = ({
    onSubmit = () => {},
    loading = false,
    error,
}) => {
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <StyledWrapper>
            <Form
                layout="vertical"
                name="basic"
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        { type: 'email' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {error && (
                    <Text type="danger">
                        {ERROR_MESSAGES[error] || 'Something went wrong!'}
                    </Text>
                )}

                <Form.Item>
                    <div className="actions">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </StyledWrapper>
    );
};
export default LoginForm;
