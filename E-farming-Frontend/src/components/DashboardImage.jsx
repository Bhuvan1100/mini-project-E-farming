import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function DashboardImage() {
  const { user, login } = useAuth();
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please choose a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("http://localhost:8000/user/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("image uploaded");
      console.log(data)
      console.log(data.image)
      if (data.status === "success") {
        login({
          ...user,
          image: data.image,
        });
        console.log(user)
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <form className="flex flex-col gap-4" onSubmit={handleImageUpload}>
        <label htmlFor="image" className="text-lg font-semibold text-gray-700">
          Upload an image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default DashboardImage;
