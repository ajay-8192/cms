import Modal from "@/components/Modal";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileEditModal from "./ProfileEditModal";

const ProfileDashboard = () => {

  const onDeleteAccount = async () => {
    console.log('DELETE ACCOUNT');
  }

  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    if (!user.userLoggedIn) {
      router.push('/login');
    }
  }, [user, router]);

  const { email, name } = user.userDetails;

  const handleClose = () => { setOpenEditModal(false) }
  const handleOpen = () => { setOpenEditModal(true) }

  return (
    <div className="w-full">
      <header className="border-b py-4 pl-12 font-semibold text-xl flex items-center">
        <span className="material-icons" style={{ color: '#1f2d5a' }}>badge</span>
        <div className="ml-3">User Details</div>
      </header>
      <section className="mt-16 border shadow rounded-xl border-primary-blue w-3/5 mx-auto p-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Account</div>
          <div className="cursor-pointer" onClick={handleOpen}>
            <span className="material-icons" style={{ color: '#1f2d5a' }}>edit</span>
          </div>
        </div>

        {openEditModal ? <ProfileEditModal handleClose={handleClose} /> : null}

        <div className="mt-6 flex">
          <span className="material-icons profile" style={{ color: '#1f2d5a' }}>account_circle</span>

          <div className="ml-6">
            <div className="text-xl font-semibold">{name}</div>
            <div className="opacity-70 mt-2">{email}</div>
          </div>
        </div>
      </section>

      <section className="border shadow rounded-xl border-primary-blue w-3/5 mt-6 mx-auto p-8">
        <div className="text-2xl font-bold">Privacy</div>
        <p className="mt-4 text-sm font-normal">You can set your consent preferences and determine how you want your data to be used based on the purposes below. You may set your preferences for us independently from those of third-party partners.</p>
      </section>

      <section className="border shadow rounded-xl border-primary-blue w-3/5 mt-6 mx-auto p-8">
        <div className="text-2xl font-bold">Danger zone</div>
        <button className="mt-8 border-2 px-4 py-2 rounded-lg border-red-500 active:bg-red-900 active:text-primary-white active:border-red-900" onClick={onDeleteAccount}>Delete account</button>
      </section>
    </div>
  );
};

export default ProfileDashboard;
