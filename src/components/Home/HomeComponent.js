import './Home.css';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout as logout } from '../../store/actions/PreLoginActions';
import { doLogout } from '../../store/reducers/UserReducers';
import NavigationBar from '../Navigation/NavigationBar';
import { componentsMap } from '../../utils/ComponentPagesMap';
import WorkshopComponent from '../Workshop/WorkshopComponent';
export const HomeComponent = (props) => {

    const {path } = props;
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
        <Container id='home' className="home" automationId='home'>
            {/* <NavBar logout={performLogout} user={userState?.user}/> */}
            <NavigationBar logout={performLogout} user={userState?.user}/>
            <Container >
                {componentsMap.Workshop.includes(path) ? <WorkshopComponent path = {path}/> :<p>In home page</p>}
            </Container>
        </Container>
    );
};