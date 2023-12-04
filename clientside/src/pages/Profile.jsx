import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    avatar: currentUser.avatar,
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="">
      <h2 className="text-3xl font-semibold my-4 text-center">
        Update Profile
      </h2>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-center mb-4">
          <img
            src={currentUser.avatar}
            alt="Profile Photo"
            className="rounded-full h-20 w-20 object-cover border-4"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:opacity-80 transition duration-300"
          >
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account?</span>
          <span className="text-red-700 cursor-pointer">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
