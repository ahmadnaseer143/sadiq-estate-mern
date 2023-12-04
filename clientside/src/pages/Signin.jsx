import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("error:", error.message);
      dispatch(signInFailure(error.failure));
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="border rounded-lg p-3 focus:outline-none"
          id="email"
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="border rounded-lg p-3 focus:outline-none"
          id="password"
          onChange={handleChange}
          disabled={loading}
        />
        <button className="bg-slate-700 text-white mt-4 p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex mt-5 gap-2">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
};

export default Signin;
