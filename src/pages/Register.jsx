import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";


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
    const photoURL = form.photo.value || "https://i.ibb.co/yP0zF9N/user.png";
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

      navigate("/mygroup");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero  min-h-screen">
      <Toaster />
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <h1 className="text-center mt-5 font-bold text-3xl">Register Now</h1>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="Your Name"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="url"
              name="photo"
              className="input input-bordered"
              placeholder="Photo URL"
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
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

            <p className="text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login Now
              </Link>
            </p>

            <button
              type="submit"
              className="btn btn-neutral w-full mt-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
