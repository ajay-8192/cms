import React from "react";
import Sidebar from "@/components/Sidebar";

const ProjectList = () => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/project" />
    </main>
  );
};

export default ProjectList;
