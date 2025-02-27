import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router";

type ProjectListProps = {};

const ProjectList: React.FC<ProjectListProps> = () => {

    const projects = useSelector((state: RootState) => state.projects.projects);
    console.log('===> ', { projects });
    

    if (!projects.length) {
        return (
            <div>
                Create project
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {projects.map((project) => {
                return (
                    <div className="w-full flex justify-between pb-3 border-b last:border-none" key={project.id}>
                        <div className="space-y-1 overflow-hidden">
                        <Link to={`/project/${project.id}`} className="underline hover:opacity-50 font-bold">{project.title}</Link>
                            {/* <p className="w-full font-medium">{project.title}</p> */}
                            <p className="truncate">- {project.description}</p>
                            <p className="font-medium opacity-70">Current Version: {project.versionId}</p>
                            <p className="opacity-50">{project.createdAt}</p>
                            <p className="opacity-50">{project.status}</p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
};

export default ProjectList;
