import React, { useContext } from "react";
import img1 from "../assets/lost and found logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      logout()
        .then(() => console.log("Sign out successfully"))

        .catch((error) => console.log(error));
    }
  };

  const activeButton = ({ isActive }) =>
    isActive
      ? "text-orange-300 font-bold border-b-2 border-orange-300"
      : "text-black";

  return (
    <div className="navbar bg-base-100 shadow-sm px-0 lg:px-5 md:px-5 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li className="">
              <NavLink to="/" className={activeButton}>
               <span className="text-orange-300 primary">Home</span> 
              </NavLink>
            </li>
            <li className="primary">
              <NavLink to="/lostandfound" className={activeButton}>
               <span className="text-orange-300">Lost & Found Items Page</span> 
              </NavLink>
            </li>
          </ul>
        </div>
        <Link className="flex items-center" to="/">
          <img className="w-14 hidden lg:block" src={img1} alt="Lost and Found logo" />
          <span className="text-orange-400 text-xl font-bold ml-2 primary">
            Lost and Found
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center space-x-4">
          <li className="">
            <NavLink to="/" className={activeButton}>
              <span className="text-orange-300 primary ">Home</span>
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/lostandfound" className={activeButton}>
              <span className="text-orange-300 primary">Lost & Found Items Pages</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-2 items-center">
        {user ? (
          <>
            <div className="dropdown dropdown-end relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar group"
              >
                <div className="w-10  rounded-full overflow-hidden border border-gray-300">
                  <img src={user?.photoURL} alt="user avatar" />
                </div>

                <span className="absolute top-12 left-1/2 -translate-x-1/2 text-sm text-gray-700 bg-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
                  {user?.displayName || "User"}
                </span>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
              >
                <li className="primary">
                  <NavLink to="/addlostandfounditemspage">
                   <span>Add Lost & Found Item Page</span> 
                  </NavLink>
                </li>
                <li className="primary">
                  <NavLink to="/allrecovered">All Recovered Items Page</NavLink>
                </li>
                <li className="primary">
                  <NavLink to="/manageitem">Manage My Items Page</NavLink>
                </li>
              </ul>
            </div>

            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error primary"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link className="btn btn-outline btn-success  primary" to="/login">
            Login
          </Link>
        )}
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            value="dark"
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
