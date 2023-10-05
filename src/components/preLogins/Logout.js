
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { doLogout } from "../../store/reducers/UserReducers";
import { doLogout as logout } from "../../store/actions/PreLoginActions";

export const Logout = () => {

    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.value)

    useEffect( () => {
        const performLogout = async () => {
            try {
                await logout(userState?.user?.session?.sessionId);
                dispatch(doLogout());
                Navigate('/login');
            } catch (error) {
                console.error("Error during logout", error);
            }
        };
        performLogout();
    });

    return (<></>);
}