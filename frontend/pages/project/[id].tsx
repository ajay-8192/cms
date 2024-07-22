import Sidebar from "@/components/Sidebar";
import React from "react";

const Project = () => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/project" />
      <article className="flex flex-col w-full overflow-auto pb-8">
        <header className="border-b py-4 pl-12 font-semibold text-xl flex items-center sticky top-0 z-10 bg-primary-white">
          <span className="material-icons" style={{ color: "#1f2d5a" }}>
            dashboard
          </span>
          <div className="ml-3">Dashboard</div>
        </header>
      </article>
    </main>
  );
};

export default Project;
