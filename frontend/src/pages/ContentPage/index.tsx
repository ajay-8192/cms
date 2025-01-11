import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchContentsByContentId } from "../../services/contentService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setSelectedContent } from "../../store/reducers/contentSlice";
import PageHeader from "../../components/Common/PageHeader";

const ContentPage = () => {

    const { contentId, projectId } = useParams();
    const content = useSelector((state: RootState) => state.contents.selectedContent);
    const contents = useSelector((state: RootState) => state.project.contents);
    const dispatch = useDispatch();

    const onSuccess = (data: any) => {
        dispatch(setSelectedContent(data));
    }

    useEffect(() => {
        if (contentId) {
            const content = contents.find(con => con.id === contentId);
            if (content) {
                onSuccess(content)
            } else if (projectId) {
                fetchContentsByContentId({ projectId, contentId }, { onSuccess });
            }
        }
    }, []);

    const [contentName, setContentName] = useState(content?.name);

    const onContentNameChange = (e: any) => {
        const { value } = e.target;
        setContentName(value);
    }

    return (
        <div className="h-screen w-full bg-gray-200 overflow-auto">
            <PageHeader header="Content" />

            <div className="w-full p-6 space-y-6">
                <div className="rounded-2xl items-center border p-6 bg-white">
                    <p className="flex items-center space-x-2">
                        <span>Content Name:</span> 
                        <span className="font-bold opacity-60">{content?.name}</span>
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ContentPage;
