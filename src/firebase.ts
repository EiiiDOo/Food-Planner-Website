// Import the functions you need from the SDKs you need
import { MealData, MealResponse, MealWithDayResponse } from "@/meal-links";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "food-planner-48638.firebasestorage.app",
  messagingSenderId: "150721768521",
  appId: "1:150721768521:web:7505fec1326881e7222398",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });
export { auth };

export async function getUserSubcollectionData(
  userId: string,
  subcollectionName: CollectionType
): Promise<MealData[]> {
  try {
    const subcollectionRef = collection(db, "Users", userId, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);

    return querySnapshot.docs.flatMap((doc) => {
      try {
        if (subcollectionName === CollectionType.PLAN) {
          const mealsData: MealWithDayResponse = JSON.parse(doc.data().TEST);
          return mealsData.mealsWithDays || [];
        } else {
          const mealsData: MealResponse = JSON.parse(doc.data().TEST);
          return mealsData.meals || [];
        }
      } catch (error) {
        console.error("Error parsing meal data:", error);
        return [];
      }
    });
  } catch (error) {
    console.error("Error getting documents:", error);
    return [];
  }
}
export async function addMealToSubcollection(
  userId: string,
  subcollectionName: CollectionType,
  newMeal: MealData
): Promise<boolean> {
  try {
    const subcollectionRef = collection(db, "Users", userId, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);

    let mealAdded = false;

    if (!querySnapshot.empty) {
      for (const docSnapshot of querySnapshot.docs) {
        try {
          if (subcollectionName === CollectionType.FAV) {
            const mealsData: MealResponse = JSON.parse(docSnapshot.data().TEST);

            if (
              mealsData.meals.some((meal) => meal.idMeal === newMeal.idMeal)
            ) {
              console.log("Meal already exists in subcollection");
              continue; // Don't exit, check other docs if needed
            }

            const updatedMeals = [...mealsData.meals, newMeal];
            await updateDoc(docSnapshot.ref, {
              TEST: JSON.stringify({ meals: updatedMeals }),
            });

            mealAdded = true;
          } else {
            const mealsData: MealWithDayResponse = JSON.parse(
              docSnapshot.data().TEST
            );

            newMeal.userId = userId;
            const updatedMeals = [...mealsData.mealsWithDays, newMeal];

            await updateDoc(docSnapshot.ref, {
              TEST: JSON.stringify({ mealsWithDays: updatedMeals }),
            });

            mealAdded = true;
          }
        } catch (error) {
          console.error("Error parsing meal data:", error);
        }
      }
    } else {
      // If no docs, create a new one
      const newMealData =
        subcollectionName === CollectionType.FAV
          ? { meals: [newMeal] }
          : { mealsWithDays: [newMeal] };

      await addDoc(subcollectionRef, {
        TEST: JSON.stringify(newMealData),
      });

      mealAdded = true;
    }

    return mealAdded;
  } catch (error) {
    console.error("Error adding meal to subcollection:", error);
    return false;
  }
}

export async function delMealInSubcollection(
  userId: string,
  subcollectionName: CollectionType,
  mealId: string,
  day?: string
): Promise<boolean> {
  try {
    const subcollectionRef = collection(db, "Users", userId, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);

    for (const docSnapshot of querySnapshot.docs) {
      try {
        if (subcollectionName === CollectionType.FAV) {
          const mealsData: MealResponse = JSON.parse(docSnapshot.data().TEST);

          const updatedMeals = mealsData.meals.filter(
            (meal) => meal.idMeal !== mealId
          );

          await updateDoc(docSnapshot.ref, {
            TEST: JSON.stringify({ meals: updatedMeals }),
          });

          console.log("Meal deleted successfully");
          return true;
        } else {
          const mealsData: MealWithDayResponse = JSON.parse(
            docSnapshot.data().TEST
          );
          const updatedMeals = [...mealsData.mealsWithDays];
          const index = updatedMeals.findIndex(
            (meal) => meal.idMeal === mealId && meal.day === day
          );
          if (index !== -1) {
            updatedMeals.splice(index, 1);
          }

          await updateDoc(docSnapshot.ref, {
            TEST: JSON.stringify({ mealsWithDays: updatedMeals }),
          });

          console.log("Meal deleted successfully");
          return true;
        }
      } catch (error) {
        console.error("Error parsing meal data from check:", error);
      }
    }
  } catch (error) {
    console.error("Error checking meal in subcollection:", error);
  }

  console.log("Meal not found in any document");
  return false;
}

export async function isMealInSubcollection(
  userId: string,
  subcollectionName: CollectionType,
  mealId: string
): Promise<boolean> {
  try {
    const subcollectionRef = collection(db, "Users", userId, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);

    return querySnapshot.docs.some((doc) => {
      try {
        const mealsData: MealResponse = JSON.parse(doc.data().TEST);
        // console.log(mealsData.meals);
        return mealsData.meals.some((meal) => meal.idMeal === mealId);
      } catch (error) {
        console.error("Error parsing meal data from check:", error);
        return false;
      }
    });
  } catch (error) {
    console.error("Error checking meal in subcollection:", error);
    return false;
  }
}

export enum CollectionType {
  FAV = "favouriteMeals",
  PLAN = "planMeals",
}
