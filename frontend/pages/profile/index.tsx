import Sidebar from "@/components/Sidebar";
import React from "react";
import ProfileDashboard from "./_components/ProfileDashboard";
import { GetServerSideProps } from "next";
import { RootState, wrapper } from "@/store";
import { fetchUserDetails } from "@/api/user";
import { setUserDetails } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ user }: { user: object }) => {
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userDetails.email) {
      dispatch(setUserDetails({ user }));
    }
  }, [userDetails, user, dispatch]);

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

    console.log("====> user details:::::", { user });

    return {
      props: {
        user,
      },
    };
  });

export default Profile;
