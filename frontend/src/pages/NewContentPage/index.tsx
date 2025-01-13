import PageHeader from "../../components/Common/PageHeader";
import { createContent } from "../../services/contentService";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const NewContentPage = () => {

    const navigate = useNavigate();
    const [contents, setContents] = useState([
        {
            type: "",
            key: "",
            value: ""
        }
    ]);
    const [contentName, setContentName] = useState("");
    const [isNameEditable, setIsNameEditable] = useState(false);

    useEffect(() => {
        if (contentName === "") {
            setIsNameEditable(true);
        }
    }, []);

    const { projectId } = useParams();

    const handleNewData = () => {
        setContents([
            ...contents,
            { key: "", value: "", type: "" }
        ])
    };

    const handleOnValueChange = (value: string, index: number) => {
        let updatedContents = [...contents];
        updatedContents = updatedContents.map((content, i) => {
            return {
                ...content,
                value: i === index ? value : content.value
            }
        });
        setContents(updatedContents)
    }

    const handleOnKeyChange = (key: string, index: number) => {
        console.log('===> ', { key, index });

        let updatedContents = [...contents];
        updatedContents = updatedContents.map((content, i) => {
            console.log('===> ', content);
            
            return {
                ...content,
                key: i === index ? key : content.key
            }
        });
        setContents(updatedContents)
    };
    
    const onSuccess = (data: any) => {
        console.log("Content created:", data);
        const id = data?.content?.id;
        if (id) {
            navigate(`/project/${projectId}/content/${id}`)
        }
    };

    const onError = (error: any) => {
        console.log("Error creating content:", error);
    };

    const onUpload = () => {
        console.log("Upload content");
        if (projectId)
            createContent({ data: {contents, contentName}, projectId }, { onSuccess, onError });
    }

    return (
        <div className="bg-gray-200 overflow-auto h-screen w-full">
            <PageHeader header="New Content" />

            <div className="flex flex-col rounded-2xl border p-6 m-6 bg-white">
                <div className="mb-6">
                    <h1 className="font-bold text-2xl">Project Details</h1>
                    <p className="text-gray-500">Start a new content in project</p>
                </div>

                <div>
                    Content Name: 
                    {isNameEditable ? (
                        <input
                            type="text"
                            className="border rounded-md p-2 ml-4"
                            value={contentName}
                            onChange={(e) => setContentName(e.target.value)}
                        />
                    ) : contentName}
                </div>

                <div className="flex flex-col space-y-2 mt-4">
                    {contents.length ? <div className="flex space-x-2 w-full">
                        <div className="p-2 w-1/6">Key</div>
                        <div className="p-2 w-5/6">Value</div>
                    </div> : null}
                    {contents.map((content, index: number) => (
                        <div key={index} className="flex space-x-2 w-full">
                            <input type="text" className="border rounded-md p-2 w-1/6" value={content.key} onChange={(e) => handleOnKeyChange(e.target.value, index)} />
                            <input type="text" className="border rounded-md p-2 w-5/6" value={content.value} onChange={(e) => handleOnValueChange(e.target.value, index)} />
                        </div>
                    ))}
                    <button
                        className="w-fit border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                        onClick={handleNewData}
                    >
                        New Data
                    </button>
                </div>

                <div className="mt-8">
                    <button
                        className="w-fit border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                        onClick={onUpload}
                    >
                        Upload Content
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewContentPage;
