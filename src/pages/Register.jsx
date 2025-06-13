import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import registerlottie from "../assets/lotties/animation1.json";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../contexts/AuthProvider";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one UPPERCASE letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      toast.error(
        "Password must contain at least one special character (!@#$...)"
      );
      return;
    }

    setLoading(true);

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title className="primary">Register | Lost & Found</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <Toaster />

        <div className="hero-content flex-col lg:flex-row-reverse">
          <Lottie
            style={{ width: "350px" }}
            animationData={registerlottie}
            loop={true}
          ></Lottie>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-center mt-5 font-bold text-2xl primary">
              Register Now
            </h1>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <label className="label secondary">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered"
                  placeholder="Your Name"
                  required
                />

                <label className="label secondary">Photo URL</label>
                <input
                  type="url"
                  name="photo"
                  className="input input-bordered"
                  placeholder="Photo URL"
                />

                <label className="label secondary">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered"
                  placeholder="Email"
                  required
                />

                <label className="label secondary">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-80 pr-10"
                    placeholder="Password"
                    required
                  />
                  <span
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={togglePassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <p className="text-sm mt-2 secondary">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 underline">
                    Login Now
                  </Link>
                </p>

                <button
                  type="submit"
                  className="btn btn-neutral w-full mt-4 primary"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
