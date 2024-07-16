import Sidebar from "@/components/Sidebar";
import React from "react";
import ProfileDashboard from "./_components/ProfileDashboard";
import { GetServerSideProps } from "next";
import { wrapper } from "@/store";
import { fetchUserDetails } from "@/api/user";
import { setUserDetails } from "@/store/userSlice";

const Profile = ({ user }: { user: object }) => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/profile" />
      <ProfileDashboard />
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

        console.log('====> ', { responseObj });

        if (!responseObj.isLogin) {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
          };
        }

        console.log('====> ', { responseObj });

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
      user = { ...userDetails };
    }

    return {
      props: {
        user,
      },
    };
  });

export default Profile;
