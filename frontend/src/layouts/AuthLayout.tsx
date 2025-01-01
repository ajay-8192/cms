import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router"
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/reducers/userSlice";
import { fetchUserDetails } from "../services/userServices";

const AuthLayout = () => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (!isLoggedIn) {
            const onSuccess = (data: any) => {
                dispatch(setUserDetails(data));
            };

            const onError = (_: any) => {
                navigate("/login");
            };
            fetchUserDetails({ onSuccess, onError });
        }
    }, [isLoggedIn]);

    return (
        <div className="flex">
            <nav className="h-screen flex flex-col gap-x-8 items-center min-w-80 px-6 bg-slate-800 border-b shadow sticky top-0 py-12 gap-6 text-white">
                <div className="border w-40 h-40" />
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex gap-x-3 items-center w-full border border-slate-800 px-6 py-3 rounded-lg hover:bg-white hover:text-slate-800 ${isActive ? "border-white font-medium" : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        space_dashboard
                    </span>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `flex gap-x-3 items-center w-full border border-slate-800 px-6 py-3 rounded-lg hover:bg-white hover:text-slate-800 ${isActive ? "border-white font-medium" : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        folder
                    </span>
                    <p>Projects</p>
                </NavLink>
                <NavLink
                    to="/project/new"
                    className={({ isActive }) =>
                        `flex gap-x-3 items-center w-full border border-slate-800 px-6 py-3 rounded-lg hover:bg-white hover:text-slate-800 ${isActive ? "border-white font-medium" : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        create_new_folder
                    </span>
                    <p>Create New Project</p>
                </NavLink>
                <NavLink
                    to="/bulk-upload"
                    className={({ isActive }) =>
                        `flex gap-x-3 items-center w-full border border-slate-800 px-6 py-3 rounded-lg hover:bg-white hover:text-slate-800 ${isActive ? "border-white font-medium" : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        upload_file
                    </span>
                    <p>Bulk Upload</p>
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex gap-x-3 items-center w-full border border-slate-800 px-6 py-3 rounded-lg hover:bg-white hover:text-slate-800 mt-auto ${isActive ? "border-white font-medium" : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>
                    <p>Profile</p>
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
