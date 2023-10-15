// import { Container, Row, Col } from 'react-bootstrap';
// import './LandingPage.css';
// import clark_logo from '../../assets/clark_logo.png';
// import landing_background from '../../assets/landing_background.jpg'
// import { LoginComponent } from './Login/LoginComponent';
// import { SignUpComponent } from './SignUp/SignUpComponent';
// import { ForgetPasswordComponent } from './ForgetPassword/ForgetPasswordComponent';

// export const LandingPage = (props) => {
//     return (
//         <Container fluid className='landing_page'>
//             <Row id='landing_page_header' automationId='landing_page_header'>
//                 Skill Workshop
//             </Row>
//             <Row id='landing_page_content' automationId='landing_page_content'>
//                 <Col xs={8} md={8} xl={9} id='landing_page_left' className='landing_page_left'>
//                     <img src={landing_background} alt='Logo' className="landing_page_left_image" id='landing_page_left_image' automationId='landing_page_left_image' />
//                 </Col>

//                 <Col xs={4} md={4} xl={3} id="landing_page_right" className='landing_page_right'>
//                     <Row id="landing_page_right_header" className='landing_page_right_header'>
//                         <img src={clark_logo} alt='Logo' className="landing_page_logo" id='landing_page_logo' automationId='landing_page_logo' />
//                     </Row>
//                     <Row id='landing_page_right_main' className='landing_page_right_main' automationId='landing_page_right_main'>
//                         {props.loader === 'login' ? <LoginComponent /> : props.loader === 'signup' ? <SignUpComponent /> : props.loader === 'signup' ? <ForgetPasswordComponent /> : <LoginComponent />}
//                     </Row>
//                     <Row id="landing_page_right_footer" className='landing_page_right_footer' automationId="landing_page_right_footer">
//                         <Col xs={'auto'} id='landing_page_right_footer_copyright' className='landing_page_right_footer_content'>
//                             © 2018 Microsoft
//                         </Col>
//                         <Col xs={'auto'} id='landing_page_right_footer_helpdesk' className='landing_page_right_footer_content'>
//                             <a href="https://www.clarku.edu">www.clarku.edu</a>
//                         </Col>
//                         <Col xs={'auto'} id='landing_page_right_footer_helpdesk' className='landing_page_right_footer_content'>
//                             <a href="https://www.clarku.edu/helpdesk">Help Desk</a>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import clark_logo from '../../assets/clark_logo.png';
import { LoginComponent } from './Login/LoginComponent';
import { SignUpComponent } from './SignUp/SignUpComponent';
import { ForgetPasswordComponent } from './ForgetPassword/ForgetPasswordComponent';
import './LandingPage.css';
export const LandingPage = (props) => {
  return (
    <Container maxWidth="xl" className="landing_page" id="landing_page" automationId="landing_page" >
      <Grid container sx={{ minHeight: '6vh' }}>
        <Grid item container justifyContent="center" alignItems="center">
          <Typography sx={{ mb: 2 }} id='landing_page_header' automationId='landing_page_header'>
            Skill Workshop
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ minHeight: '93vh' }} >
        <Grid item xs={12} md={8} lg={8} className="landing_page_left_image" id='landing_page_left_image' automationId='landing_page_left_image' > </Grid>
        <Grid item xs={12} md={4} lg={4} container direction="column" alignItems="center" justifyContent="space-between">
          <Grid item container justifyContent="center" alignItems="center" sx={{ mb: 4 }} className='grid_item' automationId = "landing_page_right_header" id="landing_page_right_header" >
            <img src={clark_logo} alt='Logo' className="landing_page_logo" id='landing_page_logo' automationId='landing_page_logo' />
          </Grid>

          <Grid item container justifyContent="center" alignItems="center" sx={{ mb: 4 }} className='grid_item'>
            {props.loader === 'login' ? <LoginComponent /> : props.loader === 'signup' ? <SignUpComponent /> : props.loader === 'forget-password' ? <ForgetPasswordComponent /> : <LoginComponent />}
          </Grid>

          <Grid item container justifyContent="space-around" alignItems="center" className='grid_item' >
            <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
              © 2023 Copyright
            </Typography>
            <Link href="https://www.clarku.edu" variant="caption" color="textSecondary" sx={{ mr: 1 }}>
              www.clarku.edu
            </Link>
            <Link href="https://www.clarku.edu/helpdesk" variant="caption" color="textSecondary">
              Help Desk
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
