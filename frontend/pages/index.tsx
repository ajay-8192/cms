import { GetServerSideProps } from "next";
import { RootState, wrapper } from "@/store";
import Sidebar from "@/components/Sidebar";
import ProjectList from "@/components/ProjectList";
import React from "react";
import { setUserDetails } from "@/store/userSlice";
import Content from "@/components/content";
import { fetchUserDetails } from "@/api/user";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "@/components/ProfileCard";
import RecentProjects from "@/components/RecentProjects";
import ServiceKeyInfo from "@/components/ServiceKeyInfo";

type HomeProps = {
  user: object;
};

const Home: React.FC<HomeProps> = ({ user }) => {
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
      <Sidebar activePath="/" />
      <article className="flex flex-col w-full overflow-auto pb-8">
        <header className="border-b py-4 pl-12 font-semibold text-xl flex items-center sticky top-0 z-10 bg-primary-white">
          <span className="material-icons" style={{ color: "#1f2d5a" }}>
            space_dashboard
          </span>
          <div className="ml-3">Dashboard</div>
        </header>

        <ProfileCard />
        <RecentProjects />
        <ServiceKeyInfo />
      </article>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    let user = {};

    // get User details
    const { userDetails, userLoggedIn } = store.getState().user;

    console.log("======> USER:::HOME", { userDetails, userLoggedIn });

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

    return {
      props: {
        user,
      },
    };
  });

export default Home;
