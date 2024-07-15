import React, { useState } from 'react';
import Input from '@/components/Input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToaster } from '@/context/ToasterContext';
import { userSignup } from '@/api/user';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/store/userSlice';

const SignupForm = () => {

  const [signupDetails, setSignupDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();
  const { showToast } = useToaster();
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value
    });
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const responseObj = await userSignup(signupDetails);
    if (responseObj.validObj.isValid && responseObj.userDetails) {
      
      dispatch(setUserDetails(responseObj.userDetails));
      showToast('Create New User Successfully!!', 'success');
    } else {
      showToast('Not able to create user', 'error');
    }

    setTimeout(() => {
      router.push('/');
    }, 5000);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className='flex flex-col justify-center items-center p-8 w-full tablet:w-1/2 overflow-hidden'>

    <Image src={'/logo-black.png'} width={104} height={52} alt='CMS' />
    <div className='mb-6 text-2xl font-bold tablet:w-2/3 tablet:text-3xl'>Sign up to CMS</div>

    <label className='tablet:w-2/3'>Name</label>
    <Input type='email' onChange={handleChange} name='name' classes='tablet:w-2/3 mt-3 border rounded shadow h-10 px-4' />

    <label className='tablet:w-2/3 mt-4'>Email</label>
    <Input type='email' onChange={handleChange} name='email' classes='tablet:w-2/3 mt-3 border rounded shadow h-10 px-4' />

    <label className='tablet:w-2/3 mt-4'>Password</label>
    <Input type='password' onChange={handleChange} name='password' classes='tablet:w-2/3 mt-3 border rounded shadow h-10 px-4' />

    <label className='tablet:w-2/3 mt-4'>Confirm Password</label>
    <Input type='password' onChange={handleChange} name='confirmPassword' classes='tablet:w-2/3 mt-3 border rounded shadow h-10 px-4' />

    <div className='w-full flex justify-between items-center tablet:w-2/3'>
      <button onClick={handleLogin} className='mt-6 px-6 w-32 py-2 border rounded-xl bg-orange-400 active:bg-orange-700 text-primary-white'>Login</button>
      <button onClick={handleSignup} className='mt-6 px-6 w-32 py-2 border rounded-xl bg-slate-400 active:bg-slate-700 text-primary-white'>Sign up</button>
    </div>
  </div>
  )
}

export default SignupForm;
