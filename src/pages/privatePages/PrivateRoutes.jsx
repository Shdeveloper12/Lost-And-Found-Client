import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";



const PrivateRoute = ({ children }) => {
    const {user, Loading} = use(AuthContext);
    const location = useLocation();
    

    if(Loading){
        return <span className="loading loading-ring loading-xl text-center "></span>
    }

    if(!user){
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }


    return children;
};

export default PrivateRoute;