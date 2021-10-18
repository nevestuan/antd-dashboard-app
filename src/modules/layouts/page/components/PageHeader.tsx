import React from 'react';

import { Layout, Dropdown, Button, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { IPageHeaderProps } from '@interfaces/layouts';

const { Header } = Layout;

const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding: 0 16px;
    height: 50px;
`;

const PageHeader: React.FC<IPageHeaderProps> = ({
    children,
    currentUser = {},
    onLogout = () => {},
}) => {
    const menu = (
        <Menu>
            <Menu.Item key="currentUser">
                Hi, {currentUser?.displayName || currentUser?.email}
            </Menu.Item>
            <Menu.Item key="log-out" onClick={onLogout}>
                Log Out
            </Menu.Item>
        </Menu>
    );

    return (
        <StyledHeader className="site-layout-background">
            <div className="left-content">{children}</div>
            <div className="right-content">
                <Dropdown overlay={menu}>
                    <Button shape="circle" icon={<SettingOutlined />} />
                </Dropdown>
            </div>
        </StyledHeader>
    );
};

export default PageHeader;
