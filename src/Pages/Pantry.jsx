import HardcodedRecepies from '../RECIPES/recipes.json';
import { useState, useEffect } from 'react';
import Axios from "axios"


function Pantry() {
  const [hardcodedRecepies, setHardcodedRecepies] = useState([]);

  useEffect(() => {
    setHardcodedRecepies(HardcodedRecepies["Recipies"])

  }, []);



  const upload = async () => {
    try {
      for (const recipe of hardcodedRecepies) {
        console.log(recipe);
  
        await Axios.post(
          `http://localhost:5000/recipes/add-recipe`,
          {
          title: recipe.name,
          ingredients: recipe.ingredients,
          amounts: recipe.amounts,
          instructions: recipe.instructions,
          prep_time: recipe.prep_time,
          cook_time: recipe.c
          },
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Error uploading recipes:", error);
    }
  };

  return (
    <div >


      <button onClick={upload}>
        UPLOAD RECIPIES


      </button>


    </div>
  );
}

export default Pantry;
