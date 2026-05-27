import React, { useState } from "react";
import img from "../assets/lp1.webp"; 
import { useNavigate } from "react-router-dom";
// 1. Import Toastify
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';

const API_BASE_URL = "http://localhost:8000/api/auth";

const ShowLogin = () => {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState("");  
    const [phoneInput, setPhoneInput] = useState("");
    const [emailInput, setEmailInput] = useState("");  
    const [step, setStep] = useState('IDENTIFY');
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const bannerImageUrl = img;

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_REGEX = /^\+?[0-9\s-()]{7,}$/; 

    // 2. Sound Function
    const playNotificationSound = () => {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3");
        audio.play().catch(err => console.log("Sound play blocked by browser:", err));
    };

    const isValidInput = (input) => {
        const trimmedInput = input.trim();
        if (EMAIL_REGEX.test(trimmedInput)) return { type: "email", valid: true };
        if (PHONE_REGEX.test(trimmedInput)) return { type: "phone", valid: true };
        return { type: null, valid: false };
    };

    const handleInitialSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationResult = isValidInput(emailOrPhone);
        const trimmedInput = emailOrPhone.trim();  

        if (!validationResult.valid) {
            const msg = "Please enter a valid Email or Mobile number.";
            setError(msg);
            toast.error(msg); // Toast Error
            return;
        }
        
        const inputType = validationResult.type; 
        const success = await executeInitialApiCall({ emailOrPhone: trimmedInput }, '/userlogin', inputType);

        if (success) {
            if (inputType === 'phone') {
                setStep('COLLECT_EMAIL');
                setEmailInput(''); 
            } else if (inputType === 'email') {
                setStep('COLLECT_PHONE');
                setPhoneInput(''); 
            }
        }
    };
    
    const executeInitialApiCall = async (payload, endpoint, type) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (response.ok) {
                // 3. Success Notification + Sound
                playNotificationSound();
                toast.success(`OTP sent successfully to ${type}!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                return true; 
            } else {
                const errorMessage = data.message || "Operation failed.";
                setError(errorMessage);
                toast.error(errorMessage);
                return false;
            }
        } catch (apiError) {
            const netError = "Server Connection Failed!";
            setError(netError);
            toast.error(netError);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        const phoneTrimmed = phoneInput.trim();
        const phoneValidation = isValidInput(phoneTrimmed);
        
        if (!phoneValidation.valid || phoneValidation.type !== 'phone') {
            toast.warning("Please enter a valid mobile number.");
            return;
        }

        navigate("/verifyotp", {
            state: { login_acc: emailOrPhone.trim(), phone: phoneTrimmed, isEmailFlow: true },
        });
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        const emailTrimmed = emailInput.trim();
        const emailValidation = isValidInput(emailTrimmed);
        
        if (!emailValidation.valid || emailValidation.type !== 'email') {
            toast.warning("Please enter a valid email address.");
            return;
        }

        navigate("/verifyotp", {    
            state: { login_acc: emailOrPhone.trim(), email: emailTrimmed, isPhoneFlow: true },
        });
    };

    const renderForm = () => {
        if (step === 'COLLECT_PHONE') {
            return (
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                    <h3 className="mb-6 text-xl font-semibold text-gray-800">Registration Required</h3>
                    <p className="text-sm text-gray-500">OTP sent to <b>{emailOrPhone}</b>. Please provide your phone number.</p>
                    <input
                        type="tel"
                        required
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full px-2 py-2 text-lg border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Enter Mobile number"
                    />
                    <button type="submit" className="w-full py-3 font-semibold text-white bg-orange-500 rounded-sm shadow-md hover:bg-orange-600">
                        CONTINUE
                    </button>
                    <div className="pt-4 text-center">
                        <span onClick={() => setStep('IDENTIFY')} className="text-sm text-blue-500 cursor-pointer">← Back</span>
                    </div>
                </form>
            );
        }
        
        if (step === 'COLLECT_EMAIL') {
            return (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <h3 className="mb-6 text-xl font-semibold text-gray-800">Registration Required</h3>
                    <p className="text-sm text-gray-500">OTP sent to <b>{emailOrPhone}</b>. Please provide your email.</p>
                    <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-2 py-2 text-lg border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Enter Email Address"
                    />
                    <button type="submit" className="w-full py-3 font-semibold text-white bg-orange-500 rounded-sm shadow-md hover:bg-orange-600">
                        CONTINUE
                    </button>
                    <div className="pt-4 text-center">
                        <span onClick={() => setStep('IDENTIFY')} className="text-sm text-blue-500 cursor-pointer">← Back</span>
                    </div>
                </form>
            );
        }

        return (
            <form onSubmit={handleInitialSubmit} className="space-y-6">
                <h3 className="mb-6 text-2xl font-semibold text-gray-800">Login or Signup</h3>
                <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full px-2 py-2 text-lg border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Email/Mobile number"
                />
                <p className="mt-2 text-xs text-gray-500">
                    By continuing, you agree to Flipkart's <span className="text-blue-500">Terms of Use</span>.
                </p>
                <button type="submit" disabled={isLoading} className="w-full py-3 font-semibold text-white bg-orange-500 rounded-sm hover:bg-orange-600 disabled:bg-gray-400">
                    {isLoading ? "SENDING..." : "CONTINUE"}
                </button>
            </form>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            {/* 4. Toast Container */}
            <ToastContainer />
            
            <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-xl md:max-w-4xl md:flex-row">
                <div className="w-full h-[7rem] p-4 text-white md:w-2/5 md:h-auto md:p-8 bg-blue-600"
                    style={{ backgroundImage: `url(${bannerImageUrl})`, backgroundSize: "cover" }}>
                    <div className="hidden md:block">
                        <h2 className="mb-4 text-2xl font-semibold">{step === 'IDENTIFY' ? 'Login' : 'Register'}</h2>
                        <p>Get access to your Orders and Wishlist</p>
                    </div>
                </div>
                <div className="w-full p-6 md:p-10 md:w-3/5">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default ShowLogin;