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

    console.log('====> ', projectDetailsJson);
    

    return {
      project: projectDetailsJson.project,
      isError: false
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      project: null,
      isError: true
    };
  }
};
