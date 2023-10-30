import { Routes, Route, Navigate } from "react-router-dom";
import { HomeComponent } from "./components/Home/HomeComponent";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "./components/preLogins/Logout";
import { useEffect, useState } from "react";
import { saveUser, doLogout } from "./store/reducers/UserReducers";
import { doAuth } from "./store/actions/AuthActions";
import { LoadingPage } from "./components/Loading/Loading";

export const PrivateRouter = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.value)
    const [isAuth, setIsAuth] = useState(userState?.isUserAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await doAuth();
                dispatch(saveUser(response));
                setIsAuth(true);
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                dispatch(doLogout());
                setIsLoading(false);
            }
        };
        const isAuthenticated = localStorage.getItem("sessionid");
        if (!isAuth && isAuthenticated) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    });

    if (isLoading) {
        return <LoadingPage />
    }
    return isAuth ? (
        <Routes >
            <Route path="/" exact element={<Navigate to='/home' />} />
            <Route path="/home" exact element={<HomeComponent path='/home' />} />
            <Route path="/workshop" exact element={<HomeComponent path='/workshop' />} />
            <Route path="/create-workshop" exact element={<HomeComponent path='/create-workshop' />} />
            <Route path="/view-registered-workshops" exact element={<HomeComponent path='/view-registered-workshops' />} />
            <Route path="/update-workshop" exact element={<HomeComponent path='/update-workshop' />} />
            <Route path="/delete-workshop" exact element={<HomeComponent path='/delete-workshop' />} />
            <Route path="/view-requested-workshops" exact element={<HomeComponent path='/view-requested-workshops' />} />
            <Route path="/view-workshop" exact element={<HomeComponent path='/view-workshop' />} />
            <Route path="/profile" exact element={<HomeComponent path='/profile' />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route path="*" element={<Navigate to='/home' />} />
        </Routes>
    ) : (
        <Navigate to="/login" />
    );
}