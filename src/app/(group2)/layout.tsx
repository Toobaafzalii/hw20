"use client";

import ConfrimModal from "@/components/confrimModal";
import NewTaskModal from "@/components/newTaskModal";
import { useRouter, usePathname } from "next/navigation";
import PocketBase from "pocketbase";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pb = new PocketBase("https://tooba-todo.pockethost.io");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isConfrimModalOpen, setIsConfrimModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogOutClick = () => {
    setIsConfrimModalOpen(true);
  };

  const handleLogOut = () => {
    setIsConfrimModalOpen(false);
    router.push("/");
    pb.authStore.clear();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeDropdown = () => {
    setIsDropDownOpen(false);
  };

  const menuItems = [
    { label: "New Task", action: () => setIsNewModalOpen(true), path: null },
    { label: "Todos", action: () => router.push("/todos"), path: "/todos" },
    {
      label: "In Progress Tasks",
      action: () => router.push("/inprogress"),
      path: "/inprogress",
    },
    {
      label: "Completed Tasks",
      action: () => router.push("/compeleted"),
      path: "/compeleted",
    },
    { label: "LogOut", action: handleLogOutClick, path: null },
  ];

  const getNavbarColor = () => {
    if (pathname === "/todos") return "bg-orange-300";
    if (pathname === "/inprogress") return "bg-indigo-300";
    if (pathname === "/compeleted") return "bg-teal-200";
    return "bg-indigo-300";
  };

  return (
    <div className="relative w-full">
      {/* Navbar */}
      <div
        className={`h-20 ${getNavbarColor()} flex justify-between items-center px-10 shadow-lg`}
      >
        <span className="underline decoration-wavy text-3xl font-bold text-white">
          Task Manager
        </span>

        {/* Hamburger Menu Button */}
        <button
          className="block sm:hidden text-white text-3xl"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          &#9776;
        </button>

        {/* Full Menu for Larger Screens */}
        <div className="hidden sm:flex justify-between items-center gap-y-6">
          <button
            className="py-1.5 px-3 text-lg mx-1 font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <div className="relative">
            <button
              className="py-1.5 px-3 text-lg mx-1 font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
              onClick={() => setIsDropDownOpen((prev) => !prev)}
            >
              Tasks
            </button>
            {isDropDownOpen && (
              <div
                className="absolute top-full mt-2 left-0 w-88 bg-white shadow-lg rounded-lg z-40 "
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
              >
                {menuItems.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className={`py-2 px-3 text-lg font-semibold text-gray-800 rounded-md cursor-pointer hover:bg-gray-100 text-nowrap ${
                      item.path === pathname ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      closeDropdown();
                      item.action();
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="py-1.5 px-3 text-lg mx-1 font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
            onClick={handleLogOutClick}
          >
            LogOut
          </button>
        </div>
      </div>

      {/* Children */}
      {children}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-30">
          <div
            className="absolute top-0 left-0 w-full bg-white shadow-lg rounded-lg p-6 z-40"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the menu
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`py-2 px-3 text-lg font-semibold text-gray-800 rounded-md cursor-pointer hover:bg-gray-100 ${
                  item.path === pathname ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  closeMenu();
                  item.action();
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          {/* Overlay Click to Close */}
          <div
            className="absolute top-0 left-0 w-full h-full z-20"
            onClick={closeMenu}
          ></div>
        </div>
      )}

      {/* Modals */}
      {isNewModalOpen && (
        <NewTaskModal onClose={() => setIsNewModalOpen(false)} />
      )}
      {isConfrimModalOpen && (
        <ConfrimModal
          message="Sure you want to log out?"
          onClose={() => setIsConfrimModalOpen(false)}
          onLogOut={handleLogOut}
        />
      )}
    </div>
  );
}
