import React, { useContext } from "react";

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
        <a className="btn btn-ghost text-xl">Lost and Found</a>
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
              className="btn btn-outline btn-primary primary"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link className="btn btn-outline btn-primary primary" to="/login">
            Login
          </Link>
        )}

        
      </div>
    </div>
  );
};

export default Navbar;
