'use client';

import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { removeUserDetails } from '@/store/userSlice';

const LogoutButton = () => {

  const router = useRouter();
  const dispatch = useDispatch();

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
        dispatch(removeUserDetails());
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
