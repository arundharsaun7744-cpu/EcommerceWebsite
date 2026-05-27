import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

// Main Orders Component
const Orders = () => {
  const [orderedProduct, setOrderedProduct] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState([]);

  useEffect(() => {
    const order_product = JSON.parse(localStorage.getItem("orderedProducts")) || [];
    setOrderedProduct(order_product);
    setDetailsVisible(new Array(order_product.length).fill(false));
  }, []);

  const toggleDetails = (index) => {
    setDetailsVisible(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // 1. Condition Check: Array length 0-aga irundhal intha layout display aagum
  if (orderedProduct.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] p-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-700">Orders Empty</h2>
        <p className="text-lg text-gray-500">Search your products and place an order!</p>
        <button 
          onClick={() => window.location.href = "/"} // Ungal products page route-ai inge kodukalam
          className="mt-6 px-6 py-2.5 bg-lime-500 text-white font-semibold rounded-lg shadow-md hover:bg-lime-600 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // 2. Orders irundhal intha layout render aagum
  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 pt-8 md:justify-start">
      {orderedProduct.map((v, i) => (
        <OrderCard 
          key={i} 
          v={v} 
          isVisible={detailsVisible[i]} 
          onToggle={() => toggleDetails(i)} 
        />
      ))}
    </div>
  );
};

// Sub-Component: Thani Card-aga piripathal random value fluctuation thadukapadugirathu
const OrderCard = ({ v, isVisible, onToggle }) => {
  const tax = 100.00;
  const totalBeforeTax = v.product.price;
  const finalTotal = totalBeforeTax + tax;

  // Render aagum podhu oru murai mattume intha random values assign aagum
  const [refNumber] = useState(() => Math.floor(1e12 + Math.random() * 9e12));
  const [orderTime] = useState(() => {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const dateStr = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const timeStr = `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    return `${dateStr} , ${timeStr}`;
  });

  return (
    <div className="mt-24 overflow-hidden border shadow-lg rounded-xl w-96 h-fit">
      {/* Product Image and Name */}
      <div className="flex flex-col">
        <div className="p-4 bg-white rounded-t-xl">
          <img 
            src={v.product.image} 
            alt={v.product.name} 
            className="object-contain w-full h-32 mx-auto" 
          />
        </div>

        <div className="p-5 bg-lime-500">
          <div className="text-center text-white">
            <h3 className="text-xl font-semibold">{v.product.name}</h3>
            <p className="text-sm">Size UK 10</p>
          </div>
        </div>
      </div>

      {/* TOGGLE HEADER */}
      <div 
        className="flex items-center justify-between p-4 text-white bg-gray-900 border-b-4 border-yellow-400 cursor-pointer select-none"
        onClick={onToggle}
      >
        <h1 className="text-xl font-bold">Payment Success</h1>
        {isVisible ? (
          <ChevronUp className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <ChevronDown className="w-6 h-6 transition-transform duration-300" />
        )}
      </div>

      {/* TOGGLE CONTENT */}
      <div 
        className={`bg-gray-900 text-white px-6 transition-all duration-500 ease-in-out overflow-hidden ${
          isVisible ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
        }`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-t border-gray-700">
            <p className="text-sm font-light">Reference Number</p>
            <p className="text-sm font-medium">{refNumber}</p>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700">
            <p className="text-sm font-light">Date & Time</p>
            <p className="text-sm font-medium">{orderTime}</p>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700">
            <p className="text-sm font-light">Payment Method</p>
            <p className="text-sm font-medium">{v.paymentMethod}</p>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700">
            <p className="text-sm font-light">Subtotal</p>
            <p className="text-sm font-medium">Rs: {v.product.price}</p>
          </div>

          <div className="flex items-center justify-between py-2">
            <p className="text-sm font-light">Tax</p>
            <p className="text-sm font-medium">Rs: {tax}</p>
          </div>
          
          <span className="block text-lg tracking-widest text-center text-gray-500 select-none">
              - - - - - - - - - - - - - - - - - - - - - - - -
          </span>

          <div className="flex items-center justify-between pt-3 pb-2 text-lg font-bold border-t border-gray-700">
            <p>Total</p>
            <p>Rs: {finalTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;