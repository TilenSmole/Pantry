import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'

function Header(login) {
  const [cookies] = useCookies(['sessionToken']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(cookies.sessionToken ? true : false); 


  }, [login]); 

  return (
    <div >

      <a href="../App">HOME</a>
      <a href="../Pantry">PANTRY</a>
      <a href="../ShoppingList">      SHOPPING LIST</a>
      <a href="../Recipes">      RECEPIES</a>
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