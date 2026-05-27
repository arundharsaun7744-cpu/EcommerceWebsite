import { useState } from "react";

import "./App.css";

import Home from "./pages/Home";

import { Toaster } from "react-hot-toast";

import Header from "./components/Header";

import Footer from "./components/Footer";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Checkout from "./pages/Checkout";

import Payment from "./pages/Payment";

import OrderConfirmation from "./pages/OrderConfirmation";

import Wishlist from "./pages/Wishlist";

import Search from "./pages/Search";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductView from "./components/ProductView";

import ContextProvider from "./Context/ContextProvider";

import Orders from "./pages/Orders";

import ShowLogin from "./pages/showlogin";

import VerifyOtp from "./pages/verifyotp";

import UserForm from "./pages/userForm";

import Profile from "./pages/profile";
function App() {
  const [bgToggle, setBgToggle] = useState(() => {
    const saved = localStorage.getItem("bgToggle");
    return saved === "true";
  });

  // 1. Check if the user has completed the OTP/Form process
  // You should set 'isVerified' to true in your UserForm component after success
  // const isVerified = localStorage.getItem("isVerified") === "true";

  return (
    <ContextProvider>
      <BrowserRouter>
        <div
          style={{
            background: bgToggle ? "linear-gradient(135deg, #000 50%, #667eea 100%)" : "#ffffff",
            minHeight: "100vh",
            transition: "0.4s ease-in-out",
          }}
        >
          <Header />

          <Routes>
          
              <>
                <Route path="/showlogin" element={<ShowLogin />} />
                <Route path="/verifyotp" element={<VerifyOtp />} />
                <Route path="/userForm" element={<UserForm />} />
                <Route path="/" element={<Home bgToggle={bgToggle} setBgToggle={setBgToggle} />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/profile" element={< Profile/>} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:id" element={<ProductView />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<Home bgToggle={bgToggle} setBgToggle={setBgToggle} />} />
              </>
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;