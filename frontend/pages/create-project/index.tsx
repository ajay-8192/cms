import Sidebar from "@/components/Sidebar";
import React from "react";

const CreateProject = () => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/create-project" />
    </main>
  );
};

export default CreateProject;
