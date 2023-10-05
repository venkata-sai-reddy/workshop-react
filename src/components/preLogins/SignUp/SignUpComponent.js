import { Link } from "react-router-dom";

export const SignUpComponent = () =>{
    return (
        <div>
            <div>SignUp Component</div>
            
        <Link to={'/login'}>SignIn</Link>
        </div>
    );
};