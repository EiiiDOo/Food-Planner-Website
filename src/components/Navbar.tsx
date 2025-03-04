"use client";
import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CollectionType, getUserSubcollectionData } from "../firebase";
export function NavBar() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      logOut();
    } catch (err) {
      console.error(err);
    }
  };
  const router = usePathname();
  useEffect(() => {
    if (user) {
      console.log(user);
      getUserSubcollectionData(user.uid, CollectionType.FAV);
    }
  }, [user]);
  return (
    <nav className="fixed bg-black w-screen h-14 flex p-2 justify-between items-center order-first z-50">
      <Link href={"/"}>
        <div className="logo hover:cursor-pointer flex text-white justify-center items-center font-bold text-2xl">
          <Image
            className="rounded-full me-2"
            src="/logo.png"
            alt="Food Planner"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
          <span>F</span>
          <span className="char-apply-color">O</span>
          <span>O</span>
          <span className="char-apply-color">D</span>
          <pre> </pre>
          <span>P</span>
          <span className="char-apply-color">L</span>
          <span>A</span>
          <span className="char-apply-color">NN</span>
          <span>E</span>
          <span className="char-apply-color">R</span>
        </div>
      </Link>

      <div className="text-black font-semibold text-sm">
        <Link
          className="mr-2 border-2 border-logo-color p-1 bg-logo-color rounded-lg hover:bg-white hover:cursor-pointer"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="mr-2 border-2 border-logo-color p-1 bg-logo-color rounded-lg hover:bg-white hover:cursor-pointer"
          href={"/search"}
        >
          Search
        </Link>
        {user ? (
          <>
            <Link
              className="mr-2 border-2 border-logo-color p-1 bg-logo-color rounded-lg hover:bg-white hover:cursor-pointer"
              href={"/fav"}
            >
              Favourite
            </Link>
            <Link
              className="mr-2 border-2 border-logo-color p-1 bg-logo-color rounded-lg hover:bg-white hover:cursor-pointer"
              href={"/plan"}
            >
              Plan
            </Link>
            <button
              onClick={handleSignOut}
              className="  mr-2   p-1 bg-red-600 rounded-lg hover:bg-red-800 hover:cursor-pointer text"
            >
              LogOut
            </button>
          </>
        ) : router !== "/login" ? (
          <Link
            className="mr-2 border-2 border-logo-color p-1 bg-logo-color rounded-lg hover:bg-white hover:cursor-pointer"
            href={"/login"}
          >
            Login
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
