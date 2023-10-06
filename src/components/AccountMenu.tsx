import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

type AccountMenuProps = {
  visible?: boolean;
};

const AccountMenu = ({ visible }: AccountMenuProps) => {
  const { data } = useCurrentUser();
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      console.log("Logout success", response);
      router.push("netflix-clone-projects.vercel.app/auth");
    } catch (error: any) {
      console.log("Logout Failed", error.message);
    }
  };
  if (!visible) {
    return;
  }
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-2 group/item flex flex-row gap-3 items-center w-full ">
          <img
            src="/images/default-blue.png"
            className="w-9 rounded-md"
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={logout}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Nextflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
