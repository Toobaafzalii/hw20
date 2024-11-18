"use client";

import ConfrimModal from "@/components/confrimModal";
import NewTaskModal from "@/components/newTaskModal";
import { useRouter, usePathname } from "next/navigation";
import PocketBase from "pocketbase";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pb = new PocketBase("https://tooba-todo.pockethost.io");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isConfrimModalOpen, setIsConfrimModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const onTasksClick = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsNewModalOpen(false);
  };

  const handleLogOutClose = () => {
    setIsConfrimModalOpen(false);
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
  ];

  const getNavbarColor = () => {
    if (pathname === "/todos") return "bg-orange-300";
    if (pathname === "/inprogress") return "bg-indigo-300";
    if (pathname === "/compeleted") return "bg-teal-200";
    return "bg-indigo-300";
  };

  return (
    <div className="w-full relative">
      <div
        className={`h-20 ${getNavbarColor()} flex justify-between items-center px-10 shadow-lg`}
      >
        <span className="underline decoration-wavy text-3xl font-bold text-white">
          Task Manager
        </span>

        <button className="block sm:hidden text-white text-3xl">&#9776;</button>

        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-gray-50 shadow-md xs:block sm:hidden flex flex-col gap-2 px-6 py-3">
            <button
              className="py-1.5 px-3 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
              onClick={() => router.push("/")}
            >
              Home
            </button>
            <button
              className="py-1.5 px-3 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
              onClick={onTasksClick}
            >
              Tasks
            </button>
            <button
              className="py-1.5 px-3 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
              onClick={handleLogOutClick}
            >
              LogOut
            </button>
          </div>
        )}

        <div className="hidden sm:flex justify-between items-center gap-y-6">
          <button
            className="py-1.5 px-3 text-lg mx-1 font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="py-1.5 px-3 text-lg mx-1 font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
            onClick={onTasksClick}
          >
            Tasks
          </button>
          <button
            className="py-1.5 px-3 text-lg mx-1 font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
            onClick={handleLogOutClick}
          >
            LogOut
          </button>
        </div>
      </div>

      {children}

      {isDropDownOpen && (
        <div
          className="absolute top-20 right-[0.5%] flex flex-col justify-between items-start bg-indigo-200 w-40 rounded-lg shadow-xl"
          onClick={() => setIsDropDownOpen(false)}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`p-2.5 w-full border-b-2 border-b-gray-400 cursor-pointer ${
                item.path === pathname ? "bg-gray-200" : "hover:bg-gray-300"
              }`}
              onClick={item.path !== pathname ? item.action : undefined}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {isNewModalOpen && <NewTaskModal onClose={handleClose} />}
      {isConfrimModalOpen && (
        <ConfrimModal
          message="Sure you want to log out?"
          onClose={handleLogOutClose}
          onLogOut={handleLogOut}
        />
      )}
    </div>
  );
}
