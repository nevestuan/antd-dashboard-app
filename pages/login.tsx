import { Row, Col } from 'antd';
import styled from 'styled-components';

import { LoginFormContainer } from '@user/user-profile';

const StyledWrapper = styled.div`
    background-image: url('https://auth.services.adobe.com/img/canvas/Fotolia_231796301_XL.jpg');
    background-size: cover;
`;

const LoginPage: React.FC = () => {
    return (
        <StyledWrapper>
            <Row>
                <Col xs={0} lg={12}></Col>
                <Col xs={24} lg={12}>
                    <LoginFormContainer />
                </Col>
            </Row>
        </StyledWrapper>
    );
};

export default LoginPage;
