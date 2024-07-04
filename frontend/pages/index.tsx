import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, wrapper } from '@/store';
import Image from 'next/image';
import LogoutButton from '@/components/LogoutButton';
import Sidebar from '@/components/Sidebar';
import ProjectList from '@/components/ProjectList';
import React from 'react';
import { setUserDetails } from '@/store/loginSlice';

type HomeProps = {
  user: object
};

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div>
      <header className="flex items-center justify-between px-20 h-[108px] shadow-xl w-full">
        <Image src="/logo-color.png" height={108} width={108} alt="Logo" />
        <div className="font-bold text-3xl text-primary-blue">Content Management System</div>
        <LogoutButton />
      </header>
      <main className="flex w-full h-[calc(100vh-108px)]">
        <Sidebar />
        <article className="flex w-full justify-between">
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>
          <ProjectList />
        </article>
      </main>
      {/* <button onClick={() => dispatch(setUserDetails({ login: true }))}>Increment by 1</button> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {

    let user = {};

    // get User details
    const { userDetails, userLoggedIn } = store.getState().login;

    // If user is not logged in
    if (!userLoggedIn) {
      try {
        const { req } = context;
        console.log(JSON.stringify(req.headers, null, 2));
        console.log(typeof req.headers);
        
        const response = await fetch('http://localhost:5000/api/user/details', {
          headers: {
            'Authorizarion': req.headers.authorization || '',
            'Cookie': req.headers.cookie || ''
          },
          credentials: 'include'
        });
  
        if (response.ok) {
          const data = await response.json();
          
          user = {
            ...data
          }
          store.dispatch(setUserDetails({ ...data }));
        } else {
          console.log('==========> API error');
          
          return {
            redirect: {
              permanent: false,
              destination: '/login'
            }
          }
        }
  
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
    
    // store.dispatch(removeUserDetails());

    return {
      props: {
        user
      },
    };
  }
);

export default Home;
