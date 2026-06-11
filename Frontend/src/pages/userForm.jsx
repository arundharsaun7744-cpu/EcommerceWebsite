import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import amazonVideo from "../assets/1659360324703.gif";
import successSound from "../assets/success-videogame-sfx-423626.mp3";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

const initialForm = {
  name: "",
  gender: "",
  address: "",
  location: "",
  pincode: "",
};

const UserForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const userId = state?.userId;

  const [formData, setFormData] = useState(initialForm);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const playSuccessSound = () => {
    new Audio(successSound).play();
  };

  const showError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    clearError(name);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showError("profileImage", "Image must be below 2MB");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      showError("profileImage", "Only JPG / PNG / GIF allowed");
      return;
    }

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
    clearError("profileImage");
  };

  const validateForm = () => {
    const err = {};

    if (!userId) err.userId = "User ID missing. Please login again.";
    if (!profileImage) err.profileImage = "Image required";
    if (!formData.name.trim()) err.name = "Name required";
    if (!formData.gender) err.gender = "Gender required";
    if (!formData.address.trim()) err.address = "Address required";
    if (!formData.location.trim()) err.location = "Location required";

    if (!/^\d{6}$/.test(formData.pincode)) {
      err.pincode = "6 digit pincode required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = new FormData();

    payload.append("id", userId);

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    payload.append("profileimg", profileImage);

    try {
      const res = await fetch(`${API_BASE_URL}/userdata`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submit failed");
      }

      playSuccessSound();
      toast.success("Registered successfully!");

      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6 bg-gray-100 sm:px-6 lg:px-10">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white shadow-2xl rounded-2xl md:flex-row">
        
        {/* LEFT IMAGE SECTION */}
        <div className="w-full bg-black md:w-1/2 h-52 sm:h-64 md:h-auto">
          <img
            src={amazonVideo}
            alt="Register Banner"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full p-5 md:w-1/2 sm:p-7 md:p-8">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              User Register
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete your profile details
            </p>
          </div>

          {errors.userId && (
            <p className="p-2 mb-3 text-sm text-red-600 rounded-lg bg-red-50">
              {errors.userId}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            {/* IMAGE UPLOAD */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Profile Image
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <label className="flex items-center justify-center w-24 h-24 text-xs text-center text-gray-500 border-2 border-gray-300 border-dashed cursor-pointer rounded-xl bg-gray-50 hover:border-green-500">
                  Upload
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/jpeg,image/png,image/gif"
                  />
                </label>

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-24 h-24 border rounded-xl"
                  />
                )}
              </div>

              <p className="mt-1 text-sm text-red-500">
                {errors.profileImage}
              </p>
            </div>

            <Input
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            {/* GENDER */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Gender
              </label>

              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border p-2 text-sm transition ${
                      formData.gender === g
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {g}
                  </label>
                ))}
              </div>

              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            </div>

            <Textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />

            <Input
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />

            <Input
              name="pincode"
              placeholder="Enter pincode"
              maxLength="6"
              inputMode="numeric"
              value={formData.pincode}
              onChange={handleChange}
              error={errors.pincode}
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 p-3 font-semibold text-white shadow-md transition hover:bg-green-700 active:scale-[0.98]"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

const Input = ({ name, value, onChange, placeholder, error, ...rest }) => (
  <div>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-xl border p-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 ${
        error ? "border-red-400" : "border-gray-300"
      }`}
      {...rest}
    />

    <p className="mt-1 text-sm text-red-500">{error}</p>
  </div>
);

const Textarea = ({ name, value, onChange, placeholder, error }) => (
  <div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="3"
      className={`w-full resize-none rounded-xl border p-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 ${
        error ? "border-red-400" : "border-gray-300"
      }`}
    />

    <p className="mt-1 text-sm text-red-500">{error}</p>
  </div>
);

export default UserForm;