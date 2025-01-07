import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router";

type ContentListProps = {};

const ContentList: React.FC<ContentListProps> = () => {

    const contents = useSelector((state: RootState) => state.project.contents);
    const navigate = useNavigate();
    const { projectId } = useParams();

    const handleNewContent = () => {
        navigate(`/project/${projectId}/content/new`);
    }

    

    if (contents.length === 0) {
        return (
            <div>
                <p className="mb-4 opacity-40">No contents available.</p>
                <button
                    onClick={handleNewContent}
                    className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                >
                        Create Content
                </button>
            </div>
        )
    }

    return (
        <div>ContentList</div>
    );
};

export default ContentList;
