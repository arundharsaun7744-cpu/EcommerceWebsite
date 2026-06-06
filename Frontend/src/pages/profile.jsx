import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Settings,
  LogOut,
  Edit3,
  ShieldCheck,
  Mail,
  Phone,
  Star,
  Target,
  Fingerprint,
  Zap,
  KeyRound,
  ShieldAlert,
  Headset,
  ChevronRight,
  PlusCircle,
  Camera,
  BadgeCheck,
  Sparkles,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;
const IMAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const getProfileImageUrl = (image) => {
  if (!image) return null;

  const cleanImage = String(image).trim();
  if (!cleanImage) return null;

  if (cleanImage.startsWith("http://") || cleanImage.startsWith("https://")) {
    return cleanImage;
  }

  if (cleanImage.startsWith("/uploads")) {
    return `${IMAGE_BASE_URL}${cleanImage}`;
  }

  if (cleanImage.startsWith("uploads/")) {
    return `${IMAGE_BASE_URL}/${cleanImage}`;
  }

  return `${IMAGE_BASE_URL}/uploads/${cleanImage}`;
};

const Profile = ({ bgToggle, setBgToggle }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("u_id");

      if (!userId) {
        setIsLoginRequired(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/get-user?user_id=${userId}`
        );

        const data = await response.json();

        if (response.ok && data.success && data.user) {
          setUserData(data.user);
          setIsLoginRequired(false);
        } else {
          setUserData(null);
          setIsLoginRequired(true);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setUserData(null);
        setIsLoginRequired(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 15 seconds once login required message
  useEffect(() => {
    if (loading) return undefined;

    if (!isLoginRequired && userData) return undefined;

    const timer = setTimeout(() => {
      setLoginPopupOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [loading, isLoginRequired, userData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginRedirect = () => {
    setLoginPopupOpen(false);
    navigate("/showlogin");
  };

  const handleProtectedAction = () => {
    if (isLoginRequired || !userData) {
      setLoginPopupOpen(true);
      return true;
    }

    return false;
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleThemeToggle = () => {
    if (setBgToggle) {
      setBgToggle((prev) => {
        const newValue = !prev;
        localStorage.setItem("bgToggle", String(newValue));
        return newValue;
      });
    }
  };

  const handleLinkAction = (type) => {
    if (handleProtectedAction()) return;

    setActiveTab("settings");

    setTimeout(() => {
      alert(`Please update your ${type} field in Account Settings.`);
    }, 250);
  };

  const handleCopyId = async () => {
    if (handleProtectedAction()) return;

    const userId = userData?.id || localStorage.getItem("u_id");

    if (!userId) return;

    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const profileImage =
    getProfileImageUrl(userData?.userImage) ||
    `https://api.dicebear.com/7.x/micah/svg?seed=${
      userData?.userName || "Explorer"
    }`;

  const completion = useMemo(() => {
    const fields = [
      userData?.userName,
      userData?.email,
      userData?.phonenumber,
      userData?.gender,
      userData?.pincode,
      userData?.address,
      userData?.location,
      userData?.userImage,
    ];

    const filled = fields.filter(
      (item) => item !== undefined && item !== null && String(item).trim() !== ""
    ).length;

    return Math.round((filled / fields.length) * 100);
  }, [userData]);

  if (loading) {
    return <Loader bgToggle={bgToggle} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-3 sm:space-y-5 lg:space-y-6 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-4">
              <Stat
                bgToggle={bgToggle}
                icon={<Mail size={18} />}
                accent="blue"
                label="Email"
                value={userData?.email}
                onLinkClick={() => handleLinkAction("Email")}
              />

              <Stat
                bgToggle={bgToggle}
                icon={<Phone size={18} />}
                accent="emerald"
                label="Phone"
                value={userData?.phonenumber}
                onLinkClick={() => handleLinkAction("Phone Number")}
              />

              <Stat
                bgToggle={bgToggle}
                icon={<MapPin size={18} />}
                accent="rose"
                label="Pincode"
                value={userData?.pincode}
                fallbackText="Not Added"
                onLinkClick={() => handleLinkAction("Pincode")}
              />

              <Stat
                bgToggle={bgToggle}
                icon={<Target size={18} />}
                accent="violet"
                label="Gender"
                value={userData?.gender}
                fallbackText="Not Set"
                onLinkClick={() => handleLinkAction("Gender")}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-5 xl:grid-cols-3">
              <div
                className={`overflow-hidden border shadow-sm xl:col-span-2 rounded-2xl sm:rounded-3xl ${
                  bgToggle
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b p-3 sm:p-5 lg:p-6 ${
                    bgToggle
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-slate-100 bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`rounded-xl p-2 sm:rounded-2xl sm:p-2.5 ${
                        bgToggle
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <h3
                        className={`text-sm font-black sm:text-lg ${
                          bgToggle ? "text-white" : "text-slate-950"
                        }`}
                      >
                        Identity Details
                      </h3>
                      <p
                        className={`hidden text-sm sm:block ${
                          bgToggle ? "text-gray-400" : "text-slate-500"
                        }`}
                      >
                        Your account and delivery information
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (handleProtectedAction()) return;
                      setActiveTab("settings");
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold shadow-sm transition sm:text-sm ${
                      bgToggle
                        ? "border-white/10 bg-white/[0.06] text-gray-200 hover:bg-blue-500 hover:text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 sm:gap-4 sm:p-5 lg:gap-6 lg:p-6">
                  <InfoBlock
                    bgToggle={bgToggle}
                    icon={<Home size={15} />}
                    label="Address"
                    value={
                      userData?.address
                        ? `${userData.address}${
                            userData.location ? `, ${userData.location}` : ""
                          }`
                        : "No address added"
                    }
                  />

                  <InfoBlock
                    bgToggle={bgToggle}
                    icon={<BadgeCheck size={15} />}
                    label="Status"
                    value={userData ? "Active" : "Login Required"}
                    status={userData ? "Verified" : "Pending"}
                  />

                  <InfoBlock
                    bgToggle={bgToggle}
                    icon={<Clock size={15} />}
                    label="Updated"
                    value={
                      userData?.updated_at
                        ? new Date(userData.updated_at).toLocaleDateString()
                        : "Not available"
                    }
                  />

                  <InfoBlock
                    bgToggle={bgToggle}
                    icon={<Star size={15} />}
                    label="Member"
                    value={userData ? "Standard" : "Guest"}
                    status={userData ? "Active" : "Guest"}
                  />
                </div>
              </div>

              <div
                className={`rounded-2xl border p-3 shadow-sm sm:rounded-3xl sm:p-5 lg:p-6 ${
                  bgToggle
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`text-sm font-black sm:text-lg ${
                        bgToggle ? "text-white" : "text-slate-950"
                      }`}
                    >
                      Profile Strength
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${
                        bgToggle ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Complete your details
                    </p>
                  </div>

                  <Sparkles className="text-amber-500" size={18} />
                </div>

                <div className="mt-4 sm:mt-6">
                  <div className="flex items-end justify-between">
                    <span
                      className={`text-3xl font-black sm:text-4xl ${
                        bgToggle ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {completion}%
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold sm:text-xs ${
                        completion >= 80
                          ? bgToggle
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-emerald-50 text-emerald-700"
                          : bgToggle
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {completion >= 80 ? "Great" : "Needs Login"}
                    </span>
                  </div>

                  <div
                    className={`mt-3 h-2.5 overflow-hidden rounded-full sm:h-3 ${
                      bgToggle ? "bg-gray-800" : "bg-slate-100"
                    }`}
                  >
                    <div
                      className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 sm:block sm:mt-6 sm:space-y-3">
                  <MiniCheck bgToggle={bgToggle} label="Email" done={Boolean(userData?.email)} />
                  <MiniCheck bgToggle={bgToggle} label="Phone" done={Boolean(userData?.phonenumber)} />
                  <MiniCheck bgToggle={bgToggle} label="Address" done={Boolean(userData?.address)} />
                  <MiniCheck bgToggle={bgToggle} label="Image" done={Boolean(userData?.userImage)} />
                </div>

                <button
                  onClick={() => {
                    if (handleProtectedAction()) return;
                    setActiveTab("settings");
                  }}
                  className="w-full px-4 py-2.5 mt-4 text-xs font-bold text-white transition rounded-xl sm:mt-6 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm bg-blue-600 hover:bg-blue-700"
                >
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-3 sm:space-y-6 animate-fadeIn">
            <div
              className={`rounded-2xl border p-4 shadow-sm sm:rounded-3xl sm:p-8 ${
                bgToggle
                  ? "border-white/10 bg-white/[0.05]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl p-2 sm:rounded-2xl sm:p-2.5 ${
                    bgToggle
                      ? "bg-purple-500/15 text-purple-300"
                      : "bg-purple-50 text-purple-600"
                  }`}
                >
                  <Fingerprint size={20} />
                </div>

                <div>
                  <h3
                    className={`text-lg font-bold sm:text-xl ${
                      bgToggle ? "text-white" : "text-slate-950"
                    }`}
                  >
                    Security Settings
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
                      bgToggle ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    Manage account access
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 sm:gap-5 sm:mt-8">
                <SecurityCard
                  bgToggle={bgToggle}
                  icon={<Mail size={18} />}
                  title="Email"
                  desc={userData?.email || "Not linked"}
                  active={Boolean(userData?.email)}
                />

                <SecurityCard
                  bgToggle={bgToggle}
                  icon={<Phone size={18} />}
                  title="Phone"
                  desc={userData?.phonenumber || "Not linked"}
                  active={Boolean(userData?.phonenumber)}
                />
              </div>

              <div className="max-w-md mt-5 space-y-4 sm:mt-8">
                <div>
                  <label
                    className={`mb-2 block text-[10px] font-black uppercase tracking-wider sm:text-xs ${
                      bgToggle ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••••••"
                      disabled
                      className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                        bgToggle
                          ? "border-white/10 bg-black/30 text-gray-300"
                          : "border-slate-200 bg-slate-50 text-slate-500"
                      }`}
                    />

                    <KeyRound
                      className={`absolute right-4 top-3.5 ${
                        bgToggle ? "text-gray-500" : "text-slate-400"
                      }`}
                      size={17}
                    />
                  </div>
                </div>

                <button
                  onClick={handleProtectedAction}
                  className="w-full px-5 py-3 text-sm font-bold text-white transition bg-blue-600 sm:w-fit rounded-2xl hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-3 sm:space-y-6 animate-fadeIn">
            <div
              className={`rounded-2xl border p-4 shadow-sm sm:rounded-3xl sm:p-8 ${
                bgToggle
                  ? "border-white/10 bg-white/[0.05]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-xl p-2 sm:rounded-2xl sm:p-2.5 ${
                      bgToggle
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <Settings size={20} />
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-bold sm:text-xl ${
                        bgToggle ? "text-white" : "text-slate-950"
                      }`}
                    >
                      Account Settings
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${
                        bgToggle ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Update account details
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-bold sm:text-xs ${
                    bgToggle
                      ? "bg-white/10 text-gray-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Backend update API needed
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-5 sm:mt-8 md:grid-cols-2">
                <FormField
                  bgToggle={bgToggle}
                  label="Display Name"
                  defaultValue={userData?.userName || ""}
                  placeholder="Enter display name"
                />

                <FormField
                  bgToggle={bgToggle}
                  label="Phone Number"
                  defaultValue={userData?.phonenumber || ""}
                  placeholder="Enter phone number"
                />

                <div className="md:col-span-2">
                  <FormField
                    bgToggle={bgToggle}
                    label="Email Address"
                    type="email"
                    defaultValue={userData?.email || ""}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 sm:flex sm:gap-3 sm:mt-8">
                <button
                  onClick={handleProtectedAction}
                  className="px-4 py-2.5 text-xs font-bold text-white transition bg-blue-600 rounded-xl sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm hover:bg-blue-700"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setActiveTab("overview")}
                  className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${
                    bgToggle
                      ? "border-white/10 bg-white/[0.06] text-gray-200 hover:bg-white/10"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Overview
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-6">
              <ActionPanel
                bgToggle={bgToggle}
                icon={<ShieldAlert size={18} />}
                title="Privacy"
                desc="Manage privacy settings."
                button="Privacy"
              />

              <ActionPanel
                bgToggle={bgToggle}
                icon={<Headset size={18} />}
                title="Support"
                desc="Need help? Contact support."
                button="Support"
              />
            </div>

            <div
              className={`flex items-center justify-between gap-3 rounded-2xl border p-3 sm:rounded-3xl sm:p-5 ${
                bgToggle
                  ? "border-red-500/20 bg-red-500/10"
                  : "border-red-100 bg-red-50"
              }`}
            >
              <div>
                <h4
                  className={`text-xs font-black sm:text-sm ${
                    bgToggle ? "text-white" : "text-slate-950"
                  }`}
                >
                  Session Control
                </h4>
                <p
                  className={`mt-1 text-xs sm:text-sm ${
                    bgToggle ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  Logout safely.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white transition bg-red-600 rounded-xl sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm hover:bg-red-700"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        bgToggle
          ? "bg-gradient-to-br from-gray-950 via-slate-950 to-indigo-950 text-white"
          : "bg-slate-100 text-slate-800"
      }`}
    >
      <LoginRequiredModal
        open={loginPopupOpen}
        bgToggle={bgToggle}
        onClose={() => setLoginPopupOpen(false)}
        onLogin={handleLoginRedirect}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute rounded-full -top-24 left-10 h-72 w-72 blur-3xl ${
            bgToggle ? "bg-blue-500/10" : "bg-blue-300/20"
          }`}
        />
        <div
          className={`absolute rounded-full right-10 top-20 h-72 w-72 blur-3xl ${
            bgToggle ? "bg-indigo-500/10" : "bg-indigo-300/20"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-2.5 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
        <div
          className={`overflow-hidden rounded-2xl border shadow-sm backdrop-blur transition-all duration-700 ease-in-out sm:rounded-[2rem]
            ${
              showWelcome
                ? "mb-3 max-h-[260px] p-3 opacity-100"
                : "mb-0 max-h-0 border-transparent p-0 opacity-0"
            }
            ${
              bgToggle
                ? "border-white/10 bg-white/[0.06]"
                : "border-white/70 bg-white/80"
            }
            sm:mb-6 sm:max-h-[500px] sm:p-6 sm:opacity-100 lg:mb-8
          `}
        >
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <div
                className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black sm:px-3 sm:text-xs ${
                  bgToggle
                    ? "bg-blue-500/15 text-blue-300"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                <Sparkles size={12} />
                Account Center
              </div>

              <h1
                className={`text-xl font-black tracking-tight sm:text-3xl md:text-4xl ${
                  bgToggle ? "text-white" : "text-slate-950"
                }`}
              >
                Welcome, {userData?.userName || "Guest User"}!
              </h1>

              <p
                className={`max-w-2xl mt-1 text-xs leading-5 sm:mt-2 sm:text-sm sm:leading-6 ${
                  bgToggle ? "text-gray-400" : "text-slate-500"
                }`}
              >
                {userData
                  ? "Manage profile, security and account preferences."
                  : "Login required to view and manage your profile details."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <button
                onClick={handleThemeToggle}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold shadow-sm transition sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${
                  bgToggle
                    ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400 hover:text-gray-950"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-950 hover:text-white"
                }`}
              >
                {bgToggle ? <Sun size={15} /> : <Moon size={15} />}
                {bgToggle ? "Light" : "Dark"}
              </button>

              <button
                onClick={handleCopyId}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold shadow-sm transition sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${
                  bgToggle
                    ? "border-white/10 bg-white/[0.06] text-gray-200 hover:bg-blue-500 hover:text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy ID"}
              </button>

              <button
                onClick={() => {
                  if (handleProtectedAction()) return;
                  setActiveTab("settings");
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white transition shadow-sm rounded-xl sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm bg-blue-600 hover:bg-blue-700"
              >
                <Edit3 size={15} />
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="space-y-3 lg:sticky lg:top-6 lg:space-y-5">
              <div
                className={`overflow-hidden border shadow-sm rounded-2xl sm:rounded-[2rem] ${
                  bgToggle
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-white/80 bg-white"
                }`}
              >
                <div className="h-16 sm:h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-950" />

                <div className="flex items-center gap-3 px-3 pb-3 -mt-8 sm:flex-col sm:items-center sm:px-6 sm:pb-6 sm:-mt-14">
                  <div className="relative shrink-0">
                    <img
                      src={profileImage}
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?seed=${
                          userData?.userName || "Explorer"
                        }`;
                      }}
                      className={`object-cover w-16 h-16 border-4 rounded-full shadow-lg sm:h-28 sm:w-28 ${
                        bgToggle
                          ? "border-gray-900 bg-gray-800"
                          : "border-white bg-slate-100"
                      }`}
                      alt="Profile"
                    />

                    <button
                      onClick={() => {
                        if (handleProtectedAction()) return;
                        setActiveTab("settings");
                      }}
                      className="absolute bottom-0 right-0 p-1.5 text-white transition bg-blue-600 rounded-full shadow-lg sm:p-2 hover:bg-blue-700"
                      title="Update profile image"
                    >
                      <Camera size={12} className="sm:hidden" />
                      <Camera size={15} className="hidden sm:block" />
                    </button>
                  </div>

                  <div className="min-w-0 pt-8 sm:pt-0 sm:text-center">
                    <h2
                      className={`truncate text-base font-black sm:mt-4 sm:text-xl ${
                        bgToggle ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {userData?.userName || "Guest User"}
                    </h2>

                    <p
                      className={`max-w-[190px] truncate text-xs sm:mt-1 sm:max-w-full sm:text-sm ${
                        bgToggle ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      {userData?.email ||
                        userData?.phonenumber ||
                        "Login required"}
                    </p>

                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 text-[10px] sm:text-xs font-black rounded-full sm:mt-4 ${
                        userData
                          ? bgToggle
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-emerald-50 text-emerald-700"
                          : bgToggle
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <BadgeCheck size={12} />
                      {userData ? "Active" : "Guest"}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`grid grid-cols-3 gap-2 p-2 border shadow-sm rounded-2xl sm:rounded-[2rem] lg:block lg:p-3 ${
                  bgToggle
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-white/80 bg-white"
                }`}
              >
                <NavToggle
                  bgToggle={bgToggle}
                  icon={<Zap />}
                  label="Overview"
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                />

                <NavToggle
                  bgToggle={bgToggle}
                  icon={<Fingerprint />}
                  label="Security"
                  active={activeTab === "security"}
                  onClick={() => {
                    if (handleProtectedAction()) return;
                    setActiveTab("security");
                  }}
                />

                <NavToggle
                  bgToggle={bgToggle}
                  icon={<Settings />}
                  label="Settings"
                  active={activeTab === "settings"}
                  onClick={() => {
                    if (handleProtectedAction()) return;
                    setActiveTab("settings");
                  }}
                />
              </div>

              {userData ? (
                <button
                  onClick={handleLogout}
                  className={`hidden w-full items-center justify-center gap-2 rounded-2xl border p-4 text-sm font-black transition lg:flex ${
                    bgToggle
                      ? "border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-600 hover:text-white"
                      : "border-red-100 bg-white text-red-600 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  <LogOut size={17} />
                  Exit Account
                </button>
              ) : (
                <button
                  onClick={handleLoginRedirect}
                  className="items-center justify-center hidden w-full gap-2 p-4 text-sm font-black text-white transition bg-blue-600 border rounded-2xl border-blue-500/20 hover:bg-blue-700 lg:flex"
                >
                  <ShieldCheck size={17} />
                  Login Account
                </button>
              )}
            </div>
          </aside>

          <main className="space-y-3 sm:space-y-6 lg:col-span-9">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

const LoginRequiredModal = ({ open, onClose, onLogin, bgToggle }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl ${
          bgToggle
            ? "border-white/10 bg-slate-950 text-white"
            : "border-white bg-white text-slate-950"
        }`}
      >
        <div className="p-6 text-center text-white bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-950">
          <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl shadow-lg rounded-2xl bg-white/15">
            🔐
          </div>

          <h2 className="mt-4 text-2xl font-black">Login Required</h2>

          <p className="mt-2 text-sm font-semibold text-blue-100">
            Profile details view panna login pannunga bro.
          </p>
        </div>

        <div className="p-5">
          <div
            className={`rounded-2xl border p-4 ${
              bgToggle
                ? "border-white/10 bg-white/[0.05]"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <p
              className={`text-sm font-bold leading-6 ${
                bgToggle ? "text-gray-300" : "text-slate-600"
              }`}
            >
              You are not logged in or your profile data is not available.
              Please login to continue using profile features.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={onClose}
              className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                bgToggle
                  ? "border-white/10 bg-white/[0.06] text-gray-200 hover:bg-white/10"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Later
            </button>

            <button
              onClick={onLogin}
              className="px-4 py-3 text-sm font-black text-white transition bg-blue-600 shadow-lg rounded-2xl hover:bg-blue-700"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavToggle = ({ icon, label, active, onClick, bgToggle }) => (
  <button
    onClick={onClick}
    className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center transition-all duration-300 sm:rounded-2xl lg:mb-1 lg:flex-row lg:justify-between lg:px-4 lg:py-3.5 lg:text-left ${
      active
        ? "bg-blue-600 text-white shadow-sm"
        : bgToggle
        ? "text-gray-400 hover:bg-white/10 hover:text-white"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
    }`}
  >
    <span className="flex flex-col items-center gap-1 lg:flex-row lg:gap-3">
      {React.cloneElement(icon, { size: 16 })}
      <span className="text-[9px] font-black tracking-wider uppercase sm:text-[10px] lg:text-xs">
        {label}
      </span>
    </span>

    <ChevronRight size={16} className="hidden lg:block" />
  </button>
);

const accentClasses = {
  blue: {
    light: "bg-blue-50 text-blue-600",
    dark: "bg-blue-500/15 text-blue-300",
  },
  emerald: {
    light: "bg-emerald-50 text-emerald-600",
    dark: "bg-emerald-500/15 text-emerald-300",
  },
  rose: {
    light: "bg-rose-50 text-rose-600",
    dark: "bg-rose-500/15 text-rose-300",
  },
  violet: {
    light: "bg-violet-50 text-violet-600",
    dark: "bg-violet-500/15 text-violet-300",
  },
};

const Stat = ({
  icon,
  label,
  value,
  fallbackText = "Not Linked",
  onLinkClick,
  accent = "blue",
  bgToggle,
}) => {
  const hasValue =
    value !== undefined && value !== null && String(value).trim() !== "";

  const accentClass = bgToggle
    ? accentClasses[accent]?.dark || accentClasses.blue.dark
    : accentClasses[accent]?.light || accentClasses.blue.light;

  return (
    <div
      className={`group min-h-[108px] rounded-2xl border p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:min-h-[150px] sm:rounded-3xl sm:p-5 ${
        bgToggle
          ? "border-white/10 bg-white/[0.05] hover:border-blue-400/30"
          : "border-slate-200 bg-white hover:border-blue-200"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className={`mb-2 w-fit rounded-xl p-2 sm:mb-4 sm:rounded-2xl sm:p-3 ${accentClass}`}
          >
            {icon}
          </div>

          <p
            className={`mb-1 text-[9px] font-black uppercase tracking-wider sm:text-[11px] ${
              bgToggle ? "text-gray-500" : "text-slate-400"
            }`}
          >
            {label}
          </p>

          {hasValue ? (
            <p
              className={`max-w-[120px] truncate text-[11px] font-black sm:max-w-full sm:text-sm ${
                bgToggle ? "text-white" : "text-slate-950"
              }`}
            >
              {value}
            </p>
          ) : (
            <p
              className={`text-[11px] italic font-semibold sm:text-sm ${
                bgToggle ? "text-gray-500" : "text-slate-400"
              }`}
            >
              {fallbackText}
            </p>
          )}
        </div>

        {!hasValue && onLinkClick && (
          <button
            onClick={onLinkClick}
            className={`mt-2 inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-black transition sm:mt-4 sm:gap-1.5 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xs ${
              bgToggle
                ? "bg-blue-500/15 text-blue-300 hover:bg-blue-600 hover:text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            <PlusCircle size={11} />
            Link
          </button>
        )}
      </div>
    </div>
  );
};

const InfoBlock = ({ icon, label, value, status, bgToggle }) => (
  <div
    className={`rounded-2xl border p-3 sm:rounded-3xl sm:p-5 ${
      bgToggle
        ? "border-white/10 bg-black/20"
        : "border-slate-100 bg-slate-50"
    }`}
  >
    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
      <div
        className={`flex min-w-0 items-center gap-1.5 sm:gap-2 ${
          bgToggle ? "text-gray-400" : "text-slate-500"
        }`}
      >
        {icon}
        <span className="truncate text-[9px] font-black uppercase tracking-wider sm:text-[11px]">
          {label}
        </span>
      </div>

      {status && (
        <span
          className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase sm:px-2.5 sm:py-1 sm:text-[10px] ${
            bgToggle
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {status}
        </span>
      )}
    </div>

    <p
      className={`line-clamp-2 text-[11px] font-semibold leading-5 sm:text-sm sm:leading-6 ${
        bgToggle ? "text-gray-200" : "text-slate-800"
      }`}
    >
      {value}
    </p>
  </div>
);

const MiniCheck = ({ label, done, bgToggle }) => (
  <div
    className={`flex items-center justify-between rounded-xl px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3 ${
      bgToggle ? "bg-black/20" : "bg-slate-50"
    }`}
  >
    <span
      className={`text-[11px] font-bold sm:text-sm ${
        bgToggle ? "text-gray-300" : "text-slate-600"
      }`}
    >
      {label}
    </span>

    {done ? (
      <CheckCircle2 className="text-emerald-500" size={16} />
    ) : (
      <AlertCircle className="text-amber-500" size={16} />
    )}
  </div>
);

const SecurityCard = ({ icon, title, desc, active, bgToggle }) => (
  <div
    className={`rounded-2xl border p-3 sm:rounded-3xl sm:p-5 ${
      bgToggle
        ? "border-white/10 bg-black/20"
        : "border-slate-100 bg-slate-50"
    }`}
  >
    <div className="flex items-start gap-2 sm:gap-4">
      <div
        className={`rounded-xl p-2 sm:rounded-2xl sm:p-3 ${
          active
            ? bgToggle
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-emerald-100 text-emerald-700"
            : bgToggle
            ? "bg-amber-500/15 text-amber-300"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h4
          className={`text-xs font-black sm:text-base ${
            bgToggle ? "text-white" : "text-slate-950"
          }`}
        >
          {title}
        </h4>
        <p
          className={`max-w-[120px] truncate mt-1 text-[10px] sm:max-w-full sm:text-sm ${
            bgToggle ? "text-gray-400" : "text-slate-500"
          }`}
        >
          {desc}
        </p>

        <span
          className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-black sm:mt-3 sm:px-3 sm:py-1 sm:text-xs ${
            active
              ? bgToggle
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-emerald-100 text-emerald-700"
              : bgToggle
              ? "bg-amber-500/15 text-amber-300"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {active ? "Verified" : "Pending"}
        </span>
      </div>
    </div>
  </div>
);

const FormField = ({
  label,
  type = "text",
  defaultValue,
  placeholder,
  bgToggle,
}) => (
  <div>
    <label
      className={`mb-1.5 block text-[10px] font-black uppercase tracking-wider sm:text-xs ${
        bgToggle ? "text-gray-400" : "text-slate-500"
      }`}
    >
      {label}
    </label>

    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold outline-none transition sm:rounded-2xl sm:py-3 ${
        bgToggle
          ? "border-white/10 bg-black/30 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
      }`}
    />
  </div>
);

const ActionPanel = ({ icon, title, desc, button, bgToggle }) => (
  <div
    className={`rounded-2xl border p-3 shadow-sm sm:rounded-3xl sm:p-6 ${
      bgToggle
        ? "border-white/10 bg-white/[0.05]"
        : "border-slate-200 bg-white"
    }`}
  >
    <div className="flex items-start gap-2 sm:gap-4">
      <div
        className={`rounded-xl p-2 sm:rounded-2xl sm:p-3 ${
          bgToggle ? "bg-white/10 text-gray-200" : "bg-slate-100 text-slate-700"
        }`}
      >
        {icon}
      </div>

      <div>
        <h4
          className={`text-xs font-black sm:text-base ${
            bgToggle ? "text-white" : "text-slate-950"
          }`}
        >
          {title}
        </h4>
        <p
          className={`mt-1 text-[10px] leading-4 sm:text-sm sm:leading-6 ${
            bgToggle ? "text-gray-400" : "text-slate-500"
          }`}
        >
          {desc}
        </p>
      </div>
    </div>

    <button
      className={`mt-3 flex w-full items-center justify-between rounded-xl border px-3 py-2 text-[10px] font-black transition sm:mt-6 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${
        bgToggle
          ? "border-white/10 bg-black/20 text-gray-200 hover:bg-blue-600 hover:text-white"
          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-950 hover:text-white"
      }`}
    >
      <span>{button}</span>
      <ChevronRight size={14} />
    </button>
  </div>
);

const Loader = ({ bgToggle }) => (
  <div
    className={`flex h-screen flex-col items-center justify-center ${
      bgToggle ? "bg-gray-950" : "bg-slate-100"
    }`}
  >
    <div className="w-10 h-10 border-4 border-blue-100 rounded-full sm:w-12 sm:h-12 animate-spin border-t-blue-600" />
    <h2 className="mt-4 text-xs font-black tracking-widest text-blue-600 uppercase">
      Loading Profile
    </h2>
  </div>
);

export default Profile;