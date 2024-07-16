import Sidebar from "@/components/Sidebar";
import React from "react";
import ProfileDashboard from "./_components/ProfileDashboard";

const Profile = () => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar activePath="/profile" />
      <ProfileDashboard />
    </main>
  );
};

export default Profile;
