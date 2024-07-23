
import { Toaster } from "react-hot-toast"
import { useFormik } from 'formik';
import Axios from "axios"
import { useState, useEffect } from 'react';
import HardcodedRecepies from '../RECIPES/recipes.json';
import Fruits from '../FOODS/Fruits.json';
import { ShowIngredients } from '../components/ShowIngredients.js';


function Recipes() {
    const [allRecepies, setAllRecepies] = useState([]);
    const [hardcodedRecepies, setHardcodedRecepies] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [ingredients, setIngredients] = useState([]);




    
    const formik = useFormik({
        initialValues: {
            title: '',
            ingredient: '',
            instructions: "",
            imageUrl: "",
            prep_time: "",
            cook_time: "",
            total_time: "",
            quantatiy: ""
        },

        onSubmit: async (values) => {
            try {
                const response = await Axios.post(
                    `http://localhost:5000/recipes/add-recipe`,
                    {
                        title: formik.values.title, ingredients: ingredients,
                        instructions: formik.values.instructions, imageUrl: formik.values.imageUrl,
                        prep_time: formik.values.prep_time, prep_time: formik.values.prep_time,
                        cook_time: formik.values.cook_time
                    },
                    {withCredentials: true,}

                );

            } catch (error) {
                console.error('Error uploading the recipie:', error);
            }
        },




    });

    


    const getRecipes = async () => {
        try {


            const recepisFetch = await Axios.get('http://localhost:5000/recipes');
            setAllRecepies(recepisFetch.data);



        } catch (error) {
            console.error('Error logging in or fetching recipes:', error);
        }
    };

    const addIngredient = (newOne, quantity) => {
        setIngredients([...ingredients, [quantity, newOne]]);
    };



    useEffect(() => {
        getRecipes();
        setHardcodedRecepies(HardcodedRecepies)
        const fruitNames = Fruits.fruits.map(fruit => fruit.name);
        setFruits(fruitNames);

    }, []);

    const showIngredient = (e) => {
        setSuggestions(ShowIngredients(e.target.value))
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="title">TITLE </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <br />
                <label htmlFor="prep_time">PREP TIME </label>
                <input
                    id="prep_time"
                    name="prep_time"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.prep_time}
                />      <br />
                <label htmlFor="cook_time">cook_time</label>
                <input
                    id="cook_time"
                    name="cook_time"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.cook_time}
                />      <br />
                <p>upload a photo</p>

                <label htmlFor="ingredient">INGREDIENTS</label> <br />
                <input
                    id="quantatiy"
                    name="quantatiy"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.quantatiy}
                    placeholder="quantity"
                />


                <input
                    id="ingredient"
                    name="ingredient"
                    type="text"
                    onChange={(e) => {
                        formik.handleChange(e); showIngredient(e)
                    }}
                    value={formik.values.ingredient}
                    placeholder="ingredient"
                />      <br />




                <label htmlFor="instructions">INSTRUCTIONS</label>
                <textarea
                    id="instructions"
                    name="instructions"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.instructions}
                />      <br />

                <button type="submit">Submit</button>


            </form>

            {suggestions.length > 0 && (

                <ul >

                    {suggestions.map((suggestion, index) => (

                        <li

                            key={index}

                            onClick={() => addIngredient(suggestion, formik.values.quantatiy)}


                        >

                            {suggestion}

                        </li>

                    ))}

                </ul>

            )}

            {ingredients.length > 0 && (
                <div>
                    {ingredients.map((ingredient, index) => (
                        <p key={index}>{ingredient}</p>
                    ))}
                </div>
            )}




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

            {hardcodedRecepies.map((recipe, index) => (
                <>
                    <div id={index}></div>
                    <h1 key={index}>{recipe.name}</h1>
                    {recipe.ingredients.map((ingredient, index2) => (
                        <>
                            <p key={index2}>{ingredient.ingredient} : {ingredient.amount} </p>
                        </>
                    ))}
                    <p>{recipe.instructions}</p>
                </>
            ))}


        </>
    );
}

export default Recipes;
