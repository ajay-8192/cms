import { useEffect, useState } from "react";

type ContentDetailProps = {
    contentData?: { [key: string]: any } | undefined
};

const ContentDetail: React.FC<ContentDetailProps> = ({ contentData }) => {

    const [content, setContent] = useState<any[]>([]);
    useEffect(() => {
        if (contentData !== undefined) {
            const d = Object.keys(contentData).map((key) => {
                return {
                    key,
                    value: contentData?.[key],
                    type: ""
                }
            })
            setContent([...d]);
        } else {
            setContent([]);
        }
    }, [contentData])

    if (!content || !content?.length) {
        return null
    }

    const handleOnKeyChange = (key: any, index: number) => {
        let updatedContents = [...content];
        updatedContents = updatedContents.map((content, i) => {
            
            return {
                ...content,
                key: i === index ? key : content.key
            }
        });
        setContent(updatedContents)
    };

    const handleOnValueChange = (value: any, index: number) => {
        let updatedContents = [...content];
        updatedContents = updatedContents.map((content, i) => {
            return {
                ...content,
                value: i === index ? value : content.value
            }
        });
        setContent(updatedContents)
    };

    const handleNewContentData = () => {
        setContent([
            ...content,
            {
                key: "",
                value: "",
                type: ""
            }
        ])
    }

    return (
        <div>
            <div className="flex flex-col space-y-2 mt-4">
                {content?.length ? <div className="flex space-x-2 w-full">
                    <div className="p-2 w-1/6">Key</div>
                    <div className="p-2 w-5/6">Value</div>
                </div> : null}
                {content?.map((content, index: number) => (
                    <div key={index} className="flex space-x-2 w-full">
                        <input type="text" className="border rounded-md p-2 w-1/6" value={content.key} onChange={(e) => handleOnKeyChange(e.target.value, index)} />
                        <input type="text" className="border rounded-md p-2 w-5/6" value={content.value} onChange={(e) => handleOnValueChange(e.target.value, index)} />
                    </div>
                ))}
                <button
                    className="w-fit border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                    onClick={handleNewContentData}
                >
                    New Data
                </button>
            </div>
        </div>
    );
};

export default ContentDetail;
