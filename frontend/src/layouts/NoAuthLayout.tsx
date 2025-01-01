import { Outlet } from "react-router"

const NoAuthLayout = () => {
    return (
        <div className="bg-slate-700 h-screen p-12">
            <div className="shadow-lg h-full rounded-2xl p-8 bg-black bg-opacity-30 flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default NoAuthLayout;
