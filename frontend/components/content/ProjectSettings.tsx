import React from "react";

const ProjectSettings = () => {
  const handleUpdateSettings = () => {
    console.log("UPDATE SETTINGS: DONE");
  };

  const deleteProject = () => {
    console.log("PROJECT DELETED: DONE");
  };

  return (
    <div className="px-4">
      <div className="w-full mt-10 border p-4">
        <div className="flex mb-4">
          <div className="w-60 opacity-75">Name</div>
          <div>Project Name</div>
        </div>

        <div className="flex mb-4">
          <div className="w-60 opacity-75">Description</div>
          <div>Project Description</div>
        </div>

        <div className="flex mb-4">
          <div className="w-60 opacity-75">Allowed access</div>
          <div>admin, viewer, editor</div>
        </div>

        <div className="flex mb-4">
          <div className="w-60 opacity-75">Name</div>
          <div>Project Name</div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={deleteProject}
            className="text-center px-4 py-2 rounded-xl bg-red-800 text-primary-white active:bg-red-950"
          >
            Delete Project
          </button>
          <button
            onClick={handleUpdateSettings}
            className="text-center px-4 py-2 rounded-xl bg-primary text-primary-white active:bg-primary-blue"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
