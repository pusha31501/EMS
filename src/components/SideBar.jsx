import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyProfileData } from "../assets/assets.jsx";
import {
  MenuIcon,
  UserIcon,
  XIcon,
  LayoutGridIcon,
  CalendarIcon,
  FileTextIcon,
  DollarSignIcon,
  SettingsIcon,
  ChevronRightIcon,
  LogOutIcon,
} from "lucide-react";

const SideBar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUserName(dummyProfileData?.firstName + " " + dummyProfileData?.lastName);
  }, [userName]);

  //close mobile sidebar when route changes

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    window.location.href = "/login";
    console.log("User logged out");
  };
  const role = " " || "Employee";
  const navItem = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];
  const sideBarContent = (
    <>
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <UserIcon size={40} className="text-white" />
            <div>
              <p className="font-bold text-[13px] text-white tracking-wide">
                Employee MS
              </p>
              <p className="text-xs text-white/60">Management System</p>
            </div>
          </div>
          {/*close button on mobile*/}
          <button
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setMobileOpen(false)}
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>
      {/* User Profile Card*/}
      {userName && (
        <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-slate-800 rounded-lg ring-1 ring-white/10 shrink-0">
              <span className="text-slate-400 text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] text-slate-200 truncate font-medium">
                {userName}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {role === "ADMIN" ? "Administrator" : "Employee"}{" "}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Navigation
        </p>
      </div>
      {/* navigation list */}
      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItem.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${isActive ? "bg-indigo-500/12 text-indigo-300" : "text-slate-300 hover-text-white hover-bg-white/4"}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-r-full bg-indigo-500 "></div>
              )}
              <item.icon
                className={`w-4.25 h-4.25 shink-0 ${isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-300"}`}
              />
              <span className="flex-1">{item.name}</span>
              {isActive && (
                <ChevronRightIcon className="w-3.5 h-3.5 text-indigo-500/50" />
              )}
            </Link>
          );
        })}
      </div>
      {/* Logout */}
      <div className="px-5 py-3 border-t border-white/10">
        <button
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400  hover:bg-rose-500/8 transition-all duration-150 "
          onClick={handleLogout}
        >
          <LogOutIcon className="w-4.25 h-4.25" />
          <span>Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10 cursor-pointer"
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {/* Sidebar -desktop */}
      <aside className="hidden md:flex flex-col h-full w-65 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-0 border-white/4">
        {sideBarContent}
      </aside>

      {/* Sidebar -mobile */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-linear-to-b from-slate-900 
          via-slate-900 to-slate-950 text-white flex flex-col 
          transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {sideBarContent}
      </aside>
    </>
  );
};

export default SideBar;
