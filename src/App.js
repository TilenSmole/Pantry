import './App.css';
import Header from './components/header/Header';
import Pantry from './Pages/Pantry'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ShoppingList from './Pages/ShoppingList'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ShoppingList" element={<ShoppingList />} />

      </Routes>
    </Router>
  );
}

export default App;
