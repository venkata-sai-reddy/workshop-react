import AddWorkshop from "./AddWorkshop";
import './Workshop.css';

const WorkshopComponent = (props) => {

    const { path } = props;

    if(path === '/create-workshop'){
        return(<AddWorkshop />);
    } else {
        return(<div>Workshop Component {path}</div>);
    }
}
export default WorkshopComponent;