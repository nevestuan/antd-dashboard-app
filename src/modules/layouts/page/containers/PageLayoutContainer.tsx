import { Layout, Breadcrumb, Spin } from 'antd';
import styled from 'styled-components';

import { useCurrentUser } from '@user/user-profile';

const { Content, Footer } = Layout;

import { SideMenu } from '../components';
import PageHeaderContainer from './PageHeaderContainer';

const StyledSpinWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageLayoutContainer: React.FC = ({ children }) => {
    const currentUser = useCurrentUser();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {!currentUser && (
                <StyledSpinWrapper>
                    <Spin size="large" />
                </StyledSpinWrapper>
            )}
            {currentUser && (
                <>
                    <SideMenu />
                    <Layout className="site-layout">
                        <PageHeaderContainer />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            {children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </>
            )}
        </Layout>
    );
};

export default PageLayoutContainer;
