import { Link } from "react-router-dom";

export const ForgetPasswordComponent = () =>{
    return (
        <div>
            <div>Forget Password Component</div>
            
        <Link to={'/login'}>Cancel</Link>
        </div>
    );
};