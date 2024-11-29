import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../components";

const Header = ({ sidebarStatus, setSidebarStatusHandler }) => {
  const navigate = useNavigate();

  const [dropdownStatus, setDropDownStatus] = useState(false);

  const dropdownHandler = () => {
    setDropDownStatus(!dropdownStatus);
  };

  const dropdownOptions = [
    {
      name: "Profile",
      icon: <FaUser />,
      handler: () => {
        navigationHandler("/profile");
      },
    },
    {
      name: "Setting",
      icon: <IoIosSettings />,
      handler: () => {
        navigationHandler("/setting");
      },
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      handler: () => {
        navigationHandler("/notifications");
      },
    },
    {
      name: "Logout",
      icon: <FiLogOut />,
      handler: () => {
        logoutHandler();
      },
    },
  ];

  const logoutHandler = () => {
    dropdownHandler();
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const navigationHandler = (path) => {
    dropdownHandler();
    navigate(`/dashboard${path}`);
  };

  const sidebarHandler = () => {
    setSidebarStatusHandler(!sidebarStatus);
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-between items-center shadow-sm bg-white p-3">
        <HiOutlineMenuAlt1
          className={`text-3xl cursor-pointer hover:text-text ${
            sidebarStatus ? "text-slate-400" : "text-primary"
          }`}
          onClick={sidebarHandler}
        />
        <div className="px-3">
          <FaCircleUser
            onClick={dropdownHandler}
            className="text-slate-300 hover:text-slate-400 transition-all text-4xl cursor-pointer"
          />
          <Dropdown
            status={dropdownStatus}
            changeStatus={setDropDownStatus}
            options={dropdownOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
