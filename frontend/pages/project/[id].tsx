import Sidebar from "@/components/Sidebar";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const Project = () => {

  const project = useSelector((state: RootState) => state.project.selectedProject);

  const { name = 'Not exist' } = project;

  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/project" />
      <article className="flex flex-col w-full overflow-auto pb-8">
        <header className="border-b py-4 pl-12 font-semibold text-xl flex items-center sticky top-0 z-10 bg-primary-white">
          <span className="material-icons" style={{ color: "#1f2d5a" }}>
            folder
          </span>
          <div className="ml-3">{name}</div>
        </header>
      </article>
    </main>
  );
};

export default Project;
