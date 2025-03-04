"use client";
import { EMAIL_ICON, PASSWORD_ICON, USER_ICON } from "@/svg_icons";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const { user, googleSignIn } = UserAuth();
  const rout = useRouter();
  useEffect(() => {
    if (user) {
      rout.push("/");
    }
  }, [rout, user]);
  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleSignIn = async () => {
    try {
      googleSignIn();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full h-svh flex items-center justify-center bg-[url('/back_new.jpg')] bg-cover pt-14">
      <div className=" justify-center flex flex-wrap gap-5 p-10  bg-white md:w-3/5 lg:w-1/2 xl:w-[40%] 2xl:w-1/4 w-4/5  rounded-2xl shadow-2xl">
        <h1 className="w-full text-center  text-4xl font-bold font-sans">
          Food Planner
        </h1>
        <h1 className="w-full text-center  text-lg ">Sign Up</h1>
        <form
          onSubmit={(e) => handelSubmit(e)}
          className="  w-full flex  flex-col gap-10 items-center  "
        >
          <div className="fileds w-full flex  flex-col items-center gap-5">
            <label className="input input-bordered flex items-center gap-2 w-4/5">
              {EMAIL_ICON}
              <input
                type="email"
                className="grow"
                placeholder="Email"
                required
                autoComplete="on"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-4/5">
              {USER_ICON}
              <input
                type="text"
                className="grow"
                placeholder="Username"
                required
                maxLength={20}
                minLength={3}
                autoComplete="on"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-4/5">
              {PASSWORD_ICON}
              <input
                type="password"
                className="grow"
                placeholder="Password"
                maxLength={10}
                minLength={6}
                required
                autoComplete="on"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-4/5">
              {PASSWORD_ICON}
              <input
                type="password"
                className="grow"
                placeholder="Confirm password"
                maxLength={10}
                minLength={6}
                required
                autoComplete="on"
              />
            </label>
          </div>
          <button className="btn btn-outline w-5/6" disabled>
            Sign Up
          </button>
        </form>
        <button
          className="btn btn-outline flex items-center gap-2 w-5/6"
          onClick={handleSignIn}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
        <Link href={"/login"} className="link w-full text-center mt-5 mx-2 ">
          Sign In
        </Link>
      </div>
    </div>
  );
}
