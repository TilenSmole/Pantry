import Fruits from '../FOODS/Fruits.json';
import { useState, useEffect } from 'react';



function Ingredients() {
    const [fruits, setFruits] = useState([Fruits.fruits][0]);

  


    return (
        <div >
            {fruits && fruits.map((fruit, index) => (
                <span key={fruit.id}>{fruit.name} calories: {fruit.calories}
              Vegan:  {fruit.is_vegan ? "yes" : "no"}
              Vegetarian:  {fruit.is_vegetarian ? "yes" : "no"}   
                <br /></span>
            ))}
        </div>
    );
}

export default Ingredients;
