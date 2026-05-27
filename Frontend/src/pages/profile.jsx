import React, { useEffect, useState } from "react";
import {
  User, MapPin, Settings, LogOut, Edit3, ShieldCheck,
  Mail, Phone, Package, Star, Target, Fingerprint, Zap, KeyRound, 
  ShieldAlert, Headset, ChevronRight
} from "lucide-react";

const API_BASE_URL = "http://localhost:8000";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("u_id");
      if (!userId) { setLoading(false); return; }
      try {
        const response = await fetch(`${API_BASE_URL}/api/get-user?u_id=${userId}`);
        const data = await response.json();
        if (response.ok && data.success) setUserData(data.user);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // --- RENDERING TABS CONDITIONALLY ---
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* IMPORTANT FIELDS GRID */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Stat icon={<Mail color="#3b82f6"/>} label="Email Address" value={userData?.email} />
              <Stat icon={<Phone color="#10b981"/>} label="Phone Number" value={userData?.phonenumber || "Not Linked"} />
              <Stat icon={<MapPin color="#f43f5e"/>} label="Pincode" value={userData?.pincode || "Not Added"} />
              <Stat icon={<Target color="#a855f7"/>} label="Gender" value={userData?.gender || "Not Specified"} />
            </div>

            {/* IDENTITY & ADDRESS DETAILS */}
            <div className="bg-[#1E293B] border border-slate-700/60 rounded-[2rem] overflow-hidden">
               <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-blue-400 bg-blue-500/10 rounded-xl"><ShieldCheck size={20}/></div>
                    <h3 className="text-lg font-bold text-white">Identity Details</h3>
                  </div>
                  <button className="p-2.5 text-slate-400 transition-colors bg-slate-700 rounded-xl hover:bg-slate-600 hover:text-white">
                    <Edit3 size={16} />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Residential Address</span>
                    <p className="text-base font-normal leading-relaxed text-slate-300">
                      {userData?.address || "No address on file. Please add an address for seamless deliveries."}
                    </p>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between p-4 border bg-slate-900/40 rounded-xl border-slate-700/40">
                      <div className="flex items-center gap-3">
                        <Star className="text-yellow-500" size={18} />
                        <span className="text-sm font-semibold">Account Status</span>
                      </div>
                      <span className="px-3 py-1 text-xs font-bold text-green-400 uppercase rounded-full bg-green-400/10">Active</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="bg-[#1E293B] border border-slate-700/60 rounded-[2rem] p-8 space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 text-purple-400 bg-purple-500/10 rounded-xl"><Fingerprint size={20}/></div>
              <h3 className="text-xl font-bold text-white">Security Settings</h3>
            </div>
            
            <div className="max-w-md space-y-4">
              <div>
                <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-500">Current Password</label>
                <div className="relative">
                  <input type="password" value="••••••••••••" disabled className="w-full px-4 py-3 text-sm border bg-slate-900/50 border-slate-700 rounded-xl text-slate-400 focus:outline-none" />
                  <KeyRound className="absolute right-4 top-3.5 text-slate-600" size={16} />
                </div>
              </div>
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition">
                Change Password
              </button>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. Account Settings - Important Fields */}
            <div className="bg-[#1E293B] border border-slate-700/60 rounded-[2rem] p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 text-amber-400 bg-amber-500/10 rounded-xl"><Settings size={20}/></div>
                <h3 className="text-xl font-bold text-white">Account Settings</h3>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-500">Display Name</label>
                  <input type="text" defaultValue={userData?.userName} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-500">Phone Number</label>
                  <input type="text" defaultValue={userData?.phonenumber} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition">
                Save Changes
              </button>
            </div>

            {/* 2. Privacy & Customer Care Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Account Privacy */}
              <div className="bg-[#1E293B] border border-slate-700/60 rounded-[2rem] p-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-cyan-400 bg-cyan-500/10 rounded-xl"><ShieldAlert size={20}/></div>
                    <h4 className="text-base font-bold text-white">Account Privacy</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">Ungaludaiya data privacy matrum hidden settings-ai inge manage seiyalam.</p>
                </div>
                <button className="flex items-center justify-between w-full p-3 mt-6 text-sm font-semibold transition border bg-slate-900/50 hover:bg-slate-900 text-slate-300 rounded-xl border-slate-700/40">
                  <span>Privacy Management</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Customer Care */}
              <div className="bg-[#1E293B] border border-slate-700/60 rounded-[2rem] p-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-rose-400 bg-rose-500/10 rounded-xl"><Headset size={20}/></div>
                    <h4 className="text-base font-bold text-white">Customer Care</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">Sandeghangal mathrum issues-ku ungalukku udane udavi seiya engal support team siddham.</p>
                </div>
                <button className="flex items-center justify-between w-full p-3 mt-6 text-sm font-semibold transition border bg-slate-900/50 hover:bg-slate-900 text-slate-300 rounded-xl border-slate-700/40">
                  <span>Contact Support</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 3. Inline Logout Option */}
            <div className="flex items-center justify-between p-4 border bg-red-500/5 border-red-500/20 rounded-2xl">
              <div>
                <h4 className="text-sm font-bold text-white">Session Control</h4>
                <p className="text-xs text-slate-400 mt-0.5">Intha device-il irundhu ungal account-ai logout seiya.</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-400 transition-all duration-300 bg-red-500/20 hover:bg-red-500 hover:text-white rounded-xl"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-blue-500/30">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* --- LEFT NAVIGATION --- */}
          <aside className="lg:col-span-3">
            <div className="sticky space-y-4 top-28">
              <div className="bg-[#1E293B] rounded-[2rem] p-6 border border-slate-700/50 shadow-2xl">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <img 
                      src={userData?.userImage ? `${API_BASE_URL}/uploads/${userData.userImage}` : `https://api.dicebear.com/7.x/micah/svg?seed=${userData?.userName}`}
                      className="object-cover w-24 h-24 border-2 border-blue-500 rounded-full"
                      alt="Profile"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    {userData?.userName || "Explorer"}
                  </h2>
                </div>

                <nav className="mt-8 space-y-1">
                  <NavToggle icon={<Zap />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />                  <NavToggle icon={<Fingerprint />} label="Security" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
                  <NavToggle icon={<Settings />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
                </nav>

                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full gap-2 p-3 mt-6 font-bold text-red-400 transition-all duration-300 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={18} /> Exit Account
                </button>
              </div>
            </div>
          </aside>

          {/* --- RIGHT CONTENT --- */}
          <main className="space-y-6 lg:col-span-9">
            {/* WELCOME BANNER */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-800 shadow-xl">
              <h1 className="text-3xl font-bold text-white">Welcome back, {userData?.userName || "User"}!</h1>
              <p className="mt-1 text-blue-100 opacity-80">Manage your profile information and account settings below.</p>
            </div>

            {/* DYNAMIC TAB CONTENT */}
            {renderTabContent()}
          </main>

        </div>
      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const NavToggle = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group relative ${
      active ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <span className={`${active ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}>
      {React.cloneElement(icon, { size: 18 })}
    </span>
    <span className="text-xs font-bold tracking-wider uppercase">{label}</span>
  </button>
);

const Stat = ({ icon, label, value }) => (
  <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/60 transition-all hover:border-slate-600">
    <div className="p-2 mb-3 bg-slate-900 w-fit rounded-xl">
      {icon}
    </div>
    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-white truncate">{value || "---"}</p>
  </div>
);

const Loader = () => (
  <div className="h-screen bg-[#0F172A] flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 rounded-full border-blue-500/20 border-t-blue-500 animate-spin" />
    <h2 className="mt-4 text-xs font-bold tracking-widest text-blue-500 uppercase">Loading Profile</h2>
  </div>
);

export default Profile;