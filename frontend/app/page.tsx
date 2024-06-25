'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/user-details', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome to My Page!!
      {JSON.stringify(userDetails, null, 2)}
      <button className="bg-white text-black px-4 py-2" onClick={handleLogout}>Logout</button>
    </main>
  );
}
