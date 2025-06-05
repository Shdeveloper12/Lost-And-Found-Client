import React, { useContext } from "react";
import img1 from "../assets/lost and found logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOutUser()
        .then(() => console.log("Sign out successfully"))
        .catch((error) => console.log(error));
    }
  };

  const activeButton = ({ isActive }) =>
    isActive
      ? "text-orange-300 font-bold border-b-2 border-orange-300"
      : "text-black";

  return (
    <div className="navbar bg-base-100 shadow-sm">
      
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
            <li>
              <NavLink to="/" className={activeButton}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/lostandfound" className={activeButton}>
                Lost & Found Items Page
              </NavLink>
            </li>
          </ul>
        </div>
        <img className="w-14" src={img1} alt="Lost and Found logo" />
        <span className="text-orange-400 text-xl font-bold ml-2">
          Lost and Found
        </span>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center space-x-4">
          <li>
            <NavLink to="/" className={activeButton}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/lostandfound" className={activeButton}>
              Lost & Found Items Pages
            </NavLink>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search items..."
              className="input input-bordered input-sm"
            />
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
                <div className="w-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="user avatar"
                  />
                </div>

            
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-sm text-gray-700 bg-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 whitespace-nowrap">
                  {user?.displayName || "User"}
                </div>
              </div>

              
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
              >
                <li>
                  <NavLink to="/addlostandfounditemspage">
                    Add Lost & Found Item Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allrecovered">All Recovered Items Page</NavLink>
                </li>
                <li>
                  <NavLink to="/manageitem">Manage My Items Page</NavLink>
                </li>
              </ul>
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
