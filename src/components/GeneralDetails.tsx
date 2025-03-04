"use client";
import {
  getCountryImage,
  getIngredientAttributes,
  getIngredientsLargImage,
  getMeasureAttributes,
  MEAL_BY_ID,
  MealData,
  MealResponse,
} from "@/meal-links";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GeneralDetails({ id }: { id: string }) {
  const [meal, setMeal] = useState<MealData | null>(null);
  useEffect(() => {
    async function getMeal() {
      const data = await fetch(MEAL_BY_ID + id);
      const mealResponse: MealResponse = await data.json();
      setMeal(mealResponse.meals[0]);
    }
    getMeal();
  }, []);

  if (meal) {
    const ingredients = getIngredientAttributes(meal);
    const measures = getMeasureAttributes(meal);
    return (
      <div className="p-3 pt-16 flex  w-full items-center justify-center flex-wrap">
        <Image
          className="rounded-lg"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={500}
          height={550}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="main-data w-full h-3/4 flex flex-col items-center justify-between gap-4">
          <h1 className="mt-3 font-semibold text-4xl line-clamp-2 w-full text-center h-fit">
            {meal.strMeal}
          </h1>
          <h2 className=" text-2xl text-center">{meal.strCategory}</h2>
          <h2 className="">
            {meal.strArea}
            <Image
              className="inline ml-3"
              src={getCountryImage(meal.strArea)}
              alt={meal.strArea}
              width={50}
              height={50}
              style={{ width: "auto", height: "auto" }}
            />
          </h2>
        </div>
        <div className="additional-data w-full flex flex-wrap justify-center">
          <div className=" ingredients w-full flex flex-col items-center  ">
            <h3 className="font-extrabold text-3xl mb-2 mt-5 w-full">
              Ingredients:
            </h3>
            <div className="list  mx-2 w-4/5 flex      bg-logo-color overflow-scroll  scrollbar-corner-black scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-logo-color">
              {ingredients.map((el, ind) => {
                return (
                  <div
                    key={el + measures[ind]}
                    className=" flex flex-col   items-center px-3 "
                  >
                    <Image
                      className="w-28 h-20  "
                      src={getIngredientsLargImage(el)}
                      alt={el}
                      width={100}
                      height={100}
                      style={{ width: "auto", height: "auto" }}
                    />
                    <h6 className="font-bold w-24 text-center mb-2 line-clamp-2">
                      {el}
                    </h6>
                    <h6 className="font-bold w-24 text-center mb-2 line-clamp-2">
                      {measures[ind]}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="instruction">
            <h3 className="font-extrabold text-3xl mb-2">Instructions:</h3>
            <p className="">{meal.strInstructions}</p>
          </div>
          {meal.strYoutube.length ? (
            <div className="  w-full my-5 flex flex-col items-center ">
              <h1 className="font-extrabold text-3xl mb-2 w-full">
                YouTube video:
              </h1>
              <iframe
                className="rounded-2xl w-1/2 aspect-video"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                  meal.strYoutube.indexOf("=") + 1
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <h1 className=" absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-3xl">
          Loading . . .
        </h1>
        {/* <span className="loading  loading-bars absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 "></span> */}
      </div>
    );
  }
}
