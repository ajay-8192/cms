import { useState } from "react";
import PageHeader from "../../components/Common/PageHeader";
import { createProject } from "../../services/projectService";
import Astriek from "../../components/Common/Astriek";
import { useDispatch } from "react-redux";
import { setProject } from "../../store/reducers/projectSlice";
import { useNavigate } from "react-router";

const CreateProject = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState({
        title: "",
        description: ""
    });

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setProjectDetails({
            ...projectDetails,
            [name]: value
        });
    }

    const onSuccess = (data: any) => {
        dispatch(setProject(data));
        console.log('===> ', { data });
        navigate(`/project/${data.id}`);
        console.log("Project created successfully");
    }

    const onError = (error: any) => {
        console.log("Error creating project:", error);
    }

    const handleCreateProject = (e: any) => {
        e.preventDefault();
        createProject(projectDetails, { onSuccess, onError });
    }

    const handleCreateProjectAndPublish = (e: any) => {
        e.preventDefault();
        createProject({ ...projectDetails, publish: true}, { onSuccess, onError });
    }

    return (
        <div className="h-screen w-full bg-gray-200 overflow-auto">
            <PageHeader header="Create Project" />

            <div className="w-full p-6">
                <div className="flex rounded-2xl items-center border p-6 m-6 bg-white">
                    <form onSubmit={handleCreateProject} className="space-y-6 w-full">
                        <div>
                            <h1 className="font-bold text-2xl">Create New Project</h1>
                            <p className="text-gray-500">Start a new content project</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="title" className="text-gray-500 font-medium">Title <Astriek /></label>
                            <input type="text" id="title" name="title" className="border border-black focus:border-black rounded-lg h-6 py-6 px-4" value={projectDetails.title} onChange={handleOnChange} />
                            <p className="text-gray-500 text-xs">This is the name of your project.</p>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="description" className="text-gray-500 font-medium">Description</label>
                            <input type="text" id="description" name="description" className="border border-black focus:border-black rounded-lg h-6 py-6 px-4" value={projectDetails.description} onChange={handleOnChange} />
                            <p className="text-gray-500 text-xs">Provide a brief description of your project.</p>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                            >
                                Save Draft
                            </button>

                            <button
                                type="button"
                                onClick={handleCreateProjectAndPublish}
                                className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                            >
                                Save &amp; Publish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
