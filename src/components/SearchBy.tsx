import {
  getMealsByCategory,
  getMealsByCountry,
  getMealsByIngredients,
  MealData,
  MealResponse,
  Type,
} from "@/meal-links";
import MainMealCard from "./MainMealCard";

export default async function SearchBy({
  type,
  value,
}: {
  type: string;
  value: string;
}) {
  let list: MealData[] = [];
  if (getLink(type, value).length !== 0) {
    const data = await fetch(getLink(type, value));
    const listo: MealResponse = await data.json();
    list = listo.meals;
    console.log("listo", list);
  }

  return (
    <div className=" flex flex-wrap min-h-screen">
      {list.length ? (
        list.map((el: MealData) => (
          <MainMealCard key={el.idMeal} meal={el} fullMeal={false} />
        ))
      ) : (
        <h1>Erro Ocurr</h1>
      )}
    </div>
  );
}

function getLink(type: string, value: string): string {
  if (type === Type.CATEGORY) {
    return getMealsByCategory(value);
  } else if (type === Type.COUNTRY) {
    return getMealsByCountry(value);
  } else if (type === Type.INGREDIENT) {
    return getMealsByIngredients(value);
  } else return "";
}
