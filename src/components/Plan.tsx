"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { CollectionType, getUserSubcollectionData } from "@/firebase";
import { MealData } from "@/meal-links";
import Collapse from "./Collapse";

export default function Plan() {
  const rout = useRouter();
  const { user } = UserAuth();
  const [reload, setReload] = useState(false);
  const [meals, setMeals] = useState<MealData[]>([]);
  const weeklyMeals: MealData[][] = Array.from({ length: 7 }, () => []);
  if (meals) {
    meals.forEach((meal) => {
      if (meal.day) {
        weeklyMeals[parseInt(meal.day) - 1].push(meal);
      }
    });
  }
  useEffect(() => {
    async function getPlan(uid: string, type: CollectionType) {
      const meals = await getUserSubcollectionData(uid, type);
      setMeals(meals);
      console.log("meals", meals);
    }
    if (!user) {
      rout.push("/");
    } else {
      getPlan(user.uid, CollectionType.PLAN);
    }
  }, [user, rout, reload]);
  const daysOfWeek: string[] = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  if (user) {
    return (
      <div className="min-h-screen p-2 pt-16 flex flex-wrap gap-2">
        {daysOfWeek.map((day, indx) => (
          <Collapse
            key={day}
            day={day}
            meals={weeklyMeals[indx]}
            userId={user?.uid}
            reload={setReload}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen p-2 pt-16 flex flex-wrap gap-2">
        Wait . . . .
      </div>
    );
  }
}
