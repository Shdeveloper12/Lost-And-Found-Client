import React, { useContext } from "react";
import img1 from '../assets/lost and found logo.png'
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Sign out succesfully"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <img className="w-14" src={img1} alt="" />
        <a className="text-orange-400 text-xl font-bold">Lost and Found</a>
      </div>

      <div className="navbar-end space-x-2 items-center">
        

        {user ? (
          <>
              <div className="w-10 hidden lg:block md:block rounded-full overflow-hidden border border-gray-300">
                <img
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="user avatar"
                />
              </div>
            
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link className="btn btn-outline btn-success" to="/login">
            Login
          </Link>
        )}

        
      </div>
    </div>
  );
};

export default Navbar;
