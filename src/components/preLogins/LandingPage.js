import { Container, Row, Col } from 'react-bootstrap';
import './LandingPage.css';
import clark_logo from '../../assets/clark_logo.png';
import landing_background from '../../assets/landing_background.jpg'
import { LoginComponent } from './Login/LoginComponent';
import { SignUpComponent } from './SignUp/SignUpComponent';
import { ForgetPasswordComponent } from './ForgetPassword/ForgetPasswordComponent';

export const LandingPage = (props) => {
    return (
        <Container fluid className='landing_page'>
            <Row id='landing_page_header' automationId='landing_page_header'>
                Skill Workshop
            </Row>
            <Row id='landing_page_content' automationId='landing_page_content'>
                <Col xs={8} md={8} xl={9} id='landing_page_left' className='landing_page_left'>
                    <img src={landing_background} alt='Logo' className="landing_page_left_image" id='landing_page_left_image' automationId='landing_page_left_image' />
                </Col>

                <Col xs={4} md={4} xl={3} id="landing_page_right" className='landing_page_right'>
                    <Row id="landing_page_right_header" className='landing_page_right_header'>
                        <img src={clark_logo} alt='Logo' className="landing_page_logo" id='landing_page_logo' automationId='landing_page_logo' />
                    </Row>
                    <Row id='landing_page_right_main' className='landing_page_right_main' automationId='landing_page_right_main'>
                        {props.loader === 'login' ? <LoginComponent /> : props.loader === 'signup' ? <SignUpComponent /> : <ForgetPasswordComponent />}
                    </Row>
                    <Row id="landing_page_right_footer" className='landing_page_right_footer' automationId="landing_page_right_footer">
                        <Col xs={'auto'} id='landing_page_right_footer_copyright' className='landing_page_right_footer_content'>
                            © 2018 Microsoft
                        </Col>
                        <Col xs={'auto'} id='landing_page_right_footer_helpdesk' className='landing_page_right_footer_content'>
                            <a href="https://www.clarku.edu">www.clarku.edu</a>
                        </Col>
                        <Col xs={'auto'} id='landing_page_right_footer_helpdesk' className='landing_page_right_footer_content'>
                            <a href="https://www.clarku.edu/helpdesk">Help Desk</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}