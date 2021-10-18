import { Row, Col, Typography, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { LoginFormContainer } from '@user/user-profile';
import unsplashApi from '@core/unsplash';

const { Title, Text } = Typography;

export interface ILoginPage {
    backgroundUrl?: string;
}

const StyledWrapper = styled.div`
    background-image: url('${(props: ILoginPage) => props.backgroundUrl}');
    background-size: cover;
    width: 100vw;
    height: 100vh;

    .overlay {
        background: rgba(0, 0, 0, 0.5);
        height: 100%;
    }

    .form-col {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const StyledAppLogo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    .ant-typography {
        color: #fff;
    }

    .app-name {
        display: flex;
        align-items: center;
        justify-content: center;
        .app-text {
            margin-left: 8px;
            font-size: 24px;
            font-weight: bold;
        }
    }
`;

const LoginPage: React.FC<ILoginPage> = ({
    backgroundUrl = 'https://auth.services.adobe.com/img/canvas/Fotolia_231796301_XL.jpg',
}) => {
    return (
        <StyledWrapper backgroundUrl={backgroundUrl}>
            <Row className="overlay">
                <Col xs={0} lg={12}>
                    <StyledAppLogo>
                        <Space direction="vertical">
                            <div className="app-name">
                                <AntDesignOutlined
                                    style={{ fontSize: '56px' }}
                                />{' '}
                                <span className="app-text">Ant Dashboard</span>
                            </div>
                            <Text>Sign in or create an account</Text>
                        </Space>
                    </StyledAppLogo>
                </Col>
                <Col xs={24} lg={12} className="form-col">
                    <LoginFormContainer />
                </Col>
            </Row>
        </StyledWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch data from external API
    const photo: any = await unsplashApi.photos.getRandom({
        query: 'nature',
        orientation: 'landscape',
    });

    // Pass data to the page via props
    return { props: { backgroundUrl: photo.response?.urls?.full } };
};

export default LoginPage;
