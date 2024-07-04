'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../Button';

const LogoutButton = () => {

  const router = useRouter();
  
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
    <Button onClick={handleLogout} text='Logout' />
  )
}

export default LogoutButton;
