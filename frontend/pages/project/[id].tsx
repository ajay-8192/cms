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
  const {
    query: { id },
  } = useRouter();
  
  useEffect(() => {
    const fetchProject = async () => {
      const responseObj = await fetchProjectById(id);
      
      if (!responseObj.isError) {
        const projectDetails = {
          ...responseObj.project,
          content: responseObj.content,
          settings: responseObj.settings,
        };
        dispatch(setSelectedProject(projectDetails));
      }
    };
    
    fetchProject();
  }, []);

  /*
  {
  "contents": [
    {
      "name": "0123", - 
      "createdUser": "er", - 
      "lastModifiedUser": "arwet", - 
      "createdAt": "<DateFormet>",
      "modifiedAt": "<DateFormet>", -
      "status": "Draft", - 
      "version": "<number>",
      "data": {
        "<key>": "<Value>",
      },
    },
  ],
}*/
  
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

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Created User</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Modified User</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Modified At</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(project.contents || []).map((content:any, index: any) =>{
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap hover:underline">{content.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{content.createdUser}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{content.lastModifiedUser}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{content.modifiedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{content.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>


        {/* this is for data display */}
        {/* TODO = loop over project.contents instead of project*/}
        {/* <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(project.contents || []).map((key:any, index:any) =>{
              if(key !== "data"){
                return (
                  <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap hover:underline">{key}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{project.contents[key]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="material-icons" style={{ color: "#1f2d5a" }}>edit</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap delete">
                  <span className="material-icons" style={{ color: "#1f2d5a" }}>delete</span>
                  </td>
                </tr>
                );
              }
            })}
          </tbody>
        </table> */}
        {/* TODO = loop over project.contents instead of project*/}
        <button className="w-40 h-30 pt-3 shadow-md cursor-pointer">Add New</button>
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
