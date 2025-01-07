import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setProject } from "../../store/reducers/projectSlice";
import { updateProjectDetails } from "../../services/projectService";

const ProjectDetailSection = () => {

    const [isEditing, setIsEditing] = useState(false);
    const { title, description, createdAt, ...rest } = useSelector((state: RootState) => state.project);
    const dispatch = useDispatch();

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const onChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(setProject({
            ...rest,
            title,
            description,
            [name]: value
        }));
    }

    const onSuccess = (data: any) => {
        dispatch(setProject(data));
        setIsEditing(false);
    }

    const onError = (error: any) => {
        console.log("Error fetching project details:", error);
    }

    const submitProjectDetails = (e: any) => {
        e.preventDefault();

        const payload = {
            title,
            description
        }

        updateProjectDetails(rest.id, payload, { onSuccess, onError });
    }

    if (isEditing) {
        return (
            <form className="flex flex-col space-y-6" onSubmit={submitProjectDetails}>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="title" className="text-gray-500 font-medium">Title</label>
                    <input type="text" id="title" name="title" onChange={onChange} className="border border-black focus:border-black rounded-lg h-6 py-6 px-4" value={title} />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="description" className="text-gray-500 font-medium">Description</label>
                    <textarea id="description" name="description" rows={24} onChange={onChange} className="border border-black focus:border-black rounded-lg h-24 p-4" value={description} />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                    >
                        Save Project
                    </button>

                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="border px-12 py-2 rounded-lg border-slate-900 font-bold bg-white text-slate-800 active:bg-slate-800 active:text-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="flex flex-col space-y-6">
            <div className="space-y-1">
                <div className="text-gray-500 font-medium">Name</div>
                <p>{title}</p>
            </div>

            <div className="space-y-1">
                <div className="text-gray-500 font-medium">Description</div>
                <p>{description}</p>
            </div>

            <div className="space-y-1">
                <div className="text-gray-500 font-medium">Created</div>
                <p>{createdAt}</p>
            </div>

            <button
                className="flex w-fit border px-12 py-2 rounded-lg border-slate-900 font-bold bg-slate-800 text-white active:bg-white active:text-slate-800"
                onClick={() => setIsEditing(true)}
            >
                Edit Details
            </button>
        </div>
    );
};

export default ProjectDetailSection;
