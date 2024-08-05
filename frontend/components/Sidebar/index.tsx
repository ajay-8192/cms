import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { userLogout } from "@/api/user";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import { useDispatch } from "react-redux";
import { removeUserDetails } from "@/store/userSlice";

type SidebarProps = {
  activePath: string | "/";
};

const Sidebar: React.FC<SidebarProps> = ({ activePath = "/" }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogout = async () => {
    const responseObj = await userLogout();

    if (responseObj.isLogout) {
      dispatch(removeUserDetails());
      router.push("/login");
    }
  };

  return (
    <aside className="bg-primary-blue text-primary-white laptop:min-w-64 h-full flex flex-col justify-between p-6">
      <div>
        <Image
          src="/logo-no-background.png"
          alt="Content Management System"
          width={100}
          height={60}
          className="ml-2 mb-12 hidden laptop:block"
        />

        {SIDEBAR_ITEMS.MAIN.map((item) => {
          const isSelected = activePath === item.route;
          return (
            <div className="mb-2" key={item.id}>
              <Link
                href={item.route}
                className={`font-semibold flex items-center gap-4 p-2 rounded-xl ${isSelected ? "text-primary-blue bg-white" : "text-primary-white"}`}
              >
                <span
                  className="material-icons"
                  style={isSelected ? { color: "#1f2d5a" } : {}}
                >
                  {item.icon}
                </span>
                <span className="hidden laptop:block">{item.name}</span>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div
          className={`font-semibold flex items-center gap-4 p-2 rounded-xl cursor-pointer`}
          onClick={onLogout}
        >
          <span className="material-icons">logout</span>
          <span className="hidden laptop:block">Log out</span>
        </div>

        <Link href={"/profile"}>
          <div
            className={`font-semibold flex items-center gap-4 p-2 rounded-xl ${activePath === "/profile" ? "text-primary-blue bg-white" : "text-primary-white"}`}
          >
            <span
              className="material-icons"
              style={activePath === "/profile" ? { color: "#1f2d5a" } : {}}
            >
              account_circle
            </span>
            <span className="hidden laptop:block">Profile</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
