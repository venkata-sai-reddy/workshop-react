import { CircularProgress, Container } from "@material-ui/core";


export const LoadingPage = () => (
    <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress automationId='content_loading_identifier' style={{color:'red'}} />
        </div>
    </Container>
  );