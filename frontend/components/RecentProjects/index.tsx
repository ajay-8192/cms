import Link from "next/link";
import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

const RecentProjects = () => {
  const router = useRouter();
  const recentProjects = [
    {
      id: 1234,
      name: "Project 101",
      description:
        "Basic level project with an example of creation and how it looks",
      link: "/project/project-101",
      createdAt: "2024-06-13",
    },
    {
      id: 123,
      name: "Project 102",
      description:
        "Intermediate level project with an example of creation and how it looks",
      link: "/project/project-101",
      createdAt: "2024-07-24",
    },
    {
      id: 124,
      name: "Project 103",
      description:
        "Advanced level project with an example of creation and how it looks",
      link: "/project/project-101",
      createdAt: "2024-07-20",
    },
  ];

  const handleSeeAllProjects = () => {
    router.push("/project");
  };

  return (
    <section className="mt-8 border shadow rounded-xl border-primary-blue w-2/3 mx-auto p-8 h-min">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-2xl font-bold">Recent Projects</div>
        <Button text="See all" onClick={handleSeeAllProjects} />
      </div>

      <div className="mt-6">
        {recentProjects.map((project) => {
          return (
            <Link key={project.id} href={project.link}>
              <div className="mt-6">
                <div className="text-2xl hover:underline">{project.name}</div>
                <div className="opacity-70 truncate mt-2">
                  {project.description}
                </div>
                <div className="text-sm opacity-40 mt-2 font-normal">
                  created at: {project.createdAt}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RecentProjects;
