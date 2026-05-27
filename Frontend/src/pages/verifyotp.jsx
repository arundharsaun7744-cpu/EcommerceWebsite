import React, { useState, useRef, useEffect } from "react";
import img from "../assets/lp1.webp";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api/auth";

// Countdown Timer Hook
const useCountdownTimer = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const timerIdRef = useRef();

  useEffect(() => {
    timerIdRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerIdRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerIdRef.current);
  }, [initialSeconds]);

  const resetTimer = () => {
    clearInterval(timerIdRef.current);
    setSeconds(initialSeconds);
  };

  return { seconds, resetTimer, isRunning: seconds > 0 };
};

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { login_acc, email, phone, isEmailFlow, isPhoneFlow } =
    location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!login_acc) {
      alert("Invalid access. Redirecting to login.");
      navigate("/", { replace: true });
    }
  }, [login_acc, navigate]);

  const { seconds, resetTimer, isRunning } = useCountdownTimer(60);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      value
        .split("")
        .slice(0, 4)
        .forEach((num, i) => {
          newOtp[i] = num;
        });

      setOtp(newOtp);
      inputRefs.current[3]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    }
  };

  /* =============================
        SUBMIT OTP
    ============================== */

  const submitOtp = async () => {
    if (isLoading) return;

    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) return;

    setIsLoading(true);

    const payload = {
      key: login_acc,
      otp: finalOtp,
      phone,
      email,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("u_id", data.user.id);

        navigate(`/userForm `, {
          state: { userId: data.user.id },
        });
      } else {
        alert(data.message || "Invalid OTP");
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  /* =============================
        AUTO SUBMIT WHEN 4 DIGITS
    ============================== */

  useEffect(() => {
    const finalOtp = otp.join("");

    if (finalOtp.length === 4 && !otp.includes("") && !isLoading) {
      submitOtp();
    }
  }, [otp]);

  /* =============================
        RESEND OTP
    ============================== */

  const handleResendOtp = async (e) => {
    e.preventDefault();

    if (isRunning || !login_acc || isLoading) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/userlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhone: login_acc,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP Resent");

        resetTimer();
        setOtp(["", "", "", ""]);

        inputRefs.current[0]?.focus();
      } else {
        alert(data.message || "Failed to resend");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const identifierType = isPhoneFlow
    ? "Mobile Number"
    : isEmailFlow
      ? "Email"
      : "Account";

  /* =============================
        UI
    ============================== */

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-xl md:max-w-4xl md:flex-row">
        {/* Banner */}
        <div
          className="w-full h-[7rem] p-4 text-white md:w-2/5 md:h-auto md:p-8"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#2874f0",
          }}
        >
          <div className="hidden md:block">
            <h2 className="mb-4 text-2xl font-semibold">Verification</h2>
            <p>Secure your account</p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full p-6 md:p-10 md:w-3/5">
          <h3 className="mb-2 text-2xl font-semibold text-gray-800">
            Verify OTP
          </h3>

          <p className="mb-6 text-sm text-gray-500">
            OTP sent to your {identifierType}:
            <span className="ml-1 font-medium text-gray-800">{login_acc}</span>
          </p>

          {/* OTP Boxes */}
          <div className="flex justify-between mb-6 space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="4"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isLoading}
                autoFocus={index === 0}
                className="w-1/4 text-3xl text-center border-2 rounded-lg outline-none h-14 focus:border-blue-500"
              />
            ))}
          </div>

          {/* Loader */}
          {isLoading && (
            <p className="mb-4 text-sm text-center text-blue-600">
              Verifying...
            </p>
          )}

          {/* Resend */}
          <div className="text-center">
            {isRunning ? (
              <span className="text-sm text-gray-500">
                Resend in <b className="text-orange-500">{seconds}s</b>
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-sm font-medium text-blue-500 hover:text-blue-700"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
