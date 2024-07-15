import { GetServerSideProps } from 'next';
import { wrapper } from '@/store';
import Image from 'next/image';
import LogoutButton from '@/components/LogoutButton';
import Sidebar from '@/components/Sidebar';
import ProjectList from '@/components/ProjectList';
import React from 'react';
import { setUserDetails } from '@/store/userSlice';
import Content from '@/components/content';
import { fetchUserDetails } from '@/api/user';

type HomeProps = {
  user: object
};

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div>
      <header className="flex items-center justify-between px-20 h-16 shadow-xl w-full">
        <Image src="/logo-color.png" height={108} width={108} alt="Logo" fetchPriority='high' className='rounded-full p-4' />
        <div className="font-bold text-3xl text-primary-blue">Content Management System</div>
        <LogoutButton />
      </header>
      <main className="flex w-full h-[calc(100vh-108px)]">
        <Sidebar />
        <article className="flex w-full justify-between">
          <div className='w-full overflow-auto scrollbar-hide'>
            <Content />
            {/* <pre>
              {JSON.stringify(user, null, 2)}
            </pre> */}
          </div>

          <ProjectList />
        </article>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {

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
              destination: '/login'
            }
          }
        }

        user = responseObj.userDetails;

        store.dispatch(setUserDetails(user));

      } catch (error) {
        console.error('Error:', error);

        return {
          redirect: {
            permanent: false,
            destination: '/login'
          }
        }
      }

    } else {
      user = { ...userDetails }
    }

    return {
      props: {
        user
      },
    };
  }
);

export default Home;
