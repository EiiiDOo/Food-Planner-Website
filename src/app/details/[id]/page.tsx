// import Link from "next/link";

"use client";

import GeneralDetails from "@/components/GeneralDetails";
import { useParams } from "next/navigation";
import { UserAuth } from "@/context/AuthContext";
import UserMealDetails from "@/components/UserMealDetails";

export default function Details() {
  const { id }: { id: string } = useParams();
  const { user } = UserAuth();
  return (
    <div className="details">
      {user ? <UserMealDetails id={id} /> : <GeneralDetails id={id} />}
    </div>
  );
}
