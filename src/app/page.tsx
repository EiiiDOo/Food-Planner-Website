import {
  CATEGORIES_LIST,
  COUNTRY_LIST,
  INGREDIENTS_LIST,
  MealData,
  MealResponse,
  RANDOM_MEAL,
  Type,
} from "@/meal-links";
import MainMealCard from "../components/MainMealCard";
import { FilterList } from "../components/FilterList";
export default async function Home() {
  const data = await fetch(RANDOM_MEAL);
  const mealResponse: MealResponse = await data.json();
  const meal: MealData = mealResponse.meals[0];

  const countryData = await fetch(COUNTRY_LIST);
  const countryDataResponse: MealResponse = await countryData.json();

  const categoryList = await fetch(CATEGORIES_LIST);
  const categoryListResponse: MealResponse = await categoryList.json();

  const ingredientsList = await fetch(INGREDIENTS_LIST);
  const ingredientsListResponse: MealResponse = await ingredientsList.json();

  return (
    <div className=" test flex items-center flex-col ">
      <MainMealCard meal={meal} fullMeal={true} />
      <hr className="w-4/5 h-0.5 bg-black mb-4 border-none" />
      <FilterList meals={countryDataResponse.meals} type={Type.COUNTRY} />
      <hr className="w-4/5 h-0.5 bg-black my-4 border-none" />

      <FilterList meals={categoryListResponse.meals} type={Type.CATEGORY} />
      <hr className="w-4/5 h-0.5 bg-black my-4 border-none" />

      <FilterList
        meals={ingredientsListResponse.meals}
        type={Type.INGREDIENT}
      />
    </div>
  );
}
