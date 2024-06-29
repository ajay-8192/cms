import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {

  const router = useRouter();

  const handleProfileClick = () => router.push('/profile');

  return (
    <aside className="bg-primary-blue text-primary-white w-60 h-[calc(100vh-108px)] flex flex-col justify-between p-6">
      <div className="flex flex-col items-start">
        <button className="py-4">Projects</button>
        <button className="py-4">Create New Project</button>
      </div>
      <button onClick={handleProfileClick}>
        Profile
      </button>
    </aside>
  )
}

export default Sidebar;
