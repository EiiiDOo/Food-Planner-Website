export interface MealData {
  day?: string;
  userId?: string;
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  strIngredient: string;
}
export interface MealResponse {
  meals: MealData[];
}
export interface MealWithDayResponse {
  mealsWithDays: MealData[];
}
export const MEAL_BY_ID =
  "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export const RANDOM_MEAL = "https://www.themealdb.com/api/json/v1/1/random.php";

export const CATEGORIES_LIST =
  "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

export const COUNTRY_LIST =
  "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

export const INGREDIENTS_LIST =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

export const getIngredientsLargImage = (ingredientName: string) =>
  `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
export const getCategoryLargImage = (category: string) =>
  `https://www.themealdb.com/images/category/${category}.png`;

export const getIngredientsSmallImage = (ingredientName: string) =>
  `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;

export function getCountryImage(country: string): string {
  switch (country.toLowerCase()) {
    case "American".toLowerCase():
      return "/america.png";
    case "British".toLowerCase():
      return "/british.png";
    case "Chinese".toLowerCase():
      return "/china.png";
    case "Croatian".toLowerCase():
      return "/croatian.png";
    case "Dutch".toLowerCase():
      return "/dutch.png";
    case "Egyptian".toLowerCase():
      return "/egypt.png";
    case "French".toLowerCase():
      return "/french.png";
    case "Greek".toLowerCase():
      return "/greek.png";
    case "Irish".toLowerCase():
      return "/ireland.png";
    case "Italian".toLowerCase():
      return "/italian.png";
    case "Japanese".toLowerCase():
      return "/japan.png";
    case "Jamaican".toLowerCase():
      return "/jamaican.png";
    case "Malaysian".toLowerCase():
      return "/malaysian.png";
    case "Kenyan".toLowerCase():
      return "/kenya.png";
    case "Mexican".toLowerCase():
      return "/mexico.png";
    case "Moroccan".toLowerCase():
      return "/moroco.png";
    case "Polish".toLowerCase():
      return "/poland.png";
    case "Portuguese".toLowerCase():
      return "/portug.png";
    case "Russian".toLowerCase():
      return "/russian.png";
    case "Spanish".toLowerCase():
      return "/spani.png";
    case "Thai".toLowerCase():
      return "/thia.png";
    case "Tunisian".toLowerCase():
      return "/tunisian.png";
    case "Turkish".toLowerCase():
      return "/turcia.png";
    case "Vietnamese".toLowerCase():
      return "/vietname.png";
    case "Canadian".toLowerCase():
      return "/canada.png";

    default:
      return "/unknown.png";
  }
}
export function getMealsByCountry(countryName: string): string {
  return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`;
}
export function getMealsByCategory(categoryName: string): string {
  return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
}
export function getMealsByIngredients(ingredientName: string): string {
  return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
}
export enum Type {
  COUNTRY = "country",
  CATEGORY = "category",
  INGREDIENT = "ingredient",
}

export function getMeasureAttributes(meal: MealData): string[] {
  const pairs: string[] = [];

  for (let i = 1; i <= 20; i++) {
    // Dynamically create the property names
    const measureKey = `strMeasure${i}` as keyof MealData;

    // Retrieve the values from the meal object
    const measure = meal[measureKey];

    // Check that the ingredient exists and is not an empty string or null
    if (measure && measure.trim() !== "") {
      pairs.push(measure.trim());
    }
  }

  return pairs;
}

export function getIngredientAttributes(meal: MealData): string[] {
  const pairs: string[] = [];

  for (let i = 1; i <= 20; i++) {
    // Dynamically create the property names
    const ingredientKey = `strIngredient${i}` as keyof MealData;

    // Retrieve the values from the meal object
    const ingredient = meal[ingredientKey];

    // Check that the ingredient exists and is not an empty string or null
    if (ingredient && ingredient.trim() !== "") {
      pairs.push(ingredient.trim());
    }
  }
  return pairs;
}

export function getMealByName(str: string): string {
  return `https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`;
}
