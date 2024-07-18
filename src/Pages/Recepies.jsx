
import { Toaster } from "react-hot-toast"
import { useFormik } from 'formik';
import Axios from "axios"
import { useState, useEffect } from 'react';

function Recepies() {
    const [allRecepies, setAllRecepies] = useState([]);

    const getRecipes = async () => {
        try {


            const recepisFetch = await Axios.get('http://localhost:5000/recipes');
            setAllRecepies(recepisFetch.data);



        } catch (error) {
            console.error('Error logging in or fetching recipes:', error);
        }
    };


    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <>
            {allRecepies && allRecepies.map((recipe, index) => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <p>
                        {recipe.ingredients.map((ingredient, index) => (
                             
                            <span key={index}>{ingredient}<br /></span>
                        ))}
                    </p>
                    <p>{recipe.instructions}</p>

                </div>
            ))}




        </>
    );
}

export default Recepies;
