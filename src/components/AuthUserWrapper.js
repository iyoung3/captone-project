import {useEffect, useState} from "react";
import {refreshUserToken} from "../services/userAuthService";
import {useNavigate} from "react-router-dom";

export const AuthUserWrapper = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate()

   useEffect(() => {
       const checkAuthentication = async () => {
           try {
               await refreshUserToken();
               setIsAuthenticated(true);
           } catch (error) {
               console.error("Error refreshing token:", error);
               navigate("/user/login");
               setIsAuthenticated(false);
           }
       };

       const refreshToken = async () => {
           await checkAuthentication();
           setTimeout(refreshToken, 1000 * 60 * 4); // Schedule the next refresh
       };

       refreshToken(); // Start the first refresh
   }, []);

    return isAuthenticated ? children : null;
}