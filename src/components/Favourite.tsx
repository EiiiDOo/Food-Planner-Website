"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { MealData } from "@/meal-links";
import {
  CollectionType,
  delMealInSubcollection,
  getUserSubcollectionData,
} from "../firebase";
import UserMealCard from "./UserMealCard";

export default function Favourite() {
  const { user } = UserAuth();
  const [reCatchFav, setReCatchFav] = useState(false);
  const rout = useRouter();
  const [meals, setMeals] = useState<MealData[]>([]);
  useEffect(() => {
    async function getFav(uid: string, type: CollectionType) {
      const meals = await getUserSubcollectionData(uid, type);
      setMeals(meals);
    }
    if (!user) {
      rout.push("/");
    } else {
      getFav(user.uid, CollectionType.FAV);
    }
  }, [rout, user, reCatchFav]);
  return (
    <>
      <h1 className="w-full pt-20 h-fit text-center font-extrabold text-3xl">
        Favourite Meals
      </h1>
      <div className=" min-h-screen flex flex-wrap  p-3 w-full">
        {meals && meals.length > 0 && user ? (
          meals.map((el, ind) => {
            return (
              <UserMealCard
                key={ind}
                meal={el}
                onDelete={async () => {
                  await delMealInSubcollection(
                    user.uid,
                    CollectionType.FAV,
                    el.idMeal
                  );
                  setReCatchFav(!reCatchFav);
                }}
              />
            );
          })
        ) : (
          <h1 className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            No Meals To Show
          </h1>
        )}
      </div>
    </>
  );
}
