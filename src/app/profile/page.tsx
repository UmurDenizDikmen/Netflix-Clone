"use client";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

const Profile = () => {
  const { data: user } = useCurrentUser();

  const router = useRouter();

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col pb-5">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-30 mx-auto">
              <div
                className="w-44 h-44 rounded-md flex border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden ml-5
              "
              >
                <img src="/images/default-blue.png" alt="Profile" />
              </div>
              <div className="mt-4 text-center text-gray-400 text-2xl group-hover:text-white">
                {user?.name[0]?.toUpperCase() + user?.name?.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
