import { Row, Col, Typography, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { LoginFormContainer } from '@user/user-profile';
import unsplashApi from '@core/unsplash';

const { Text, Link } = Typography;

export interface ILoginPageProps {
    unsplashPhoto?: Record<string, any>;
}

const DEFAULT_PHOTO =
    'https://auth.services.adobe.com/img/canvas/Fotolia_231796301_XL.jpg';

export interface IStyled {
    backgroundUrl: string;
}

const StyledWrapper = styled.div`
    background-image: url('${(props: IStyled) => props.backgroundUrl}');
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

    .credit {
        position: absolute;
        left: 16px;
        bottom: 16px;

        .ant-typography {
            color: rgba(228, 202, 202, 0.3) !important;
        }

        a.ant-typography {
            color: rgba(255, 255, 255, 0.3) !important;
            text-decoration: underline;
        }
    }
`;

const StyledAppLogo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: relative;

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

const LoginPage: React.FC<ILoginPageProps> = ({ unsplashPhoto = {} }) => {
    return (
        <StyledWrapper backgroundUrl={unsplashPhoto.url || DEFAULT_PHOTO}>
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
            <div className="credit">
                <Space direction="vertical">
                    {unsplashPhoto.locationName && (
                        <Text>{unsplashPhoto.locationName}</Text>
                    )}
                    <Text>
                        Photo by{' '}
                        <Link
                            href={`${unsplashPhoto.user?.link}?utm_source=antd-dashboard-app&utm_medium=referral`}
                            target="_blank"
                        >
                            {unsplashPhoto.user?.name}
                        </Link>{' '}
                        on{' '}
                        <Link
                            href="https://unsplash.com/?utm_source=antd-dashboard-app&utm_medium=referral"
                            target="_blank"
                        >
                            Unsplash
                        </Link>
                    </Text>
                </Space>
            </div>
        </StyledWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch data from external API
    try {
        const photo: any = await unsplashApi.photos.getRandom({
            query: 'nature',
            orientation: 'landscape',
        });

        // Pass data to the page via props
        return {
            props: {
                unsplashPhoto: {
                    url: photo.response?.urls?.regular,
                    locationName: photo.response?.location?.name,
                    user: {
                        name: photo.response?.user?.name,
                        link: photo.response?.user?.links?.html,
                    },
                },
            },
        };
    } catch (err) {
        return { props: {} };
    }
};

export default LoginPage;
