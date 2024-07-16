import { GetServerSideProps } from "next";
import { wrapper } from "@/store";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import Sidebar from "@/components/Sidebar";
import ProjectList from "@/components/ProjectList";
import React from "react";
import { setUserDetails } from "@/store/userSlice";
import Content from "@/components/content";
import { fetchUserDetails } from "@/api/user";

type HomeProps = {
  user: object;
};

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/" />
      <article className="flex w-full justify-between">
        <div className="w-full overflow-auto scrollbar-hide">
          <Content />
          {/* <pre>
            {JSON.stringify(user, null, 2)}
          </pre> */}
        </div>

        <ProjectList />
      </article>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    let user = {};

    // get User details
    const { userDetails, userLoggedIn } = store.getState().user;

    // If user is not logged in
    if (!userLoggedIn) {
      try {
        const { req } = context;

        const { authorization, cookie } = req.headers;

        const responseObj = await fetchUserDetails(authorization, cookie);

        if (!responseObj.isLogin) {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
          };
        }

        user = responseObj.userDetails;

        store.dispatch(setUserDetails(user));
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
      user = { ...userDetails };
    }

    return {
      props: {
        user,
      },
    };
  });

export default Home;
