import { Layout, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;

import { SideMenu } from '../components';
import PageHeaderContainer from './PageHeaderContainer';

const PageLayout: React.FC = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
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
        </Layout>
    );
};

export default PageLayout;
