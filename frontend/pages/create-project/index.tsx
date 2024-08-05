import Sidebar from "@/components/Sidebar";
import React from "react";
import ProjectForm from "./_components/ProjectForm";

const CreateProject = () => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/create-project" />
      <article className="flex flex-col w-full overflow-auto pb-8">
        <header className="border-b py-4 pl-12 font-semibold text-xl flex items-center sticky top-0 z-10 bg-primary-white">
          <span className="material-icons" style={{ color: "#1f2d5a" }}>
            create_new_folder
          </span>
          <div className="ml-3">Create Project</div>
        </header>

        <ProjectForm />
      </article>
    </main>
  );
};

export default CreateProject;
