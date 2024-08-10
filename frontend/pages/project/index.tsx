import React from "react";
import Sidebar from "@/components/Sidebar";
import ProjectItems from "./_components/ProjectItems";
import { GetServerSideProps } from "next";
import { RootState, wrapper } from "@/store";
import { fetchUserDetails } from "@/api/user";
import { setUserDetails } from "@/store/userSlice";
import { fetchProjects } from "@/api/project";
import { setAllProject } from "@/store/projectSlice";
import { useDispatch, useSelector } from "react-redux";

const ProjectList = ({ user, projects }: { user: object; projects: any }) => {
  console.log("======> ", { user, projects });

  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userDetails.email) {
      console.log("======> 22:HOME");
      dispatch(setUserDetails({ user }));
      console.log("======> 24:HOME");
    }
  }, [userDetails, user, dispatch]);

  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/project" />
      <article className="flex flex-col w-full pb-8">
        <header className="border-b py-4 pl-12 font-semibold text-xl flex items-center sticky top-0 z-10 bg-primary-white">
          <span className="material-icons" style={{ color: "#1f2d5a" }}>
            folder
          </span>
          <div className="ml-3">All Projects</div>
        </header>

        <ProjectItems projects={projects} />
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

export default ProjectList;
