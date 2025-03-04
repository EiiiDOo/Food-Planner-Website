"use client";
import { MealData } from "@/meal-links";
import { createContext, SetStateAction, useContext, useState } from "react";

export interface MealsForSearchContextType {
  meals: MealData[];
  setMeals: React.Dispatch<React.SetStateAction<MealData[]>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const MealsForSearchContext = createContext<MealsForSearchContextType>({
  meals: [],
  setMeals: function (value: SetStateAction<MealData[]>): void {
    throw new Error(`Function setMeals not implemented. ${value}`);
  },
  value: "",
  setValue: function (value: SetStateAction<string>): void {
    throw new Error(`Function setValue not implemented.${value}`);
  },
});

export const MealsForSearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [value, setValue] = useState<string>("");
  return (
    <MealsForSearchContext.Provider
      value={{ meals, setMeals, value, setValue }}
    >
      {children}
    </MealsForSearchContext.Provider>
  );
};

export const MealsForSearch = () => useContext(MealsForSearchContext);
