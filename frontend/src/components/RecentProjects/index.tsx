import { useNavigate } from "react-router";

type RecentProjectsProps = {};

const DATA = [
    {
        id: 1,
        title: "Blog Posts",
        lastEditedDate: "2 hours ago"
    },
    {
        id: 2,
        title: "Product Catalog",
        lastEditedDate: "1 day ago"
    },
    {
        id: 3,
        title: "User Profiles",
        lastEditedDate: "2 day ago"
    },
    {
        id: 4,
        title: "Product Catalog",
        lastEditedDate: "1 day ago"
    },
    {
        id: 5,
        title: "User Profiles",
        lastEditedDate: "2 day ago"
    }
]

const RecentProjects: React.FC<RecentProjectsProps> = () => {

    const navigate = useNavigate();

    return (
        <div className="mt-4 space-y-4">
            {DATA.map((data) => {

                const { id, title, lastEditedDate } = data;

                const onClick = () => {
                    navigate(`/project/${id}`)
                }

                return (
                    <div key={id} className="flex justify-between items-center">
                        <div>
                            <div className="text-lg hover:underline" onClick={onClick}>{title}</div>
                            <p className="opacity-50 text-sm font-normal">Last Edited: {lastEditedDate}</p>
                        </div>
                        <button type="button" onClick={onClick} className="border py-2 px-4 rounded-lg">Open</button>
                    </div>
                )
            })}
        </div>
    );
};

export default RecentProjects;
