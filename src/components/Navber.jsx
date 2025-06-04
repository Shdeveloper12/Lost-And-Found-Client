import React, { useContext } from "react";
import { AuthContex } from "../contexts/AuthContex";
import { Link, NavLink } from "react-router";

const Navber = () => {
  const { user, signOutUser } = useContext(AuthContex);

  const handleSignOut =() => {
    signOutUser()
    .then(()=> console.log("Sign out succesfully"))
    .catch(error => console.log(error));
  }

  
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
       
        <a className="btn btn-ghost text-xl">Lost and Found</a>
      </div>
      
    <div>
         {user? (
        <>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>Add Lost & Found Item Page</li>
              <li>
                <a>All Recovered Items Page</a>
              </li>
              <li>Manage My Items Page</li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        </>
         ):(
             <Link className="btn btn-outline btn-primary primary" to="/login">Login</Link>
         
      )}

    </div>
     
    </div>
  );
};

export default Navber;
