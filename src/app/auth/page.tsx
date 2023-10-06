"use client";
import Input from "@/components/Input";
import { ChangeEvent, useState, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [variant, setVariant] = useState("Login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
  }, []);
  const { email, name, password } = user;

  const login = useCallback(async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });

      console.log("Login Success");
    } catch (error: any) {
      if (error.message === "Email and password are required") {
        alert("Email and password are required");
      } else {
        alert("Email or password is wrong");
      }
      router.push("/auth");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const response = await axios.post("api/register", user);
      console.log("Register success", response.data);
      await login();
    } catch (error: any) {
      if (error.message === "Email and password are required") {
        alert("Email and password are required");
      }
      router.push("/auth");
    }
  }, [email, password, user, login, router]);

  return (
    <div className="relative h-screen w-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "Login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "Register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </div>
            <button
              onClick={variant === "Login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "Login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/profile",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "Login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "Login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
