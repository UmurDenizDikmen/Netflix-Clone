"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

export default function Movies() {
  const router = useRouter();
  const { movieId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/movieId", movieId);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [movieId, router]);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => {
            router.push("/");
          }}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        src={data?.videoUrl}
        className="h-full w-full"
      ></video>
    </div>
  );
}
