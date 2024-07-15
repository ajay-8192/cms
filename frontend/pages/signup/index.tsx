import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ToasterProvider } from '@/context/ToasterContext';
import SignupForm from '@/components/SignupForm';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log('USER', user);
    
    if (user.userLoggedIn && Object.keys(user.userDetails).length) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <ToasterProvider>
      <div className='p-8 min-h-screen'>
        <main className="flex w-full min-h-[calc(100vh-64px)] text-primary-blue shadow-xl rounded-2xl overflow-hidden">
          <SignupForm />

          <div className='hidden tablet:block w-1/2 relative'>
            <Image src={'/login.jpg'} alt='Login' className='w-full h-full' objectFit='cover' fill />
          </div>
        </main>
      </div>
    </ToasterProvider>
  )
}

export default Signup;
