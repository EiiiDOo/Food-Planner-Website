import {
  getCategoryLargImage,
  getCountryImage,
  getIngredientsLargImage,
  MealData,
  Type,
} from "@/meal-links";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export function FilterList({ meals, type }: { meals: MealData[]; type: Type }) {
  let data: JSX.Element[];
  let title: string = `Filter By `;
  switch (type) {
    case Type.COUNTRY: {
      title += `${Type.COUNTRY}`;
      data = meals.map((meal) => (
        <Link
          key={meal.strArea}
          href={`/search/by/${Type.COUNTRY}/${meal.strArea}`}
          className="duration-200 hover:scale-90"
        >
          <div className="flex flex-col  justify-center items-center px-3 ">
            <Image
              className="w-28 h-20 mb-2 "
              src={getCountryImage(meal.strArea)}
              alt={meal.strArea}
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
            <h6 className="font-bold w-24 text-center mb-2">{meal.strArea}</h6>
          </div>
        </Link>
      ));
      break;
    }
    case Type.CATEGORY: {
      title += `${Type.CATEGORY}`;
      data = meals.map((meal) => (
        <Link
          key={meal.strArea}
          href={`/search/by/${Type.CATEGORY}/${meal.strCategory}`}
          className="duration-200 hover:scale-90"
        >
          <div className="flex flex-col  justify-center items-center px-3 ">
            <Image
              className="w-28 h-20 mb-2 rounded-full "
              src={getCategoryLargImage(meal.strCategory)}
              alt={meal.strCategory}
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
            <h6 className="font-bold w-24 text-center mb-2">
              {meal.strCategory}
            </h6>
          </div>
        </Link>
      ));
      break;
    }
    case Type.INGREDIENT: {
      title += `${Type.INGREDIENT}`;
      data = meals.map((meal, index) => (
        <Link
          key={index}
          href={`/search/by/${Type.INGREDIENT}/${meal.strIngredient}`}
          className="duration-200 hover:scale-90"
        >
          <div className="flex flex-col  justify-center items-center px-3 ">
            <Image
              className="w-28 h-20  "
              src={getIngredientsLargImage(meal.strIngredient)}
              alt={meal.strIngredient}
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
            <h6 className="font-bold w-24 text-center mb-2 line-clamp-2">
              {meal.strIngredient}
            </h6>
          </div>
        </Link>
      ));
      break;
    }
  }

  return (
    <>
      <h1 className="font-extrabold text-3xl text-start self-center pl-2 mb-4">
        {title}
      </h1>
      <hr className="w-1/6 h-0.5 bg-black mb-4 border-none" />

      <div className="w-4/5   flex  bg-logo-color overflow-x-auto  scrollbar-corner-black scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-logo-color  ">
        {data}
      </div>
    </>
  );
}
