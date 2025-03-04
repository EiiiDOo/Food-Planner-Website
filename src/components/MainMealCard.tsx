import { getCategoryLargImage, getCountryImage, MealData } from "@/meal-links";
import Image from "next/image";
import Link from "next/link";

export default function MainMealCard({
  meal,
  fullMeal,
}: {
  meal: MealData;
  fullMeal: boolean;
}) {
  return (
    <Link
      href={`/details/${meal.idMeal}`}
      className="mt-14 w-full md:w-3/4 lg:w-1/2 xl:w-1/4 self-center hover:scale-95 duration-200 "
    >
      <div className="main-content rounded-xl m-2  flex flex-col items-center gap-3 hover:cursor-pointer">
        <Image
          className="rounded-xl"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          priority={true}
          width={500}
          height={550}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="inner-content h-full text-xl text-black font-bold flex flex-col gap-3 justify-between items-center ">
          <h1 className=" font-semibold text-4xl line-clamp-2 w-full text-center">
            {meal.strMeal}
          </h1>
          {fullMeal && (
            <>
              <h2 className=" text-2xl">
                {meal.strCategory}
                <Image
                  className="inline ml-3"
                  src={getCategoryLargImage(meal.strCategory)}
                  alt={meal.strCategory}
                  width={50}
                  height={50}
                />
              </h2>
              <h2 className="">
                {meal.strArea}
                <Image
                  className="inline ml-3"
                  src={getCountryImage(meal.strArea)}
                  alt={meal.strArea}
                  width={50}
                  height={50}
                />
              </h2>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
