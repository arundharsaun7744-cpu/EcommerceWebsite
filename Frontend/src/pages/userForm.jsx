import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import amazonVideo from "../assets/1659360324703.gif";
import successSound from "../assets/success-videogame-sfx-423626.mp3";

/* Toast */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Config */
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

  /* ================= STATE ================= */

  const [formData, setFormData] = useState(initialForm);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  /* ================= HELPERS ================= */

  const playSuccessSound = () => {
    new Audio(successSound).play();
  };

  const showError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const err = {};

    if (!profileImage) err.profileImage = "Image required";
    if (!formData.name) err.name = "Name required";
    if (!formData.gender) err.gender = "Gender required";
    if (!formData.address) err.address = "Address required";
    if (!formData.location) err.location = "Location required";

    if (!/^\d{6}$/.test(formData.pincode)) {
      err.pincode = "6 digit pincode required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  /* ================= SUBMIT ================= */

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

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Server error");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex justify-center p-10">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-xl">

        {/* LEFT */}
        <div className="w-1/2">
          <img
            src={amazonVideo}
            alt="Banner"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-8">

          <h2 className="mb-5 text-xl font-bold">
            User Register
          </h2>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-3"
          >

            {/* IMAGE */}
            <div>
              <input type="file" onChange={handleImageChange} />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-20 h-20 mt-2 rounded"
                />
              )}

              <p className="text-sm text-red-500">
                {errors.profileImage}
              </p>
            </div>

            {/* NAME */}
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            {/* GENDER */}
            <div>
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="mr-3">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />{" "}
                  {g}
                </label>
              ))}

              <p className="text-sm text-red-500">
                {errors.gender}
              </p>
            </div>

            {/* ADDRESS */}
            <Textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />

            {/* LOCATION */}
            <Input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />

            {/* PINCODE */}
            <Input
              name="pincode"
              placeholder="Pincode"
              maxLength="6"
              value={formData.pincode}
              onChange={handleChange}
              error={errors.pincode}
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              REGISTER
            </button>

          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ name, value, onChange, placeholder, error, ...rest }) => (
  <div>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border"
      {...rest}
    />

    <p className="text-sm text-red-500">{error}</p>
  </div>
);

const Textarea = ({ name, value, onChange, placeholder, error }) => (
  <div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border"
    />

    <p className="text-sm text-red-500">{error}</p>
  </div>
);

export default UserForm;
