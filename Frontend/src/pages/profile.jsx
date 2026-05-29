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
} from "lucide-react";

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

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("u_id");

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/get-user?user_id=${userId}`
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Mobile only: welcome block 10 seconds show, then smooth hide.
  // ✅ Desktop/laptop: welcome block always visible using responsive classes below.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleLinkAction = (type) => {
    setActiveTab("settings");

    setTimeout(() => {
      alert(`Please update your ${type} field in Account Settings.`);
    }, 250);
  };

  const handleCopyId = async () => {
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
    return <Loader />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-3 sm:space-y-5 lg:space-y-6 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-4">
              <Stat
                icon={<Mail size={18} />}
                accent="blue"
                label="Email"
                value={userData?.email}
                onLinkClick={() => handleLinkAction("Email")}
              />

              <Stat
                icon={<Phone size={18} />}
                accent="emerald"
                label="Phone"
                value={userData?.phonenumber}
                onLinkClick={() => handleLinkAction("Phone Number")}
              />

              <Stat
                icon={<MapPin size={18} />}
                accent="rose"
                label="Pincode"
                value={userData?.pincode}
                fallbackText="Not Added"
                onLinkClick={() => handleLinkAction("Pincode")}
              />

              <Stat
                icon={<Target size={18} />}
                accent="violet"
                label="Gender"
                value={userData?.gender}
                fallbackText="Not Set"
                onLinkClick={() => handleLinkAction("Gender")}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-5 xl:grid-cols-3">
              <div className="overflow-hidden bg-white border shadow-sm xl:col-span-2 rounded-2xl sm:rounded-3xl border-slate-200">
                <div className="flex items-center justify-between p-3 border-b sm:p-5 lg:p-6 border-slate-100 bg-slate-50/80">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 text-blue-600 rounded-xl sm:rounded-2xl bg-blue-50 sm:p-2.5">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <h3 className="text-sm font-black sm:text-lg text-slate-950">
                        Identity Details
                      </h3>
                      <p className="hidden text-sm sm:block text-slate-500">
                        Your account and delivery information
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition bg-white border shadow-sm rounded-xl border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-sm"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 sm:gap-4 sm:p-5 lg:gap-6 lg:p-6">
                  <InfoBlock
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
                    icon={<BadgeCheck size={15} />}
                    label="Status"
                    value="Active"
                    status="Verified"
                  />

                  <InfoBlock
                    icon={<Clock size={15} />}
                    label="Updated"
                    value={
                      userData?.updated_at
                        ? new Date(userData.updated_at).toLocaleDateString()
                        : "Not available"
                    }
                  />

                  <InfoBlock
                    icon={<Star size={15} />}
                    label="Member"
                    value="Standard"
                    status="Active"
                  />
                </div>
              </div>

              <div className="p-3 bg-white border shadow-sm rounded-2xl sm:rounded-3xl sm:p-5 lg:p-6 border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black sm:text-lg text-slate-950">
                      Profile Strength
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Complete your details
                    </p>
                  </div>

                  <Sparkles className="text-amber-500" size={18} />
                </div>

                <div className="mt-4 sm:mt-6">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black sm:text-4xl text-slate-950">
                      {completion}%
                    </span>

                    <span className="px-2 py-1 text-[10px] sm:text-xs font-bold text-blue-700 rounded-full bg-blue-50">
                      {completion >= 80 ? "Great" : "Needs Update"}
                    </span>
                  </div>

                  <div className="h-2.5 mt-3 overflow-hidden rounded-full sm:h-3 bg-slate-100">
                    <div
                      className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 sm:block sm:mt-6 sm:space-y-3">
                  <MiniCheck label="Email" done={Boolean(userData?.email)} />
                  <MiniCheck
                    label="Phone"
                    done={Boolean(userData?.phonenumber)}
                  />
                  <MiniCheck
                    label="Address"
                    done={Boolean(userData?.address)}
                  />
                  <MiniCheck
                    label="Image"
                    done={Boolean(userData?.userImage)}
                  />
                </div>

                <button
                  onClick={() => setActiveTab("settings")}
                  className="w-full px-4 py-2.5 mt-4 text-xs font-bold text-white transition rounded-xl sm:mt-6 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm bg-slate-950 hover:bg-blue-700"
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
            <div className="p-4 bg-white border shadow-sm sm:p-8 rounded-2xl sm:rounded-3xl border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 text-purple-600 rounded-xl sm:rounded-2xl bg-purple-50 sm:p-2.5">
                  <Fingerprint size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-bold sm:text-xl text-slate-950">
                    Security Settings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Manage account access
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 sm:gap-5 sm:mt-8">
                <SecurityCard
                  icon={<Mail size={18} />}
                  title="Email"
                  desc={userData?.email || "Not linked"}
                  active={Boolean(userData?.email)}
                />

                <SecurityCard
                  icon={<Phone size={18} />}
                  title="Phone"
                  desc={userData?.phonenumber || "Not linked"}
                  active={Boolean(userData?.phonenumber)}
                />
              </div>

              <div className="max-w-md mt-5 space-y-4 sm:mt-8">
                <div>
                  <label className="block mb-2 text-[10px] sm:text-xs font-black tracking-wider uppercase text-slate-500">
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••••••"
                      disabled
                      className="w-full px-4 py-3 text-sm border outline-none rounded-2xl border-slate-200 bg-slate-50 text-slate-500"
                    />

                    <KeyRound
                      className="absolute right-4 top-3.5 text-slate-400"
                      size={17}
                    />
                  </div>
                </div>

                <button className="w-full px-5 py-3 text-sm font-bold text-white transition bg-blue-600 sm:w-fit rounded-2xl hover:bg-blue-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-3 sm:space-y-6 animate-fadeIn">
            <div className="p-4 bg-white border shadow-sm sm:p-8 rounded-2xl sm:rounded-3xl border-slate-200">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 text-amber-600 rounded-xl sm:rounded-2xl bg-amber-50 sm:p-2.5">
                    <Settings size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold sm:text-xl text-slate-950">
                      Account Settings
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Update account details
                    </p>
                  </div>
                </div>

                <span className="w-fit px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full bg-slate-100 text-slate-600">
                  Backend update API needed
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-5 sm:mt-8 md:grid-cols-2">
                <FormField
                  label="Display Name"
                  defaultValue={userData?.userName || ""}
                  placeholder="Enter display name"
                />

                <FormField
                  label="Phone Number"
                  defaultValue={userData?.phonenumber || ""}
                  placeholder="Enter phone number"
                />

                <div className="md:col-span-2">
                  <FormField
                    label="Email Address"
                    type="email"
                    defaultValue={userData?.email || ""}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 sm:flex sm:gap-3 sm:mt-8">
                <button className="px-4 py-2.5 text-xs font-bold text-white transition bg-blue-600 rounded-xl sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm hover:bg-blue-700">
                  Save Changes
                </button>

                <button
                  onClick={() => setActiveTab("overview")}
                  className="px-4 py-2.5 text-xs font-bold transition bg-white border rounded-xl sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Overview
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-6">
              <ActionPanel
                icon={<ShieldAlert size={18} />}
                title="Privacy"
                desc="Manage privacy settings."
                button="Privacy"
              />

              <ActionPanel
                icon={<Headset size={18} />}
                title="Support"
                desc="Need help? Contact support."
                button="Support"
              />
            </div>

            <div className="flex items-center justify-between gap-3 p-3 border border-red-100 rounded-2xl sm:rounded-3xl sm:p-5 bg-red-50">
              <div>
                <h4 className="text-xs font-black sm:text-sm text-slate-950">
                  Session Control
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
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
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-24 left-10 h-72 w-72 bg-blue-300/20 blur-3xl" />
        <div className="absolute rounded-full right-10 top-20 h-72 w-72 bg-indigo-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-2.5 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
        {/* ✅ Desktop/laptop always visible. Mobile 10 sec smooth hide. */}
        <div
          className={`overflow-hidden rounded-2xl border bg-white/80 shadow-sm backdrop-blur transition-all duration-700 ease-in-out sm:rounded-[2rem]
            ${
              showWelcome
                ? "mb-3 max-h-[260px] border-white/70 p-3 opacity-100"
                : "mb-0 max-h-0 border-transparent p-0 opacity-0"
            }
            sm:mb-6 sm:max-h-[500px] sm:border-white/70 sm:p-6 sm:opacity-100 lg:mb-8
          `}
        >
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 text-[10px] font-black text-blue-700 rounded-full bg-blue-50 sm:text-xs sm:px-3">
                <Sparkles size={12} />
                Account Center
              </div>

              <h1 className="text-xl font-black tracking-tight sm:text-3xl md:text-4xl text-slate-950">
                Welcome, {userData?.userName || "User"}!
              </h1>

              <p className="max-w-2xl mt-1 text-xs leading-5 sm:mt-2 sm:text-sm sm:leading-6 text-slate-500">
                Manage profile, security and account preferences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <button
                onClick={handleCopyId}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold transition bg-white border shadow-sm rounded-xl sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy ID"}
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white transition shadow-sm rounded-xl sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm bg-slate-950 hover:bg-blue-700"
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
              <div className="overflow-hidden bg-white border shadow-sm rounded-2xl sm:rounded-[2rem] border-white/80">
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
                      className="object-cover w-16 h-16 border-4 border-white rounded-full shadow-lg sm:h-28 sm:w-28 bg-slate-100"
                      alt="Profile"
                    />

                    <button
                      onClick={() => setActiveTab("settings")}
                      className="absolute bottom-0 right-0 p-1.5 text-white transition bg-blue-600 rounded-full shadow-lg sm:p-2 hover:bg-blue-700"
                      title="Update profile image"
                    >
                      <Camera size={12} className="sm:hidden" />
                      <Camera size={15} className="hidden sm:block" />
                    </button>
                  </div>

                  <div className="min-w-0 pt-8 sm:pt-0 sm:text-center">
                    <h2 className="text-base font-black truncate sm:mt-4 sm:text-xl text-slate-950">
                      {userData?.userName || "Explorer"}
                    </h2>

                    <p className="max-w-[190px] truncate text-xs sm:mt-1 sm:max-w-full sm:text-sm text-slate-500">
                      {userData?.email ||
                        userData?.phonenumber ||
                        "New Customer"}
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 text-[10px] sm:text-xs font-black rounded-full bg-emerald-50 text-emerald-700 sm:mt-4">
                      <BadgeCheck size={12} />
                      Active
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2 bg-white border shadow-sm rounded-2xl sm:rounded-[2rem] border-white/80 lg:block lg:p-3">
                <NavToggle
                  icon={<Zap />}
                  label="Overview"
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                />

                <NavToggle
                  icon={<Fingerprint />}
                  label="Security"
                  active={activeTab === "security"}
                  onClick={() => setActiveTab("security")}
                />

                <NavToggle
                  icon={<Settings />}
                  label="Settings"
                  active={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                />
              </div>

              <button
                onClick={handleLogout}
                className="items-center justify-center hidden w-full gap-2 p-4 text-sm font-black text-red-600 transition bg-white border border-red-100 shadow-sm lg:flex rounded-2xl hover:bg-red-600 hover:text-white"
              >
                <LogOut size={17} />
                Exit Account
              </button>
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

const NavToggle = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center transition-all duration-300 sm:rounded-2xl lg:mb-1 lg:flex-row lg:justify-between lg:px-4 lg:py-3.5 lg:text-left ${
      active
        ? "bg-slate-950 text-white shadow-sm"
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
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
  violet: "bg-violet-50 text-violet-600",
};

const Stat = ({
  icon,
  label,
  value,
  fallbackText = "Not Linked",
  onLinkClick,
  accent = "blue",
}) => {
  const hasValue =
    value !== undefined && value !== null && String(value).trim() !== "";

  return (
    <div className="group min-h-[108px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:min-h-[150px] sm:rounded-3xl sm:p-5">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className={`mb-2 w-fit rounded-xl p-2 sm:mb-4 sm:rounded-2xl sm:p-3 ${
              accentClasses[accent] || accentClasses.blue
            }`}
          >
            {icon}
          </div>

          <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-slate-400 sm:text-[11px]">
            {label}
          </p>

          {hasValue ? (
            <p className="max-w-[120px] truncate text-[11px] font-black text-slate-950 sm:max-w-full sm:text-sm">
              {value}
            </p>
          ) : (
            <p className="text-[11px] italic font-semibold text-slate-400 sm:text-sm">
              {fallbackText}
            </p>
          )}
        </div>

        {!hasValue && onLinkClick && (
          <button
            onClick={onLinkClick}
            className="mt-2 inline-flex w-fit items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700 transition hover:bg-blue-600 hover:text-white sm:mt-4 sm:gap-1.5 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xs"
          >
            <PlusCircle size={11} />
            Link
          </button>
        )}
      </div>
    </div>
  );
};

const InfoBlock = ({ icon, label, value, status }) => (
  <div className="p-3 border rounded-2xl sm:p-5 sm:rounded-3xl border-slate-100 bg-slate-50">
    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
      <div className="flex items-center min-w-0 gap-1.5 sm:gap-2 text-slate-500">
        {icon}
        <span className="truncate text-[9px] font-black uppercase tracking-wider sm:text-[11px]">
          {label}
        </span>
      </div>

      {status && (
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-black uppercase text-emerald-700 sm:px-2.5 sm:py-1 sm:text-[10px]">
          {status}
        </span>
      )}
    </div>

    <p className="line-clamp-2 text-[11px] font-semibold leading-5 text-slate-800 sm:text-sm sm:leading-6">
      {value}
    </p>
  </div>
);

const MiniCheck = ({ label, done }) => (
  <div className="flex items-center justify-between px-3 py-2 rounded-xl sm:rounded-2xl sm:px-4 sm:py-3 bg-slate-50">
    <span className="text-[11px] font-bold sm:text-sm text-slate-600">
      {label}
    </span>

    {done ? (
      <CheckCircle2 className="text-emerald-600" size={16} />
    ) : (
      <AlertCircle className="text-amber-500" size={16} />
    )}
  </div>
);

const SecurityCard = ({ icon, title, desc, active }) => (
  <div className="p-3 border rounded-2xl sm:p-5 sm:rounded-3xl border-slate-100 bg-slate-50">
    <div className="flex items-start gap-2 sm:gap-4">
      <div
        className={`rounded-xl p-2 sm:rounded-2xl sm:p-3 ${
          active
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h4 className="text-xs font-black sm:text-base text-slate-950">
          {title}
        </h4>
        <p className="max-w-[120px] truncate mt-1 text-[10px] sm:max-w-full sm:text-sm text-slate-500">
          {desc}
        </p>

        <span
          className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-black sm:mt-3 sm:px-3 sm:py-1 sm:text-xs ${
            active
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {active ? "Verified" : "Pending"}
        </span>
      </div>
    </div>
  </div>
);

const FormField = ({ label, type = "text", defaultValue, placeholder }) => (
  <div>
    <label className="block mb-1.5 text-[10px] sm:text-xs font-black tracking-wider uppercase text-slate-500">
      {label}
    </label>

    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 text-sm font-semibold transition border outline-none rounded-xl sm:rounded-2xl sm:py-3 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
    />
  </div>
);

const ActionPanel = ({ icon, title, desc, button }) => (
  <div className="p-3 bg-white border shadow-sm rounded-2xl sm:p-6 sm:rounded-3xl border-slate-200">
    <div className="flex items-start gap-2 sm:gap-4">
      <div className="p-2 rounded-xl sm:rounded-2xl sm:p-3 bg-slate-100 text-slate-700">
        {icon}
      </div>

      <div>
        <h4 className="text-xs font-black sm:text-base text-slate-950">
          {title}
        </h4>
        <p className="mt-1 text-[10px] leading-4 sm:text-sm sm:leading-6 text-slate-500">
          {desc}
        </p>
      </div>
    </div>

    <button className="flex items-center justify-between w-full px-3 py-2 mt-3 text-[10px] font-black transition border rounded-xl sm:rounded-2xl sm:px-4 sm:py-3 sm:mt-6 sm:text-sm border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-950 hover:text-white">
      <span>{button}</span>
      <ChevronRight size={14} />
    </button>
  </div>
);

const Loader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
    <div className="w-10 h-10 border-4 border-blue-100 rounded-full sm:w-12 sm:h-12 animate-spin border-t-blue-600" />
    <h2 className="mt-4 text-xs font-black tracking-widest text-blue-600 uppercase">
      Loading Profile
    </h2>
  </div>
);

export default Profile;