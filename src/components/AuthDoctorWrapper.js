import {useEffect, useState} from "react";
import {refreshDoctorToken} from "../services/doctorAuthService";
import {useNavigate} from "react-router-dom";

export const AuthDoctorWrapper = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate()

   useEffect(() => {
       const checkAuthentication = async () => {
           try {
               await refreshDoctorToken();
               setIsAuthenticated(true);
           } catch (error) {
               console.error("Error refreshing token:", error);
               navigate("/doctor/login");
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