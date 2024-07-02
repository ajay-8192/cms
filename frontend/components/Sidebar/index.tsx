import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {

  const router = useRouter();

  const handleProfileClick = () => router.push('/profile');

  return (
    <aside className="bg-primary-blue text-primary-white w-64 h-[calc(100vh-108px)] flex flex-col justify-between p-6">
      <div className="flex flex-col items-start">
        <button className="py-4 w-full text-left">
          <div className='px-2 py-1 bg-primary-white text-primary-blue w-full rounded font-bold'>Projects</div>
        </button>
        <button className="py-4 w-full text-left">
          <div className="px-2 py-1 w-full">Create New Project</div>
        </button>
        <button className="py-4 w-full text-left">
          <div className="px-2 py-1 w-full">Bulk Upload</div>
        </button>
      </div>
      <button onClick={handleProfileClick} className="font-bold text-left">
        Profile
      </button>
    </aside>
  )
}

export default Sidebar;
