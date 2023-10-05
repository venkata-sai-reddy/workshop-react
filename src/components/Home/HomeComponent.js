import { Col, Container, Row } from 'react-bootstrap';
import './Home.css';
import clark_logo from '../../assets/clark_logo.png'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout as logout } from '../../store/actions/PreLoginActions';
import { doLogout } from '../../store/reducers/UserReducers';

export const HomeComponent = () => {

    const userState = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    const performLogout = async () => {
        try {
            await logout(userState?.user?.session?.sessionId);
            dispatch(doLogout());
            Navigate('/login');
        } catch (error) {
            console.error("Error during logout", error);
        }
    };

    return (
        <Container fluid id='home' className='home' automationId='home'>
            <Row id='home_navbar' className='home_navbar' automationId="home_navbar">
                <Col xs={1} md={1} xl={1} className='home_logo'>
                <img src={clark_logo} alt='Logo' className="home_logo" id='home_logo' automationId='home_logo' />
                </Col>
                <Col xs = {2} md={2} xl={2} id='home_app_name' className='home_app_name' automationId="home_app_name">
                Skill Workshop
                </Col>
                <Col xs={6} md={6} xl={6} id='home_nav_links' className='home_nav_links' automationId="home_nav_links">
                </Col>
                <Col xs={1} md={1} xl={2} className='home_user_name' id='home_user_name' automationId="home_user_name">
                {userState?.user?.firstName}
                </Col>
                <Col xs = {1} md={1} xl={1} id='home_app_name' className='home_app_name' automationId="home_app_name">
                {/* <Link id='home_logout' to={'/logout'}>logout</Link> */}
                <Link id='home_logout' onClick={() => performLogout()}>Logout</Link>
                </Col>
            </Row>
            <Row id='home_content'>

            </Row>
        </Container>
    );
};