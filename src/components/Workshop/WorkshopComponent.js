import AddWorkshop from "./AddWorkshop";
import RegisteredWorkshops from "./Registered/RegisteredWorkshops";
import SearchWorkshop from "./Search/SearchWorkshop";
import ViewWorkshop from "./ViewWorkshop";
import './Workshop.css';
import RequestedWorkshops from "./Request/RequestedWorkshops";
import UserRequestedWorkshops from "./Request/UserRequestedWorkshops";

const WorkshopComponent = (props) => {

    const { path } = props;

    if(path === '/create-workshop'){
        return(<AddWorkshop />);
    } else if(path === '/workshop'){
        return(<SearchWorkshop />);
    } else if(path === '/view-registered-workshops'){
        return(<RegisteredWorkshops />);
    } else if(path === '/view-workshop'){
        return(<ViewWorkshop />);
    } else if(path === '/view-requested-workshops') {
        return(<RequestedWorkshops />);
    } else if(path === '/workshop-requests') {
        return(<UserRequestedWorkshops />);
    } else {
        return(<div>Workshop Component {path}</div>);
    }
}
export default WorkshopComponent;