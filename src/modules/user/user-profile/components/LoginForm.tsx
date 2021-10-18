import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { ILoginFormValues } from '@interfaces/user';

const StyledWrapper = styled.div`
    .actions {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }
`;

export interface ILoginFormProps {
    onSubmit: (values: ILoginFormValues) => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit = () => {} }) => {
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

                <Form.Item>
                    <div className="actions">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </StyledWrapper>
    );
};
export default LoginForm;
