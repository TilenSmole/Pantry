import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from 'react';

function Header(login) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkIsAuthenticated = localStorage.getItem('sessionToken');
    console.log("checkIsAuthenticated:", checkIsAuthenticated);
    setIsAuthenticated(!!checkIsAuthenticated); 
  }, [login]); 

  return (
    <div >

      <a href="../App">HOME</a>
      <a href="../Pantry">PANTRY</a>
      <a href="../ShoppingList">      SHOPPING LIST</a>
      <a href="../Recepies">      RECEPIES</a>
      <a href="../Ingredients">      INGERDIENTS</a>

      {isAuthenticated ? (
        <>
          <a href="../Profile">        <CgProfile /></a>

        </>
      ) : (
        <>
          <a href="../Login">       LOGIN</a>
          <a href="../Register">      REGISTER</a>
        </>
      )}

    </div>

  );
}


export default Header;