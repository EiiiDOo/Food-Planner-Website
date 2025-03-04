"use client";

import React from "react";
import { MealData } from "@/meal-links";
import Image from "next/image";
import Link from "next/link";
import { X_ICON } from "@/svg_icons";

export default function UserMealCard({
  meal,
  onDelete,
}: {
  meal: MealData;
  onDelete: () => void;
}) {
  //   const { user } = UserAuth();
  return (
    <Link
      className="main-content w-full md:w-3/4 lg:w-1/2 xl:w-1/4 rounded-xl scale-95 relative mt-2  h-fit hover:scale-90 duration-200"
      href={`/details/${meal.idMeal}`}
    >
      <Image
        className="rounded-xl"
        src={meal.strMealThumb}
        alt={meal.strMeal}
        priority={true}
        width={500}
        height={550}
        style={{ width: "auto", height: "auto" }}
      />
      <h1 className="rounded-xl h-1/4 flex justify-center items-center absolute bottom-0 font-semibold text-4xl line-clamp-2 w-full text-center bg-black/50 p-2 text-slate-100">
        {meal.strMeal}
      </h1>
      <button
        className="absolute btn btn-circle btn-outline right-1 top-1"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
      >
        {X_ICON}
      </button>
    </Link>
  );
}
