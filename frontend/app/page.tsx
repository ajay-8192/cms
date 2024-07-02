'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import ProjectList from "@/components/ProjectList";
import { useAppContext } from "@/context/AppContext";

export default function Home() {

  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/details', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          console.log('===========> ', { data });
          const { _id: id, name, email } = data.user;
          dispatch({ type: 'SET_USER_DETAILS', payload: { id, name, email } });
          setUserDetails(data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log('Error checking login status:', error);
        router.push('/login');
      }
    };

    
    checkLoggedIn();
  }, []);

  const handleLogout = (e: any) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(() => {
        router.push('/login');
      })
      .catch(error => {
        console.log('Error:', error);
        
      });
  }

  return (
    <>
      <header className="flex items-center justify-between px-20 h-[108px] shadow-xl w-full">
        <Image src="/logo-color.png" height={108} width={108} alt="Logo" />
        <div className="font-bold text-3xl text-primary-blue">Content Management System</div>
        <button className="bg-primary-blue px-4 py-2 rounded text-primary-white" onClick={handleLogout}>Logout</button>
      </header>
      <main className="flex w-full h-[calc(100vh-108px)]">
        <Sidebar />
        <article className="flex w-full justify-between">
          {JSON.stringify({ user: state.userDetails }, null, 2)}
          <ProjectList />
        </article>
      </main>
    </>
  );
}
