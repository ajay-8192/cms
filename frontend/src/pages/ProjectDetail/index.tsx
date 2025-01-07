import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import PageHeader from "../../components/Common/PageHeader";
import ProjectDetailSection from "../../components/ProjectDetails";
import ContentList from "../../components/ContentList";

import { fetchProjectDetails } from "../../services/projectService";

import { setContentInProject, setProject } from "../../store/reducers/projectSlice";
import { RootState } from "../../store/store";
import { fetchContentsByProjectId } from "../../services/contentService";

const ProjectDetail = () => {

    const { projectId } = useParams();
    const title = useSelector((state: RootState) => state.project.title);
    const dispatch = useDispatch();

    const onSuccess = (data: any) => {
        dispatch(setProject(data));
    };

    const onError = (error: any) => {
        console.log("Error fetching project details:", error);
    };

    const onContentSuccess = (data: any) => {
        dispatch(setContentInProject(data));
    }

    const onContentFailure = (error: any) => {
        console.log('====> ', { error });
    }

    useEffect(() => {
        if (projectId) {
            fetchProjectDetails({ projectId }, { onSuccess, onError });
            fetchContentsByProjectId(projectId, {
                onSuccess: onContentSuccess,
                onError: onContentFailure
            });
        }
    }, [projectId]);

    return (
        <div className="bg-gray-200 overflow-auto h-screen w-full">
            <PageHeader header={title || "Project"} />

            <div className="w-full p-6">
                <div className="flex flex-col rounded-2xl border p-6 m-6 bg-white">
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl">Project Details</h1>
                        <p className="text-gray-500">Start a new content in project</p>
                    </div>

                    <ProjectDetailSection />
                </div>

                <div className="flex flex-col rounded-2xl border p-6 m-6 bg-white">
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl">Contents</h1>
                    </div>

                    <ContentList />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
