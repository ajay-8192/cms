import { CreateProject } from "@/types/projectTypes";

export const createProject = async (data: CreateProject) => {
  const URL = `${process.env.API_HOST || "http://localhost:5000/api"}/project/create`;

  try {
    const projectDetails = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: data }),
      credentials: "include",
    });

    if (!projectDetails.ok) {
      throw new Error("Failed to fetch user details");
    }

    const projectDetailsJson = await projectDetails.json();

    console.log("====> ", projectDetailsJson);

    return {
      project: projectDetailsJson.project,
      isError: false,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      project: null,
      isError: true,
    };
  }
};

export const fetchProjects = async (
  authorization: string | undefined,
  cookie: string | undefined,
) => {
  const URL = `${process.env.API_HOST || "http://localhost:5000/api"}/project`;

  try {
    const projectList = await fetch(URL, {
      method: "GET",
      headers: {
        Authorizarion: authorization || "",
        Cookie: cookie || "",
      },
      credentials: "include",
    });

    if (!projectList.ok) {
      throw new Error("Failed to fetch user details");
    }

    const projectListJson = await projectList.json();

    console.log("====> ", projectListJson);

    return {
      projects: projectListJson.projects,
      isError: false,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      projects: [],
      isError: true,
    };
  }
};
