"use client";

import React, { useState } from "react";

type ProjectListProps = {};

const ProjectList: React.FC<ProjectListProps> = () => {
  const projects = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
    "Project 5",
    "Project 6",
    "Project 7",
    "Project 8",
    "Project 9",
    "Project 10",
    "Project 11",
    "Project 12",
    "Project 13",
    "Project 14",
    "Project 15",
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="min-w-64 bg-primary p-4">
      <h3 className="text-primary-white text-center font-bold text-xl mb-4">
        Projects
      </h3>
      <div className="overflow-auto scrollbar-hide bg-primary-white h-[calc(100%-60px)] rounded-md p-3">
        {projects.map((project) => {
          const selected = project === selectedProject || false;

          const onClick = () => setSelectedProject(project);

          return (
            <div
              key={project}
              className={`cursor-pointer mt-1 p-2 rounded ${selected ? "bg-primary-blue text-primary-white font-medium" : ""}`}
              onClick={onClick}
            >
              {project}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
