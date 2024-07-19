import './App.css';
import Header from './components/header/Header';
import Pantry from './Pages/Pantry'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ShoppingList from './Pages/ShoppingList'
import SessionChecker from './components/SessionChecker'
import Recepies from './Pages/Recepies'
import Ingredients from './Pages/Ingredients'

import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <Header login={login}/>
      <Routes>
      <Route path="/recepies" element={<Recepies />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login  setLogin={setLogin} /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="/ingredients" element={<Ingredients />} />

      </Routes>
    </Router>
  );
}

export default App;
