
import React from 'react';
import { useState, useEffect } from 'react';
import Axios from "axios"
import { useFormik } from 'formik';
import { ShowIngredients } from '../components/ShowIngredients.js';


function ShoppingList() {
  const [shoppingList, setShoppingList] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [items, setItems] = useState([]);


  const formik = useFormik({
    initialValues: {
      name: '',
      item: "",
      quantity: ""

    },

    onSubmit: async (values) => {
      try {
        const response = await Axios.post(
          `http://localhost:5000/shopping-list/add-a-shopping-list`,
          {
            name: formik.values.name,
            items: items
          },
          { withCredentials: true, }

        );

      } catch (error) {
        console.error('Error uploading a shopping list:', error);
      }
    },




  });

  /*const getUserShoppingList = async () => {
    try {
      const userFetch = await Axios.get('http://localhost:5000/shopping-list/get-users-shopping-list',
        { withCredentials: true, }
      );
      setShoppingList(userFetch.data);

    } catch (error) {
      console.error('Error fetching shopping list', error);
    }
  };
  */
  const showIngredient = (e) => {
    setSuggestions(ShowIngredients(e.target.value))
  }
  const addIngredient = (name, quantity) => {
    setItems([...items, { name: name, quantity: quantity }]);
  /*  formik.setFieldValue('item', '');
    formik.setFieldValue('quantity', '');
    setSuggestions([]);*/
  };




  useEffect(() => {
    // getUserShoppingList();
  }, []);


  return (
    <div >
      {shoppingList && (
        <>

        </>
      )}

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">LIST NAME </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <br />



        <label htmlFor="item">ITEM</label><br />
        <input
          id="item"
          name="item"
          type="text"
          onChange={(e) => {
            formik.handleChange(e); showIngredient(e)
          }}
          value={formik.values.item}
          placeholder='item'
        />
        <input
          id="quantity"
          name="quantity"
          type="text"
          placeholder='quantity'
          onChange={formik.handleChange}
          value={formik.values.quantity}
        />

        <button type="submit">Submit</button>


      </form>

      {suggestions.length > 0 && (

        <ul >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => addIngredient(suggestion,formik.values.quantity)}
            >
              {suggestion}
            </li>

          ))}

        </ul>

      )}

{items.length > 0 && (
  <div>
    {items.map((item, index) => (
      <p key={index}>
        {item.name} - {item.quantity}
      </p>
    ))}
  </div>
)}




    </div>
  );
}

export default ShoppingList;
