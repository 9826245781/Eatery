import { useEffect, useState } from 'react';
import MealItems from './mealItems/MealItems'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()
 
    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch('https://eatery-50969-default-rtdb.firebaseio.com/meals.json');
        if (!response.ok)
        {
         throw new Error('something is problem')
  }
        const responseData = await response.json();
        const loadedMeals = [{
          id: 'p1',
          name: 'paneer paratha',
          description: 'lajeez',
          price:350
        }];
  
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
  
        setMeals(loadedMeals);
        setIsLoading(false)

      };
      fetchMeals().catch(err => {
    setIsLoading(false)

        setHttpError(err.message)
        
        });
       
    }, []);
  

  if (isLoading) {
    return <section className={classes.MealisLoading}>
    <p>Loading rukjao....</p>
    </section>
  }
  if (httpError) {
    return <section className={classes.MealsError}>
 {httpError }
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;