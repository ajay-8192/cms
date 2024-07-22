import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { name, email } = user.userDetails;

  const redirectToProfile = () => {
    router.push("/profile");
  };

  return (
    <section className="mt-12 border shadow rounded-xl border-primary-blue w-2/3 mx-auto p-8 h-min">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-2xl font-bold">Account</div>
      </div>

      <div className="mt-6 flex">
        <span className="material-icons profile" style={{ color: "#1f2d5a" }}>
          account_circle
        </span>

        <div className="ml-6">
          <div
            className="text-2xl font-semibold hover:underline cursor-pointer"
            onClick={redirectToProfile}
          >
            {name}
          </div>
          <div className="opacity-70 mt-2">{email}</div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
