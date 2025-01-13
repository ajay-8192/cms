import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchContentsByContentId } from "../../services/contentService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setSelectedContent } from "../../store/reducers/contentSlice";
import PageHeader from "../../components/Common/PageHeader";
import ContentDetail from "../../components/Content/ContentDetail";

const ContentPage = () => {

    const { contentId, projectId } = useParams();
    const content = useSelector((state: RootState) => state.contents.selectedContent);
    const contents = useSelector((state: RootState) => state.project.contents);
    const dispatch = useDispatch();

    const onSuccess = (data: any) => {
        dispatch(setSelectedContent(data));
    }

    useEffect(() => {
        if (contentId && content?.id !== contentId) {
            const content = contents.find(con => con.id === contentId);
            if (content) {
                onSuccess(content)
            } else if (projectId) {
                fetchContentsByContentId({ projectId, contentId }, { onSuccess });
            }
        }
    }, []);

    const [isEditableName, setIsEditableName] = useState(false);

    const [contentName, setContentName] = useState("");

    useEffect(() => {
        setContentName(content?.name || "")
    }, [content?.name])

    const onContentNameChange = (e: any) => {
        const { value } = e.target;
        setContentName(value);
    }

    const handleContentNameEditable = () => {
        setIsEditableName(true);
    }

    const handleCancelContentNameChange = () => {
        setIsEditableName(false);
        setContentName(content?.name || "");
    }

    return (
        <div className="h-screen w-full bg-gray-200 overflow-auto">
            <PageHeader header="Content" />

            <div className="w-full p-6 space-y-6">
                <div className="rounded-2xl items-center border p-6 bg-white">
                    {!isEditableName ? (
                        <p className="flex items-center space-x-2">
                            <span>Content Name:</span> 
                            <span className="font-bold opacity-60">{content?.name}</span>
                            <span className="material-symbols-outlined cursor-pointer" onClick={handleContentNameEditable}>
                                edit
                            </span>
                        </p>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <label htmlFor="contentName" className="opacity-40">Content Name:</label>
                            <input id="contentName" value={contentName} onChange={onContentNameChange} className="border outline-none focus:outline-none px-4 py-1 rounded-lg" />
                            <button onClick={handleCancelContentNameChange} type="button" className="border px-4 py-1 rounded-lg">Cancel</button>
                        </div>
                    )}
                </div>

                <div className="rounded-2xl items-center border p-6 bg-white">
                    <ContentDetail contentData={content?.data} />
                </div>
            </div>

        </div>
    );
};

export default ContentPage;
