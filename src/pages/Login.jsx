import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import loginanimation from "../assets/lotties/animation2.json";

import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../contexts/AuthProvider";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const setJwtToken = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken();
    await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ firebaseToken: token }),
    });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (password.length < 6) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Password too short",
        text: "Password must be at least 6 characters long.",
      });
    }

    signInUser(email, password)
      .then(async(result) => {
         await setJwtToken(result.user);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/user-not-found") {
          Swal.fire({
            icon: "error",
            title: "Email not found",
            text: "No account exists with this email.",
          });
        } else if (error.code === "auth/wrong-password") {
          Swal.fire({
            icon: "error",
            title: "Incorrect Password",
            text: "Please enter the correct password.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.message,
          });
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async(result) => {
         await setJwtToken(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title className="primary">Login | Lost & Found</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Lottie
            style={{ width: "400px" }}
            animationData={loginanimation}
            loop={true}
          ></Lottie>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-center mt-5 font-bold text-2xl primary">Login Now</h1>
              <form onSubmit={handleLogin} className="fieldset">
                <label className="label secondary">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />

                <label className="label mt-3 secondary">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full pr-10"
                    placeholder="Password"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={togglePassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="secondary">
                    If you have no account?{" "}
                    <Link to="/register" className="text-blue-600">
                      Register Now
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-neutral mt-4 w-full primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <button
                onClick={handleGoogleSignIn}
                className="btn mt-4 bg-white text-black border-[#e5e5e5] w-full"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff" />
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    />
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    />
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    />
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    />
                  </g>
                </svg>
                <span className="ml-2 secondary">Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
