import { useEffect } from "react";
import PageHeader from "../../components/Common/PageHeader";
import { fetchAllProjectLists } from "../../services/projectService";
import { useDispatch } from "react-redux";
import { setProjectList } from "../../store/reducers/projectsSlice";
import ProjectList from "../../components/Projects/ProjectList";

const Projects = () => {

    const dispatch = useDispatch();
    const onSuccess = (data: any) => {
        dispatch(setProjectList(data));
    }

    const onError = (error: any) => {
        console.log('====> ', { error });
    }

    useEffect(() => {
        fetchAllProjectLists({ onSuccess, onError });
    }, []);

    return (
        <div className="h-screen w-full bg-gray-200 overflow-auto">
            <PageHeader header="Projects" />

            <div className="w-full p-6">
                <div className="flex flex-col rounded-2xl border p-6 m-6 bg-white">
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl">Projects</h1>
                    </div>

                    <ProjectList />
                </div>

                
            </div>
        </div>
    );
};

export default Projects;
