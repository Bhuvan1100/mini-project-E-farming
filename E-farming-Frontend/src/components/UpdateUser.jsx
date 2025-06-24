import { useAuth } from "../context/AuthContext";
import React, { useState } from 'react';

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAuth();

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ name, email, password });
    const token = user.token;

    try {
      const response = await fetch("http://localhost:8000/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: body
      });

      const data = await response.json();
      if (data.status) {
        const updatedUser = {
          ...user,
          ...data.updatedData,
        };
        login(updatedUser);
        alert("Profile updated successfully!");
      } else {
        alert("Update failed: Try again later.");
      }
    } catch (error) {
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form 
        onSubmit={handleUpdateUser}
        className="bg-white shadow-md rounded-2xl p-6 w-full space-y-6"
      >
        <h2 className="text-xl font-bold text-center text-gray-700">Update Your Profile</h2>
        <p className="text-sm text-black underline text-center">Fill only the fields you want to update</p>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">New Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
