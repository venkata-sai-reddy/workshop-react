import { Routes, Route, Navigate } from "react-router-dom";
import { HomeComponent } from "./components/Home/HomeComponent";
import { useSelector } from "react-redux";
import { Logout } from "./components/preLogins/Logout";

export const PrivateRouter = () => {

    const userState = useSelector((state) => state.user.value)
    return userState.isUserAuthenticated ? (
        <Routes >
            <Route path="/" exact element={<Navigate to='/home' />} />
            <Route path="/home" exact element={<HomeComponent />} />
            <Route path="/workshops" exact element={<HomeComponent />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route path="*" element={<h2>Page Not found!</h2>} />
        </Routes>
    ) : (
        <Navigate to="/login" />
    );
}