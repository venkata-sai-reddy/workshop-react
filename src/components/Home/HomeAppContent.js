import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const HomeAppContent = () => {

    const navigate = useNavigate();

    return (
        <Container style={{ color :'white',  textAlign: 'center', padding: '50px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: 'url(https://s28151.pcdn.co/wp-content/uploads/sites/2/2021/04/shutterstock_1720464691.jpg)' }}>
            <Typography variant='h3' automationId='home_page_wlcm_msg' gutterBottom>
                Welcome to Clark Skill Workshop
            </Typography>
            <Typography variant="body1" automationId='home_page_wlcm_sub_msg' paragraph>
                Explore and enroll in upcoming workshops to enhance your skills.
            </Typography>
            <Button automationId='home_page_view_wkshop_btn' sx={{ alignSelf: 'center' }} variant="contained" color="error" onClick={() => navigate('/workshop')}>
                View Workshops
            </Button>
        </Container>
    );
}

export default HomeAppContent;