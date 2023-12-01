import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Your Username"
          className="border rounded-lg p-3 focus:outline-none"
          id="username"
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="border rounded-lg p-3 focus:outline-none"
          id="email"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="border rounded-lg p-3 focus:outline-none"
          id="password"
        />
        <button className="bg-slate-700 text-white mt-4 p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex mt-5 gap-2">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
