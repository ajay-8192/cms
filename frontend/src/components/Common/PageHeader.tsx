import { useNavigate } from "react-router";
import { logoutUser } from "../../services/userServices";

type PageHeaderProps = {
    header: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({
    header
}) => {

    const navigate = useNavigate();
    const onSuccess = () => {
        navigate("/login");
    };

    const onError = (error: any) => {
        console.error("===> Error:", { error });
    };

    const handleUserLogout = () => {
        logoutUser({ onSuccess, onError });
    }

    return (
        <div className="flex items-center justify-between px-8 h-20 border-b shadow sticky top-0 bg-white z-50">
            <span className="font-bold text-2xl">{header}</span>
            <div className="ml-auto cursor-pointer flex items-center" onClick={handleUserLogout} role="button">
                <span className="material-symbols-outlined">
                    logout
                </span>
                <span className="ml-2 font-medium text-lg">Logout</span>
            </div>
        </div>
    );
};

export default PageHeader;
