import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { ISignupFormProps, ILoginFormValues } from '@interfaces/user';
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
    'auth/email-already-in-use': 'This email already existed.',
};

const SignupForm: React.FC<ISignupFormProps> = ({
    onSubmit = () => {},
    loading = false,
    error,
}) => {
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = (values: ILoginFormValues) =>
        onSubmit({ email: values.email, password: values.password });

    return (
        <StyledWrapper>
            <Form
                layout="vertical"
                name="basic"
                onFinish={handleSubmit}
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
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
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
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The two passwords that you entered do not match!',
                                    ),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Password"
                    />
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
                            Sign up
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </StyledWrapper>
    );
};
export default SignupForm;
