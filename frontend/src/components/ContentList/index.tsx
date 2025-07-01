import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useNavigate, useParams } from "react-router";
import { deleteContent } from "../../services/contentService";
import { useDispatch } from "react-redux";
import { removeContentFromProject } from "../../store/reducers/projectSlice";

type ContentListProps = {};

const ContentList: React.FC<ContentListProps> = () => {

    const contents = useSelector((state: RootState) => state.project.contents);
    const navigate = useNavigate();
    const { projectId } = useParams();
    const dispatch = useDispatch();

    const handleNewContent = () => {
        navigate(`/project/${projectId}/content/new`);
    }

    const handleDeleteContent = (contentId: string) => {
        if (projectId) {
            const onSuccess = () => {
                dispatch(removeContentFromProject(contentId));
            }
            deleteContent({ projectId, contentId }, { onSuccess });
        }
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
        <div className="space-y-6">
            {contents.map((content) => {
                return (
                    <div key={content.id} className="flex justify-between items-center space-y-2 border-b last:border-none pb-4">
                        <div>
                            <Link to={`/project/${projectId}/content/${content.id}`} className="underline hover:opacity-50 font-bold">
                                <p>{content.name}</p>
                            </Link>
                            <p className="opacity-60">{content.status}</p>
                        </div>
                        <button onClick={() => handleDeleteContent(content.id)} className="text-red-500">Delete</button>
                    </div>
                )
            })}
            <button
                onClick={handleNewContent}
                className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
            >
                    Create Content
            </button>
        </div>
    );
};

export default ContentList;
