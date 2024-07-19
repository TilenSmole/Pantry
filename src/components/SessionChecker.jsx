
import { Navigate } from 'react-router-dom';

const SessionChecker = ({ children }) => {

    var isAuthenticated = localStorage.getItem('sessionToken');


    return isAuthenticated ? <Navigate to="/profile" /> : children;
  }



  export default SessionChecker;
  