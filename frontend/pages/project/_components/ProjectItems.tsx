import React from "react";
import Item from "./Item";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject } from "@/store/projectSlice";
import { ProjectType, SelectedProjectType } from "@/types/projectTypes";
import { RootState } from "@/store";

const ProjectItems = ({ projects }: { projects: ProjectType[] }) => {
  console.log("=====> projects", { projects });

  const dispatch = useDispatch();

  const handleSelectProject = (project: SelectedProjectType) => {
    dispatch(setSelectedProject(project));
  };

  return (
    <section className="mt-12 border shadow rounded-xl border-primary-blue w-7/8 laptop:mx-auto p-8 h-min m-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-2xl font-bold">All Projects</div>
      </div>

      <div className="overflow-x-auto scrollbar-hide mt-8 border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Last Modified At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project, index) => (
              <tr key={index}>
                <Link href={`/project/${project._id}`}>
                  <td
                    className="px-6 py-4 whitespace-nowrap hover:underline"
                    onClick={() => handleSelectProject(project)}
                  >
                    {project.name}
                  </td>
                </Link>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{project.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(project.modifiedAt).toISOString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProjectItems;
