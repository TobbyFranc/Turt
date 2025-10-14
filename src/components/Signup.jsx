import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="space-y-1 text-sm">
    <label htmlFor={name} className="block text-gray-600 dark:text-gray-300 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className={`w-full px-4 py-3 rounded-md border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)] dark:bg-gray-900 dark:border-gray-600`}
      required
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      if (res.data.success) {
        navigate("/Login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left: Image background on mobile, side panel on desktop */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1170&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 lg:bg-opacity-0" />
      </div>

      {/* Right: Signup Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-10 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center text-[var(--primaryColor)]">Create an Account</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md bg-[var(--accentColor)] text-white font-semibold hover:bg-yellow-600 transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Social Signup */}
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">Or sign up with</p>
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <img src="https://www.svgrepo.com/show/452196/facebook.svg" alt="Facebook" className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/Login" className="text-[var(--primaryColor)] font-semibold underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
