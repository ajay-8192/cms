import { useParams } from "react-router";

const ContentPage = () => {

    const { contentId } = useParams();

    return (
        <div>
            <h1>Content Page {contentId}</h1>
        </div>
    );
};

export default ContentPage;
