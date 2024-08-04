import { fetchProjectById, fetchProjects } from "@/api/project";
import { fetchUserDetails } from "@/api/user";
import Sidebar from "@/components/Sidebar";
import { RootState, wrapper } from "@/store";
import { setAllProject, setSelectedProject } from "@/store/projectSlice";
import { setUserDetails } from "@/store/userSlice";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Project = () => {
  const project = useSelector(
    (state: RootState) => state.project.selectedProject,
  );

  const { name = "Not exist" } = project;

  const dispatch = useDispatch();
  const { query: { id } } = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      const responseObj = await fetchProjectById(id);
  
      if (!responseObj.isError) {
        const projectDetails = {
          ...responseObj.project,
          content: responseObj.content,
          settings: responseObj.settings
        }
        dispatch(setSelectedProject(projectDetails));
      }
    }

    fetchProject();
  }, []);

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
        {JSON.stringify(project, null, 2)}
      </article>
    </main>
  );
};


export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    let user = {};
    let projects = [];

    // get User details
    const { userDetails, userLoggedIn } = store.getState().user;

    console.log("====> USER:::PROFILE", { userDetails, userLoggedIn });

    // If user is not logged in
    if (!userLoggedIn) {
      try {
        const { req } = context;

        const { authorization, cookie } = req.headers;

        const responseObj = await fetchUserDetails(authorization, cookie);

        console.log("====> ", { responseObj });

        if (!responseObj.isLogin) {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
          };
        }

        console.log("====> ", { responseObj });

        user = responseObj.userDetails.user;

        store.dispatch(setUserDetails({ user }));
      } catch (error) {
        console.error("Error:", error);

        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }
    } else {
      user = userDetails;
    }

    // Fetch Projects list
    try {
      const { req } = context;

      const { authorization, cookie } = req.headers;

      const responseObj = await fetchProjects(authorization, cookie);

      console.log("====> ", { responseObj });

      console.log("====> ", { responseObj });

      projects = responseObj.projects;

      store.dispatch(setAllProject(projects));
    } catch (error) {
      console.error("Error:", error);

      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    return {
      props: {
        user,
        projects,
      },
    };
  });

export default Project;
