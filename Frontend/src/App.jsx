import { useEffect, useState } from "react";

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
import ProductView from "./pages/ProductView";
import ContextProvider from "./Context/ContextProvider";
import Orders from "./pages/Orders";
import ShowLogin from "./pages/showlogin";
import VerifyOtp from "./pages/verifyotp";
import UserForm from "./pages/userForm";
import Profile from "./pages/profile";
import ProductDetails  from "./pages/ProductDetails";
function App() {
  const [bgToggle, setBgToggle] = useState(() => {
    return localStorage.getItem("bgToggle") === "true";
  });

  useEffect(() => {
    localStorage.setItem("bgToggle", String(bgToggle));

    document.documentElement.classList.toggle("dark", bgToggle);
    document.body.classList.toggle("dark-theme", bgToggle);

    document.body.style.background = bgToggle ? "#030712" : "#ffffff";
    document.body.style.color = bgToggle ? "#ffffff" : "#111827";
  }, [bgToggle]);

  return (
    <ContextProvider>
      <BrowserRouter>
        <div
          className={`app-theme min-h-screen transition-all duration-500 ${
            bgToggle ? "app-dark" : "app-light"
          }`}
        >
          <Header bgToggle={bgToggle} setBgToggle={setBgToggle} />

          <main className="min-h-screen">
            <Routes>
              <Route path="/verifyotp" element={<VerifyOtp />} />
              <Route path="/showlogin" element={<ShowLogin />} />
              <Route path="/userForm" element={<UserForm />} />

              <Route
                path="/"
                element={
                  <Home bgToggle={bgToggle} setBgToggle={setBgToggle} />
                }
              />

              <Route path="/wishlist" element={<Wishlist bgToggle={bgToggle} />} />
              <Route path="/profile" element={<Profile bgToggle={bgToggle} />} />
              <Route path="/search" element={<Search bgToggle={bgToggle} />} />
              <Route
                path="/brand/:brandname"
                element={<ProductView bgToggle={bgToggle} />}
              />
              <Route path="/product/:id" element={<ProductDetails bgToggle={bgToggle} />} />
              <Route path="/checkout" element={<Checkout bgToggle={bgToggle} />} />
              <Route path="/payment" element={<Payment bgToggle={bgToggle} />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation bgToggle={bgToggle} />}
              />
              <Route path="/orders" element={<Orders bgToggle={bgToggle} />} />
                
              <Route
                path="*"
                element={
                  <Home bgToggle={bgToggle} setBgToggle={setBgToggle} />
                }
              />
            </Routes>
          </main>

          <Footer bgToggle={bgToggle} />
          <Toaster />
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;