import SkillsApprovePage from "./Skills/ApprovePage";
import SkillsPage from "./Skills/SkillsPage";
import CreateUserPage from "./Users/CreateUserPage";
import UserPage from "./Users/UserPage";
import ViewUsers from "./Users/ViewUsers";


const AdminPage = (props) => {

    const { path } = props;

    if(path === '/view-users'){
        return(<ViewUsers />);
    } else if(path === '/user'){
        return(<UserPage />);
    } else if(path === '/approve-skills'){
        return(<SkillsApprovePage />);
    } else if(path === '/all-skills'){
        return(<SkillsPage />);
    } else if(path === '/create-user'){
        return(<CreateUserPage />);
    } else  {
        return(<div> 404 Page Not Found </div>);
    }

}

export default AdminPage;