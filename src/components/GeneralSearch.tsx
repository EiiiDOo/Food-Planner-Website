"use client";
import { getMealByName, MealData, MealResponse } from "@/meal-links";
import MainMealCard from "./MainMealCard";
import { MealsForSearch } from "../context/MealsForSearchContext";

export default function GeneralSearch() {
  const { meals, setMeals, value, setValue } = MealsForSearch();
  console.log(meals, value);

  return (
    <>
      <div className=" pt-14 w-full flex flex-wrap justify-center items-center">
        <label className=" flex items-center   gap-2 w-1/2 h-10 px-2 mt-2">
          <input
            value={value.length > 0 ? value : ""}
            className=" w-full h-full rounded-xl px-2 m-2 self-center"
            type="search"
            placeholder="Search By Meal Name"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.length) {
                console.log(value);
                search(value, setMeals);
              }
            }}
          />
        </label>
      </div>
      <div className="flex flex-wrap min-h-screen ">
        {meals && meals.length > 0 ? (
          meals.map((el, ind) => {
            return <MainMealCard key={ind} meal={el} fullMeal={false} />;
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
async function search(
  str: string,
  setMeals: (value: React.SetStateAction<MealData[]>) => void
) {
  const data = await fetch(getMealByName(str));
  const response: MealResponse = await data.json();
  setMeals(response.meals);
}
