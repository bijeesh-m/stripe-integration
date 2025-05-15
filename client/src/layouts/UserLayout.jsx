import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { checkAuthStatus } from "../features/authSlice";
import { useEffect } from "react";

const UserLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthStatus());
    }, []);

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default UserLayout;
