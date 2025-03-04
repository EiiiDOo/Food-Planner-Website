import { MealData } from "@/meal-links";
import React from "react";
import UserMealCard from "./UserMealCard";
import { CollectionType, delMealInSubcollection } from "@/firebase";

export default function Collapse({
  day,
  meals,
  userId,
  reload,
}: {
  day: string;
  meals: MealData[];
  userId: string;
  reload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let reloadFlag = false;
  return (
    <div className="collapse collapse-arrow bg-base-200/50">
      <input type="checkbox" name="my-accordion-2" />
      <div className="collapse-title text-3xl font-bold text-center">{day}</div>
      <div className="collapse-content flex flex-wrap">
        {meals && meals.length > 0 ? (
          meals.map((meal) => (
            <UserMealCard
              key={meal.idMeal}
              meal={meal}
              onDelete={async () => {
                await delMealInSubcollection(
                  userId,
                  CollectionType.PLAN,
                  meal.idMeal,
                  meal.day
                );
                reloadFlag = !reloadFlag;
                reload(reloadFlag);
              }}
            />
          ))
        ) : (
          <p className="text-center">No Meals For This Day</p>
        )}
      </div>
    </div>
  );
}
