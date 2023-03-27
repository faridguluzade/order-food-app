import { useState, useEffect } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchedMeals = async () => {
      try {
        const response = await fetch(
          "https://food-db-586bb-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) throw new Error("Something went wrong!");

        const data = await response.json();

        const loadedMeals = Object.keys(data).map((key) => {
          return {
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          };
        });

        console.log(loadedMeals);

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };

    fetchedMeals();
  }, []);

  return (
    <>
      {isLoading && (
        <section className={classes.mealIsLoading}>
          <p>Loading...</p>
        </section>
      )}
      {httpError && (
        <section className={classes.mealsError}>
          <p>{httpError}</p>
        </section>
      )}

      {!isLoading && !httpError && (
        <section className={classes.meals}>
          <Card>
            <ul>
              {meals.map((meal) => (
                <MealItem key={meal.id} {...meal} />
              ))}
            </ul>
          </Card>
        </section>
      )}
    </>
  );
};

export default AvailableMeals;
